<?php
require_once 'assets/php/php_functions.php';
?>

<!DOCTYPE html>
<html lang="en">

<head>

    <title>Papa's Media Production, Gambia</title>

    <meta charset="utf-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta name="description" content="Papa's Media Production, Gambia, a new media house that covers up three components: Sound System, Video and Photo Coverage." />
    <meta name="author" content="Charles Jarju" />

    <!-- You can use Open Graph tags to customize link previews -->
    <meta property="og:url"           content="https://papasmedia.com" />
    <meta property="og:type"          content="website" />
    <meta property="og:title"         content="Papa's Media Production, Gambia" />
    <meta property="og:description"   content="Papa's Media Production, Gambia, a new media house that covers up three components: Sound System, Video and Photo Coverage." />
    <meta property="og:image"         content="https://papasmedia.com/assets/images/logos/papasmedia.png" />

    <?php require_once '_head_elems.php' ?>

</head>

<body id="page-top">

   <?php
        require_once 'includes/_social_share.php';
        require_once 'assets/php/get_business_info.php';
        require_once '_nav.php';
   ?>

    <!-- Header -->
    <header>
        <div class="container">
            <div class="intro-text">
                <div class="intro-lead-in"><?php echo $intro_lead_in ?></div>
                <div class="intro-heading"><?php echo $intro_heading ?></div>
                <a href="services" class="page-scroll btn btn-xl">Tell Me More</a>
            </div>
        </div>
    </header>

    <?php
        require_once 'includes/_quick_links.php';
        require_once '_footer.php';
		/* close database connection */
		$conn->close();
    ?>

</body>

</html>