<?php
    require ("initialize.php");
    if (isset($_POST["playlists"]) && count($_POST["playlists"]) > 0)
    {
        foreach ($_POST["playlists"] as $key => $playlistId)
        {
            $getOwnerQuery =
                "SELECT profiles_idProfiles owner FROM " . DB_PREFIX . "playlists WHERE idPlaylists = '" . $playlistId . "'";
            $result = $conn -> query ($getOwnerQuery) -> fetch_assoc();
            $owner = $result["owner"];
            if ($owner == $_COOKIE["profile"])
            {
                $getSchemesQuery = 
                    "SELECT idSchemes FROM " . DB_PREFIX . "schemes WHERE playlists_idPlaylists = '" . $playlistId . "'";
                $schemes = $conn -> query ($getSchemesQuery);
                foreach ($schemes as $scheme)
                {
                    $deleteSchemeHasSongsQuery =
                        "DELETE FROM " . DB_PREFIX . "schemes_has_songs WHERE schemes_idSchemes = '" . $scheme["idSchemes"] . "'";
                    $conn -> query ($deleteSchemeHasSongsQuery);
                }
                $deleteSchemeQuery = 
                    "DELETE FROM " . DB_PREFIX . "schemes WHERE playlists_idPlaylists = '" . $playlistId . "'";
                $conn -> query ($deleteSchemeQuery);
                $deletePlaylistQuery = 
                    "DELETE FROM " . DB_PREFIX . "playlists WHERE idPlaylists = '" . $playlistId . "'";
                $conn -> query ($deletePlaylistQuery);
            }
        }
    }