<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Content-Type: application/json");

// Handle preflight OPTIONS request
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}


$inData = getRequestInfo();

$firstname = $inData["FirstName"] ?? "";
$lastname = $inData["LastName"] ?? "";
$login = strtolower($inData["Login"] ?? ""); // Normalize login
$password = $inData["Password"] ?? "";

if (empty($firstname) || empty($lastname) || empty($login) || empty($password)) {
    returnWithError("All fields are required.");
    exit();
}

$conn = new mysqli("localhost", "TheBeast", "WeLoveCOP4331", "COP4331");

if ($conn->connect_error) {
    error_log($conn->connect_error);
    returnWithError("An error occurred while connecting to the database.");
    exit();
}

$stmt = $conn->prepare("SELECT COUNT(*) as count FROM Users WHERE Login = ?");
$stmt->bind_param("s", $login);
$stmt->execute();
$result = $stmt->get_result();
$row = $result->fetch_assoc();

if ($row['count'] > 0) { // Username already exists
    returnWithError("Username '$login' is already taken.");
} else {
    $hashedPassword = password_hash($password, PASSWORD_DEFAULT); // Secure password storage
    $stmt = $conn->prepare("INSERT INTO Users (FirstName, LastName, Login, Password) VALUES(?,?,?,?)");
    $stmt->bind_param("ssss", $firstname, $lastname, $login, $hashedPassword);
    $stmt->execute();

    if ($stmt->affected_rows > 0) {
        returnWithError(""); // Success
    } else {
        error_log($stmt->error);
        returnWithError("Failed to register the user.");
    }
}

$stmt->close();
$conn->close();

function getRequestInfo()
{
    return json_decode(file_get_contents('php://input'), true);
}

function sendResultInfoAsJson($obj)
{
    header('Content-type: application/json');
    echo $obj;
}

function returnWithError($err)
{
    $retValue = '{"error":"' . $err . '"}';
    sendResultInfoAsJson($retValue);
}
