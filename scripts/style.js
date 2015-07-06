function launchOnResize () {
	checkWindowSize ();
	if (!$("body").hasClass("home")) {
		whiteContainer ();
		setHeader ();
	}
	if (size != oldSize) {
		oldSize = size;
	}
}

function whiteContainer () {
	if (size != "s") {
		$(".wrapper").css({
			height: $(window).height() - $("header nav").height()
		});
		if ($(".white-container").height() > $(window).height() * 0.75) {
			var marginTopWhiteContainer 	= 20;
			var marginBottomWhiteContainer 	= 20;
		}
		else {
			var marginTopWhiteContainer 	= ($(".wrapper").height() - $(".white-container").height()) / 2;
			var marginBottomWhiteContainer 	= 0;
		}
		$(".white-container").css({
			marginTop: 		marginTopWhiteContainer,
			marginBottom: 	marginBottomWhiteContainer
		});
	}
	else {
		$(".white-container").css({
			width: 			"100%",
			marginTop: 		0,
			marginBottom: 	0
		});
	}
}

function checkWindowSize () {
	if (screen.availWidth > 600 && $(window).width() > 600) {
		windowWidth 		= $(window).width();
		windowHeight		= $(window).height() - $("header nav").height();
		if (windowWidth >= 992) {
			size 			= "l";
		}
		else if (windowWidth > 600 && windowWidth < 992) {
			size 			= "m";
		}
		else {
			size 			= "s";
		}
	}
	else {
		size 			= "s";
	}
}

function launchTransition (pageContent, transition) {
	$firstWhiteContainer = $(".white-container:nth-child(1)");
	if (transition == "inherit") {
		transition = button.attr("data-transition");
	}
	if (transition == "slide") {
		$("#sidenav-overlay").trigger("click");
		if (size != "s") {
			$(".wrapper").css("overflow", "hidden");
			$firstWhiteContainer
				.transition({
					marginTop: ($firstWhiteContainer.height() + $("header nav").height() + 20) * (- 1)
				}, 600, function () {
					$(".wrapper").append(pageContent);
					var $secondWhiteContainer = $(".white-container:nth-child(2)");
					var newMarginTop = ($(window).height() - $secondWhiteContainer.height() - $("header nav").height()) / 2;
					if (newMarginTop < 20) newMarginTop = 20;
						$secondWhiteContainer
							.css({
								marginTop: $(window).height() + 20
							})
							.transition({
								scrollTop: 0,
								marginTop: newMarginTop
							}, 600, function () {
								$secondWhiteContainer.find("input[type='text']").first().focus();
								launchOnResize ();
                                $(".wrapper").css("overflow", "initial");
							});
							$firstWhiteContainer.remove();

            });
		}
		else {
			$(".wrapper").append(pageContent);
			$(".white-container:nth-child(2)")
				.css({
					right: 		$(this).width() * (-1),
					top: 		0,
					position: 	"absolute",
					zIndex: 	9999,
					width: 		"100%"
				})
				.transition({
					right: 		0,
					zIndex: 	1
				}, 600, function () {
					$firstWhiteContainer.remove();
					$(".white-container").find("input[type='text']").first().focus();
					launchOnResize ();
				});
		}
	}
	else {
		$firstWhiteContainer.remove();
		$(".wrapper").append(pageContent);
		var newMarginTop = ($(window).height() - $(".white-container:nth-child(2)").height() - $("header nav").height()) / 2;
		if (newMarginTop < 20) newMarginTop = 20;
		if (size == "s") newMarginTop = 0;
		$(".white-container")
			.css({
				marginTop: newMarginTop
			})
			.find("input[type='text']").first().focus();
		launchOnResize ();
	}
}

function setHeader () {
	if (size == "s") {
		$("header nav#topmenu").attr("class", "teal");
		$(".brand-logo svg image")
		.attr("xlink:href", "images/logo_white_text.png")
		.attr("src", "images/logo_white_text.svg");
	}
	else {
		$("header nav#topmenu").attr("class", "white");
		$(".brand-logo svg image")
			.attr("xlink:href", "images/logo.png")
			.attr("src", "images/logo.svg");
	}
}