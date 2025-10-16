<?php
/**
 * Get Categories API
 * Retrieves art types and periods with usage counts
 */

header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET');

require_once '../config/dbconn.php';

try {
    $db = $pdo;

    // Get art types from database with usage counts
    $stmt = $db->query("
        SELECT
            type_id as id,
            type_code,
            type_name as name,
            description,
            is_active,
            sort_order,
            (SELECT COUNT(*) FROM art_entries WHERE art_type = type_code) as usage_count
        FROM art_types
        WHERE is_active = 1
        ORDER BY sort_order, type_name
    ");
    $art_types = $stmt->fetchAll(PDO::FETCH_ASSOC);

    // Get art periods from database with usage counts
    $stmt = $db->query("
        SELECT
            period_id as id,
            period_code,
            period_name as name,
            description,
            date_range,
            is_active,
            sort_order,
            (SELECT COUNT(*) FROM art_entries WHERE time_period = period_code) as usage_count
        FROM art_periods
        WHERE is_active = 1
        ORDER BY sort_order, period_name
    ");
    $art_periods = $stmt->fetchAll(PDO::FETCH_ASSOC);

    echo json_encode([
        'success' => true,
        'art_types' => $art_types,
        'art_periods' => $art_periods
    ]);

} catch (PDOException $e) {
    error_log("Get categories error: " . $e->getMessage());
    echo json_encode([
        'success' => false,
        'message' => 'Database error occurred'
    ]);
}
?>
