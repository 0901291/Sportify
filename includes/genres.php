<?php
require ("settings.php");
if (isset($_GET["genre"]))
{
	$data 													= json_decode(file_get_contents('../data/json/genres.json'));
	$filteredObject    										= new stdClass();
	$filteredObject->results								= new stdClass();
	$filteredObject->results->genrematches					= new stdClass();
	$filteredObject->{"results"}->{"genrematches"}->genre  	= [];

	foreach ($data->{"results"}->{"genrematches"}->genre as $result) 
	{	
		$object = new stdClass();
		if (strpos(strtolower($result->{"name"}), strtolower($_GET["genre"])) !== false)
		{
			$object->name 		= $result->{"name"};
			$object->artist_hot = $result->{"artist_hot"};
			array_push($filteredObject->{"results"}->{"genrematches"}->{"genre"}, $object);
		}
	}
	print_r(json_encode($filteredObject));
}
else
{
	print_r(file_get_contents(ROOT . "data/json/genres.json"));
}