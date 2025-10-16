<?php
/**
 * Admin Login API
 * Handles administrator authentication
 */

header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Content-Type');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

require_once '../config/dbconn.php';

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    echo json_encode(['success' => false, 'message' => 'Method not allowed']);
    exit;
}

$input = json_decode(file_get_contents('php://input'), true);

$email = $input['email'] ?? '';
$password = $input['password'] ?? '';

if (empty($email) || empty($password)) {
    echo json_encode(['success' => false, 'message' => 'Email and password required']);
    exit;
}

try {
    $db = getDBConnection();

    // Get user by email and check if admin
    $stmt = $db->prepare("SELECT * FROM users WHERE email = ? AND (user_type = 'admin' OR user_role = 'admin')");
    $stmt->execute([$email]);
    $user = $stmt->fetch(PDO::FETCH_ASSOC);

    if (!$user) {
        echo json_encode(['success' => false, 'message' => 'Invalid admin credentials']);
        exit;
    }

    // Verify password
    if (password_verify($password, $user['password_hash'])) {
        // Remove sensitive data
        unset($user['password_hash']);

        echo json_encode([
            'success' => true,
            'message' => 'Admin login successful',
            'admin' => $user
        ]);
    } else {
        echo json_encode(['success' => false, 'message' => 'Invalid admin credentials']);
    }

} catch (PDOException $e) {
    error_log("Admin login error: " . $e->getMessage());
    echo json_encode([
        'success' => false,
        'message' => 'Database error occurred'
    ]);
}
?>
