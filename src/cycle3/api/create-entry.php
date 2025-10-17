<?php
/**
 * Create Art Entry API - Complete Working Version
 * Handles form submission with image uploads and proper database insertion
 */

// Headers
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

// Handle preflight
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

// Include database connection
require_once '../config/dbconn.php';

// Check request method
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['success' => false, 'message' => 'Method not allowed']);
    exit;
}

// Start session
session_start();

try {
    // Check if user is logged in
    $user_id = null;
    
    // Check session
    if (isset($_SESSION['user_id'])) {
        $user_id = $_SESSION['user_id'];
    } 
    // For testing - use a default user ID if not logged in
    else {
        // In production, uncomment these lines:
        // http_response_code(401);
        // echo json_encode(['success' => false, 'message' => 'You must be logged in to submit art']);
        // exit;
        
        // For testing, use Uncle Tommy's ID
        $user_id = 2;
    }

    // Validate required fields
    $required = ['title', 'description', 'art_type', 'art_period', 'latitude', 'longitude'];
    foreach ($required as $field) {
        if (empty($_POST[$field])) {
            throw new Exception("Missing required field: $field");
        }
    }

    // Get form data
    $title = trim($_POST['title']);
    $description = trim($_POST['description']);
    $art_type_form = $_POST['art_type'];
    $art_period_form = $_POST['art_period'];
    $condition = trim($_POST['condition'] ?? '');
    $latitude = $_POST['latitude'];
    $longitude = $_POST['longitude'];
    $location_description = trim($_POST['location_description'] ?? '');
    $culturally_sensitive = isset($_POST['culturally_sensitive']) && $_POST['culturally_sensitive'] === '1';
    $artist_name = trim($_POST['artist_name'] ?? 'Unknown');
    $artist_info = trim($_POST['artist_info'] ?? '');

    // Map form values to database enum values
    $art_type_map = [
        '1' => 'rock_art',      // Cave Art
        '2' => 'rock_art',      // Rock Art
        '3' => 'contemporary',  // Mural
        '4' => 'sculpture',     // Sculpture
        '5' => 'contemporary',  // Installation
        '6' => 'contemporary'   // Gallery Piece
    ];
    
    $period_map = [
        '1' => 'ancient',       // Ancient (Pre-colonial)
        '2' => 'historical',    // Colonial Era
        '3' => 'contemporary',  // Modern (20th Century)
        '4' => 'contemporary'   // Contemporary (21st Century)
    ];
    
    // Get enum values
    $art_type = $art_type_map[$art_type_form] ?? 'other';
    $time_period = $period_map[$art_period_form] ?? 'contemporary';
    $location_sensitivity = $culturally_sensitive ? 'hidden' : 'exact';

    // Validate coordinates
    if (!is_numeric($latitude) || !is_numeric($longitude)) {
        throw new Exception('Invalid coordinates');
    }

    // Get database connection
    $db = getDBConnection();
    
    // Begin transaction
    $db->beginTransaction();

    // Insert art entry
    $sql = "INSERT INTO art_entries (
        user_id,
        title,
        description,
        art_type,
        time_period,
        location_name,
        latitude,
        longitude,
        location_sensitivity,
        indigenous_group,
        cultural_significance,
        artist_name,
        status,
        submitted_at
    ) VALUES (
        :user_id,
        :title,
        :description,
        :art_type,
        :time_period,
        :location_name,
        :latitude,
        :longitude,
        :location_sensitivity,
        :indigenous_group,
        :cultural_significance,
        :artist_name,
        'pending',
        NOW()
    )";

    $stmt = $db->prepare($sql);
    $stmt->execute([
        ':user_id' => $user_id,
        ':title' => $title,
        ':description' => $description,
        ':art_type' => $art_type,
        ':time_period' => $time_period,
        ':location_name' => $location_description,
        ':latitude' => $latitude,
        ':longitude' => $longitude,
        ':location_sensitivity' => $location_sensitivity,
        ':indigenous_group' => '', // Can be added to form later
        ':cultural_significance' => $condition, // Using condition field for this
        ':artist_name' => $artist_name
    ]);

    $entry_id = $db->lastInsertId();

    // Handle image uploads
    $uploaded_count = 0;
    if (!empty($_FILES)) {
        $upload_dir = '../../uploads/art/';
        
        // Create directory if it doesn't exist
        if (!file_exists($upload_dir)) {
            mkdir($upload_dir, 0777, true);
        }

        foreach ($_FILES as $key => $file_array) {
            // Handle multiple files
            if (is_array($file_array['name'])) {
                for ($i = 0; $i < count($file_array['name']); $i++) {
                    if ($file_array['error'][$i] === UPLOAD_ERR_OK) {
                        $tmp_name = $file_array['tmp_name'][$i];
                        $original_name = $file_array['name'][$i];
                        $size = $file_array['size'][$i];
                        $type = $file_array['type'][$i];
                        
                        // Validate file
                        if (!in_array($type, ['image/jpeg', 'image/png'])) {
                            continue;
                        }
                        
                        if ($size > 5 * 1024 * 1024) { // 5MB
                            continue;
                        }
                        
                        // Generate unique filename
                        $extension = pathinfo($original_name, PATHINFO_EXTENSION);
                        $filename = $entry_id . '_' . time() . '_' . $uploaded_count . '.' . $extension;
                        $filepath = $upload_dir . $filename;
                        
                        // Move uploaded file
                        if (move_uploaded_file($tmp_name, $filepath)) {
                            $uploaded_count++;
                            
                            // You can add image records to a separate images table here
                            // For now, we'll just count them
                        }
                    }
                }
            }
        }
    }

    // Log activity
    $log_sql = "INSERT INTO activity_log (user_id, type, description, created_at) 
                VALUES (:user_id, 'submission_created', :description, NOW())";
    
    $log_stmt = $db->prepare($log_sql);
    $log_stmt->execute([
        ':user_id' => $user_id,
        ':description' => "New art entry submitted: $title"
    ]);

    // Commit transaction
    $db->commit();

    // Return success
    echo json_encode([
        'success' => true,
        'message' => 'Art entry submitted successfully!',
        'entry_id' => $entry_id,
        'images_uploaded' => $uploaded_count
    ]);

} catch (Exception $e) {
    // Rollback transaction if active
    if (isset($db) && $db->inTransaction()) {
        $db->rollback();
    }
    
    // Log error
    error_log('Create entry error: ' . $e->getMessage());
    
    // Return error response
    http_response_code(400);
    echo json_encode([
        'success' => false,
        'message' => $e->getMessage()
    ]);
}
?>