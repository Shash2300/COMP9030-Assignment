<?php
/**
 * Authentication System
 *
 * Handles user registration, login, logout, and session management
 * for the Indigenous Art Atlas application.
 *
 * Security Features:
 * - Password hashing with bcrypt
 * - Prepared statements for SQL injection prevention
 * - Input validation and sanitization
 * - Session management
 * - CSRF protection ready
 *
 * AI Acknowledgment: Authentication logic and security patterns
 * developed with assistance from Claude AI (Anthropic)
 *
 * @package IndigenousArtAtlas
 * @author Shishir Saurav
 * @version 1.0
 */

// Start session if not already started
if (session_status() === PHP_SESSION_NONE) {
    session_start();
}

require_once __DIR__ . '/../config/dbconn.php';

/**
 * Register a new user
 *
 * @param PDO $pdo Database connection
 * @param string $username Username
 * @param string $email Email address
 * @param string $password Password (will be hashed)
 * @param string $role User role (default: 'user')
 * @return array Response with success status and message
 */
function registerUser($pdo, $username, $email, $password, $role = 'user') {
    try {
        // Validate inputs
        if (empty($username) || empty($email) || empty($password)) {
            return [
                'success' => false,
                'message' => 'All fields are required.'
            ];
        }

        // Validate email format
        if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
            return [
                'success' => false,
                'message' => 'Invalid email format.'
            ];
        }

        // Validate password length
        if (strlen($password) < 6) {
            return [
                'success' => false,
                'message' => 'Password must be at least 6 characters long.'
            ];
        }

        // Validate username length
        if (strlen($username) < 3 || strlen($username) > 50) {
            return [
                'success' => false,
                'message' => 'Username must be between 3 and 50 characters.'
            ];
        }

        // Validate role - match database enum values
        $validRoles = ['artist', 'researcher', 'admin'];
        if (!in_array($role, $validRoles)) {
            $role = 'artist'; // Default to artist
        }

        // Check if username already exists
        $stmt = $pdo->prepare("SELECT user_id FROM users WHERE username = ?");
        $stmt->execute([$username]);

        if ($stmt->fetch()) {
            return [
                'success' => false,
                'message' => 'Username already exists.'
            ];
        }

        // Check if email already exists
        $stmt = $pdo->prepare("SELECT user_id FROM users WHERE email = ?");
        $stmt->execute([$email]);

        if ($stmt->fetch()) {
            return [
                'success' => false,
                'message' => 'Email already registered.'
            ];
        }

        // Hash password
        $hashedPassword = password_hash($password, PASSWORD_DEFAULT);

        // Insert new user - use user_role column
        $stmt = $pdo->prepare(
            "INSERT INTO users (username, email, password_hash, full_name, user_role, created_at)
             VALUES (?, ?, ?, ?, ?, NOW())"
        );

        $stmt->execute([$username, $email, $hashedPassword, $username, $role]);

        return [
            'success' => true,
            'message' => 'Registration successful!',
            'user_id' => $pdo->lastInsertId()
        ];

    } catch (PDOException $e) {
        error_log("Registration Error: " . $e->getMessage());
        return [
            'success' => false,
            'message' => 'Registration failed. Please try again.'
        ];
    }
}

/**
 * Login user
 *
 * @param PDO $pdo Database connection
 * @param string $username Username or email
 * @param string $password Password
 * @return array Response with success status and user data
 */
function loginUser($pdo, $username, $password) {
    try {
        // Validate inputs
        if (empty($username) || empty($password)) {
            return [
                'success' => false,
                'message' => 'Username and password are required.'
            ];
        }

        // Check if user exists (by username or email)
        $stmt = $pdo->prepare(
            "SELECT user_id, username, email, password_hash, user_role as role
             FROM users
             WHERE username = ? OR email = ?"
        );
        $stmt->execute([$username, $username]);
        $user = $stmt->fetch();

        if (!$user) {
            return [
                'success' => false,
                'message' => 'Invalid username or password.'
            ];
        }

        // Verify password
        if (!password_verify($password, $user['password_hash'])) {
            return [
                'success' => false,
                'message' => 'Invalid username or password.'
            ];
        }

        // Create session
        $_SESSION['user_id'] = $user['user_id'];
        $_SESSION['username'] = $user['username'];
        $_SESSION['email'] = $user['email'];
        $_SESSION['role'] = $user['user_role'];
        $_SESSION['logged_in'] = true;

        // Update last login time
        $updateStmt = $pdo->prepare(
            "UPDATE users SET last_login = NOW() WHERE user_id = ?"
        );
        $updateStmt->execute([$user['user_id']]);

        return [
            'success' => true,
            'message' => 'Login successful!',
            'user' => [
                'user_id' => $user['user_id'],
                'username' => $user['username'],
                'email' => $user['email'],
                'role' => $user['user_role']
            ]
        ];

    } catch (PDOException $e) {
        error_log("Login Error: " . $e->getMessage());
        return [
            'success' => false,
            'message' => 'Login failed. Please try again.'
        ];
    }
}

/**
 * Logout user
 *
 * @return array Response with success status
 */
function logoutUser() {
    // Destroy session
    $_SESSION = array();

    // Delete session cookie
    if (isset($_COOKIE[session_name()])) {
        setcookie(session_name(), '', time() - 3600, '/');
    }

    // Destroy session
    session_destroy();

    return [
        'success' => true,
        'message' => 'Logout successful!'
    ];
}

/**
 * Check if user is logged in
 *
 * @return bool True if logged in, false otherwise
 */
function isLoggedIn() {
    return isset($_SESSION['logged_in']) && $_SESSION['logged_in'] === true;
}

/**
 * Check if user has specific role
 *
 * @param string $role Role to check
 * @return bool True if user has role, false otherwise
 */
function hasRole($role) {
    return isLoggedIn() && isset($_SESSION['role']) && $_SESSION['role'] === $role;
}

/**
 * Check if user is admin
 *
 * @return bool True if admin, false otherwise
 */
function isAdmin() {
    return hasRole('admin');
}

/**
 * Get current user ID
 *
 * @return int|null User ID or null if not logged in
 */
function getCurrentUserId() {
    return isLoggedIn() ? $_SESSION['user_id'] : null;
}

/**
 * Get current user data
 *
 * @return array|null User data or null if not logged in
 */
function getCurrentUser() {
    if (!isLoggedIn()) {
        return null;
    }

    return [
        'user_id' => $_SESSION['user_id'],
        'username' => $_SESSION['username'],
        'email' => $_SESSION['email'],
        'role' => $_SESSION['role']
    ];
}

/**
 * Require login - redirect if not logged in
 *
 * @param string $redirectUrl URL to redirect to if not logged in
 */
function requireLogin($redirectUrl = '/login.php') {
    if (!isLoggedIn()) {
        header("Location: $redirectUrl");
        exit();
    }
}

/**
 * Require admin - redirect if not admin
 *
 * @param string $redirectUrl URL to redirect to if not admin
 */
function requireAdmin($redirectUrl = '/index.php') {
    if (!isAdmin()) {
        header("Location: $redirectUrl");
        exit();
    }
}

?>