<?php
	require ("initialize.php");
	if (isLoggedIn ())
	{
		addPlaylistToDatabase ($conn);
	}
	function addPlaylistToDatabase ($conn) 
	{
		$addPlaylistQuery =
			"INSERT INTO " . DB_PREFIX . "playlists (name, description, profiles_idProfiles, BPM, image) 
			VALUES ('" . htmlentities($_POST["name"]) . "', '" . htmlentities($_POST["description"]) . "', '" . htmlentities($_COOKIE["profile"]) . "', '" . htmlentities($_POST["bpm"]) . "', '" . htmlentities($_POST["image"]) . "')";
		$conn -> query($addPlaylistQuery);
		$schemeIds = [];
		if ($_POST["scheme"] != null)
		{
			$scheme = $_POST["scheme"];
			$i = 1;
			foreach ($scheme as $slot)
			{
				$addSchemesQuery =
					"INSERT INTO " . DB_PREFIX . "schemes (playlists_idPlaylists, `order`)
					VALUES ((SELECT MAX(idPlaylists) FROM " . DB_PREFIX . "playlists), '$i')";
				$i++;
				$conn -> query($addSchemesQuery);
				$getSchemeIdQuery = 
				"SELECT MAX(idSchemes) idSchemes FROM " . DB_PREFIX . "schemes";
				$resultSchemeId = $conn -> query($getSchemeIdQuery) -> fetch_assoc();
				array_push($schemeIds, $resultSchemeId["idSchemes"]);
			}
		}
		else
		{
			$addSchemesQuery =
				"INSERT INTO " . DB_PREFIX . "schemes (playlists_idPlaylists, `order`)
				VALUES ((SELECT MAX(idPlaylists) FROM " . DB_PREFIX . "playlists), " . htmlentities($_COOKIE["profile"]) . ")";
			$conn -> query($addSchemesQuery);
			$getSchemeIdQuery = 
			"SELECT MAX(idSchemes) idSchemes FROM " . DB_PREFIX . "schemes";
				$resultSchemeId = $conn -> query($getSchemeIdQuery) -> fetch_assoc();
				array_push($schemeIds, $resultSchemeId["idSchemes"]);
		}
		$playlist = $_POST["playlist"];
		$currentScheme = "";
		$i = 1;
		foreach ($playlist as $song)
		{
			if ($schemeIds[$song[2]] != $currentScheme)
			{
				$i = 1;
			}
			$currentScheme = $schemeIds[$song[2]];
			$searchSongQuery = "SELECT idSongs FROM " . DB_PREFIX . "songs WHERE idSongs = '" . htmlentities($song[0][0]) . "'";
			if ($conn -> query($searchSongQuery) -> num_rows == 0)
			{
				$addSongsQuery = 
					"INSERT INTO " . DB_PREFIX . "songs (idSongs)
					VALUES ('" . htmlentities($song[0][0]) . "')";
				$conn -> query ($addSongsQuery);
			}
			$addSongsToSchemesQuery =
				"INSERT INTO " . DB_PREFIX . "schemes_has_songs (schemes_idSchemes, songs_idSongs, `order`)
				VALUES ('" . htmlentities($schemeIds[$song[2]]) . "', '" . htmlentities($song[0][0]) . "', '$i')";
			$conn -> query($addSongsToSchemesQuery);
			$i++;
		}
	}