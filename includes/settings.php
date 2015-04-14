<?php
define("TITLE_SUFFIX", " - Sportify");
define("SPOTIFY_CLIENT_ID", "d16e52e505994ae7a79d8e5084e00fa3"); // Ian
// define("SPOTIFY_CLIENT_ID", "97c654dc321943b5897e18f76f2ac021"); // Jori
define("CLASS_NEXT_BUTTON", "mdi-content-send");
define("CLASS_BACK_ARROW", "mdi-navigation-arrow-back");
define("ROOT", "http://localhost/sportify/");
// define("ROOT", "http://project.cmi.hro.nl/2014_2015/spotify_mt1f_t1/Sportify/");

$_SESSION["lastPage"] = ROOT;

define("DB_HOST", "localhost");
define("DB_USER", "root");
define("DB_PASSWORD", "root"); 
define("DB_NAME", "sportify");
define("DB_PREFIX", "sportify_");
$conn = new mysqli(DB_HOST, DB_USER, DB_PASSWORD, DB_NAME);

