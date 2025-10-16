<?php
/**
 * Update User Profile API
 * Updates user profile information
 */

header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Content-Type');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

require_once '../cycle3/config/database.php';

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    echo json_encode(['success' => false, 'message' => 'Method not allowed']);
    exit;
}

$input = json_decode(file_get_contents('php://input'), true);

$user_id = $input['user_id'] ?? null;
$display_name = $input['display_name'] ?? '';
$bio = $input['bio'] ?? '';
$location = $input['location'] ?? '';
$email = $input['email'] ?? '';
$website = $input['website'] ?? '';
$social_media = $input['social_media'] ?? '';
$show_contact = $input['show_contact'] ?? '0';

if (!$user_id) {
    echo json_encode(['success' => false, 'message' => 'User ID required']);
    exit;
}

try {
    $db = getDBConnection();

    // Check if profile exists
    $stmt = $db->prepare("SELECT profile_id FROM user_profiles WHERE user_id = ?");
    $stmt->execute([$user_id]);
    $exists = $stmt->fetch();

    if ($exists) {
        // Update existing profile
        $stmt = $db->prepare("
            UPDATE user_profiles
            SET display_name = ?, bio = ?, location = ?, email = ?, website = ?, social_media = ?, show_contact = ?, updated_at = NOW()
            WHERE user_id = ?
        ");
        $stmt->execute([$display_name, $bio, $location, $email, $website, $social_media, $show_contact, $user_id]);
    } else {
        // Create new profile
        $stmt = $db->prepare("
            INSERT INTO user_profiles (user_id, display_name, bio, location, email, website, social_media, show_contact, updated_at)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, NOW())
        ");
        $stmt->execute([$user_id, $display_name, $bio, $location, $email, $website, $social_media, $show_contact]);
    }

    echo json_encode([
        'success' => true,
        'message' => 'Profile updated successfully'
    ]);

} catch (PDOException $e) {
    error_log("Update profile error: " . $e->getMessage());
    echo json_encode([
        'success' => false,
        'message' => 'Database error occurred'
    ]);
}
?>
