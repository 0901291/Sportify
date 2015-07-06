<?php 
	require ('includes/initialize.php');
	if (isset($_SESSION["currentPage"]) && isset($_GET["page"]))
	{
		$page = $_SESSION["currentPage"];
	}
	else
	{
		$page = 18;
	}
?>
<!DOCTYPE html>
<html>
	<head>
		<?php require ('includes/headincludes.php') ?>
		<link rel="stylesheet" href="style/steps.css">
		<title>Zoek Lijsten<?= TITLE_SUFFIX ?></title>
	</head>
	<body>
		<?php require ('includes/header.php') ?>
		<div id="chooseProfile" class="modal">
	    	<div class="modal-content">
	      		<h4 class="center">Kies je profiel</h4>
	      		<ul id="profiles">
	      			<li id="addProfile" class="profileBox">
	      				<i class="mdi-content-add medium"></i>     				
	      			</li>
	      			<li style="width: 100%;" class="center">
	      				<div class="add row">
	      					<div class="input-field col s6 m6 l6 offset-m3 offset-s3 offset-l3 form-field">
						        <input id="profileName" type="text" class="validate">
						        <label for="profileName">Naam:</label>
							</div>
							<div class="input-field col s6 m6 l6 offset-m3 offset-s3 offset-l3 form-field">
							    <input id="profileAge" type="text" class="validate">
							    <label for="profileAge">Leeftijd:</label>
							</div>
							<div class="input-field col s6 m6 l6 offset-m3 offset-s3 offset-l3 form-field">
						    	<select id="profileGender" class="browser-default">
						     	 	<option value="" disabled selected>geslacht</option>
						    	  	<option value="Male">Male</option>
						     	 	<option value="Female">Female</option>
						    	</select>
						  	</div>
							<div id="addProfileButton" class="right next-button-container" data-transition="slide" data-page="7">
								<p class="waves-effect waves-orange btn-flat"> 
									Voeg toe 
									<span class="mdi-content-send"></span>
								</p>
							</div>
	      				</div>
	      			</li>
	      		</ul>
	    	</div>
	  	</div>
		<div class="wrapper">
		</div>
		<?php require ('includes/footer.php') ?>
		<?php require ('includes/scripts.php') ?>
		<script>		
			<?php 
				if (isset($_GET['page']) && !empty($_GET['page'])) 
				{	
					echo "setTimeout(function () {nextPage(" . $_GET['page'] . ", 'none')}, 100);";
					unset($_SESSION["currentPage"]);
					if ($_GET["page"] == 17)
					{
						echo "login()";
					}
				}
				else
				{
					echo "nextPage(" . $page . ", 'none');";
				}
			?>
		</script>
		<!-- <script src="scripts/addplaylist.js"></script> -->
	</body>
</html>
















