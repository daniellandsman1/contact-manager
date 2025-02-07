<?php
$inData = getRequestInfo();

// Get data from JSON input
$newFirstName = trim($inData["FirstName"]);
$newLastName = trim($inData["LastName"]);
$newEmail = trim($inData["Email"]);
$newPhone = trim($inData["Phone"]);
$newJobTitle = trim($inData["JobTitle"]);
$newCompany = trim($inData["Company"]);
$newLinkedIn = trim($inData["LinkedIn"]);
$contactID = $inData["ID"];
$userID = $inData["UserID"];

// Make sure all fields are filled
if (empty($newFirstName) || empty($newLastName) || empty($newEmail) || empty($newPhone) || empty($newJobTitle) || empty($newCompany) || empty($newLinkedIn) || empty($contactID) || empty($userID)) {
    returnWithError("Missing one or more required fields");
    exit();
}

// Validate email format
if (!filter_var($newEmail, FILTER_VALIDATE_EMAIL)) {
    returnWithError("Invalid email format, please use a valid format like user@example.com");
    exit();
}

// Validate phone number format
if (!preg_match("/^\d{3}-\d{3}-\d{4}$/", $newPhone)) {
    returnWithError("Invalid phone number format, please use a valid format like 123-456-7890");
    exit();
}

if (!preg_match("/^https:\/\/www\.linkedin\.com\/in\/[a-zA-Z0-9-]+\/?$/", $newLinkedIn)) {
    returnWithError("Invalid LinkedIn URL format, input must start with 'https://www.linkedin.com/in/'");
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

// Check for duplicate email
$stmt = $conn->prepare("SELECT ID FROM Contacts WHERE Email = ? AND UserID = ? AND ID != ?");
$stmt->bind_param("sii", $newEmail, $userID, $contactID);
$stmt->execute();
$stmt->store_result();

if ($stmt->num_rows > 0) {
    returnWithError("A contact with this email already exists");
    $stmt->close();
    $conn->close();
    exit();
}
$stmt->close();

// Check for duplicate phone number
$stmt = $conn->prepare("SELECT ID FROM Contacts WHERE Phone = ? AND UserID = ? AND ID != ?");
$stmt->bind_param("sii", $newPhone, $userID, $contactID);
$stmt->execute();
$stmt->store_result();

if ($stmt->num_rows > 0) {
    returnWithError("A contact with this phone number already exists");
    $stmt->close();
    $conn->close();
    exit();
}
$stmt->close();

// Check for duplicate LinkedIn profile
$stmt = $conn->prepare("SELECT ID FROM Contacts WHERE LinkedIn = ? AND UserID = ? AND ID != ?");
$stmt->bind_param("sii", $newLinkedIn, $userID, $contactID);
$stmt->execute();
$stmt->store_result();

if ($stmt->num_rows > 0) {
    returnWithError("A contact with this LinkedIn URL already exists");
    $stmt->close();
    $conn->close();
    exit();
}
$stmt->close();

// Proceed with updating contact
$stmt = $conn->prepare("UPDATE Contacts SET FirstName=?, LastName=?, Email=?, Phone=?, JobTitle=?, Company=?, LinkedIn=? WHERE ID=? AND UserID=?");
$stmt->bind_param("sssssssii", $newFirstName, $newLastName, $newEmail, $newPhone, $newJobTitle, $newCompany, $newLinkedIn, $contactID, $userID);
$stmt->execute();

if ($stmt->affected_rows > 0) {
    $newContactInfo = json_encode(["FirstName" => $newFirstName, "LastName" => $newLastName, "Email" => $newEmail, "Phone" => $newPhone, "JobTitle" => $newJobTitle, "Company" => $newCompany, "LinkedIn" => $newLinkedIn]);
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
