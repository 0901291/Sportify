<?php
	require ('settings.php');
	if (isset($_POST["query"]) && isset($_POST["searchType"]))
	{
		$query 		= urlencode ($_POST["query"]);
		$searchType = $_POST["searchType"];
		if (!empty($query) && !empty($searchType)) 
		{
			switch ($searchType)
			{
				case "genre":
					$url = ROOT . "includes/genres.php?genre=" . $query;
					break;
				case "artist":
					$url = "http://ws.audioscrobbler.com/2.0/?method=artist.search&limit=8&api_key=32e06deb9c737aab6d47e3e4183dba39&format=json&artist=" . $query;
					break;
			}
			$data = json_decode(file_get_contents($url));
				$filteredObject    			= new stdClass(); 
				$filteredObject->results 	= [];
				if (gettype($data->{"results"}->{$searchType . "matches"}) == "object")
				{
					foreach ($data->{"results"}->{$searchType . "matches"}->{$searchType} as $result) 
					{
						if (gettype($result) == "object")
						{
							$object = new stdClass();
							$object->name = $result->{"name"};
							if ($searchType == "genre")
							{
								$object->artist_hot = $result->{"artist_hot"};
							}
							array_push($filteredObject->{"results"}, $object);
						}
					}
				}
			if (count($filteredObject) > 0)
			{
				print_r(json_encode($filteredObject));
			}
		}
		else
		{
			switch ($searchType)
			{
				case "genre":
					$url = ROOT . "includes/genres.php";
					break;
				case "artist":
					$url = "http://ws.audioscrobbler.com/2.0/?method=geo.gettopartists&country=netherlands&api_key=32e06deb9c737aab6d47e3e4183dba39&format=json&limit=8";
					break;
			}
			$data 						= json_decode(file_get_contents($url));
			$filteredObject    			= new stdClass(); 
			$filteredObject->results 	= [];

			if ($searchType == "artist")
			{
				if (gettype($data->{"topartists"}) == "object")
				{
					foreach ($data->{"topartists"}->{"artist"} as $result) 
					{	
						if (gettype($result) == "object")
						{
							$object = new stdClass();			
							$object->name 		= $result->{"name"};
							array_push($filteredObject->{"results"}, $object);
						}
					}
				}
			}
			else
			{
				if (gettype($data) == "object")
				{
					$i = 0;
					foreach ($data->{"results"}->{"genrematches"}->{"genre"} as $result) 
					{
						if (gettype($result) == "object")
						{
							$object = new stdClass();
							$object->name 		= $result->{"name"};
							$object->artist_hot = $result->{"artist_hot"};
							array_push($filteredObject->{"results"}, $object);
						}
						$i++;
						if ($i == 8) break;
					}
				}
			}
			if (count($filteredObject) > 0)
			{
				print_r(json_encode($filteredObject));
			}
		}
	}


