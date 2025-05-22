<?php
session_start();

// Generate CSRF token if one doesn't exist
if (!isset($_SESSION['csrf_token'])) {
    $_SESSION['csrf_token'] = bin2hex(random_bytes(32));
}

// Return token to JavaScript
header('Content-Type: application/json');
echo json_encode([
    'status' => 'success',
    'token' => $_SESSION['csrf_token']
]);
?>