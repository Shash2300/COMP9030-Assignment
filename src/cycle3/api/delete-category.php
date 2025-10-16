<?php
/**
 * Delete Category API
 * Deletes an art type or period
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

$type = $input['type'] ?? null; // 'type' or 'period'
$id = $input['id'] ?? null;

if (!$type || !$id) {
    echo json_encode(['success' => false, 'message' => 'Type and ID required']);
    exit;
}

try {
    $db = $pdo;

    // Check if category is in use
    if ($type === 'type') {
        // Get the type_code first
        $stmt = $db->prepare("SELECT type_code FROM art_types WHERE type_id = ?");
        $stmt->execute([$id]);
        $category = $stmt->fetch(PDO::FETCH_ASSOC);

        if (!$category) {
            echo json_encode(['success' => false, 'message' => 'Category not found']);
            exit;
        }

        // Check usage
        $stmt = $db->prepare("SELECT COUNT(*) as count FROM art_entries WHERE art_type = ?");
        $stmt->execute([$category['type_code']]);
        $usage = $stmt->fetch(PDO::FETCH_ASSOC)['count'];

        if ($usage > 0) {
            echo json_encode([
                'success' => false,
                'message' => "Cannot delete: This art type is used by {$usage} entries"
            ]);
            exit;
        }

        // Delete art type
        $stmt = $db->prepare("DELETE FROM art_types WHERE type_id = ?");
        $stmt->execute([$id]);

    } elseif ($type === 'period') {
        // Get the period_code first
        $stmt = $db->prepare("SELECT period_code FROM art_periods WHERE period_id = ?");
        $stmt->execute([$id]);
        $category = $stmt->fetch(PDO::FETCH_ASSOC);

        if (!$category) {
            echo json_encode(['success' => false, 'message' => 'Category not found']);
            exit;
        }

        // Check usage
        $stmt = $db->prepare("SELECT COUNT(*) as count FROM art_entries WHERE time_period = ?");
        $stmt->execute([$category['period_code']]);
        $usage = $stmt->fetch(PDO::FETCH_ASSOC)['count'];

        if ($usage > 0) {
            echo json_encode([
                'success' => false,
                'message' => "Cannot delete: This time period is used by {$usage} entries"
            ]);
            exit;
        }

        // Delete art period
        $stmt = $db->prepare("DELETE FROM art_periods WHERE period_id = ?");
        $stmt->execute([$id]);

    } else {
        echo json_encode(['success' => false, 'message' => 'Invalid category type']);
        exit;
    }

    if ($stmt->rowCount() === 0) {
        echo json_encode(['success' => false, 'message' => 'Category not found']);
        exit;
    }

    echo json_encode([
        'success' => true,
        'message' => 'Category deleted successfully'
    ]);

} catch (PDOException $e) {
    error_log("Delete category error: " . $e->getMessage());
    echo json_encode(['success' => false, 'message' => 'Database error occurred']);
}
?>
