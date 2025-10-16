<?php
/**
 * Art Entries CRUD Operations - FIXED FOR CORRECT SCHEMA
 *
 * @package IndigenousArtAtlas
 * @author Shishir Saurav (Updated to match schema)
 * @version 2.0
 */

require_once __DIR__ . '/../config/dbconn.php';
require_once __DIR__ . '/auth.php';

/**
 * Create a new art entry - FIXED to match actual database schema
 *
 * @param PDO $pdo Database connection
 * @param array $data Art entry data
 * @return array Response with success status and message
 */
function createArtEntry($pdo, $data) {
    try {
        // Map form field names to database column names
        $title = $data['title'] ?? '';
        $description = $data['description'] ?? '';
        $artType = $data['art_type'] ?? $data['artType'] ?? 'other';
        $timePeriod = $data['time_period'] ?? $data['period'] ?? 'contemporary';
        $locationName = $data['location_name'] ?? $data['location_description'] ?? $data['location'] ?? '';
        $latitude = $data['latitude'] ?? '';
        $longitude = $data['longitude'] ?? '';
        $artistName = $data['artist_name'] ?? $data['artistName'] ?? $data['artist'] ?? 'Unknown';
        $indigenousGroup = $data['indigenous_group'] ?? $data['indigenousGroup'] ?? $data['culture'] ?? '';
        $culturalSignificance = $data['cultural_significance'] ?? $data['culturalSignificance'] ?? '';
        
        // Handle location sensitivity
        $isSensitive = isset($data['culturally_sensitive']) && $data['culturally_sensitive'];
        $locationSensitivity = $isSensitive ? 'hidden' : 'exact';

        // Validate required fields
        if (empty($title)) {
            return ['success' => false, 'message' => "Title is required."];
        }
        if (empty($description)) {
            return ['success' => false, 'message' => "Description is required."];
        }
        if (empty($locationName)) {
            return ['success' => false, 'message' => "Location is required."];
        }
        if (empty($latitude) || empty($longitude)) {
            return ['success' => false, 'message' => "Location coordinates are required."];
        }

        // Validate coordinates
        if (!is_numeric($latitude) || !is_numeric($longitude)) {
            return ['success' => false, 'message' => 'Invalid coordinates.'];
        }

        if ($latitude < -90 || $latitude > 90) {
            return ['success' => false, 'message' => 'Latitude must be between -90 and 90.'];
        }

        if ($longitude < -180 || $longitude > 180) {
            return ['success' => false, 'message' => 'Longitude must be between -180 and 180.'];
        }

        // Get user ID
        $userId = getCurrentUserId();
        if (!$userId) {
            return ['success' => false, 'message' => 'User not authenticated.'];
        }

        // Sanitize data
        $title = htmlspecialchars(trim($title), ENT_QUOTES, 'UTF-8');
        $description = htmlspecialchars(trim($description), ENT_QUOTES, 'UTF-8');
        $locationName = htmlspecialchars(trim($locationName), ENT_QUOTES, 'UTF-8');
        $artistName = htmlspecialchars(trim($artistName), ENT_QUOTES, 'UTF-8');
        $indigenousGroup = htmlspecialchars(trim($indigenousGroup), ENT_QUOTES, 'UTF-8');
        $culturalSignificance = htmlspecialchars(trim($culturalSignificance), ENT_QUOTES, 'UTF-8');
        
        // Convert art_type to match ENUM values
        $artType = strtolower(str_replace([' ', '-'], '_', $artType));
        $validArtTypes = ['rock_art', 'bark_painting', 'contemporary', 'sculpture', 'ceremonial', 'other'];
        if (!in_array($artType, $validArtTypes)) {
            $artType = 'other';
        }
        
        // Convert time_period to match ENUM values
        $timePeriod = strtolower($timePeriod);
        $validPeriods = ['ancient', 'historical', 'contemporary'];
        if (!in_array($timePeriod, $validPeriods)) {
            $timePeriod = 'contemporary';
        }
        
        $latitude = (float)$latitude;
        $longitude = (float)$longitude;
        
        // Set status (admin submissions auto-approved)
        $status = isAdmin() ? 'approved' : 'pending';

        // Insert art entry using ACTUAL database schema
        $stmt = $pdo->prepare(
            "INSERT INTO art_entries
            (user_id, title, description, art_type, time_period, location_name,
             latitude, longitude, location_sensitivity, indigenous_group,
             cultural_significance, artist_name, status, submitted_at)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, NOW())"
        );

        $stmt->execute([
            $userId, $title, $description, $artType, $timePeriod, $locationName,
            $latitude, $longitude, $locationSensitivity, $indigenousGroup,
            $culturalSignificance, $artistName, $status
        ]);

        $entryId = $pdo->lastInsertId();

        return [
            'success' => true,
            'message' => 'Art entry created successfully!',
            'entry_id' => $entryId,
            'status' => $status
        ];

    } catch (PDOException $e) {
        error_log("Create Art Entry Error: " . $e->getMessage());
        return [
            'success' => false,
            'message' => 'Database error: ' . $e->getMessage()
        ];
    }
}

/**
 * Get all art entries with optional filters - FIXED
 *
 * @param PDO $pdo Database connection
 * @param array $filters Optional filters (status, art_type, user_id)
 * @return array Response with success status and entries
 */
function getArtEntries($pdo, $filters = []) {
    try {
        // Base query using actual schema
        $query = "SELECT ae.*, u.username as submitted_by_username
                  FROM art_entries ae
                  LEFT JOIN users u ON ae.user_id = u.user_id
                  WHERE 1=1";

        $params = [];

        // Apply filters
        if (isset($filters['status'])) {
            $query .= " AND ae.status = ?";
            $params[] = $filters['status'];
        }

        if (isset($filters['art_type'])) {
            $query .= " AND ae.art_type = ?";
            $params[] = $filters['art_type'];
        }

        if (isset($filters['user_id'])) {
            $query .= " AND ae.user_id = ?";
            $params[] = $filters['user_id'];
        }

        $query .= " ORDER BY ae.submitted_at DESC";

        $stmt = $pdo->prepare($query);
        $stmt->execute($params);

        return [
            'success' => true,
            'entries' => $stmt->fetchAll(PDO::FETCH_ASSOC)
        ];

    } catch (PDOException $e) {
        error_log("Get Art Entries Error: " . $e->getMessage());
        return [
            'success' => false,
            'message' => 'Failed to retrieve art entries.',
            'entries' => []
        ];
    }
}

/**
 * Get a single art entry by ID - FIXED
 */
function getArtEntryById($pdo, $entryId) {
    try {
        $stmt = $pdo->prepare(
            "SELECT ae.*, u.username as submitted_by_username, u.user_id
             FROM art_entries ae
             LEFT JOIN users u ON ae.user_id = u.user_id
             WHERE ae.entry_id = ?"
        );

        $stmt->execute([$entryId]);
        $entry = $stmt->fetch(PDO::FETCH_ASSOC);

        if (!$entry) {
            return [
                'success' => false,
                'message' => 'Art entry not found.'
            ];
        }

        return [
            'success' => true,
            'entry' => $entry
        ];

    } catch (PDOException $e) {
        error_log("Get Art Entry Error: " . $e->getMessage());
        return [
            'success' => false,
            'message' => 'Failed to retrieve art entry.'
        ];
    }
}

/**
 * Update art entry status (approve/reject)
 */
function updateArtEntryStatus($pdo, $entryId, $status) {
    try {
        // Check if user is admin
        if (!isAdmin()) {
            return [
                'success' => false,
                'message' => 'Unauthorized. Admin access required.'
            ];
        }

        $validStatuses = ['pending', 'approved', 'rejected'];
        if (!in_array($status, $validStatuses)) {
            return [
                'success' => false,
                'message' => 'Invalid status.'
            ];
        }

        $stmt = $pdo->prepare("UPDATE art_entries SET status = ? WHERE entry_id = ?");
        $stmt->execute([$status, $entryId]);

        return [
            'success' => true,
            'message' => "Entry status updated to $status."
        ];

    } catch (PDOException $e) {
        error_log("Update Entry Status Error: " . $e->getMessage());
        return [
            'success' => false,
            'message' => 'Failed to update entry status.'
        ];
    }
}

/**
 * Delete art entry
 */
function deleteArtEntry($pdo, $entryId) {
    try {
        $userId = getCurrentUserId();
        
        // Check if user owns the entry or is admin
        $stmt = $pdo->prepare("SELECT user_id FROM art_entries WHERE entry_id = ?");
        $stmt->execute([$entryId]);
        $entry = $stmt->fetch(PDO::FETCH_ASSOC);

        if (!$entry) {
            return ['success' => false, 'message' => 'Entry not found.'];
        }

        if ($entry['user_id'] != $userId && !isAdmin()) {
            return ['success' => false, 'message' => 'Unauthorized.'];
        }

        $stmt = $pdo->prepare("DELETE FROM art_entries WHERE entry_id = ?");
        $stmt->execute([$entryId]);

        return [
            'success' => true,
            'message' => 'Art entry deleted successfully.'
        ];

    } catch (PDOException $e) {
        error_log("Delete Entry Error: " . $e->getMessage());
        return [
            'success' => false,
            'message' => 'Failed to delete entry.'
        ];
    }
}

/**
 * Get approved art entries (for public browse)
 */
function getApprovedEntries($pdo) {
    return getArtEntries($pdo, ['status' => 'approved']);
}

/**
 * Get pending entries for admin review
 */
function getPendingEntries($pdo) {
    if (!isAdmin()) {
        return [
            'success' => false,
            'message' => 'Unauthorized.',
            'entries' => []
        ];
    }
    return getArtEntries($pdo, ['status' => 'pending']);
}

/**
 * Get user's submissions
 */
function getUserEntries($pdo, $userId) {
    return getArtEntries($pdo, ['user_id' => $userId]);
}
?>