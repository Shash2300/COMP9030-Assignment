<?php
/**
 * Get Single Art Entry API Endpoint
 *
 * Retrieves a single art entry by ID via GET method.
 *
 * Required GET parameter:
 * - id: Entry ID
 *
 * Returns JSON response with art entry data
 *
 * AI Acknowledgment: API structure and data retrieval
 * developed with assistance from Claude AI (Anthropic)
 *
 */

// Set JSON response header
header('Content-Type: application/json');

// Enable CORS for development (adjust for production)
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

// Handle preflight requests
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

// Only accept GET requests
if ($_SERVER['REQUEST_METHOD'] !== 'GET') {
    http_response_code(405);
    echo json_encode([
        'success' => false,
        'message' => 'Method not allowed. Use GET.'
    ]);
    exit();
}

require_once __DIR__ . '/../config/dbconn.php';
require_once __DIR__ . '/../includes/auth.php';
require_once __DIR__ . '/../includes/art_crud.php';

try {
    // Validate entry ID
    if (!isset($_GET['id']) || !is_numeric($_GET['id'])) {
        http_response_code(400);
        echo json_encode([
            'success' => false,
            'message' => 'Valid entry ID is required.'
        ]);
        exit();
    }

    $entryId = (int)$_GET['id'];

    // Get art entry
    $result = getArtEntry($pdo, $entryId);

    // Set appropriate HTTP status code
    if ($result['success']) {
        http_response_code(200);
    } else {
        http_response_code(404);
    }

    echo json_encode($result);

} catch (Exception $e) {
    error_log("Get Entry API Error: " . $e->getMessage());
    http_response_code(500);
    echo json_encode([
        'success' => false,
        'message' => 'An error occurred while retrieving the entry.'
    ]);
}

?>
