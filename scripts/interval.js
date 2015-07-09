var scheme,
mainSpeed,
intervalSpeed,
duration;

$(initInterval);

function initInterval () {
	$('#bpmTwo').val(localStorage.bpm);
	$('.tooltipped').tooltip({delay: 50});
	duration = parseInt(localStorage.duration);
	$('.white-container').on("click touch", ".floating-button", calculateCurrentScheme);
	scheme = [
		[2, duration - 240000],
		[1, 240000]
	];
	printIntervalTraining ();
}

function calculateCurrentScheme (e) {
	var numberOfOne = 0;
	var numberOfTwo = 0;
	$.each(scheme, function (k, v) {
		if (v[0] == 1) {
			numberOfOne++;
		}
		else {
			numberOfTwo++;
		};
	});
	if ($(this).attr("data-action") == "add") {
		addInterval (numberOfOne, numberOfTwo);
	}
	else if ($(this).attr("data-action") == "remove") {
		if (numberOfOne > 1) {
			removeInterval (numberOfOne, numberOfTwo);
		}
		else {
			toast("Niet minder intervallen toegestaan", 4000);
		};
	}
	else if ($(this).attr("data-action") == "add-minute") {
		addMinute (numberOfOne, numberOfTwo, e.currentTarget);
	}
	else if ($(this).attr("data-action") == "substract-minute") {
		substractMinute (numberOfOne, numberOfTwo, e.currentTarget);
	};
}

function addMinute (numberOfOne, numberOfTwo, e) {
	var intervalItem = $(e).parent();
	if (intervalItem.hasClass("walk")) {
		if ((scheme[(intervalItem.index()) - 1][1] - 60000) >= 240000) {
			scheme[intervalItem.index()][1] += 60000;
			scheme[(intervalItem.index()) - 1][1] -= 60000;
		}
		else {
			toast("Geen kleiner rengedeelte toegestaan.", 4000);
		}
	}
	else {
		if ((scheme[(intervalItem.index()) + 1][1] - 60000) >= 240000) {
			scheme[intervalItem.index()][1] += 60000;
			scheme[(intervalItem.index()) + 1][1] -= 60000;
		}
		else {
			toast("Geen kleinere interval toegestaan.", 4000);
		}
	}
	printIntervalTraining ();
}

function substractMinute (numberOfOne, numberOfTwo, e) {
	var intervalItem = $(e).parent();
	if (intervalItem.hasClass("walk")) {
		if ((scheme[(intervalItem.index())][1] - 60000) >= 240000) {
			scheme[intervalItem.index()][1] -= 60000;
			scheme[(intervalItem.index()) - 1][1] += 60000;
		}
		else {
			toast("Geen kleinere interval toegestaan.", 4000);
		}
	}
	else {
		if ((scheme[(intervalItem.index())][1] - 60000) >= 240000) {
			scheme[intervalItem.index()][1] -= 60000;
			scheme[(intervalItem.index()) + 1][1] += 60000;
		}
		else {
			toast("Geen kleiner rengedeelte toegestaan.", 4000);
		}
	}
	printIntervalTraining ();
}

function addInterval (numberOfOne, numberOfTwo) {
	var newDurationTwo = Math.round((duration - ((numberOfOne + 1) * 240000)) / (numberOfTwo + 1));
	if (newDurationTwo > 240000) {
		scheme = [];
		for (var i = 0; i < numberOfOne + 1; i++) {
			scheme.push([2, newDurationTwo], [1, 240000]);
		};
		if (newDurationTwo < 300000) {
			$('#add-interval').hide();
			$("#first-p").hide();
		}
		else {
			$('#add-interval').show();
			$("#first-p").show();
		}
		printIntervalTraining ();
	}
	else {
		toast("Niet meer intervallen toegestaan", 4000);
	};
	if (numberOfOne >= 0) {
		$('#remove-interval').show();
		$("#second-p").show();
	}
	else {
		$('#remove-interval').hide();
		$("#second-p").hide();
	}
}

function removeInterval (numberOfOne, numberOfTwo) {
	if (numberOfOne > 0) {	
		scheme = [];
		var newDurationTwo = Math.round((duration - ((numberOfOne - 1) * 240000)) / (numberOfTwo - 1));

		for (var i = 0; i < numberOfOne - 1; i++) {
			scheme.push([2, newDurationTwo], [1, 240000]);
		};
		if (newDurationTwo < 300000) {
			$('#add-interval').hide();
			$("#first-p").hide();
		}
		else {
			$('#add-interval').show();
			$("#first-p").show();
		}
	};
	if (numberOfOne == 2) {
		$('#remove-interval').hide();
		$("#second-p").hide();
	}
	else {
		$('#remove-interval').show();
		$("#second-p").show();
	};
	printIntervalTraining ();
}

function printIntervalTraining () {
	$('#interval-container').empty();
	var newDuration = 0;
	for (var i = 0; i < scheme.length; i++) {
		newDuration += scheme[i][1];
		var itemText = scheme[i][0] == 1 ? "Wandelen" : "Rennen";
		var typeClass = scheme[i][0] == 1 ? "walk" : "run";
		$('#interval-container')
			.append($("<li>", {class: "interval-item center " + typeClass})
				.append($("<a>", {class: "btn-floating floating-button btn-flat waves-effect waves-light white-text interval-add-minute-container", "data-action": "add-minute"})
					.append($("<i>", {class: "interval-edit-time mdi-content-add green-text white interval-add-minute"})))
				.append($("<a>", {class: "btn-floating floating-button btn-flat waves-effect waves-light white-text interval-substract-minute-container", "data-action": "substract-minute"})
					.append($("<i>", {class: "interval-edit-time mdi-content-remove red-text white interval-substract-minute"})))
				.append($("<span>", {class: "interval-label", text: itemText}))
				.append($("<span>", {class: "interval-duration", text: Math.round((scheme[i][1] / 60000)) + " minuten"}))
				.css({
					height: (scheme[i][1] / 60000 * 7 + 40)}))
	}
	$('#duration span').text(Math.round(newDuration / 60000));
	localStorage.duration = Math.round(newDuration);
	$('.interval-item:last')
		.addClass("special-interval")
	$('.interval-item:last .interval-label').text("Cooling down");
	launchOnResize ();
}












