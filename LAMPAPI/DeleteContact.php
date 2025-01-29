<?php
	// submitted data
    $inData = getRequestInfo();

	// input data
    $contactId = $inData["contactId"] ?? 0;
    $userId = $inData["userId"] ?? 0;

	// validates input
    if ($contactId <= 0 || $userId <= 0) {
        sendResultInfoAsJson("Invalid input: Both contactId and userId are required.");
        exit;
    }

	// creates new connection to database
    $conn = new mysqli("localhost", "TheBeast", "WeLoveCOP4331", "COP4331");

    if ($conn->connect_error) {
        sendResultInfoAsJson(["error" => "Connection failed: " . $conn->connect_error]);
        exit;
    } else {
        $stmt = $conn->prepare("DELETE FROM Contacts WHERE ID = ? AND UserId = ?");
        $stmt->bind_param("ii", $contactId, $userId); // i - integer

        if ($stmt->execute()) {
            if ($stmt->affected_rows > 0) { // checks if row is deleted
                sendResultInfoAsJson("Contact deleted successfully.");
            } else {
                sendResultInfoAsJson("No contact found.");
            }
        } else {
            sendResultInfoAsJson("SQL Error: " . $stmt->error);
        }

        $stmt->close();
        $conn->close();
    }

    // helpers

    function getRequestInfo()
    {
        return json_decode(file_get_contents('php://input'), true);
    }

    function sendResultInfoAsJson($obj)
    {
        header('Content-type: application/json');
        echo json_encode($obj);
        exit; 
    }
?>