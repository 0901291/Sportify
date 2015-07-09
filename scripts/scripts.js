var width, height, windowWidth, windowHeight, size, button;
var chosen 		= [];
var oldSize 	= "";
var getPage 	= "";
var chosenItems = 0;

$(init);

function init () {
	$(".button-collapse").sideNav();
	$(".wrapper")
		.on("click", "input[type='radio']", setDataPageNextButton)
		.on("click", ".page-navigation", function (e) {
			nextPage (e, "inherit");
		});
	launchOnResize ();
	oldSize = size;
	getRandomBackground ();
	$(window).resize(launchOnResize);
	checkMobile ();
}

function nextPage (e, transition) {
    $(e.currentTarget).removeClass("page-navigation");

	if (typeof $(e.currentTarget).attr("data-function") !== typeof undefined && $(e.currentTarget).attr("data-function") !== false) {
        console.log("deleting page nav");
		var functionReturn = window[$(e.currentTarget).attr("data-function")]();
	}
	else {
		var functionReturn = true;
	}
	defineNextPage (e, transition, functionReturn);
}

function defineNextPage (e, transition, functionReturn) {
	//$(e.currentTarget).addClass("page-navigation");
	var extraData = null;
	if ($.isNumeric(e)) {
		var nextPage = e;
	}
	else {
		button = $(e.currentTarget);
		var nextPage = button.attr("data-page");
		if (typeof button.attr("data-item") !== typeof undefined) {
			extraData = button.attr("data-item");
		}
	}
	if (functionReturn) {
		getNextPage (nextPage, transition, extraData);
	}
}

function getNextPage (nextPage, transition, extraData) {
	$.ajax({
		url:"includes/content.php",
		method: "POST",
		data: {
			page: 		nextPage,
			extraData:  extraData
		},
		success: function (pageContent) {
			launchTransition (pageContent, transition);
		},
		dataType: "html"
	});
}

function setDataPageNextButton () {
	var page = $(this).attr("data-page");
	$(".next-button-container").attr("data-page", page);
}

function checkMobile () {
	if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) return true;
}

function getDate () {
	var date = new Date();

	var month = date.getMonth() + 1;
	var day = date.getDate();

	var output = 
		(day 	< 10 ? "0" : "") + day + "/" +
	    (month 	< 10 ? "0" : "") + month + "/" +
	    date.getFullYear();
	return output;
}

function truncateText (text) {
    //console.log(text);
	var tempText = text;
	if (tempText.replace(/<\/?[^>]+(>|$)/g, "").length > 25) {
		return text.substring(0, 23) + "...";
	}
	else {
		return text;
	};
}

function getCookie (cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for (var i=0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') c = c.substring(1);
        if (c.indexOf(name) == 0) return c.substring(name.length,c.length);
    }
    return "";
}