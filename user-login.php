<?php
session_start();
require 'db.php';
require_once 'config.php'; // New file for storing configuration variables

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Generate and check CSRF token
    if (!isset($_POST['csrf_token']) || $_POST['csrf_token'] !== $_SESSION['csrf_token']) {
        echo json_encode(["status" => "error", "message" => "Invalid request."]);
        exit();
    }
    
    $username = $_POST['username'];
    $password = $_POST['password'];
    $captcha_response = $_POST['g-recaptcha-response'];

    // Verify CAPTCHA
    $captcha_result = verifyCaptcha($captcha_response);
    if (!$captcha_result['success']) {
        echo json_encode(["status" => "error", "message" => "CAPTCHA verification failed: " . ($captcha_result['error_message'] ?? "Please try again.")]);
        exit();
    }

    $sql = "SELECT id, password FROM users WHERE username = ?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("s", $username);
    $stmt->execute();
    $stmt->store_result();
    $stmt->bind_result($user_id, $hashed_password);
    $stmt->fetch();

    if ($stmt->num_rows > 0 && password_verify($password, $hashed_password)) {
        $_SESSION['user_logged_in'] = true;
        $_SESSION['username'] = $username;
        
        // Direct login without verification code
        header("Location: user-dashboard.html");
        exit();
    } else {
        // Use generic error message to prevent username enumeration
        echo json_encode(["status" => "error", "message" => "Invalid credentials."]);
    }

    $stmt->close();
}

// Function to verify Google reCAPTCHA response
function verifyCaptcha($captcha_response) {
    global $recaptcha_secret_key;
    
    // Return detailed result structure
    $result = [
        'success' => false,
        'error_message' => null
    ];
    
    // Check if CAPTCHA response exists
    if (empty($captcha_response)) {
        $result['error_message'] = "Please complete the CAPTCHA verification.";
        return $result;
    }
    
    // Skip verification in development environment if configured
    if (defined('ENVIRONMENT') && ENVIRONMENT === 'development' && defined('SKIP_CAPTCHA') && SKIP_CAPTCHA === true) {
        $result['success'] = true;
        return $result;
    }
    
    // Verify with Google's API
    $url = "https://www.google.com/recaptcha/api/siteverify";
    $data = [
        'secret' => $recaptcha_secret_key,
        'response' => $captcha_response,
        'remoteip' => $_SERVER['REMOTE_ADDR']
    ];
    
    $options = [
        'http' => [
            'header' => "Content-type: application/x-www-form-urlencoded\r\n",
            'method' => 'POST',
            'content' => http_build_query($data),
            'timeout' => 10
        ]
    ];
    
    $context = stream_context_create($options);
    
    try {
        $response = file_get_contents($url, false, $context);
        $response_data = json_decode($response, true);
        
        if (isset($response_data['success']) && $response_data['success'] === true) {
            $result['success'] = true;
        } else {
            $result['error_message'] = "CAPTCHA verification failed: " . 
                (isset($response_data['error-codes']) ? implode(', ', $response_data['error-codes']) : "Unknown error");
        }
    } catch (Exception $e) {
        $result['error_message'] = "CAPTCHA service unavailable. Please try again later.";
        // Log the error internally
        error_log("reCAPTCHA verification error: " . $e->getMessage());
    }
    
    return $result;
}

// Generate CSRF token for the form
if (!isset($_SESSION['csrf_token'])) {
    $_SESSION['csrf_token'] = bin2hex(random_bytes(32));
}

$conn->close();
?>