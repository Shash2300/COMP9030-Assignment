-- ============================================================================
-- Indigenous Art Atlas - Updated Database Schema
-- ============================================================================
-- This is the ACTUAL schema used by the working application
-- Updated to match the implemented backend APIs
-- ============================================================================

-- Drop existing database if it exists (use with caution!)
-- DROP DATABASE IF EXISTS indigenous_art_atlas;

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
    submitted_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE,
    INDEX idx_status (status),
    INDEX idx_user_id (user_id),
    INDEX idx_art_type (art_type),
    INDEX idx_time_period (time_period)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================================================
-- SAMPLE DATA
-- ============================================================================

-- Insert admin user
INSERT INTO users (username, email, password_hash, full_name, user_role) VALUES
('admin', 'admin@example.com', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'System Admin', 'admin');
-- Password: password

-- Insert test users
INSERT INTO users (username, email, password_hash, full_name, user_role) VALUES
('uncle_tommy', 'tommy@example.com', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'Tommy Williams', 'artist');
-- Password: password

-- Insert sample art entries
INSERT INTO art_entries (
    user_id,
    title,
    description,
    art_type,
    time_period,
    location_name,
    latitude,
    longitude,
    location_sensitivity,
    indigenous_group,
    cultural_significance,
    artist_name,
    status
) VALUES
(2, 'Kakadu Rock Art', 'Ancient rock art depicting hunting scenes and dreamtime stories', 'rock_art', 'ancient', 'Kakadu National Park, NT', -12.85430000, 132.54600000, 'general', 'Bininj/Mungguy', 'Sacred site depicting creation stories', 'Unknown (Traditional)', 'approved'),
(2, 'Bark Painting - Rainbow Serpent', 'Traditional bark painting showing the Rainbow Serpent', 'bark_painting', 'contemporary', 'Arnhem Land, NT', -12.23450000, 133.87650000, 'general', 'Yolŋu', 'Represents water and creation', 'Uncle Tommy Williams', 'approved'),
(2, 'Uluru Sacred Site', 'Ancient rock formations with significant cultural meaning', 'rock_art', 'ancient', 'Uluru, NT', -25.34440000, 131.03690000, 'hidden', 'Anangu', 'Highly sacred site - location protected', 'Traditional', 'approved');

-- ============================================================================
-- VERIFICATION QUERIES
-- ============================================================================
-- Uncomment to verify the setup:

-- SELECT 'Users Table' as Check_Point;
-- SELECT user_id, username, email, user_role FROM users;

-- SELECT 'Art Entries Table' as Check_Point;
-- SELECT entry_id, title, art_type, status FROM art_entries;

-- ============================================================================
-- NOTES
-- ============================================================================
-- 1. This schema uses ENUM types for controlled values
-- 2. Foreign keys ensure referential integrity
-- 3. Indexes improve query performance
-- 4. UTF8MB4 supports full unicode including emojis
-- 5. Passwords are hashed using bcrypt (password_hash in PHP)
-- 6. Timestamps use CURRENT_TIMESTAMP for automatic date tracking
-- ============================================================================
