<?php
require("initialize.php");

initSearchPlaylists($conn);

function initSearchPlaylists ($conn) 
{
    if (isset($_POST["query"]) && !empty($_POST["query"]))
    {
        $query = htmlentities($_POST["query"]);
        getCorrespondingPlaylistsFromDb ($conn, $query);
    }
}
                                     
function getCorrespondingPlaylistsFromDb ($conn, $searchQuery) 
{
    $query  = "SELECT * FROM sportify_playlists WHERE name LIKE '%". $searchQuery ."%'";
    $row    = $conn -> query($query);
    $results = [];
    while ($data = $row -> fetch_assoc())
    {
        array_push($results, $data);
    };
    
    returnSearchResults ($results);
    
}

function returnSearchResults ($results)
{
    $object = new stdClass();
    $object -> results = [];
    
    foreach ($results as $result)
    {
        $item = new stdClass();
        $item -> name = $result["name"];
        $item -> id   = $result["idPlaylists"];
        array_push($object->results, $item);
    }
    
    $dataJson = json_encode($object);
    print_r($dataJson);
    die();
}

