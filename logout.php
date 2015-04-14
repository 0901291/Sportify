<?php
	require ("includes/initialize.php");
	setcookie("isLoggedIn", null, 1, "/");
	setcookie("access_token", null, 1, "/");
	setcookie("user_id", null, 1, "/");
	setcookie("profile", null, 1, "/");
	setcookie("hasProfile", null, 1, "/");

	header("Location: " . ROOT);
	die();