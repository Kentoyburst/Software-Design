<?php
ini_set('display_errors', 1);
error_reporting(E_ALL);

// Collect data from the form
$usernameOrEmail = $_POST['username'] ?? '';
$password = $_POST['password'] ?? '';

// Database connection
$host = "localhost";
$dbUsername = "root";
$dbPassword = "";
$dbName = "registered_accounts";

$conn = new mysqli($host, $dbUsername, $dbPassword, $dbName);

if ($conn->connect_error) {
    die(json_encode(['success' => false, 'message' => 'Database connection failed']));
}

// Check if the account is locked
$checkLockQuery = "SELECT * FROM login_attempts WHERE username = ? OR email = ? LIMIT 1";
$checkLockStmt = $conn->prepare($checkLockQuery);

if (!$checkLockStmt) {
    die(json_encode(['success' => false, 'message' => 'Database error']));
}

$checkLockStmt->bind_param("ss", $usernameOrEmail, $usernameOrEmail);
$checkLockStmt->execute();
$lockResult = $checkLockStmt->get_result();

// If we have a record in login_attempts table
if ($lockResult->num_rows > 0) {
    $lockInfo = $lockResult->fetch_assoc();
    
    // Check if account is permanently locked
    if ($lockInfo['is_locked'] == 2) {
        echo json_encode([
            'success' => false, 
            'message' => "Your account is permanently locked. Please contact the administrator."
        ]);
        exit;
    }

    // Check if account is temporarily locked
    if ($lockInfo['is_locked'] == 1) {
        $lockTime = strtotime($lockInfo['lock_time']);
        $currentTime = time();
        $lockDuration = 60; // 1 minute in seconds
        
        // If lock time hasn't expired
        if ($currentTime - $lockTime < $lockDuration) {
            $remainingTime = $lockDuration - ($currentTime - $lockTime);
            $remainingSeconds = ceil($remainingTime);
            
            echo json_encode([
                'success' => false, 
                'message' => "Your account is locked. Please try again after $remainingSeconds seconds."
            ]);
            exit;
        } else {
            // Reset the lock if timeout has passed
            $resetLockQuery = "UPDATE login_attempts SET attempts = 0, is_locked = 0, lock_time = NULL WHERE username = ? OR email = ?";
            $resetLockStmt = $conn->prepare($resetLockQuery);
            $resetLockStmt->bind_param("ss", $usernameOrEmail, $usernameOrEmail);
            $resetLockStmt->execute();
            $resetLockStmt->close();
        }
    }
}

$checkLockStmt->close();

// Proceed with normal login
$query = "SELECT * FROM register WHERE userName = ? OR email = ? LIMIT 1";
$stmt = $conn->prepare($query);

if (!$stmt) {
    die(json_encode(['success' => false, 'message' => 'Database error']));
}

$stmt->bind_param("ss", $usernameOrEmail, $usernameOrEmail);
$stmt->execute();
$result = $stmt->get_result();

if ($result->num_rows === 0) {
    // Record failed attempt - account doesn't exist
    recordFailedAttempt($conn, $usernameOrEmail);
    echo json_encode(['success' => false, 'message' => 'Account not found']);
    exit;
}

$user = $result->fetch_assoc();

if (!password_verify($password, $user['password'])) {
    // Record failed attempt - wrong password
    recordFailedAttempt($conn, $user['userName'], $user['email']);
    echo json_encode(['success' => false, 'message' => 'Incorrect password']);
    exit;
}

// Successful login - Reset attempts counter
resetAttempts($conn, $user['userName'], $user['email']);

echo json_encode([
    'success' => true,
    'message' => 'Login successful',
    'user' => [
        'username' => $user['userName'],
        'email' => $user['email'],
        'role' => $user['role'],
        'type' => ($user['role'] === 'admin') ? 'admin' : 'user'
    ]
]);
session_start();
$_SESSION['user'] = [
    'username' => $user['userName'],
    'email' => $user['email'],
    'role' => $user['role'],
    'logged_in' => true
];

$stmt->close();
$conn->close();

/**
 * Record a failed login attempt
 */
function recordFailedAttempt($conn, $username, $email = null) {
    // Check if we already have an entry for this user
    $checkQuery = "SELECT * FROM login_attempts WHERE username = ? OR email = ? LIMIT 1";
    $checkStmt = $conn->prepare($checkQuery);
    $checkStmt->bind_param("ss", $username, $email ?? $username);
    $checkStmt->execute();
    $result = $checkStmt->get_result();
    
    if ($result->num_rows > 0) {
        // Update existing record
        $record = $result->fetch_assoc();
        $attempts = $record['attempts'] + 1;
        
        $updateQuery = "UPDATE login_attempts SET attempts = ?, last_attempt = NOW()";
        
        // If 3 or more attempts, temporarily lock the account for 1 minute
        if ($attempts >= 3 && $attempts < 7) {
            $updateQuery .= ", is_locked = 1, lock_time = NOW()";
        }
        // If 7 or more attempts, permanently lock the account
        else if ($attempts >= 7) {
            $updateQuery .= ", is_locked = 2, lock_time = NOW()";
        }
        
        $updateQuery .= " WHERE id = ?";
        $updateStmt = $conn->prepare($updateQuery);
        $updateStmt->bind_param("ii", $attempts, $record['id']);
        $updateStmt->execute();
        $updateStmt->close();
    } else {
        // Create new record
        $insertQuery = "INSERT INTO login_attempts (username, email, attempts, last_attempt) VALUES (?, ?, 1, NOW())";
        $insertStmt = $conn->prepare($insertQuery);
        $insertStmt->bind_param("ss", $username, $email ?? $username);
        $insertStmt->execute();
        $insertStmt->close();
    }
    
    $checkStmt->close();
}

/**
 * Reset attempts counter after successful login
 */
function resetAttempts($conn, $username, $email) {
    $resetQuery = "UPDATE login_attempts SET attempts = 0, is_locked = 0, lock_time = NULL WHERE username = ? OR email = ?";
    $resetStmt = $conn->prepare($resetQuery);
    $resetStmt->bind_param("ss", $username, $email);
    $resetStmt->execute();
    $resetStmt->close();
}
?>