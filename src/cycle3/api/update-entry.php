<?php
/**
 * Update Art Entry API Endpoint
 *
 * Updates an existing art entry via PUT/POST method.
 * Requires user authentication and ownership or admin privileges.
 *
 * Expected POST/PUT data:
 * - id: Entry ID (required)
 * - title: Updated title (optional)
 * - artist: Updated artist (optional)
 * - culture: Updated culture (optional)
 * - year_created: Updated year (optional)
 * - medium: Updated medium (optional)
 * - description: Updated description (optional)
 * - location: Updated location (optional)
 * - latitude: Updated latitude (optional)
 * - longitude: Updated longitude (optional)
 * - image_url: Updated image URL (optional)
 *
 * Returns JSON response with success status
 *
 * AI Acknowledgment: API structure and update logic
 * developed with assistance from Claude AI (Anthropic)
 *
 */

// Set JSON response header
header('Content-Type: application/json');

// Enable CORS for development (adjust for production)
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: PUT, POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');
header('Access-Control-Allow-Credentials: true');

// Handle preflight requests
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

// Accept both PUT and POST requests
if ($_SERVER['REQUEST_METHOD'] !== 'PUT' && $_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode([
        'success' => false,
        'message' => 'Method not allowed. Use PUT or POST.'
    ]);
    exit();
}

require_once __DIR__ . '/../config/dbconn.php';
require_once __DIR__ . '/../includes/auth.php';
require_once __DIR__ . '/../includes/art_crud.php';

try {
    // Check if user is logged in
    if (!isLoggedIn()) {
        http_response_code(401);
        echo json_encode([
            'success' => false,
            'message' => 'Authentication required.'
        ]);
        exit();
    }

    // Get request data
    $data = json_decode(file_get_contents('php://input'), true);

    // Fallback to $_POST if JSON parsing fails
    if (json_last_error() !== JSON_ERROR_NONE) {
        $data = $_POST;
    }

    // Validate entry ID
    if (!isset($data['id']) || !is_numeric($data['id'])) {
        http_response_code(400);
        echo json_encode([
            'success' => false,
            'message' => 'Valid entry ID is required.'
        ]);
        exit();
    }

    $entryId = (int)$data['id'];

    // Update art entry
    $result = updateArtEntry($pdo, $entryId, $data);

    // Set appropriate HTTP status code
    if ($result['success']) {
        http_response_code(200);
    } else {
        http_response_code(400);
    }

    echo json_encode($result);

} catch (Exception $e) {
    error_log("Update Entry API Error: " . $e->getMessage());
    http_response_code(500);
    echo json_encode([
        'success' => false,
        'message' => 'An error occurred while updating the entry.'
    ]);
}

?>
