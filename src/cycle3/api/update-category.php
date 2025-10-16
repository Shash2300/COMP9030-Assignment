<?php
/**
 * Update Category API
 * Updates an existing art type or period
 */

header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Content-Type');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    echo json_encode(['success' => false, 'message' => 'Method not allowed']);
    exit;
}

require_once '../config/dbconn.php';

$input = json_decode(file_get_contents('php://input'), true);

$id = $input['id'] ?? null;
$type = $input['type'] ?? null; // 'type' or 'period'
$name = $input['name'] ?? null;
$description = $input['description'] ?? '';
$date_range = $input['date_range'] ?? null;

if (!$id || !$type || !$name) {
    echo json_encode(['success' => false, 'message' => 'ID, type, and name required']);
    exit;
}

try {
    $db = $pdo;

    if ($type === 'type') {
        // Update art type
        $stmt = $db->prepare("
            UPDATE art_types
            SET type_name = ?, description = ?
            WHERE type_id = ?
        ");
        $stmt->execute([$name, $description, $id]);

    } elseif ($type === 'period') {
        // Update art period
        $stmt = $db->prepare("
            UPDATE art_periods
            SET period_name = ?, description = ?, date_range = ?
            WHERE period_id = ?
        ");
        $stmt->execute([$name, $description, $date_range, $id]);

    } else {
        echo json_encode(['success' => false, 'message' => 'Invalid category type']);
        exit;
    }

    if ($stmt->rowCount() === 0) {
        echo json_encode(['success' => false, 'message' => 'Category not found or no changes made']);
        exit;
    }

    echo json_encode([
        'success' => true,
        'message' => 'Category updated successfully'
    ]);

} catch (PDOException $e) {
    error_log("Update category error: " . $e->getMessage());
    echo json_encode(['success' => false, 'message' => 'Database error occurred']);
}
?>
