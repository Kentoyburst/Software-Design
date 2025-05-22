<?php
ini_set('display_errors', 1);
error_reporting(E_ALL);


$host = "localhost";
$dbUsername = "root";
$dbPassword = "";
$dbName = "registered_accounts";

$conn = new mysqli($host, $dbUsername, $dbPassword, $dbName);

if ($conn->connect_error) {
    die(json_encode(['error' => "Connection failed: " . $conn->connect_error]));
}


$tableCheck = "SHOW TABLES LIKE 'register'";
$tableResult = $conn->query($tableCheck);
if ($tableResult->num_rows == 0) {
    die(json_encode(['error' => "Table 'register' does not exist in the database"]));
}


$columnCheck = "SHOW COLUMNS FROM register";
$columnResult = $conn->query($columnCheck);
$columns = [];
while ($row = $columnResult->fetch_assoc()) {
    $columns[] = $row['Field'];
}


$statusField = in_array('status', $columns) ? 'status' : "'active' as status";
$lastLoginField = in_array('lastLogin', $columns) ? 'lastLogin' : "'N/A' as lastLogin";


$sql = "SELECT id, userName, email, role, $statusField, $lastLoginField FROM register";
$result = $conn->query($sql);

if (!$result) {
    die(json_encode(['error' => "Query error: " . $conn->error]));
}

$users = [];
if ($result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
     
        if (!isset($row['status']) || empty($row['status'])) {
            $row['status'] = 'active';
        }
  
        if (!isset($row['lastLogin']) || empty($row['lastLogin'])) {
            $row['lastLogin'] = 'N/A';
        }
        $users[] = $row;
    }
} else {

    $users = [];
}

$conn->close();

header('Content-Type: application/json');
echo json_encode($users);
?>