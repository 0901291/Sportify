$(initBoxes);
var tileMargin = 6;
var firstLoad = false;
var tiles;

function initBoxes () {	
	$("body").on("click", ".metro-item", metroLink);
	setTiles ();
	divideBoxes ();
	$(window).resize(function () {
		setTiles ();
		divideBoxes ();
	});
	$(".profile-switcher").on("click", initializeProfile);
}

function divideBoxes () {
	$.each($('#metro-overview > div'), function (k, v) {
		tileMarginMath = tileMargin * 2;
		width 	= Math.floor(windowWidth / tiles * $(v).attr('data-width'));
		height 	= Math.floor(windowHeight / 3 * $(v).attr('data-height'));
		$(v).css({
			width: width - tileMarginMath,
			height: height - tileMarginMath
		});
		if ($(v).hasClass('inline-tile') && $(v).hasClass(size)) {
			$(v).css({
				marginTop: (height - tileMarginSize) / $(v).attr('data-height') * (- 1)
			});
		}
		else {
			$(v).css({
				marginTop: tileMargin
			});
		}
		if ($(v).has(".metro-icon")) {
			var icon = $(v).find(".metro-icon i");
			marginTop = (($(v).height() - icon.height() - $(v).find(".metro-label").height()) / 2) - 35;
			if (marginTop < "-20") {
				marginTop = "-20px";
			}
			icon.parent().css({
				marginTop: marginTop,
				fontSize: $(v).height() / 2
			})
			if ($(v).height() < 200) {
				icon.fadeOut();
			}
			else {
				icon.fadeIn();
			}
		}
		if (parseInt(k) == $('#metro-overview > div').size() - 1 && firstLoad == false) {
			firstLoad = true;
			checkWindowSize ();
			divideBoxes ();
			$("body").css("visibility", "visible");
		}
	});
	var logo = $("svg");
	marginTop = (($(".metro-logo").height() - logo.height()) / 2) - 5;
	if (marginTop < "-10") {
		marginTop = "-10px";
	}
	$(".brand-logo").css({
		marginTop: marginTop
	});
}

function metroLink (e) {
	tileColor = $(this).attr("data-color");
	var clone = $(this).clone();
	clone
		.appendTo('#metro-overview')
		.css({
			position: "absolute", 
			left: $(this).position().left, 
			top: $(this).position().top
		})
		.animate({
			width: "100%",
			height: windowHeight,
			left: 		0,
			top: 		0,
			padding: 	0,
			margin: 	0
		}, function () {
			window.location.href = $(this).attr("data-href")
		})
}


function setTiles () {
	windowWidth 		= $(window).width();
	windowHeight		= $(window).height();
	if (screen.availWidth > 600 && $(window).width() > 600) {
		if (windowWidth >= 992) {
			tiles 			= 6;
			tileMarginSize 	= tileMargin * 2;
		}
		else if (windowWidth > 600 && windowWidth < 992) {
			tiles 			= 4;
			tileMarginSize 	= tileMargin;

		}
		else {
			tiles 			= 2;
		}
	}
	else {
		tiles 			= 2;
	}
}