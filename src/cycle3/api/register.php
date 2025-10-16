<?php
/**
 * Register API Endpoint
 * Handles user registration with proper database schema
 */

require_once '../config/dbconn.php';

// Set JSON response header
header('Content-Type: application/json');

// Enable CORS for development
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

// Handle preflight requests
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

// Start session
session_start();

// Check if the request method is POST
if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    // Get the raw POST data
    $json_data = file_get_contents("php://input");
    $data = json_decode($json_data, true);

    // Validate the data
    if (empty($data['username']) || empty($data['email']) || empty($data['password'])) {
        http_response_code(400);
        echo json_encode([
            'success' => false,
            'message' => 'Please fill in all the required fields.'
        ]);
        exit;
    }

    // Sanitize the data
    $username = htmlspecialchars(trim($data['username']), ENT_QUOTES, 'UTF-8');
    $email = filter_var($data['email'], FILTER_SANITIZE_EMAIL);
    $password = $data['password'];

    // Map frontend role values to database enum values
    $role_mapping = [
        'general' => 'artist',  // General public maps to artist
        'artist' => 'artist',
        'researcher' => 'researcher'
    ];

    $role_input = isset($data['role']) ? $data['role'] : 'general';
    $user_role = isset($role_mapping[$role_input]) ? $role_mapping[$role_input] : 'artist';

    // Full name defaults to username if not provided
    $full_name = isset($data['full_name']) ? htmlspecialchars(trim($data['full_name']), ENT_QUOTES, 'UTF-8') : $username;

    // Validate email format
    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        http_response_code(400);
        echo json_encode([
            'success' => false,
            'message' => 'Invalid email format.'
        ]);
        exit;
    }

    // Validate password length
    if (strlen($password) < 6) {
        http_response_code(400);
        echo json_encode([
            'success' => false,
            'message' => 'Password must be at least 6 characters long.'
        ]);
        exit;
    }

    // Check if username or email already exists
    $stmt = $pdo->prepare("SELECT * FROM users WHERE username = ? OR email = ?");
    $stmt->execute([$username, $email]);
    if ($stmt->fetch()) {
        http_response_code(409);
        echo json_encode([
            'success' => false,
            'message' => 'Username or email already exists.'
        ]);
        exit;
    }

    // Hash the password
    $password_hash = password_hash($password, PASSWORD_DEFAULT);

    // Insert the new user into the database - use correct column names
    $stmt = $pdo->prepare("INSERT INTO users (username, email, password_hash, user_role, full_name) VALUES (?, ?, ?, ?, ?)");

    if ($stmt->execute([$username, $email, $password_hash, $user_role, $full_name])) {
        // Set session variables
        $user_id = $pdo->lastInsertId();
        $_SESSION['user_id'] = $user_id;
        $_SESSION['username'] = $username;
        $_SESSION['role'] = $user_role;
        $_SESSION['logged_in'] = true;

        http_response_code(201);
        echo json_encode([
            'success' => true,
            'message' => 'User registered successfully.',
            'user' => [
                'user_id' => $user_id,
                'username' => $username,
                'email' => $email,
                'role' => $user_role
            ]
        ]);
    } else {
        http_response_code(500);
        echo json_encode([
            'success' => false,
            'message' => 'Failed to register user. Please try again.'
        ]);
    }
} else {
    http_response_code(405);
    echo json_encode([
        'success' => false,
        'message' => 'Method not allowed.'
    ]);
}