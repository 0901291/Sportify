function getHash () {
    var hash = window.location.hash;
    var d = new Date().addHours(1);
    document.cookie = "access_token = " + (hash.split("&"))[0].slice(14)+"; expires = " + d.toUTCString() + "; path=/";
}

function login () {
    if (!isLoggedIn()) {
        getHash();
        if (getCookie("access_token") != "" && typeof getCookie("access_token") !== undefined) {
            return $.when(saveUserId()).then(function () {
                return $.ajax({
                    url: "includes/login.php",
                    success: function () {
                        initializeProfile();
                    }
                })
            })
        }
        else {
            nextPage(1, "slide");
            return false;
        }
    }
}

function saveUserId () {
    return $.ajax({
        url: "https://api.spotify.com/v1/me",
        headers: {
            "Authorization": "Bearer " + getCookie("access_token")
        },
        success: function (output) {
            var d = new Date().addHours(1);
            document.cookie = "user_id = " + output.id + "; expires = " + d.toUTCString() + "; path=/";
        }
    })
}

Date.prototype.addHours = function (h) {
    this.setHours(this.getHours() + h);
    return this;
}

function isLoggedIn () {
    return getCookie("isLoggedIn") && hasProfile ();
}

function hasProfile () {
    return getCookie("hasProfile");
}