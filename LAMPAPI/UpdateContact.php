<?php
$inData = getRequestInfo();

// Get data from JSON input
$newFirstName = trim($inData["FirstName"]);
$newLastName = trim($inData["LastName"]);
$newEmail = trim($inData["Email"]);
$newPhone = trim($inData["Phone"]);
$contactID = $inData["ID"];
$userID = $inData["UserID"];

// Make sure all fields are filled
if (empty($newFirstName) || empty($newLastName) || empty($newEmail) || empty($newPhone) || empty($contactID) || empty($userID)) {
    returnWithError("Missing one or more required fields");
    exit();
}

// Validate email format
if (!filter_var($newEmail, FILTER_VALIDATE_EMAIL)) {
    returnWithError("Invalid email format");
    exit();
}

// Validate phone number format
if (!preg_match("/^\d{3}-\d{3}-\d{4}$/", $newPhone)) {
    returnWithError("Invalid phone number format");
    exit();
}

// Connect to database
$conn = new mysqli("localhost", "TheBeast", "WeLoveCOP4331", "COP4331");
if ($conn->connect_error) {
    returnWithError($conn->connect_error);
    exit();
}

// Check if the contact exists
$stmt = $conn->prepare("SELECT ID FROM Contacts WHERE ID=? AND UserID=?");
$stmt->bind_param("ii", $contactID, $userID);
$stmt->execute();
$stmt->store_result();

if ($stmt->num_rows == 0) {
    returnWithError("Contact does not exist for this ID and UserID");
    $stmt->close();
    $conn->close();
    exit();
}
$stmt->close();

// Check for duplicate email or phone number
$stmt = $conn->prepare("SELECT ID FROM Contacts WHERE (Email = ? OR Phone = ?) AND UserID = ? AND ID != ?");
$stmt->bind_param("ssii", $newEmail, $newPhone, $userID, $contactID);
$stmt->execute();
$stmt->store_result();

if ($stmt->num_rows > 0) {
    returnWithError("A contact with this email or phone number already exists");
    $stmt->close();
    $conn->close();
    exit();
}
$stmt->close();

// Proceed with updating contact
$stmt = $conn->prepare("UPDATE Contacts SET FirstName=?, LastName=?, Email=?, Phone=? WHERE ID=? AND UserID=?");
$stmt->bind_param("ssssii", $newFirstName, $newLastName, $newEmail, $newPhone, $contactID, $userID);
$stmt->execute();

if ($stmt->affected_rows > 0) {
    $newContactInfo = json_encode(["FirstName" => $newFirstName, "LastName" => $newLastName, "Email" => $newEmail, "Phone" => $newPhone]);
    returnWithInfo($newContactInfo);
} else {
    returnWithError("No records updated");
}

$stmt->close();
$conn->close();

function getRequestInfo() {
    return json_decode(file_get_contents('php://input'), true);
}

function sendResultInfoAsJson($obj) {
    header('Content-type: application/json');
    echo $obj;
}

function returnWithError($err) {
    $retValue = json_encode(["error" => $err]);
    sendResultInfoAsJson($retValue);
}

function returnWithInfo($newContactInfo) {
    $retValue = json_encode(["newContactInfo" => json_decode($newContactInfo), "error" => ""]);
    sendResultInfoAsJson($retValue);
}
?>
