<?php 
	require ('includes/initialize.php');
	if (isset($_SESSION["currentPage"]) && isset($_GET["page"]))
	{
		$page = $_SESSION["currentPage"];
	}
	else
	{
		$page = 1;
	}
?>
<!DOCTYPE html>
<html>
	<head>
		<?php require ('includes/headincludes.php') ?>
		<link rel="stylesheet" href="style/steps.css">
		<title>Nieuwe lijst<?= TITLE_SUFFIX ?></title>
	</head>
	<body>
		<?php require ('includes/header.php') ?>
		<?php require ("includes/profile-modal.php") ?>
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
	</body>
</html>
















