<?php
/**
 * Get Users API
 * Retrieves all users for admin management
 */

header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET');

require_once '../cycle3/config/database.php';

try {
    $db = getDBConnection();

    // Get all users with submission counts
    $stmt = $db->query("
        SELECT
            u.user_id,
            u.username,
            u.email,
            u.user_type,
            u.role,
            u.created_at,
            u.status,
            COUNT(e.entry_id) as submission_count
        FROM users u
        LEFT JOIN art_entries e ON u.user_id = e.user_id
        GROUP BY u.user_id
        ORDER BY u.created_at DESC
    ");

    $users = $stmt->fetchAll(PDO::FETCH_ASSOC);

    // Normalize user_type field
    foreach ($users as &$user) {
        if (empty($user['user_type']) && !empty($user['role'])) {
            $user['user_type'] = $user['role'];
        }
        if (empty($user['status'])) {
            $user['status'] = 'active';
        }
    }

    echo json_encode([
        'success' => true,
        'users' => $users
    ]);

} catch (PDOException $e) {
    error_log("Get users error: " . $e->getMessage());
    echo json_encode([
        'success' => false,
        'message' => 'Database error occurred'
    ]);
}
?>
