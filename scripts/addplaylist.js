var usedSongs = [];
$(initAddPlaylist);
function initAddPlaylist () {
    // You have to JSON.parse, else it's just a string (because you can't just store arrays in localStorage);
    var playlist = JSON.parse(localStorage.playlist);
    localStorage.playlistImage = playlist[0][0][5];
    printSongs (playlist);
    $("#playlistName").val("Sportify - " + (localStorage.trainingType == "intervaltraining" ? "Intervaltraining" : (localStorage.bpm + " bpm")) + " - " + localStorage.duration / 60000 + " minuten - " + getDate ());
    $("#songs").on("click", ".remove-song", searchNewSong);
    fillUsedSongs (playlist);
}

function fillUsedSongs (playlist) {
    $.each(playlist, function (k, v) {
        usedSongs.push(v[1]);
    });
}

function printSongs (playlist) {
    $("#songs").empty();
    $.each(playlist, function(k, v) {
        $("#songs")
            .append($("<li>", {class: "song"})
                .append($("<div>", {class:"play-image"})
                    .append($("<img>", {src: v[0][5], alt: v[0][1]}))
                    .append($("<i>", {class: "play mdi-av-play-arrow small"}))
                .on("click", playAudio)
                .attr("data-audio", v[0][4])
                )
                .append($("<div>", {class:"songInfo"})
                    .append($("<p>", {text: truncateText(v[0][2]), class: "tooltipped songTitle", "data-position": "top", "data-delay": "0", "data-tooltip": v[0][2]}))
                    .append($("<p>", {text: truncateText(v[0][1]), class: "tooltipped songArtist", "data-position": "top", "data-delay": "0", "data-tooltip": v[0][1]})))
                .append($("<i>", {class: "remove-song mdi-navigation-close small", "data-songid": v[1]}))
            )       
    });
    $(".tooltipped").tooltip({delay: 0});
    launchOnResize();
}

function searchNewSong (e) {
    var indexToReplace = parseInt($(e.currentTarget).attr("data-songId"));
    var playlist = JSON.parse(localStorage.playlist);
    var durationSong = playlist[$(e.currentTarget).parent().index()][0][3];
    var rightSongs = JSON.parse(localStorage.rightSongs);
    var indexToUse;
    if (localStorage.trainingType == "intervaltraining") {
        if (playlist[$(e.currentTarget).parent().index()][2] % 2 == 0) {
            indexToUse = 1;
        }
        else {
            indexToUse = 0;
        }
    }
    else {
        indexToUse = 0;
    }
    var found = false;
    $.each(rightSongs[0], function (k, v) {
        if (v[3] < durationSong + 30000 && usedSongs.indexOf(k) == -1) {
            replaceSong (rightSongs[indexToUse][k], e, indexToReplace, playlist, k);
            found = true;
            return false;
        }
    });
    if (!found) {
        usedSongs = [];
        fillUsedSongs (playlist);
    }
}

function replaceSong (newSong, e, indexToReplace, playlist, newSongIndex) {
    usedSongs.push(newSongIndex);
    localStorage.playlistImage = playlist[0][0][5];
    var indexOfLi = $(e.currentTarget).parent().index();
    playlist[indexOfLi][0] = newSong;
    playlist[indexOfLi][1] = newSongIndex;
    $("#songs li:nth-child("+((indexOfLi) + 1)+")").fadeOut("fast", function () {
        $("#songs li:nth-child("+((indexOfLi) + 1)+")").remove();
        var rp = playlist[indexOfLi];
        if (indexOfLi == 0) {
            indexOfLi++;
            $("#songs li:nth-child("+((indexOfLi))+")").before($("<li>", {class: "song"})
            .append($("<div>", {class:"play-image"})
                .append($("<img>", {src: rp[0][5], alt: rp[0][1]}))
                .append($("<i>", {class: "play mdi-av-play-arrow small hide-on-small-only"}))
            .on("click", playAudio)
            .attr("data-audio", rp[0][4])
            )
            .append($("<div>", {class:"songInfo"})
                .append($("<p>", {text: truncateText(rp[0][2]), class: "tooltipped songTitle", "data-position": "top", "data-delay": "0", "data-tooltip": rp[0][2]}))
                .append($("<p>", {text: truncateText(rp[0][1]), class: "tooltipped songArtist", "data-position": "top", "data-delay": "0", "data-tooltip": rp[0][1]})))
            .append($("<i>", {class: "remove-song mdi-navigation-close small", "data-songid": rp[1]})))
        } 
        else {
            $("#songs li:nth-child("+((indexOfLi))+")").after($("<li>", {class: "song"})
            .append($("<div>", {class:"play-image"})
                .append($("<img>", {src: rp[0][5], alt: rp[0][1]}))
                .append($("<i>", {class: "play mdi-av-play-arrow small hide-on-small-only"}))
            .on("click", playAudio)
            .attr("data-audio", rp[0][4])
            )
            .append($("<div>", {class:"songInfo"})
                .append($("<p>", {text: truncateText(rp[0][2]), class: "tooltipped songTitle", "data-position": "top", "data-delay": "0", "data-tooltip": rp[0][2]}))
                .append($("<p>", {text: truncateText(rp[0][1]), class: "tooltipped songArtist", "data-position": "top", "data-delay": "0", "data-tooltip": rp[0][1]})))
            .append($("<i>", {class: "remove-song mdi-navigation-close small", "data-songid": rp[1]})))
        }
        localStorage.playlist = JSON.stringify(playlist);
        setTimeout(function() {
            $(".tooltipped")
                .off()
                .tooltip({delay: 0});
        }, 100)
    }); 
}

function addPlaylist () {
    if (isLoggedIn()) {
        $.ajax({
            url: "https://api.spotify.com/v1/users/" + getCookie("user_id") + "/playlists", //localStorage.user_id is a string.
            headers: {
                'Authorization': 'Bearer ' + getCookie("access_token") //localStorage.access_token is a string.
            },
            method: "post",
            data: JSON.stringify({      //Have to stringify because can't receive JSON some-fucking-how.
                "name": $("#playlistName").val(), //Does this need validation?
                "public": false                    
            }),
            dataType: "json",
            success: function (output) {     
                var playlist_id = output.id;
                localStorage.playlist_id = playlist_id;
                addSongsToPlaylist(playlist_id);
            }
        });
        return false;
    }
    else {
        nextPage(10, "slide");
    }
}

function addSongsToPlaylist (playlist_id) {
    var track_uris = []; //object
    var playlist = JSON.parse(localStorage.playlist); //object
    var user_id = getCookie("user_id"); //string

    $.each(playlist, function(k, v){
        var uri = "spotify:track:" + v[0][0]; 
        track_uris.push(uri);
    });

    $.ajax({
        url: "https://api.spotify.com/v1/users/" + user_id + "/playlists/" + playlist_id + "/tracks",
        data: JSON.stringify({
            uris: track_uris
        }),
        headers: {
            'Authorization': 'Bearer ' + getCookie("access_token"),
            'Content-Type': 'application/json'
        },
        method: "post",
        success: function () {
            if (isLoggedIn()) {
                addPlaylistToDatabase ();
            }
        }
    });
}

function addPlaylistToDatabase () {
    var scheme = null;
    if (localStorage.trainingType == "intervaltraining") {
        scheme = JSON.parse(localStorage.intervalScheme);
    }
    $.ajax({
        method: "post",
        url: "includes/addplaylist.php",
        data: {
            scheme: scheme,
            playlist: JSON.parse(localStorage.playlist),
            name: $("#playlistName").val(),
            description: " ",
            trainingType: localStorage.trainingType,
            bpm: localStorage.bpm,
            image: localStorage.playlistImage
        },
        success: function (d) {
            nextPage(11, "slide");

        }
    })
}

var playedlast = "";

function playAudio () {
    var audio = $(this).attr("data-audio");
    if (playedlast == "") {
        $(this).find("i").attr("class", "play mdi-av-stop small");
        $(this)
            .append($("<audio>")
            .append($("<source>", {src: audio, type: "audio/mpeg"})));
        var audioElement = $(this).find("audio");
        audioElement[0].play();
        playedlast = $(this);
    } 
    else if (playedlast.find("audio").find("source").attr("src") == audio) {
        $(this).find("i").attr("class", "play mdi-av-play-arrow small");
        $(this).find("audio").remove();
        playedlast = "";
    } 
    else {
        playedlast.find("i").attr("class", "play mdi-av-play-arrow small");
        playedlast.find("audio").remove();
        $(this).find("i").attr("class", "play mdi-av-stop small");
        $(this).append($("<audio>")
                .append($("<source>", {src: audio})));
        var audioElement = $(this).find("audio");
        audioElement[0].play();
        playedlast = $(this);
    }
}