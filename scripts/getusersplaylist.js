$(initPlaylist);

var chosenPlaylist = [];
var newOffset,
totalPlaylists;
var chosen 	= [];
var artists = [];
var currentOffset = 0;

function initPlaylist () {
	$.when(login()).then(function () {
		getUsersPlaylists (0);
		$('.wrapper').on("click", "#playlists input[name='playlist']", function () {
			chosenPlaylist = [$(this).attr("id"), $(this).attr("data-owner")];
		});
		$("#uri-form").on("submit", function (e) {
			e.preventDefault ();
		});
		$(".wrapper").on("click", "#playlist-pagination li", getNextOffset);
	})
}

function printPagination () {
	if (totalPlaylists > 10) {
		var paginationUl = $("#playlist-pagination");
		paginationUl.empty();
		if (currentOffset > 0) {
			paginationUl.append($("<li>", {
				"data-offset": (currentOffset - 10),
				class: "waves-effect"
			}).append($("<i>", {
				class: "mdi-navigation-chevron-left"
			})));
		}
		else {
			paginationUl.append($("<li>", {
				class: "disabled"
			}).append($("<i>", {
				class: "mdi-navigation-chevron-left"
			})));
		}
		var zero;
		if (currentOffset == 0) {
			zero = 0;
		}
		else if (currentOffset == 10) {
			zero = currentOffset - 10;
		}
		else if (currentOffset == (Math.ceil(totalPlaylists / 10) * 10) - 10) {
			zero = currentOffset - 40;
		}
		else if (currentOffset == (Math.ceil(totalPlaylists / 10) * 10) - 20) {
			zero = currentOffset - 30;
		}
		else {
			zero = currentOffset - 20;
		}
		var maxPages = (Math.ceil(totalPlaylists / 10) * 10) / 10;
		if (maxPages > 5) {
			maxPages = 5;
		}
		for (var i = 1; i <= maxPages; i++) {
			if (currentOffset == zero) {
				classOfPagination = "active";
			}
			else {
				classOfPagination = "waves-effect";
			}
			paginationUl.append($("<li>", {text: zero / 10 + 1, class: classOfPagination, "data-offset": zero}));
			zero += 10;
		}
		if (currentOffset < Math.ceil(totalPlaylists - 10)) {
			paginationUl.append($("<li>", {
				"data-offset": currentOffset + 10,
				class: "waves-effect"
			}).append($("<i>", {
				class: "mdi-navigation-chevron-right"
			})));
		}
		else {
			paginationUl.append($("<li>", {
				class: "disabled"
			}).append($("<i>", {
				class: "mdi-navigation-chevron-right"
			})));
		}
	}
}

function getNextOffset (e) {
	currentOffset = parseInt($(e.currentTarget).attr("data-offset"));
	getUsersPlaylists($(e.currentTarget).attr("data-offset"));
}

function getUsersPlaylists (offset) {
	$.ajax({
		url: 		"https://api.spotify.com/v1/users/" + getCookie("user_id") + "/playlists?limit=10&offset=" + offset,
		headers: {
            'Authorization': 'Bearer ' + getCookie("access_token") //localStorage.access_token is a string.
        },
		dataType: 	'json',
		success: 	function (output) {
			setTimeout(function () {
				setTotalPlaylists (output);
				printPagination ();
				printPlaylists (output);
			}, 100);
		}
	});
}

function setTotalPlaylists (output) {
	totalPlaylists = output.total;
}

function printPlaylists (playlists) {
	console.log(playlists);
	$("#playlists").empty();
	if (totalPlaylists > 0) {
		$.each (playlists.items, function (k, v) {
			var playlistName = truncateText (v.name);
			$('#playlists')
				.append($("<li>")
					.append($("<a>", {href: v.external_urls.spotify, target: "_blank"})
						.append($("<span>", {class: "mdi-av-play-circle-outline"})))
					.append($("<input>", {type: "radio", value: v.id, id: v.id, name: "playlist", class: "with-gap", "data-owner": v.owner.id, alt: v.name}))
					.append($("<label>", {text: playlistName, for: v.id, class: "tooltipped", "data-position": "top", "data-delay": "50", "data-tooltip": v.name})));
			launchOnResize();
		})
		$('.tooltipped').tooltip({delay: 50});
	}
	else {
		$('#playlists')
			.append($("<li>", {text: "Sorry, je hebt nog geen afspeellijsten."}));
	}
}

function validatePlaylist () {
    var uri = $("#uriplaylist").val();
    if (uri != "") {
        return validateURI(uri);
    }
    else if (chosenPlaylist.length > 0) {
		getSongsFromPlaylist (0);
		return true;
	}
	else {
		return false;
	}
}

function validateURI (uri) {
    if (/^spotify:user:\w{0,}:playlist:\w{0,}/i.test(uri)) {
    	var urisplit = uri.split(":");
    	if (getCookie("user_id") == urisplit[2]) {
    		chosenPlaylist = [urisplit[4], urisplit[2]];
    		getSongsFromPlaylist (0);
    		return true;
    	}
    	else {
    		toast("Je kunt deze playlist niet gebruiken.", 4000);
    		return false;
    	}
    }
    else {
    	toast("Je kunt deze playlist niet gebruiken.", 4000);
        return false;
    }
}

function getSongsFromPlaylist (offset) {
	$.ajax({
		url: 		"https://api.spotify.com/v1/users/" + chosenPlaylist[1] + "/playlists/" + chosenPlaylist[0] + "/tracks?offset=" + offset,
		headers: {
            'Authorization': 'Bearer ' + getCookie("access_token") //localStorage.access_token is a string.
        },
		dataType: 	'json',
		success: 	function (output) {
			if (output.next != null) {
				newOffset = offset + 100;
				getSongsFromPlaylist(newOffset);
				getArtistFromSongs (output);
			}
			else {
				getArtistFromSongs (output);
				selectArtists ();
			}
		}
	});
}

function getArtistFromSongs (songs) {
	$.each (songs.items, function () {
		$.each (this.track.artists, function (k, v) {
			if ($.inArray(v.name, artists) == - 1) {
				artists.push(v.name);
			};
		});
	});
}

function selectArtists () {
	artists = shuffleArray (artists);
	chosen 	= [];
	for (var i = 0; i < ((artists.length < 5) ? artists.length : 5); i++) {
		chosen.push(artists[i]);
	}
	addPlaylistArtistsToCallInfo ();
}

function shuffleArray (array) {
	var array 		= array;
	var i 			= array.length, rdm, shuffle;
	while (--i > 0) {
	    rdm 		= Math.floor(Math.random() * (i + 1))
	    shuffle 	= array[rdm];
	    array[rdm] 	= array[i];
	    array[i] 	= shuffle;
	}
	return array;
}

function addPlaylistArtistsToCallInfo () {
	$.when(removeAttributes).then(function(){    
		if (chosen.length > 0) {
	        $.each(chosen, function (k, v) {
	            allAttributes.push("artist=" + v.replace("&", "%26"));
	        });
	        allAttributes.push("type=artist-radio");
	        makeURL();
	    }
	    else {
	        nextPage(2, "slide");
	        return false;
	    }
	});
}