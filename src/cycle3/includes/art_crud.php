<?php
/**
 * Art Entries CRUD Operations
 *
 * Handles Create, Read, Update, Delete operations for art entries
 * in the Indigenous Art Atlas application.
 *
 * Security Features:
 * - Prepared statements for SQL injection prevention
 * - Input validation and sanitization
 * - User permission checks
 * - XSS prevention with htmlspecialchars
 *
 * AI Acknowledgment: CRUD operations and data validation patterns
 * developed with assistance from Claude AI (Anthropic)
 *
 * @package IndigenousArtAtlas
 * @author Shishir Saurav
 * @version 1.0
 */

require_once __DIR__ . '/../config/dbconn.php';
require_once __DIR__ . '/auth.php';

/**
 * Create a new art entry
 *
 * @param PDO $pdo Database connection
 * @param array $data Art entry data
 * @return array Response with success status and message
 */
function createArtEntry($pdo, $data) {
    try {
        // Validate required fields
        $requiredFields = ['title', 'artist', 'culture', 'location', 'latitude', 'longitude'];
        foreach ($requiredFields as $field) {
            if (empty($data[$field])) {
                return [
                    'success' => false,
                    'message' => "Field '$field' is required."
                ];
            }
        }

        // Validate coordinates
        if (!is_numeric($data['latitude']) || !is_numeric($data['longitude'])) {
            return [
                'success' => false,
                'message' => 'Invalid coordinates.'
            ];
        }

        if ($data['latitude'] < -90 || $data['latitude'] > 90) {
            return [
                'success' => false,
                'message' => 'Latitude must be between -90 and 90.'
            ];
        }

        if ($data['longitude'] < -180 || $data['longitude'] > 180) {
            return [
                'success' => false,
                'message' => 'Longitude must be between -180 and 180.'
            ];
        }

        // Get user ID
        $userId = getCurrentUserId();
        if (!$userId) {
            return [
                'success' => false,
                'message' => 'User not authenticated.'
            ];
        }

        // Prepare data
        $title = htmlspecialchars(trim($data['title']), ENT_QUOTES, 'UTF-8');
        $artist = htmlspecialchars(trim($data['artist']), ENT_QUOTES, 'UTF-8');
        $culture = htmlspecialchars(trim($data['culture']), ENT_QUOTES, 'UTF-8');
        $yearCreated = isset($data['year_created']) ? (int)$data['year_created'] : null;
        $medium = isset($data['medium']) ? htmlspecialchars(trim($data['medium']), ENT_QUOTES, 'UTF-8') : null;
        $description = isset($data['description']) ? htmlspecialchars(trim($data['description']), ENT_QUOTES, 'UTF-8') : null;
        $location = htmlspecialchars(trim($data['location']), ENT_QUOTES, 'UTF-8');
        $latitude = (float)$data['latitude'];
        $longitude = (float)$data['longitude'];
        $imageUrl = isset($data['image_url']) ? filter_var($data['image_url'], FILTER_SANITIZE_URL) : null;
        $status = isAdmin() ? 'approved' : 'pending';

        // Insert art entry
        $stmt = $pdo->prepare(
            "INSERT INTO art_entries
            (title, artist, culture, year_created, medium, description,
             location, latitude, longitude, image_url, submitted_by, status, created_at)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, NOW())"
        );

        $stmt->execute([
            $title, $artist, $culture, $yearCreated, $medium, $description,
            $location, $latitude, $longitude, $imageUrl, $userId, $status
        ]);

        return [
            'success' => true,
            'message' => 'Art entry created successfully!',
            'entry_id' => $pdo->lastInsertId(),
            'status' => $status
        ];

    } catch (PDOException $e) {
        error_log("Create Art Entry Error: " . $e->getMessage());
        return [
            'success' => false,
            'message' => 'Failed to create art entry. Please try again.'
        ];
    }
}

/**
 * Get all art entries with optional filters
 *
 * @param PDO $pdo Database connection
 * @param array $filters Optional filters (status, culture, user_id)
 * @return array Response with success status and entries
 */
function getArtEntries($pdo, $filters = []) {
    try {
        // Base query
        $query = "SELECT ae.*, u.username as submitted_by_username
                  FROM art_entries ae
                  LEFT JOIN users u ON ae.submitted_by = u.user_id
                  WHERE 1=1";

        $params = [];

        // Apply filters
        if (isset($filters['status'])) {
            $query .= " AND ae.status = ?";
            $params[] = $filters['status'];
        }

        if (isset($filters['culture'])) {
            $query .= " AND ae.culture = ?";
            $params[] = $filters['culture'];
        }

        if (isset($filters['user_id'])) {
            $query .= " AND ae.submitted_by = ?";
            $params[] = $filters['user_id'];
        }

        // Only show approved entries to non-admin users
        if (!isAdmin() && !isset($filters['user_id'])) {
            $query .= " AND ae.status = 'approved'";
        }

        // Order by creation date (newest first)
        $query .= " ORDER BY ae.created_at DESC";

        $stmt = $pdo->prepare($query);
        $stmt->execute($params);
        $entries = $stmt->fetchAll();

        return [
            'success' => true,
            'entries' => $entries,
            'count' => count($entries)
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
 * Get single art entry by ID
 *
 * @param PDO $pdo Database connection
 * @param int $entryId Entry ID
 * @return array Response with success status and entry data
 */
function getArtEntry($pdo, $entryId) {
    try {
        $stmt = $pdo->prepare(
            "SELECT ae.*, u.username as submitted_by_username
             FROM art_entries ae
             LEFT JOIN users u ON ae.submitted_by = u.user_id
             WHERE ae.entry_id = ?"
        );

        $stmt->execute([$entryId]);
        $entry = $stmt->fetch();

        if (!$entry) {
            return [
                'success' => false,
                'message' => 'Art entry not found.'
            ];
        }

        // Check permissions - only show pending entries to admin or owner
        if ($entry['status'] !== 'approved' &&
            !isAdmin() &&
            getCurrentUserId() != $entry['submitted_by']) {
            return [
                'success' => false,
                'message' => 'Access denied.'
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
 * Update art entry
 *
 * @param PDO $pdo Database connection
 * @param int $entryId Entry ID
 * @param array $data Updated data
 * @return array Response with success status and message
 */
function updateArtEntry($pdo, $entryId, $data) {
    try {
        // Get existing entry
        $result = getArtEntry($pdo, $entryId);
        if (!$result['success']) {
            return $result;
        }

        $entry = $result['entry'];

        // Check permissions - only admin or owner can update
        if (!isAdmin() && getCurrentUserId() != $entry['submitted_by']) {
            return [
                'success' => false,
                'message' => 'Access denied.'
            ];
        }

        // Build update query dynamically based on provided fields
        $updateFields = [];
        $params = [];

        $allowedFields = [
            'title', 'artist', 'culture', 'year_created', 'medium',
            'description', 'location', 'latitude', 'longitude', 'image_url'
        ];

        foreach ($allowedFields as $field) {
            if (isset($data[$field])) {
                if ($field === 'latitude' || $field === 'longitude') {
                    // Validate coordinates
                    if (!is_numeric($data[$field])) {
                        return [
                            'success' => false,
                            'message' => "Invalid $field value."
                        ];
                    }
                    $updateFields[] = "$field = ?";
                    $params[] = (float)$data[$field];
                } elseif ($field === 'year_created') {
                    $updateFields[] = "$field = ?";
                    $params[] = $data[$field] ? (int)$data[$field] : null;
                } elseif ($field === 'image_url') {
                    $updateFields[] = "$field = ?";
                    $params[] = filter_var($data[$field], FILTER_SANITIZE_URL);
                } else {
                    $updateFields[] = "$field = ?";
                    $params[] = htmlspecialchars(trim($data[$field]), ENT_QUOTES, 'UTF-8');
                }
            }
        }

        if (empty($updateFields)) {
            return [
                'success' => false,
                'message' => 'No fields to update.'
            ];
        }

        // Add updated_at timestamp
        $updateFields[] = "updated_at = NOW()";

        // Add entry ID to params
        $params[] = $entryId;

        // Execute update
        $query = "UPDATE art_entries SET " . implode(', ', $updateFields) . " WHERE entry_id = ?";
        $stmt = $pdo->prepare($query);
        $stmt->execute($params);

        return [
            'success' => true,
            'message' => 'Art entry updated successfully!'
        ];

    } catch (PDOException $e) {
        error_log("Update Art Entry Error: " . $e->getMessage());
        return [
            'success' => false,
            'message' => 'Failed to update art entry.'
        ];
    }
}

/**
 * Delete art entry
 *
 * @param PDO $pdo Database connection
 * @param int $entryId Entry ID
 * @return array Response with success status and message
 */
function deleteArtEntry($pdo, $entryId) {
    try {
        // Get existing entry
        $result = getArtEntry($pdo, $entryId);
        if (!$result['success']) {
            return $result;
        }

        $entry = $result['entry'];

        // Check permissions - only admin or owner can delete
        if (!isAdmin() && getCurrentUserId() != $entry['submitted_by']) {
            return [
                'success' => false,
                'message' => 'Access denied.'
            ];
        }

        // Delete entry
        $stmt = $pdo->prepare("DELETE FROM art_entries WHERE entry_id = ?");
        $stmt->execute([$entryId]);

        return [
            'success' => true,
            'message' => 'Art entry deleted successfully!'
        ];

    } catch (PDOException $e) {
        error_log("Delete Art Entry Error: " . $e->getMessage());
        return [
            'success' => false,
            'message' => 'Failed to delete art entry.'
        ];
    }
}

/**
 * Approve art entry (admin only)
 *
 * @param PDO $pdo Database connection
 * @param int $entryId Entry ID
 * @return array Response with success status and message
 */
function approveArtEntry($pdo, $entryId) {
    try {
        // Check admin permissions
        if (!isAdmin()) {
            return [
                'success' => false,
                'message' => 'Access denied. Admin privileges required.'
            ];
        }

        // Update status
        $stmt = $pdo->prepare(
            "UPDATE art_entries SET status = 'approved', updated_at = NOW() WHERE entry_id = ?"
        );
        $stmt->execute([$entryId]);

        if ($stmt->rowCount() === 0) {
            return [
                'success' => false,
                'message' => 'Art entry not found.'
            ];
        }

        return [
            'success' => true,
            'message' => 'Art entry approved successfully!'
        ];

    } catch (PDOException $e) {
        error_log("Approve Art Entry Error: " . $e->getMessage());
        return [
            'success' => false,
            'message' => 'Failed to approve art entry.'
        ];
    }
}

/**
 * Reject art entry (admin only)
 *
 * @param PDO $pdo Database connection
 * @param int $entryId Entry ID
 * @return array Response with success status and message
 */
function rejectArtEntry($pdo, $entryId) {
    try {
        // Check admin permissions
        if (!isAdmin()) {
            return [
                'success' => false,
                'message' => 'Access denied. Admin privileges required.'
            ];
        }

        // Update status
        $stmt = $pdo->prepare(
            "UPDATE art_entries SET status = 'rejected', updated_at = NOW() WHERE entry_id = ?"
        );
        $stmt->execute([$entryId]);

        if ($stmt->rowCount() === 0) {
            return [
                'success' => false,
                'message' => 'Art entry not found.'
            ];
        }

        return [
            'success' => true,
            'message' => 'Art entry rejected.'
        ];

    } catch (PDOException $e) {
        error_log("Reject Art Entry Error: " . $e->getMessage());
        return [
            'success' => false,
            'message' => 'Failed to reject art entry.'
        ];
    }
}

/**
 * Get art entry statistics
 *
 * @param PDO $pdo Database connection
 * @return array Statistics data
 */
function getArtStatistics($pdo) {
    try {
        $stats = [];

        // Total entries by status
        $stmt = $pdo->query(
            "SELECT status, COUNT(*) as count FROM art_entries GROUP BY status"
        );
        $stats['by_status'] = $stmt->fetchAll(PDO::FETCH_KEY_PAIR);

        // Total entries by culture
        $stmt = $pdo->query(
            "SELECT culture, COUNT(*) as count FROM art_entries
             WHERE status = 'approved'
             GROUP BY culture
             ORDER BY count DESC
             LIMIT 10"
        );
        $stats['by_culture'] = $stmt->fetchAll();

        // Total entries
        $stmt = $pdo->query("SELECT COUNT(*) FROM art_entries");
        $stats['total'] = $stmt->fetchColumn();

        return [
            'success' => true,
            'statistics' => $stats
        ];

    } catch (PDOException $e) {
        error_log("Get Statistics Error: " . $e->getMessage());
        return [
            'success' => false,
            'message' => 'Failed to retrieve statistics.'
        ];
    }
}

?>
