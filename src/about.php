<?php
require_once 'assets/php/php_functions.php';
?>

<!DOCTYPE html>
<html lang="en">

<head>

    <title>About Us - Papa's Media Production, Gambia</title>

    <meta charset="utf-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta name="description" content="About Us, Papa's Media Production, Gambia" />
    <meta name="author" content="Charles Jarju" />

    <!-- You can use Open Graph tags to customize link previews -->
    <meta property="og:url"           content="https://papasmedia.com/about" />
    <meta property="og:type"          content="website" />
    <meta property="og:title"         content="About Us - Papa's Media Production, Gambia" />
    <meta property="og:description"   content="Papa's Media Production, Gambia" />
    <meta property="og:image"         content="https://papasmedia.com/assets/images/logos/papasmedia.png" />

   <?php require_once '_head_elems.php' ?>

</head>

<body id="page-top" class="navbgcolor">

    <?php
        require_once 'includes/_social_share.php';
        require_once 'assets/php/get_business_info.php';
        require_once '_nav.php';
    ?>

	 <!-- About Section -->
    <section id="about" class="bg-darkest-gray">
        <div class="container">
            <div class="row">
                <div class="col-lg-12 text-center">
                    <h2 class="section-heading">About Us</h2>
                    <h3 class="section-subheading text-muted">Who We Are</h3>
                </div>
            </div>
            <div class="row">
                <div class="col-lg-12">
                    <?php echo $about_text ?>
					<p>For more information, please do not hesitate to <a class="page-scroll" href="contact">contact us</a>.</p>
                </div>
            </div>
        </div>
    </section>

    <?php
        require_once 'includes/_quick_links.php';
        require_once '_footer.php';
		/* close database connection */
		$conn->close();
    ?>

</body>

</html>