<?php 
    require ('includes/initialize.php');
    if (isset($_SESSION["currentPage"]) && isset($_GET["page"]))
    {
        $page = $_SESSION["currentPage"];
    }
     else
    {
        $page = 15;
    }

    if (!isLoggedIn())
        header("Location: index.php");
?>
<!DOCTYPE html>
<html>
<head>
<?php require ('includes/headincludes.php') ?>
<link rel="stylesheet" href="style/steps.css">
<title>Mijn lijsten<?= TITLE_SUFFIX ?></title>
</head>
<body>
    <?php require ('includes/header.php') ?>
    <?php require ("includes/profile-modal.php") ?>
    <div id="confirm_delete" class="modal">
        <div class="modal-content">
            <p>Weet je zeker dat je deze lijst(en) wilt verwijderen? Je kunt dit niet ongedaan maken!</p>
            <div class="modal-footer">
                <a href="#!" class="confirm modal-action modal-close waves-effect waves-green btn-flat">Ja</a>
                <a href="#!" class="modal-action modal-close waves-effect waves-red btn-flat">Nee</a>
            </div>
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
        }
        else
        {
            echo "nextPage(" . $page . ", 'none');";
        }
        ?>
        function openPageInfo () {
                $("#page-info").openModal();
            }
    </script>
</body>
</html>