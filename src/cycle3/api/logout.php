<?php
/**
 * Logout API Endpoint
 *
 * Handles user logout requests via POST method.
 * Destroys the current session and returns success status.
 *
 * Returns JSON response with success status
 *
 * AI Acknowledgment: API structure and session management
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
header('Access-Control-Allow-Credentials: true');

// Handle preflight requests
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

// Accept both POST and GET for logout (GET for convenience)
if ($_SERVER['REQUEST_METHOD'] !== 'POST' && $_SERVER['REQUEST_METHOD'] !== 'GET') {
    http_response_code(405);
    echo json_encode([
        'success' => false,
        'message' => 'Method not allowed. Use POST or GET.'
    ]);
    exit();
}

require_once __DIR__ . '/../includes/auth.php';

try {
    // Perform logout
    $result = logoutUser();

    http_response_code(200);
    echo json_encode($result);

} catch (Exception $e) {
    error_log("Logout API Error: " . $e->getMessage());
    http_response_code(500);
    echo json_encode([
        'success' => false,
        'message' => 'An error occurred during logout.'
    ]);
}

?>
