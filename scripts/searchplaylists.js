$(initSearchPlaylist);

function initSearchPlaylist ()
{
    $("#searchList").on("keyup", getPlaylistFromDb);
    getPlaylistFromDb();
}

function getPlaylistFromDb ()
{
    $("#searchResults").empty();
    launchOnResize();
    var search = $("#searchList").val();
    if (search != "") {
        $.ajax({
            url: 'includes/searchplaylists.php',
            method: 'post',
            dataType: 'json',
            data: {
                query: search
            },
            success: function (data) {
                printResults (data);
            }
        });
    }
    else {
        $li = $("<li>", {class: "list-menu-button col s12 center", text: "Voer een zoekresultaat in."});

        $("#searchResults")
            .prepend($li);
    }
}

function printResults (data) {
    $("#searchResults").empty();

    if (data.results.length != 0) {
        $.each(data.results, function (k, v) {
            $li = $("<li>", {"data-page":"16", "data-item": v.id, "data-transition":"slide", class: "list-menu-button page-navigation col s12 center", text: v.name});
            $("#searchResults")
                .append($li);
        });
    }
    else {
        $li = $("<li>", {class: "list-menu-button page-navigation col s12 center", text: "Er zijn geen resultaten gevonden."});
        
        $("#searchResults")
            .prepend($li);
    }
    launchOnResize();
}
