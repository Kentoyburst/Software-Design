<?php
ini_set('display_errors', 1);
error_reporting(E_ALL);

$reg_username = $_POST['reg_username'] ?? '';
$reg_email = $_POST['reg_email'] ?? '';
$reg_password = $_POST['reg_password'] ?? '';
$reg_confirm_password = $_POST['reg_confirm_password'] ?? '';
$reg_role = $_POST['reg_role'] ?? '';
$challenge_answer = $_POST['challenge_answer'] ?? '';

if (empty($reg_username) || empty($reg_email) || empty($reg_password) || empty($reg_confirm_password) || empty($reg_role)) {
    echo "All fields are required.";
    exit;
}

if (!filter_var($reg_email, FILTER_VALIDATE_EMAIL)) {
    echo "Invalid email format.";
    exit;
}

if ($reg_password !== $reg_confirm_password) {
    echo "Passwords do not match.";
    exit;
}

if (strlen($reg_password) < 8) {
    echo "Password must be at least 8 characters long.";
    exit;
}

if (!preg_match('/[a-zA-Z]/', $reg_password)) {
    echo "Password must contain at least one letter.";
    exit;
}

if (!preg_match('/[0-9]/', $reg_password)) {
    echo "Password must contain at least one number.";
    exit;
}

if (!preg_match('/[!@#$%^&*()_+\-=\[\]{};\':"\\|,.<>\/?]/', $reg_password)) {
    echo "Password must contain at least one special character.";
    exit;
}

$host = "localhost";
$dbUsername = "root";
$dbPassword = "";
$dbName = "registered_accounts";

$conn = new mysqli($host, $dbUsername, $dbPassword, $dbName);

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

$SELECT = "SELECT email FROM register WHERE email = ? LIMIT 1";
$stmt = $conn->prepare($SELECT);
if (!$stmt) {
    die("Error preparing SELECT statement: " . $conn->error);
}

$stmt->bind_param("s", $reg_email);
if (!$stmt->execute()) {
    die("Error executing SELECT statement: " . $stmt->error);
}

$stmt->store_result();
if ($stmt->num_rows > 0) {
    echo "Someone already registered using this email.";
    $stmt->close();
    $conn->close();
    exit;
}

$stmt->close();

$SELECT_USERNAME = "SELECT userName FROM register WHERE userName = ? LIMIT 1";
$stmt = $conn->prepare($SELECT_USERNAME);
if (!$stmt) {
    die("Error preparing SELECT USERNAME statement: " . $conn->error);
}

$stmt->bind_param("s", $reg_username);
if (!$stmt->execute()) {
    die("Error executing SELECT USERNAME statement: " . $stmt->error);
}

$stmt->store_result();
if ($stmt->num_rows > 0) {
    echo "Username already taken. Please choose another one.";
    $stmt->close();
    $conn->close();
    exit;
}

$stmt->close();

// Hash the password
$hashed_password = password_hash($reg_password, PASSWORD_DEFAULT);

// Insert new record
$INSERT = "INSERT INTO register (userName, email, password, role) VALUES (?, ?, ?, ?)";
$stmt = $conn->prepare($INSERT);
if (!$stmt) {
    die("Error preparing INSERT statement: " . $conn->error);
}

$stmt->bind_param("ssss", $reg_username, $reg_email, $hashed_password, $reg_role);
if (!$stmt->execute()) {
    die("Error inserting record: " . $stmt->error);
}

// Create user status record
$user_id = $conn->insert_id;
$INSERT_STATUS = "INSERT INTO user_status (user_id, is_active, last_login) VALUES (?, 1, NOW())";
$stmt_status = $conn->prepare($INSERT_STATUS);
if (!$stmt_status) {
    die("Error preparing status INSERT statement: " . $conn->error);
}

$stmt_status->bind_param("i", $user_id);
if (!$stmt_status->execute()) {
    // If status insert fails, log it but don't stop registration
    error_log("Failed to create user status for user ID: " . $user_id);
}

$stmt_status->close();

// Set registration timestamp
$UPDATE_TIMESTAMP = "UPDATE register SET registration_date = NOW() WHERE id = ?";
$stmt_timestamp = $conn->prepare($UPDATE_TIMESTAMP);
if ($stmt_timestamp) {
    $stmt_timestamp->bind_param("i", $user_id);
    $stmt_timestamp->execute();
    $stmt_timestamp->close();
}

// Registration successful
echo "Registration completed successfully! You can now login with your account.";

// Close the main statement and connection
$stmt->close();
$conn->close();
?>