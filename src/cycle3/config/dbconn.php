<?php
/**
 * Database Connection Configuration
 *
 * This file establishes a PDO connection to the MySQL database
 * for the Indigenous Art Atlas application.
 *
 * Security Features:
 * - PDO with prepared statements
 * - Error mode set to exceptions
 * - UTF-8 character encoding
 *
 * AI Acknowledgment: Database connection structure and security
 * best practices implemented with assistance from Claude AI (Anthropic)
 *
 */

// Database configuration constants
define('DB_HOST', 'localhost');
define('DB_NAME', 'indigenous_art_atlas');
define('DB_USER', 'root');
define('DB_PASS', '');
define('DB_CHARSET', 'utf8mb4');

/**
 * Create database connection
 *
 * @return PDO Database connection object
 * @throws PDOException If connection fails
 */
function getDBConnection() {
    try {
        // Data Source Name (DSN)
        $dsn = "mysql:host=" . DB_HOST . ";dbname=" . DB_NAME . ";charset=" . DB_CHARSET;

        // PDO options for security and error handling
        $options = [
            PDO::ATTR_ERRMODE            => PDO::ERRMODE_EXCEPTION,
            PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
            PDO::ATTR_EMULATE_PREPARES   => false,
        ];

        // Create PDO instance
        $pdo = new PDO($dsn, DB_USER, DB_PASS, $options);

        return $pdo;

    } catch (PDOException $e) {
        // Log error (in production, log to file instead of displaying)
        error_log("Database Connection Error: " . $e->getMessage());

        // Don't expose sensitive error details to users
        throw new PDOException("Database connection failed. Please try again later.");
    }
}

// Create global database connection
try {
    $pdo = getDBConnection();
} catch (PDOException $e) {
    die("Critical Error: Unable to connect to database.");
}

?>
