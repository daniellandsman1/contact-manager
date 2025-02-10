<?php
	// parse submitted JSON data from client request
    $inData = getRequestInfo();

	// input data 
    $userId = $inData["UserID"];
    $firstName = $inData["FirstName"];
    $lastName = $inData["LastName"];
    $email = $inData["Email"];
    $phone = $inData["Phone"];
    $jobTitle = $inData["JobTitle"];
    $company = $inData["Company"];
    $link = $inData["LinkedIn"];

	// connection to database
    $conn = new mysqli("localhost", "TheBeast", "WeLoveCOP4331", "COP4331");

    if ($conn->connect_error) // check for connection error
    {
        returnWithError($conn->connect_error); // returns error message
    } 
    else
    {
        // check for duplicates
        $stmt = $conn->prepare("SELECT ID FROM Contacts WHERE UserID=? AND LOWER(FirstName)=LOWER(?) AND LOWER(LastName)=LOWER(?) AND LOWER(Email)=LOWER(?) AND Phone=? AND LinkedIn=? AND JobTitle=? AND Company=?");
        $stmt->bind_param("isssssss", $userId, $firstName, $lastName, $email, $phone, $link, $jobTitle, $company);
        $stmt->execute();
        $stmt->store_result();

        if ($stmt->num_rows > 0) // if a duplicate exists
        {
            returnWithError("Duplicate contact already exists."); // return error message
        } 
        else 
        {
            $stmt->close(); // close previous statement before preparing a new one

            // insert new contact 
            $stmt = $conn->prepare("INSERT INTO Contacts (UserID, FirstName, LastName, Email, Phone, JobTitle, Company, LinkedIn) VALUES(?,?,?,?,?,?,?,?)");
            $stmt->bind_param("isssssss", $userId, $firstName, $lastName, $email, $phone, $jobTitle, $company, $link); 

            if ($stmt->execute()) 
            {
                returnWithInfo($conn->insert_id); // $conn->insert_id instead of $stmt->insert_id
            } 
            else 
            {
                returnWithError($stmt->error); // returns SQL error
            }
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
