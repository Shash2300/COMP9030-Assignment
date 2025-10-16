<?php
/**
 * Delete User API
 * Deletes a user and all their submissions
 */

header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Content-Type');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

require_once '../cycle3/config/database.php';

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    echo json_encode(['success' => false, 'message' => 'Method not allowed']);
    exit;
}

$input = json_decode(file_get_contents('php://input'), true);
$user_id = $input['user_id'] ?? null;

if (!$user_id) {
    echo json_encode(['success' => false, 'message' => 'User ID required']);
    exit;
}

try {
    $db = getDBConnection();

    // Start transaction
    $db->beginTransaction();

    // Delete user's art entries
    $stmt = $db->prepare("DELETE FROM art_entries WHERE user_id = ?");
    $stmt->execute([$user_id]);

    // Delete user profile if exists
    try {
        $stmt = $db->prepare("DELETE FROM user_profiles WHERE user_id = ?");
        $stmt->execute([$user_id]);
    } catch (PDOException $e) {
        // Table might not exist
    }

    // Delete user
    $stmt = $db->prepare("DELETE FROM users WHERE user_id = ?");
    $stmt->execute([$user_id]);

    $db->commit();

    echo json_encode([
        'success' => true,
        'message' => 'User deleted successfully'
    ]);

} catch (PDOException $e) {
    if ($db->inTransaction()) {
        $db->rollBack();
    }
    error_log("Delete user error: " . $e->getMessage());
    echo json_encode([
        'success' => false,
        'message' => 'Database error occurred'
    ]);
}
?>
