function getRandomBackground () {
	if (!$('body').hasClass('home') && size !== "s") {
		if (typeof(localStorage.backgroundURL) == "undefined" || localStorage.backgroundURL === null) {
			getImagesFromFlickr ();
		}
		else {
			var dateOne 	= Date.parse(localStorage.URLSetDate);
			var dateTwo 	= new Date();
			var difference 	= new Date(dateTwo - dateOne);
			var days		= difference / 1000 / 3600 / 24;
			if (days >= 1) {
				getImagesFromFlickr ();
			}
			else {
				$('body').css('background-image', 'url("' + localStorage.backgroundURL + '")');
			}
		}
	}
}

function getImagesFromFlickr () {
	var randomNumber = Math.floor(Math.random() * 14) // Math.floor(Math.random() * (max - min + 1) + min);
    randomNumber = 0;
	$.getJSON(
		"https://api.flickr.com/services/rest/",
		{
		  api_key: "44b97c4c2557f67865d1073bd2b6d0ea",
		  method: 'flickr.groups.pools.getPhotos',
		  group_id: '2759960@N25',
		  format: 'json',
		  nojsoncallback: 1,
		  extras: 'url_z, url_o'
		},
		function (data) {
            console.log(data);
			var photo = data.photos.photo[randomNumber];
		  	var url = getBackgroundURL (photo, 'url_z');
		  	$('body').append($('<img/>').attr('src', url).load(function() {
		  		$(this).remove();
		  		$('body').css('background-image', 'url("' + url + '")');
		  		url = getBackgroundURL (photo, 'url_o');
		  		$('body').append($('<img/>').attr('src', url).load(function() {
		  			$(this).remove();
		  			$('body').css('background-image', 'url("' + url + '")');
		  			localStorage.backgroundURL 	= url;
		  			localStorage.URLSetDate 	= new Date();
		  		}));
		  	}));
		}
	);
}

function getBackgroundURL (photo, url) {
    console.log(photo);
	if (url == "url_z") {
		if (photo.url_z) {
			return photo.url_z;
		}
		else {
			return "https://farm" + photo.farm + ".staticflickr.com/" + photo.server + "/" + photo.id + "_" + photo.secret + "_z.jpg";
		}
	}
	else if (url == "url_o") {
		if (photo.url_o) {
			return photo.url_o;
		}
		else {
			return "https://farm" + photo.farm + ".staticflickr.com/" + photo.server + "/" + photo.id + "_" + photo.secret + "_o.jpg";
		}
	}
}