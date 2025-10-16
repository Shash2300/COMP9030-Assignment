<?php
/**
 * Get Recent Activity API
 * Retrieves recent system activity for admin dashboard
 */

header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET');

require_once '../cycle3/config/database.php';

$limit = $_GET['limit'] ?? 10;

try {
    $db = getDBConnection();

    // Get recent activities (if table exists)
    try {
        $stmt = $db->prepare("
            SELECT a.*, u.username
            FROM activity_log a
            LEFT JOIN users u ON a.user_id = u.user_id
            ORDER BY a.created_at DESC
            LIMIT ?
        ");
        $stmt->execute([$limit]);
        $activities = $stmt->fetchAll(PDO::FETCH_ASSOC);

        echo json_encode([
            'success' => true,
            'activities' => $activities
        ]);
    } catch (PDOException $e) {
        // Activity log table might not exist, return recent submissions instead
        $stmt = $db->prepare("
            SELECT
                entry_id as id,
                'submission' as type,
                CONCAT('New submission: ', title) as description,
                submitted_at as created_at,
                (SELECT username FROM users WHERE user_id = art_entries.user_id) as username
            FROM art_entries
            ORDER BY submitted_at DESC
            LIMIT ?
        ");
        $stmt->execute([$limit]);
        $activities = $stmt->fetchAll(PDO::FETCH_ASSOC);

        echo json_encode([
            'success' => true,
            'activities' => $activities
        ]);
    }

} catch (PDOException $e) {
    error_log("Get recent activity error: " . $e->getMessage());
    echo json_encode([
        'success' => false,
        'message' => 'Database error occurred',
        'activities' => []
    ]);
}
?>
