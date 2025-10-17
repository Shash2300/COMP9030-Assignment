-- OLd version for beta testing 
-- DO not use this File to import database 
CREATE TABLE users (
    user_id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    role ENUM('general', 'artist', 'admin') DEFAULT 'general',
    status ENUM('active', 'suspended') DEFAULT 'active',
    bio TEXT,
    contact_info VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    last_login TIMESTAMP NULL
);

CREATE TABLE art_entries (
    art_id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(200) NOT NULL,
    description TEXT NOT NULL,
    art_type_id INT,
    art_period_id INT,
    condition_notes TEXT,
    artist_name VARCHAR(100),
    artist_id INT NULL,
    latitude DECIMAL(10, 8),
    longitude DECIMAL(11, 8),
    location_description TEXT,
    location_sensitive BOOLEAN DEFAULT FALSE,
    show_exact_location BOOLEAN DEFAULT TRUE,
    submitter_id INT NOT NULL,
    submission_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    approval_status ENUM('pending', 'approved', 'rejected') DEFAULT 'pending',
    rejection_reason TEXT,
    approved_by INT NULL,
    approved_date TIMESTAMP NULL,
    FOREIGN KEY (submitter_id) REFERENCES users(user_id),
    FOREIGN KEY (artist_id) REFERENCES users(user_id),
    FOREIGN KEY (approved_by) REFERENCES users(user_id)
);

CREATE TABLE art_images (
    image_id INT AUTO_INCREMENT PRIMARY KEY,
    art_id INT NOT NULL,
    image_path VARCHAR(255) NOT NULL,
    is_primary BOOLEAN DEFAULT FALSE,
    upload_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (art_id) REFERENCES art_entries(art_id) ON DELETE CASCADE
);

CREATE TABLE art_types (
    type_id INT AUTO_INCREMENT PRIMARY KEY,
    type_name VARCHAR(100) UNIQUE NOT NULL,
    description TEXT
);

INSERT INTO art_types (type_name, description) VALUES
('Cave Art', 'Ancient rock paintings and engravings'),
('Mural', 'Large-scale wall paintings'),
('Sculpture', 'Three-dimensional artworks'),
('Installation', 'Site-specific art installations'),
('Gallery Piece', 'Works displayed in galleries');

CREATE TABLE art_periods (
    period_id INT AUTO_INCREMENT PRIMARY KEY,
    period_name VARCHAR(100) UNIQUE NOT NULL,
    description TEXT
);

INSERT INTO art_periods (period_name, description) VALUES
('Ancient', 'Pre-colonial era'),
('Colonial Era', 'During colonization period'),
('Modern', '20th century'),
('Contemporary', '21st century');

CREATE TABLE reports (
    report_id INT AUTO_INCREMENT PRIMARY KEY,
    art_id INT NOT NULL,
    reporter_id INT NOT NULL,
    reason TEXT NOT NULL,
    status ENUM('pending', 'reviewed', 'dismissed') DEFAULT 'pending',
    report_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    reviewed_by INT NULL,
    review_date TIMESTAMP NULL,
    FOREIGN KEY (art_id) REFERENCES art_entries(art_id) ON DELETE CASCADE,
    FOREIGN KEY (reporter_id) REFERENCES users(user_id),
    FOREIGN KEY (reviewed_by) REFERENCES users(user_id)
);