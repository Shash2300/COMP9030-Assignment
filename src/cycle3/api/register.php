<?php
/**
 * Register API Endpoint
 *
 * Handles user registration requests via POST method.
 *
 * Expected POST data:
 * - username: Desired username (3-50 characters)
 * - email: Valid email address
 * - password: Password (minimum 6 characters)
 * - role: Optional role (default: 'user')
 *
 * Returns JSON response with success status and message
 *
 * AI Acknowledgment: API structure and validation logic
 * developed with assistance from Claude AI (Anthropic)
 *
 * @package IndigenousArtAtlas
 * @author Shishir Saurav
 * @version 1.0
 */

// Set JSON response header
header('Content-Type: application/json');

// Enable CORS for development (adjust for production)
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

// Handle preflight requests
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

// Only accept POST requests
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode([
        'success' => false,
        'message' => 'Method not allowed. Use POST.'
    ]);
    exit();
}

require_once __DIR__ . '/../config/dbconn.php';
require_once __DIR__ . '/../includes/auth.php';

try {
    // Get POST data
    $data = json_decode(file_get_contents('php://input'), true);

    // Fallback to $_POST if JSON parsing fails
    if (json_last_error() !== JSON_ERROR_NONE) {
        $data = $_POST;
    }

    // Validate required fields
    if (empty($data['username']) || empty($data['email']) || empty($data['password'])) {
        http_response_code(400);
        echo json_encode([
            'success' => false,
            'message' => 'Username, email, and password are required.'
        ]);
        exit();
    }

    // Get role (default to 'user')
    $role = isset($data['role']) ? $data['role'] : 'user';

    // Attempt registration
    $result = registerUser($pdo, $data['username'], $data['email'], $data['password'], $role);

    // Set appropriate HTTP status code
    if ($result['success']) {
        http_response_code(201);
    } else {
        http_response_code(400);
    }

    echo json_encode($result);

} catch (Exception $e) {
    error_log("Register API Error: " . $e->getMessage());
    http_response_code(500);
    echo json_encode([
        'success' => false,
        'message' => 'An error occurred during registration.'
    ]);
}

?>
