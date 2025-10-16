-- ================================================================
-- SQL Script to Create Missing Tables
-- Indigenous Art Atlas - Complete Implementation
-- ================================================================

-- 1. User Profiles Table
-- Stores extended user information for artist profiles
-- ================================================================

CREATE TABLE IF NOT EXISTS user_profiles (
    profile_id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT NOT NULL,
    display_name VARCHAR(100),
    bio TEXT,
    location VARCHAR(200),
    email VARCHAR(255),
    website VARCHAR(255),
    social_media VARCHAR(500),
    show_contact TINYINT(1) DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE,
    INDEX idx_user_id (user_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 2. Content Reports Table
-- Stores user-submitted reports about inappropriate or inaccurate content
-- ================================================================

CREATE TABLE IF NOT EXISTS content_reports (
    report_id INT PRIMARY KEY AUTO_INCREMENT,
    entry_id INT NOT NULL,
    reporter_user_id INT NOT NULL,
    reason ENUM('inappropriate', 'inaccurate', 'cultural', 'duplicate', 'copyright', 'other') NOT NULL,
    details TEXT NOT NULL,
    status ENUM('pending', 'reviewing', 'resolved', 'dismissed') DEFAULT 'pending',
    reviewed_by INT NULL,
    reviewed_at TIMESTAMP NULL,
    resolution_notes TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (entry_id) REFERENCES art_entries(entry_id) ON DELETE CASCADE,
    FOREIGN KEY (reporter_user_id) REFERENCES users(user_id) ON DELETE CASCADE,
    FOREIGN KEY (reviewed_by) REFERENCES users(user_id) ON DELETE SET NULL,
    INDEX idx_status (status),
    INDEX idx_entry_id (entry_id),
    INDEX idx_created_at (created_at)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 3. Activity Log Table
-- Tracks system activities for admin dashboard
-- ================================================================

CREATE TABLE IF NOT EXISTS activity_log (
    activity_id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT NULL,
    type VARCHAR(50) NOT NULL,
    description TEXT NOT NULL,
    metadata JSON,
    ip_address VARCHAR(45),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE SET NULL,
    INDEX idx_type (type),
    INDEX idx_created_at (created_at),
    INDEX idx_user_id (user_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 4. Update Users Table (if columns missing)
-- Add status and user_type columns if they don't exist
-- ================================================================

-- Check and add status column
SET @dbname = DATABASE();
SET @tablename = "users";
SET @columnname = "status";
SET @preparedStatement = (SELECT IF(
  (
    SELECT COUNT(*) FROM INFORMATION_SCHEMA.COLUMNS
    WHERE
      (table_name = @tablename)
      AND (table_schema = @dbname)
      AND (column_name = @columnname)
  ) > 0,
  "SELECT 1",
  CONCAT("ALTER TABLE ", @tablename, " ADD ", @columnname, " ENUM('active', 'inactive') DEFAULT 'active' AFTER email")
));
PREPARE alterIfNotExists FROM @preparedStatement;
EXECUTE alterIfNotExists;
DEALLOCATE PREPARE alterIfNotExists;

-- Check and add user_type column
SET @columnname = "user_type";
SET @preparedStatement = (SELECT IF(
  (
    SELECT COUNT(*) FROM INFORMATION_SCHEMA.COLUMNS
    WHERE
      (table_name = @tablename)
      AND (table_schema = @dbname)
      AND (column_name = @columnname)
  ) > 0,
  "SELECT 1",
  CONCAT("ALTER TABLE ", @tablename, " ADD ", @columnname, " ENUM('general', 'artist', 'admin') DEFAULT 'general' AFTER email")
));
PREPARE alterIfNotExists FROM @preparedStatement;
EXECUTE alterIfNotExists;
DEALLOCATE PREPARE alterIfNotExists;

-- 5. Art Types Table (Optional - for dynamic category management)
-- If you want categories to be manageable through admin panel
-- ================================================================

CREATE TABLE IF NOT EXISTS art_types (
    type_id INT PRIMARY KEY AUTO_INCREMENT,
    type_code VARCHAR(50) UNIQUE NOT NULL,
    type_name VARCHAR(100) NOT NULL,
    description TEXT,
    is_active TINYINT(1) DEFAULT 1,
    sort_order INT DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_active (is_active),
    INDEX idx_sort (sort_order)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 6. Art Periods Table (Optional - for dynamic category management)
-- If you want periods to be manageable through admin panel
-- ================================================================

CREATE TABLE IF NOT EXISTS art_periods (
    period_id INT PRIMARY KEY AUTO_INCREMENT,
    period_code VARCHAR(50) UNIQUE NOT NULL,
    period_name VARCHAR(100) NOT NULL,
    description TEXT,
    date_range VARCHAR(100),
    is_active TINYINT(1) DEFAULT 1,
    sort_order INT DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_active (is_active),
    INDEX idx_sort (sort_order)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 7. Insert Default Art Types (if table is empty)
-- ================================================================

INSERT IGNORE INTO art_types (type_code, type_name, description, sort_order) VALUES
('rock_art', 'Rock Art', 'Traditional rock paintings and engravings', 1),
('bark_painting', 'Bark Painting', 'Paintings on tree bark', 2),
('contemporary', 'Contemporary', 'Modern indigenous art', 3),
('sculpture', 'Sculpture', 'Three-dimensional art works', 4),
('ceremonial', 'Ceremonial', 'Art used in ceremonies and rituals', 5),
('other', 'Other', 'Other types of indigenous art', 6);

-- 8. Insert Default Art Periods (if table is empty)
-- ================================================================

INSERT IGNORE INTO art_periods (period_code, period_name, description, date_range, sort_order) VALUES
('ancient', 'Ancient (Pre-colonial)', 'Before European contact', 'Pre-1788', 1),
('historical', 'Colonial Era', 'Colonial and post-colonial period', '1788-1970', 2),
('contemporary', 'Contemporary', 'Modern era', '1970-Present', 3);

-- 9. Add rejection_reason column to art_entries if missing
-- ================================================================

SET @tablename = "art_entries";
SET @columnname = "rejection_reason";
SET @preparedStatement = (SELECT IF(
  (
    SELECT COUNT(*) FROM INFORMATION_SCHEMA.COLUMNS
    WHERE
      (table_name = @tablename)
      AND (table_schema = @dbname)
      AND (column_name = @columnname)
  ) > 0,
  "SELECT 1",
  CONCAT("ALTER TABLE ", @tablename, " ADD ", @columnname, " TEXT NULL AFTER status")
));
PREPARE alterIfNotExists FROM @preparedStatement;
EXECUTE alterIfNotExists;
DEALLOCATE PREPARE alterIfNotExists;

-- ================================================================
-- VERIFICATION QUERIES
-- Run these to verify tables were created successfully
-- ================================================================

-- Show all tables
SHOW TABLES;

-- Verify user_profiles structure
DESCRIBE user_profiles;

-- Verify content_reports structure
DESCRIBE content_reports;

-- Verify activity_log structure
DESCRIBE activity_log;

-- Verify art_types structure
DESCRIBE art_types;

-- Verify art_periods structure
DESCRIBE art_periods;

-- Count records in each new table
SELECT 'user_profiles' as table_name, COUNT(*) as record_count FROM user_profiles
UNION ALL
SELECT 'content_reports', COUNT(*) FROM content_reports
UNION ALL
SELECT 'activity_log', COUNT(*) FROM activity_log
UNION ALL
SELECT 'art_types', COUNT(*) FROM art_types
UNION ALL
SELECT 'art_periods', COUNT(*) FROM art_periods;

-- ================================================================
-- END OF SCRIPT
-- ================================================================
