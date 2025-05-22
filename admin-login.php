<?php
session_start();
require 'db.php';

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $admin_username = $_POST['admin-username'];
    $admin_password = $_POST['admin-password'];
    $captcha_response = $_POST['g-recaptcha-response'];

    // Verify CAPTCHA
    if (!verifyCaptcha($captcha_response)) {
        echo json_encode(["status" => "error", "message" => "CAPTCHA verification failed."]);
        exit();
    }

    $sql = "SELECT id, password FROM admins WHERE username = ?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("s", $admin_username);
    $stmt->execute();
    $stmt->store_result();
    $stmt->bind_result($admin_id, $hashed_password);
    $stmt->fetch();

    if ($stmt->num_rows > 0 && password_verify($admin_password, $hashed_password)) {
        $_SESSION['admin_logged_in'] = true;
        $_SESSION['admin_username'] = $admin_username;
        
        // Direct login without verification code
        header("Location: admin-dashboard.html");
        exit();
    } else {
        echo json_encode(["status" => "error", "message" => "Invalid credentials."]);
    }

    $stmt->close();
}

function verifyCaptcha($captcha_response) {
    // Skip verification for development - in production, use this code:
    if (empty($captcha_response)) return false;
    
    $secret_key = "6LeBHvEqAAAAALomB7eQjwZhYLF-cr7YF7nG1q1e";
    $url = "https://www.google.com/recaptcha/api/siteverify";
    $data = [
        'secret' => $secret_key,
        'response' => $captcha_response
    ];
    
    $options = [
        'http' => [
            'header' => "Content-type: application/x-www-form-urlencoded\r\n",
            'method' => 'POST',
            'content' => http_build_query($data)
        ]
    ];
    
    $context = stream_context_create($options);
    $response = file_get_contents($url, false, $context);
    $result = json_decode($response, true);
    
    return $result['success'];
}

$conn->close();
?>