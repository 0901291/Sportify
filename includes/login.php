<?php
require ("initialize.php");
if (isset($_COOKIE["user_id"]) && !isset($_COOKIE["isLoggedIn"])) 
{
	$user = searchUser($conn);
	if ($user -> num_rows == 0)
	{
		// echo "niet gevonden";
		$registerQuery =  "INSERT INTO " . DB_PREFIX . "users (idSpotify) VALUES ('" . $_COOKIE["user_id"] . "')";
		$conn -> query($registerQuery);
	}
	else 
	{
		// echo "gevonden";
	}
	setcookie("isLoggedIn", true, time() + 3600, "/");
}


function searchUser($conn)
{
	$userQuery = "SELECT * FROM ".DB_PREFIX."users WHERE idSpotify = '" . $_COOKIE['user_id'] . "'";
	return $conn -> query($userQuery); 
}