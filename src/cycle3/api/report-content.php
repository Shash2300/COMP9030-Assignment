<?php
/**
 * Report Content API
 * Handles user-submitted content reports
 */

header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Content-Type');

// Handle preflight requests
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

require_once '../cycle3/config/database.php';

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    echo json_encode(['success' => false, 'message' => 'Method not allowed']);
    exit;
}

// Get POST data
$input = json_decode(file_get_contents('php://input'), true);

$entry_id = $input['entry_id'] ?? null;
$user_id = $input['user_id'] ?? null;
$reason = $input['reason'] ?? '';
$details = $input['details'] ?? '';

if (!$entry_id || !$user_id || !$reason || !$details) {
    echo json_encode(['success' => false, 'message' => 'Missing required fields']);
    exit;
}

try {
    $db = getDBConnection();

    // Check if entry exists
    $stmt = $db->prepare("SELECT entry_id FROM art_entries WHERE entry_id = ?");
    $stmt->execute([$entry_id]);

    if (!$stmt->fetch()) {
        echo json_encode(['success' => false, 'message' => 'Entry not found']);
        exit;
    }

    // Insert report
    $stmt = $db->prepare("
        INSERT INTO content_reports (entry_id, reporter_user_id, reason, details, status, created_at)
        VALUES (?, ?, ?, ?, 'pending', NOW())
    ");

    $stmt->execute([$entry_id, $user_id, $reason, $details]);

    echo json_encode([
        'success' => true,
        'message' => 'Report submitted successfully'
    ]);

} catch (PDOException $e) {
    error_log("Report content error: " . $e->getMessage());
    echo json_encode([
        'success' => false,
        'message' => 'Database error occurred'
    ]);
}
?>
