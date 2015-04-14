<?php 
require ('includes/initialize.php');
?>
<!DOCTYPE html>
<html>
  <head>
    <?php require ('includes/headincludes.php') ?>
    <link rel="stylesheet" href="style/steps.css">
    <title>Over<?= TITLE_SUFFIX ?></title>
  </head>
  <body>
    <?php require ('includes/header.php') ?>
    <div class="wrapper">
      <div class="white-container z-depth-1">
          <div class="stagger">
            <h2 class="header teal">Over</h2>
            <div class="row content-container">
              <div class="col text center">
                <h5 class="center">
                  Sportify
                </h5>
                  <p>
                    Sportify is de web-app die een playlist met hardloopmuziek maakt speciaal voor jou.
                  </p>
                  <br>
                  <p>
                    Met Sportify ben je al de deur uit voor je het weet. Je geeft aan: hoe lang en hoe hard je wilt lopen. Daarna personaliseer je je afspeellijst door te filteren op genre, artiest of je eigen Spotify-afspeellijst. Wij maken een lijst met geschikte loopmuziek voor je aan en je hoeft hem alleen nog maar op te slaan!
                  </p>
                  <div class="col logoImages">
                    <a href="http://the.echonest.com/" target="_blank"><img id="echonestLogo" class="logo-over" src="images/echonest-logo.png" alt="Echonest Logo"></a>
                    <a href="http://www.last.fm/" target="_blank"><img id="lastfmLogo" class="logo-over" src="images/last-fm-logo.png" alt="last fm logo"></a>
                    <a href="https://www.spotify.com/nl/" target="_blank"><img id="spotifyLogo" class="logo-over" src="images/spotify-logo.png" alt="spotify logo"></a>
                  </div>
              </div>
            </div>
          </div>
        </div>
    </div>
    <?php require ('includes/footer.php') ?>
    <?php require ('includes/scripts.php') ?>
  </body>
</html>