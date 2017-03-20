<?php
require_once 'assets/php/php_functions.php';
?>

<!DOCTYPE html>
<html lang="en">

<head>

    <title>Services - Papa's Media Production, Gambia</title>

    <meta charset="utf-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta name="description" content="Services provided by Papa's Media Production, Gambia: Sound System, Video and Photo Coverage." />
    <meta name="author" content="Charles Jarju" />

    <!-- You can use Open Graph tags to customize link previews -->
    <meta property="og:url"           content="https://papasmedia.com/services" />
    <meta property="og:type"          content="website" />
    <meta property="og:title"         content="Services - Papa's Media Production, Gambia" />
    <meta property="og:description"   content="Services provided by Papa's Media Production, Gambia: Sound System, Video and Photo Coverage." />
    <meta property="og:image"         content="https://papasmedia.com/assets/images/logos/papasmedia.png" />

    <?php require_once '_head_elems.php' ?>

</head>

<body id="page-top" class="navbgcolor">

    <?php
        require_once 'includes/_social_share.php';
        require_once 'assets/php/get_business_info.php';
        require_once '_nav.php';
    ?>
    <!-- Services Section -->
    <section id="services" class="bg-darkest-gray">
        <div class="container">
            <div class="row">
                <div class="col-lg-12 text-center">
                    <h2 class="section-heading">Services</h2>
                    <h3 class="section-subheading text-muted">What We Offer</h3>
                </div>
            </div>
			
			<?php

			$sql = "select * from services";
            $result = $conn->query($sql);
			
			if ($result->num_rows > 0) {
				while($row = $result->fetch_assoc()) {
					$id = $row['id'];
					$svc_name = $row['svc_name'];
					$svc_descr = nl2br($row['svc_descr'],true);
					$svc_img_name = $row['svc_img_name'];
                    $img_file_path = "assets/images/services/$svc_img_name";
                    list($width, $height) = getimagesize($img_file_path);

$html = <<<HTML
<div class='row content_section'>
	<div class='col-lg-12'>
		<hr class='section_heading_spacer'>
        <div class='clearfix'></div>
		<h3 class='section-heading'>$svc_name</h3>
		<p class='lead'>$svc_descr</p>
	</div>
	<div class='col-lg-12 service_img_div'>
		<img class='img-responsive' src='assets/images/services/$svc_img_name' alt='' width="$width" height="$height">
	</div>
</div>
HTML;
					echo $html;
				}
			}
            
			/* free result set */
            $result->free_result();
        ?>
        </div> <!-- container -->
    </section>




    <?php
        require_once 'includes/_quick_links.php';
        require_once '_footer.php';
		/* close database connection */
		$conn->close();
    ?>

</body>

</html>