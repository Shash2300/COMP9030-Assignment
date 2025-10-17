<?php
/**
 * Get Art Entries API Endpoint
 *
 * Retrieves all art entries with optional filters via GET method.
 *
 * Optional GET parameters:
 * - status: Filter by status (approved, pending, rejected)
 * - culture: Filter by culture
 * - user_id: Filter by user ID (submitted by)
 *
 * Returns JSON response with array of art entries
 *
 * AI Acknowledgment: API structure and filtering logic
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
    // Build filters from query parameters
    $filters = [];

    if (isset($_GET['status'])) {
        $filters['status'] = $_GET['status'];
    }

    if (isset($_GET['culture'])) {
        $filters['culture'] = $_GET['culture'];
    }

    if (isset($_GET['user_id'])) {
        $filters['user_id'] = (int)$_GET['user_id'];
    }

    // Get art entries
    $result = getArtEntries($pdo, $filters);

    // Set appropriate HTTP status code
    if ($result['success']) {
        http_response_code(200);
    } else {
        http_response_code(500);
    }

    echo json_encode($result);

} catch (Exception $e) {
    error_log("Get Entries API Error: " . $e->getMessage());
    http_response_code(500);
    echo json_encode([
        'success' => false,
        'message' => 'An error occurred while retrieving entries.',
        'entries' => []
    ]);
}

?>
