<?php
	// parse submitted JSON data from client request
    $inData = getRequestInfo();

	// input data
    $userId = $inData["userId"];
    $firstName = $inData["firstName"];
    $lastName = $inData["lastName"];
    $email = $inData["email"];
    $phone = $inData["phone"];

	// connection to database
    $conn = new mysqli("localhost", "TheBeast", "WeLoveCOP4331", "COP4331");

    if ($conn->connect_error) // check for connection error
    {
        returnWithError($conn->connect_error); // returns error message
    } 
    else
    {
        $stmt = $conn->prepare("INSERT into Contacts (userId, firstName, lastName, email, phone) VALUES(?,?,?,?,?)");
        $stmt->bind_param("issss", $userId, $firstName, $lastName, $email, $phone); // i - int s - String

        if ($stmt->execute()) 
        {
            returnWithInfo($stmt->insert_id); // returns contactId
        } 
        else 
        {
            returnWithError($stmt->error); // returns SQL error
        }

        // close prepared statement and database connection
        $stmt->close();
        $conn->close();
    }

    // helpers

    // parse incoming JSON data from client
    function getRequestInfo()
    {   // decode JSON input into array
        return json_decode(file_get_contents('php://input'), true);
    }

    // sends JSON response back to client
    function sendResultInfoAsJson($obj)
    {
        // set response header
        header('Content-type: application/json');
        echo $obj; // output JSON object
    }

    // returns error message to client
    function returnWithError($err)
    {
        // JSON object containing error message
        $retValue = '{"error":"' . $err . '"}';
        sendResultInfoAsJson($retValue); // send JSON object to client
        exit; 
    }

    // returns contactId to client and empty error message
    function returnWithInfo($id)
    {
        $retValue = '{"id":' . $id . ',"error":""}'; // creates JSON object with contactId and empty error message
        sendResultInfoAsJson($retValue); // sends JSON object to client
        exit; 
    }
?>
