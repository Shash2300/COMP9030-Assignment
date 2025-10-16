-- ============================================================================
-- Indigenous Art Atlas - Database Setup (Compatible Version)
-- Works with MySQL 5.7, MariaDB, and newer versions
-- ============================================================================

-- Create database
CREATE DATABASE IF NOT EXISTS indigenous_art_atlas
CHARACTER SET utf8mb4
COLLATE utf8mb4_unicode_ci;

USE indigenous_art_atlas;

-- ============================================================================
-- USERS TABLE
-- ============================================================================
CREATE TABLE IF NOT EXISTS users (
    user_id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    full_name VARCHAR(100),
    user_role ENUM('artist', 'researcher', 'admin') DEFAULT 'artist',
    user_type ENUM('general', 'artist', 'admin') DEFAULT 'general',
    status ENUM('active', 'inactive') DEFAULT 'active',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    last_login TIMESTAMP NULL,
    INDEX idx_username (username),
    INDEX idx_email (email)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================================================
-- ART_ENTRIES TABLE
-- ============================================================================
CREATE TABLE IF NOT EXISTS art_entries (
    entry_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    title VARCHAR(200) NOT NULL,
    description TEXT NOT NULL,
    art_type ENUM('rock_art', 'bark_painting', 'contemporary', 'sculpture', 'ceremonial', 'other') NOT NULL,
    time_period ENUM('ancient', 'historical', 'contemporary') NOT NULL,
    location_name VARCHAR(200) NOT NULL,
    latitude DECIMAL(10, 8) NOT NULL,
    longitude DECIMAL(11, 8) NOT NULL,
    location_sensitivity ENUM('exact', 'general', 'hidden') DEFAULT 'exact',
    indigenous_group VARCHAR(100),
    cultural_significance TEXT,
    artist_name VARCHAR(100),
    status ENUM('pending', 'approved', 'rejected') DEFAULT 'pending',
    rejection_reason TEXT,
    submitted_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE,
    INDEX idx_status (status),
    INDEX idx_user_id (user_id),
    INDEX idx_art_type (art_type),
    INDEX idx_time_period (time_period)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================================================
-- USER_PROFILES TABLE
-- ============================================================================
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

-- ============================================================================
-- CONTENT_REPORTS TABLE
-- ============================================================================
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

-- ============================================================================
-- ACTIVITY_LOG TABLE
-- ============================================================================
CREATE TABLE IF NOT EXISTS activity_log (
    activity_id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT NULL,
    type VARCHAR(50) NOT NULL,
    description TEXT NOT NULL,
    metadata TEXT,
    ip_address VARCHAR(45),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE SET NULL,
    INDEX idx_type (type),
    INDEX idx_created_at (created_at),
    INDEX idx_user_id (user_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================================================
-- ART_TYPES TABLE (for dynamic categories)
-- ============================================================================
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

-- ============================================================================
-- ART_PERIODS TABLE (for dynamic categories)
-- ============================================================================
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

-- ============================================================================
-- INSERT SAMPLE DATA
-- ============================================================================

-- Insert admin user (password: password)
INSERT INTO users (username, email, password_hash, full_name, user_role, user_type) VALUES
('admin', 'admin@example.com', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'System Admin', 'admin', 'admin');

-- Insert test users (password: password)
INSERT INTO users (username, email, password_hash, full_name, user_role, user_type) VALUES
('uncle_tommy', 'tommy@example.com', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'Tommy Williams', 'artist', 'artist'),
('jane_smith', 'jane@example.com', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'Jane Smith', 'artist', 'artist');

-- Insert default art types
INSERT INTO art_types (type_code, type_name, description, sort_order) VALUES
('rock_art', 'Rock Art', 'Traditional rock paintings and engravings', 1),
('bark_painting', 'Bark Painting', 'Paintings on tree bark', 2),
('contemporary', 'Contemporary', 'Modern indigenous art', 3),
('sculpture', 'Sculpture', 'Three-dimensional art works', 4),
('ceremonial', 'Ceremonial', 'Art used in ceremonies and rituals', 5),
('other', 'Other', 'Other types of indigenous art', 6);

-- Insert default art periods
INSERT INTO art_periods (period_code, period_name, description, date_range, sort_order) VALUES
('ancient', 'Ancient (Pre-colonial)', 'Before European contact', 'Pre-1788', 1),
('historical', 'Colonial Era', 'Colonial and post-colonial period', '1788-1970', 2),
('contemporary', 'Contemporary', 'Modern era', '1970-Present', 3);

-- Insert sample art entries
INSERT INTO art_entries (
    user_id, title, description, art_type, time_period, location_name,
    latitude, longitude, location_sensitivity, indigenous_group,
    cultural_significance, artist_name, status
) VALUES
(2, 'Kakadu Rock Art', 'Ancient rock art depicting hunting scenes and dreamtime stories', 
 'rock_art', 'ancient', 'Kakadu National Park, NT', 
 -12.85430000, 132.54600000, 'general', 'Bininj/Mungguy', 
 'Sacred site depicting creation stories', 'Unknown (Traditional)', 'approved'),

(2, 'Bark Painting - Rainbow Serpent', 'Traditional bark painting showing the Rainbow Serpent', 
 'bark_painting', 'contemporary', 'Arnhem Land, NT', 
 -12.23450000, 133.87650000, 'general', 'Yolŋu', 
 'Represents water and creation', 'Uncle Tommy Williams', 'approved'),

(2, 'Uluru Sacred Site', 'Ancient rock formations with significant cultural meaning', 
 'rock_art', 'ancient', 'Uluru, NT', 
 -25.34440000, 131.03690000, 'hidden', 'Anangu', 
 'Highly sacred site - location protected', 'Traditional', 'approved'),

(3, 'Contemporary Dot Painting', 'Modern interpretation of traditional dot painting techniques', 
 'contemporary', 'contemporary', 'Alice Springs, NT', 
 -23.69800000, 133.88070000, 'exact', 'Arrernte', 
 'Fusion of traditional and modern artistic expression', 'Jane Smith', 'approved'),

(2, 'Ceremonial Shield', 'Hand-carved wooden shield used in traditional ceremonies', 
 'ceremonial', 'historical', 'Museum Collection, Sydney', 
 -33.86820000, 151.20930000, 'exact', 'Gadigal', 
 'Important ceremonial object from early colonial period', 'Unknown Elder', 'approved');

-- Insert sample user profiles
INSERT INTO user_profiles (user_id, display_name, bio, location, show_contact) VALUES
(2, 'Uncle Tommy', 'Traditional artist and cultural educator sharing the stories of our people through art.', 'Northern Territory', 1),
(3, 'Jane Smith', 'Contemporary Indigenous artist exploring the intersection of tradition and modernity.', 'Alice Springs', 0);

-- Insert sample activity log entries
INSERT INTO activity_log (user_id, type, description) VALUES
(1, 'user_login', 'Admin logged in'),
(2, 'submission_created', 'New art entry submitted: Kakadu Rock Art'),
(1, 'submission_approved', 'Approved art entry: Kakadu Rock Art'),
(3, 'user_registered', 'New user registration: jane_smith');

-- ============================================================================
-- VERIFICATION QUERIES
-- ============================================================================

-- Check tables
SELECT 'Tables Created:' as Status;
SHOW TABLES;

-- Check users
SELECT 'Users:' as Status;
SELECT user_id, username, email, user_role, user_type FROM users;

-- Check art entries
SELECT 'Art Entries:' as Status;
SELECT entry_id, title, art_type, status FROM art_entries;

-- Check categories
SELECT 'Art Types:' as Status;
SELECT * FROM art_types;

SELECT 'Art Periods:' as Status;
SELECT * FROM art_periods;

-- ============================================================================
-- SUCCESS MESSAGE
-- ============================================================================
SELECT '✅ Database setup complete!' as Status;
SELECT '✅ Admin login: admin / password' as Info;
SELECT '✅ Test user: uncle_tommy / password' as Info;