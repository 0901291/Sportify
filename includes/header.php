<header>
	<nav id="topmenu" class="white">
		<div class="nav-wrapper">
			<a href="<?= ROOT ?>" class="brand-logo">
				<svg width="220" height="73">
					<image xlink:href="images/logo.svg" src="images/logo.png" width="220" height="73" />
				</svg>
			</a>
			<a href="#" data-activates="mobile-demo" class="button-collapse hide-on-med-and-up"><i class="mdi-navigation-menu"></i></a>
			<ul class="right hide-on-small-only menu-items">
				<li><a href="<?= ROOT ?>">Home</a></li>
				<li><a href="nieuwelijst.php">Nieuwe lijst</a></li>
				<?php 
					if (isLoggedIn()) 
					{
						echo '<li><a href="mijnlijsten.php">Mijn lijsten</a></li>';
					}
				?>
				<li><a href="zoeklijsten.php">Zoek lijsten</a></li>
				<li><a href="over.php">Over</a></li>
				<?php 
					if (!isLoggedIn()) 
					{
						echo '<li><a href="https://accounts.spotify.com/authorize?client_id=' . SPOTIFY_CLIENT_ID . '&response_type=token&redirect_uri=' . ROOT . 'nieuwelijst.php%3Fpage%3D14&scope=playlist-read-private%20playlist-modify-public%20playlist-modify-private' . (isLoggedIn() ? '"' : '&show_dialog=true"') . '><span class="black-text">Login met Spotify</span></a></li>';
					}
					else
					 {
					 	echo '<li><a href="'.ROOT.'logout.php"><span class="black-text">Log uit</span></a></li>';
					 } 
				?>
			</ul>
			<ul class="side-nav" id="mobile-demo">
				<li><a href="<?= ROOT ?>">Home</a></li>
				<li><a href="nieuwelijst.php">Nieuwe lijst</a></li>
				<?php 
					if (isLoggedIn()) 
					{
						echo '<li><a href="mijnlijsten.php">Mijn lijsten</a></li>';
					}
				?>
				<li><a href="zoeklijsten.php">Zoek lijsten</a></li>
				<li><a href="over.php">Over</a></li>
				<?php 
					if (!isLoggedIn()) 
					{
						echo '<li><a href="https://accounts.spotify.com/authorize?client_id=' . SPOTIFY_CLIENT_ID . '&response_type=token&redirect_uri=' . ROOT . 'nieuwelijst.php%3Fpage%3D14&scope=playlist-read-private%20playlist-modify-public%20playlist-modify-private' . (isLoggedIn() ? '"' : '&show_dialog=true"') . '><span class="black-text">Login met Spotify</span></a></li>';
					}
					else
					 {
					 	echo '<li><a href="' . ROOT . 'logout.php"><span class="black-text">Log uit</span></a></li>';
					 } 
				?>
			</ul>
	    </div>
	</nav>
</header>