<?php 
	require ("includes/initialize.php"); 
	if (!isLoggedIn ()) {
		header("Location: nieuwelijst.php");
		die();
	}
?>
<!DOCTYPE html>
<html>
	<head>
		<?php require ("includes/headincludes.php") ?>
		<title>Home<?= TITLE_SUFFIX ?></title>
	</head>
	<body class="no-bg metro-overview home grey darken-2" style="visibility: hidden">
		<?php require ("includes/profile-modal.php") ?>
		<div class="wrapper">
			<div id="metro-overview" class="responsive-table">
				<div data-width="2" data-height="2" data-color="red lighten-2" data-href="nieuwelijst.php" class="metro-item z-depth-1 red lighten-2">
					<span class="metro-icon"><i class="mdi-av-playlist-add"></i></span>
					<span class="metro-label red">Nieuwe lijst</span>
				</div>
				<div data-width="2" data-height="1" id="metro-logo" data-color="white" class="z-depth-1 white metro-logo">
					<div class="brand-logo">
						<svg width="100%" height="100%">
							<image xlink:href="images/logo.svg" src="images/logo.png" width="100%" height="100%" />
						</svg>
					</div>
				</div>
				<div data-width="2" data-height="2" data-color="amber lighten-2" data-href="mijnlijsten.php" class="metro-item z-depth-1 amber lighten-2">
					<span class="metro-icon"><i class="mdi-editor-format-list-bulleted"></i></span>
					<span class="metro-label amber">Mijn lijsten</span>
				</div>
				<div data-width="2" data-height="1" data-color="teal lighten-2" data-href="over.php" class="metro-item z-depth-1 teal lighten-2 inline-tile m">
					<span class="metro-icon"><i class="mdi-action-info-outline"></i></span>
					<span class="metro-label teal">Over</span>
				</div>
				<div data-width="2" data-height="2" data-color="green lighten-2" data-href="zoeklijsten.php" class="metro-item z-depth-1 green lighten-2 inline-tile l">
					<span class="metro-icon"><i class="mdi-editor-format-list-numbered"></i></span>
					<span class="metro-label green">Zoek lijsten</span>
				</div>
				<div data-width="2" data-height="1" data-color="brown lighten-2" class="profile-switcher z-depth-1 brown lighten-2">
					<span class="metro-icon"><i class="mdi-action-account-child"></i></span>
					<span class="metro-label brown">Mijn Sportify</span>
				</div>
			</div>
		</div>
		<?php require ('includes/footer.php') ?>
		<?php require ('includes/scripts.php') ?>
		<script src="scripts/home.js"></script>
	</body>
</html>