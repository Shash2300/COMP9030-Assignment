<?php
/**
 * Create Art Entry API Endpoint
 *
 * Creates a new art entry via POST method.
 * Requires user authentication.
 *
 * Expected POST data:
 * - title: Art title (required)
 * - artist: Artist name (required)
 * - culture: Cultural origin (required)
 * - year_created: Year created (optional)
 * - medium: Art medium (optional)
 * - description: Description (optional)
 * - location: Location name (required)
 * - latitude: Latitude coordinate (required)
 * - longitude: Longitude coordinate (required)
 * - image_url: Image URL (optional)
 *
 * Returns JSON response with success status and new entry ID
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
header('Access-Control-Allow-Credentials: true');

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

    // Get POST data
    $data = json_decode(file_get_contents('php://input'), true);

    // Fallback to $_POST if JSON parsing fails
    if (json_last_error() !== JSON_ERROR_NONE) {
        $data = $_POST;
    }

    // Create art entry
    $result = createArtEntry($pdo, $data);

    // Set appropriate HTTP status code
    if ($result['success']) {
        http_response_code(201);
    } else {
        http_response_code(400);
    }

    echo json_encode($result);

} catch (Exception $e) {
    error_log("Create Entry API Error: " . $e->getMessage());
    http_response_code(500);
    echo json_encode([
        'success' => false,
        'message' => 'An error occurred while creating the entry.'
    ]);
}

?>
