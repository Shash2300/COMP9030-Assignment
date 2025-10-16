<?php

// IMPORTANT: Replace with your local database credentials
define("DB_HOST", "localhost");
define("DB_NAME", "web_dev_db");
define("DB_USER", "root");
define("DB_PASS", "password");

$conn = @mysqli_connect(DB_HOST, DB_USER, DB_PASS, DB_NAME);
if (!$conn) {
    // Something went wrong...
    echo "Error: Unable to connect to database.<br>";
    echo "Debugging errno: " . mysqli_connect_errno() . "<br>";
    echo "Debugging error: " . mysqli_connect_error() . "<br>";
    exit;
}