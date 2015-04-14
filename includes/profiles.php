<?php
require 'initialize.php';

if (!isset($_POST['action']))
{
	$action = 'getProfileId';
}
else
{
	$action = $_POST['action'];
}

$userId   		= $_COOKIE['user_id'];


switch ($action) {
	case 'getProfiles':
		$array			= [];
		$searchQuery	= "SELECT name, idProfiles FROM ".DB_PREFIX."profiles WHERE users_idUsers = (SELECT idUsers FROM ".DB_PREFIX."users WHERE idSpotify = '".$userId."')";
		$results 		= $conn -> query($searchQuery);
		if ($results->num_rows > 0)
		{
			foreach ($results as $key => $value) {
				array_push($array, $value);
			}
			print_r(json_encode($array));
		}
		else
		{
			// GAAT FOUT OOOOOOOOo
		}
	break;

	case 'createProfile':
		if (!empty($_POST['name']) && !empty($_POST['age']) && !empty($_POST['gender'])) 
		{
			$name			= $_POST['name'];
			$age			= $_POST['age'];
			$gender			= $_POST['gender'];
			$createQuery	= "INSERT INTO ".DB_PREFIX."profiles (age, gender, name, users_idUsers) VALUES('".$age."', '".$gender."', '".$name."', (SELECT idUsers FROM ".DB_PREFIX."users WHERE idSpotify = '".$userId."'))";
			$result			= $conn	-> query($createQuery);
		}
	break;

	case 'getProfileId':
		$array 			= [];
		$name			= $_POST['name'];
		$searchQuery	= "SELECT idProfiles FROM ".DB_PREFIX."profiles WHERE users_idUsers = (SELECT idUsers FROM ".DB_PREFIX."users WHERE idSpotify = '".$userId."') AND name = '".$name."'";
		$result = $conn->query($searchQuery);
		array_push($array, $result->fetch_assoc());
		print_r(json_encode($array));
		break;
	
	default:
		echo 'error';
		break;
}