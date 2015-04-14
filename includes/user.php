<?php
	function isLoggedIn () 
	{
		return isset($_COOKIE["isLoggedIn"]) && $_COOKIE["isLoggedIn"] && isset($_COOKIE["hasProfile"]) && $_COOKIE["hasProfile"];
	}