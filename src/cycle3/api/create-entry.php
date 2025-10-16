<?php
require_once '../config/dbconn.php';

// Start session
session_start();

// Check if the user is logged in
if (!isset($_SESSION['user_id'])) {
    http_response_code(401);
    echo json_encode(['message' => 'You must be logged in to create an entry.']);
    exit;
}

// Check if the request method is POST
if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    // Get the form data
    $title = $_POST['title'];
    $description = $_POST['description'];
    $art_type_id = $_POST['art_type'];
    $art_period_id = $_POST['art_period'];
    $condition_notes = $_POST['condition'];
    $artist_name = $_POST['artist_name'];
    $latitude = $_POST['latitude'];
    $longitude = $_POST['longitude'];
    $location_description = $_POST['location_description'];
    $location_sensitive = isset($_POST['culturally_sensitive']) ? 1 : 0;
    $submitter_id = $_SESSION['user_id'];

    // Validate the data
    if (empty($title) || empty($description) || empty($art_type_id) || empty($art_period_id) || empty($latitude) || empty($longitude)) {
        http_response_code(400);
        echo json_encode(['message' => 'Please fill in all the required fields.']);
        exit;
    }

    // Insert the new art entry into the database
    $stmt = $pdo->prepare("INSERT INTO art_entries (title, description, art_type_id, art_period_id, condition_notes, artist_name, latitude, longitude, location_description, location_sensitive, submitter_id) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)");
    if ($stmt->execute([$title, $description, $art_type_id, $art_period_id, $condition_notes, $artist_name, $latitude, $longitude, $location_description, $location_sensitive, $submitter_id])) {
        $art_id = $pdo->lastInsertId();

        // Handle image uploads
        if (isset($_FILES['images'])) {
            $upload_dir = '../../uploads/art-images/';
            if (!is_dir($upload_dir)) {
                mkdir($upload_dir, 0777, true);
            }

            foreach ($_FILES['images']['tmp_name'] as $key => $tmp_name) {
                $file_name = uniqid() . '-' . $_FILES['images']['name'][$key];
                $file_path = $upload_dir . $file_name;

                if (move_uploaded_file($tmp_name, $file_path)) {
                    // Insert the image path into the database
                    $stmt = $pdo->prepare("INSERT INTO art_images (art_id, image_path) VALUES (?, ?)");
                    $stmt->execute([$art_id, $file_path]);
                }
            }
        }

        http_response_code(201);
        echo json_encode(['message' => 'Art entry created successfully.', 'art_id' => $art_id]);
    } else {
        http_response_code(500);
        echo json_encode(['message' => 'Failed to create art entry.']);
    }
} else {
    http_response_code(405);
    echo json_encode(['message' => 'Method not allowed.']);
}