<?php
/**
 * Get User Profile API
 * Retrieves user profile information
 */

header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET');
header('Access-Control-Allow-Headers: Content-Type');

require_once '../cycle3/config/database.php';

if ($_SERVER['REQUEST_METHOD'] !== 'GET') {
    echo json_encode(['success' => false, 'message' => 'Method not allowed']);
    exit;
}

$user_id = $_GET['user_id'] ?? null;

if (!$user_id) {
    echo json_encode(['success' => false, 'message' => 'User ID required']);
    exit;
}

try {
    $db = getDBConnection();

    // Get user profile
    $stmt = $db->prepare("
        SELECT p.*, u.username, u.email, u.created_at
        FROM user_profiles p
        RIGHT JOIN users u ON p.user_id = u.user_id
        WHERE u.user_id = ?
    ");
    $stmt->execute([$user_id]);
    $profile = $stmt->fetch(PDO::FETCH_ASSOC);

    if (!$profile) {
        // Return empty profile if user exists but no profile yet
        $stmt = $db->prepare("SELECT user_id, username, email, created_at FROM users WHERE user_id = ?");
        $stmt->execute([$user_id]);
        $user = $stmt->fetch(PDO::FETCH_ASSOC);

        if ($user) {
            echo json_encode([
                'success' => true,
                'profile' => array_merge($user, [
                    'display_name' => $user['username'],
                    'bio' => '',
                    'location' => '',
                    'show_contact' => '0'
                ])
            ]);
        } else {
            echo json_encode(['success' => false, 'message' => 'User not found']);
        }
        exit;
    }

    echo json_encode([
        'success' => true,
        'profile' => $profile
    ]);

} catch (PDOException $e) {
    error_log("Get profile error: " . $e->getMessage());
    echo json_encode([
        'success' => false,
        'message' => 'Database error occurred'
    ]);
}
?>
