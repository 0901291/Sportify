function initializeProfile () {
	createOverlay ();
	getProfiles ();
	$("#addProfile").on("click", setUpCreation);
	$(".add").hide();
	$("select").material_select();
	$("#close-add-profile").hide();
	$("#close-add-profile").on("click", backToStartscreen);
}

function getProfiles () {
	$.ajax({
		url: "includes/profiles.php",
		method: "post",
		dataType: "json",
		data: {
			action: "getProfiles"
		},
		success: function (output) {
			console.log(output);
			if (output.length > 0) {
				$(".profileBox.profile").remove();
				$.each(output, function ( k, v ) {
					var backgroundColor = "#fff";
					if (v.idProfiles == getCookie("profile")) {
						backgroundColor = "orange";
					}
					$("#profiles").prepend($("<li>", {text: v.name, class: "profile profileBox"})
						.attr("data-profile", v.idProfiles)
						.on("click", function chooseProfile(v) {
							var d = new Date().addHours(1);
            				document.cookie = "hasProfile= true; expires = " + d.toUTCString()+"; path=/";
            				document.cookie = "profile = " + $(this).attr("data-profile") + "; expires = " + d.toUTCString() + "; path=/";
            				$("#chooseProfile").closeModal();
                    		location.reload();
                    		window.location.hash = ""; //Removes the hash info from a URL.
						})
						.css({
            				backgroundColor: backgroundColor
            			}));
				})
			}
		}
	})
}

function createOverlay () {
	$("#chooseProfile").openModal({dismissible:false});
}

function setUpCreation () {
	$(".profileBox").hide();
	$(".add").show();
	$("#profiles").parent().find("h4").text("Nieuw Profiel");
	$("#addProfileButton").on("click", createProfile);
	$("#close-add-profile").show();
}

function backToStartscreen () {
	$(".profileBox").show();
	$(".add").hide();
	$("#profiles").parent().find("h4").text("Kies je profiel");
	$("#close-add-profile").hide();
}

function createProfile () {
	var profileName 	= $("#profileName").val();
	var profileAge		= $("#profileAge").val();
	if (profileName != "" && profileAge != "" && $.isNumeric(profileAge)) {
		$.ajax({
			url: "includes/profiles.php",
			method: "post",
			data: {
				action: 	"createProfile",
				age: 		$("#profileAge").val(),
				gender: 	$("#profileGender").val(),
				name: 		$("#profileName").val()
			},
			success: function () {
				$.ajax({
					url: "includes/profiles.php",
					method: "post",
					dataType: "json",
					data: {
						action: 	"getProfileId",
						name: 		$("#profileName").val()
					},
					success: function (output) {
						console.log(output);
						var d = new Date().addHours(1);
						document.cookie = "hasProfile= true; expires = " + d.toUTCString()+"; path=/";
			            document.cookie = "profile = " + output[0].idProfiles + "; expires = " + d.toUTCString() + "; path=/";
			    		$("#chooseProfile").closeModal();
			    		window.location.hash = ""; //Removes the hash info from a URL.
			    		location.reload();
					}
				})
			}
		});
	}
	else {
		toast("Graag geldige waardes invoeren.", 4000);
	}
}