<?php
	$inData = getRequestInfo();
	
	$newFirstName = trim($inData["FirstName"]);
	$newLastName = trim($inData["LastName"]);
	$newEmail = trim($inData["Email"]);
	$newPhone = trim($inData["Phone"]);
	$contactID = $inData["ID"];
	$userID = $inData["UserID"];

	if (empty($newFirstName) ||
		empty($newLastName) ||
		empty($newEmail) ||
		empty($newPhone) ||
		empty($contactID) ||
		empty($userID))
	{
		returnWithError("Missing one or more required fields");
	}

	else
	{
		$conn = new mysqli("localhost", "TheBeast", "WeLoveCOP4331", "COP4331");
		if ($conn->connect_error) 
		{
			returnWithError( $conn->connect_error );
		} 
		else
		{
			$stmt = $conn->prepare("SELECT ID FROM Contacts WHERE ID=? AND UserID=?");
			$stmt->bind_param("ii", $contactID, $userID);
			$stmt->execute();
			$stmt->store_result();

			if ($stmt->num_rows == 0)
			{
				returnWithError("Contact does not exist for this ID and UserID");
				$stmt->close();
				$conn->close();
			}

			else
			{
				$stmt->close();
				$stmt = $conn->prepare("UPDATE Contacts SET FirstName=?, LastName=?, Email=?, Phone=? WHERE ID=? AND UserID=?");
				$stmt->bind_param("ssssii", $newFirstName, $newLastName, $newEmail, $newPhone, $contactID, $userID);
				$stmt->execute();
				
				if ($stmt->affected_rows > 0)
				{
					$newContactInfo = '{"FirstName" : "' . $newFirstName . '", "LastName" : "' . $newLastName . '", "Email" : "' . $newEmail . '", "Phone" : "' . $newPhone . '"}';
					returnWithInfo($newContactInfo);
				}
				else
				{
					returnWithError("No Records Updated");
				}

				$stmt->close();
				$conn->close();
			}
		}
	}

	function getRequestInfo()
	{
		return json_decode(file_get_contents('php://input'), true);
	}

	function sendResultInfoAsJson( $obj )
	{
		header('Content-type: application/json');
		echo $obj;
	}
	
	function returnWithError( $err )
	{
		$retValue = '{"error":"' . $err . '"}';
		sendResultInfoAsJson( $retValue );
	}

	function returnWithInfo( $newContactInfo )
	{
		$retValue = '{"newContactInfo":' . $newContactInfo . ',"error":""}';
		sendResultInfoAsJson( $retValue );
	}
	
?>