<?php
/**
 * Login API Endpoint
 * Handles user login with proper database schema
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
    if (empty($data['username']) || empty($data['password'])) {
        http_response_code(400);
        echo json_encode([
            'success' => false,
            'message' => 'Please fill in all the required fields.'
        ]);
        exit;
    }

    // Sanitize the data
    $username = htmlspecialchars(trim($data['username']), ENT_QUOTES, 'UTF-8');
    $password = $data['password'];

    // Check if the user exists - use correct column name user_role
    $stmt = $pdo->prepare("SELECT user_id, username, email, password_hash, user_role, full_name FROM users WHERE username = ? OR email = ?");
    $stmt->execute([$username, $username]);
    $user = $stmt->fetch();

    if ($user && password_verify($password, $user['password_hash'])) {
        // Set session variables
        $_SESSION['user_id'] = $user['user_id'];
        $_SESSION['username'] = $user['username'];
        $_SESSION['email'] = $user['email'];
        $_SESSION['role'] = $user['user_role'];
        $_SESSION['logged_in'] = true;

        // Update last login time
        $stmt = $pdo->prepare("UPDATE users SET last_login = CURRENT_TIMESTAMP WHERE user_id = ?");
        $stmt->execute([$user['user_id']]);

        http_response_code(200);
        echo json_encode([
            'success' => true,
            'message' => 'Login successful.',
            'user' => [
                'user_id' => $user['user_id'],
                'username' => $user['username'],
                'email' => $user['email'],
                'role' => $user['user_role']
            ]
        ]);
    } else {
        http_response_code(401);
        echo json_encode([
            'success' => false,
            'message' => 'Invalid credentials.'
        ]);
    }
} else {
    http_response_code(405);
    echo json_encode([
        'success' => false,
        'message' => 'Method not allowed.'
    ]);
}