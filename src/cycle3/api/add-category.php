<?php
/**
 * Add Category API
 * Adds a new art type or period
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
$name = $input['name'] ?? null;
$description = $input['description'] ?? '';
$date_range = $input['date_range'] ?? null;

if (!$type || !$name) {
    echo json_encode(['success' => false, 'message' => 'Type and name required']);
    exit;
}

try {
    $db = $pdo;

    // Generate unique code from name
    $code = strtolower(str_replace(' ', '_', preg_replace('/[^A-Za-z0-9 ]/', '', $name)));

    if ($type === 'type') {
        // Add art type
        $stmt = $db->prepare("
            INSERT INTO art_types (type_code, type_name, description, is_active, sort_order)
            VALUES (?, ?, ?, 1, (SELECT IFNULL(MAX(sort_order), 0) + 1 FROM art_types AS at))
        ");
        $stmt->execute([$code, $name, $description]);

    } elseif ($type === 'period') {
        // Add art period
        $stmt = $db->prepare("
            INSERT INTO art_periods (period_code, period_name, description, date_range, is_active, sort_order)
            VALUES (?, ?, ?, ?, 1, (SELECT IFNULL(MAX(sort_order), 0) + 1 FROM art_periods AS ap))
        ");
        $stmt->execute([$code, $name, $description, $date_range]);

    } else {
        echo json_encode(['success' => false, 'message' => 'Invalid category type']);
        exit;
    }

    echo json_encode([
        'success' => true,
        'message' => 'Category added successfully',
        'id' => $db->lastInsertId(),
        'code' => $code
    ]);

} catch (PDOException $e) {
    error_log("Add category error: " . $e->getMessage());

    // Check for duplicate entry
    if ($e->getCode() == 23000) {
        echo json_encode(['success' => false, 'message' => 'A category with this code already exists']);
    } else {
        echo json_encode(['success' => false, 'message' => 'Database error occurred']);
    }
}
?>
