<?php
/**
 * Get Admin Statistics API
 * Retrieves dashboard statistics for admin panel
 */

header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET');

require_once '../cycle3/config/database.php';

try {
    $db = getDBConnection();

    // Get pending submissions count
    $stmt = $db->query("SELECT COUNT(*) as count FROM art_entries WHERE status = 'pending'");
    $pending_submissions = $stmt->fetch(PDO::FETCH_ASSOC)['count'];

    // Get total users count
    $stmt = $db->query("SELECT COUNT(*) as count FROM users");
    $total_users = $stmt->fetch(PDO::FETCH_ASSOC)['count'];

    // Get approved entries count
    $stmt = $db->query("SELECT COUNT(*) as count FROM art_entries WHERE status = 'approved'");
    $approved_entries = $stmt->fetch(PDO::FETCH_ASSOC)['count'];

    // Get pending reports count (if table exists)
    $pending_reports = 0;
    try {
        $stmt = $db->query("SELECT COUNT(*) as count FROM content_reports WHERE status = 'pending'");
        $pending_reports = $stmt->fetch(PDO::FETCH_ASSOC)['count'];
    } catch (PDOException $e) {
        // Table might not exist yet
    }

    echo json_encode([
        'success' => true,
        'stats' => [
            'pending_submissions' => $pending_submissions,
            'total_users' => $total_users,
            'approved_entries' => $approved_entries,
            'pending_reports' => $pending_reports
        ]
    ]);

} catch (PDOException $e) {
    error_log("Get admin stats error: " . $e->getMessage());
    echo json_encode([
        'success' => false,
        'message' => 'Database error occurred'
    ]);
}
?>
