<?php
    require ("initialize.php");
    if (isset($_POST["playlists"]) && count($_POST["playlists"]) > 0)
    {
        foreach ($_POST["playlists"] as $key => $playlistId)
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