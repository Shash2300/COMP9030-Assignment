<?php
/**
 * Update User Role API
 * Updates user role/type and status
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
$user_type = $input['user_type'] ?? null;
$status = $input['status'] ?? null;

if (!$user_id) {
    echo json_encode(['success' => false, 'message' => 'User ID required']);
    exit;
}

try {
    $db = getDBConnection();

    $updates = [];
    $params = [];

    if ($user_type !== null) {
        $updates[] = "user_type = ?";
        $params[] = $user_type;
    }

    if ($status !== null) {
        $updates[] = "status = ?";
        $params[] = $status;
    }

    if (empty($updates)) {
        echo json_encode(['success' => false, 'message' => 'No updates specified']);
        exit;
    }

    $params[] = $user_id;

    $sql = "UPDATE users SET " . implode(', ', $updates) . " WHERE user_id = ?";
    $stmt = $db->prepare($sql);
    $stmt->execute($params);

    echo json_encode([
        'success' => true,
        'message' => 'User updated successfully'
    ]);

} catch (PDOException $e) {
    error_log("Update user role error: " . $e->getMessage());
    echo json_encode([
        'success' => false,
        'message' => 'Database error occurred'
    ]);
}
?>
