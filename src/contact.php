<?php
require_once 'assets/php/php_functions.php';
?>

<!DOCTYPE html>
<html lang="en">

<head>

    <title>Contact Us - Papa's Media Production, Gambia</title>

    <meta charset="utf-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta name="description" content="Contact Us, Papa's Media Production, Gambia" />
    <meta name="author" content="Charles Jarju" />

    <!-- You can use Open Graph tags to customize link previews -->
    <meta property="og:url"           content="https://papasmedia.com/contact" />
    <meta property="og:type"          content="website" />
    <meta property="og:title"         content="Contact Us - Papa's Media Production, Gambia" />
    <meta property="og:description"   content="Contact UsPapa's Media Production, Gambia" />
    <meta property="og:image"         content="https://papasmedia.com/assets/images/logos/papasmedia.png" />

    <?php require_once '_head_elems.php' ?>

</head>

<body id="page-top">

    <?php
        require_once 'includes/_social_share.php';
        require_once 'assets/php/get_business_info.php';
        require_once '_nav.php';
    ?>

    <!-- Contact Section -->
    <section id="contact">
        <div class="container">

            <div class="row">
                <div class="col-lg-12 text-center">
                    <h2 class="section-heading">Contact Us</h2>
                    <!-- <h3 class="section-subheading text-muted">Lorem ipsum dolor sit amet consectetur.</h3> -->
                </div>
            </div>

			<div class="row contact_icons_sect">
				<div class="col-lg-4 col-lg-offset-2 text-center">
                    <i class="fa fa-phone fa-3x wow bounceIn"></i>
                    <p><?php echo $phone_no ?></p>
                </div>
                <div class="col-lg-4 text-center">
                    <i class="fa fa-envelope-o fa-3x wow bounceIn" data-wow-delay=".1s"></i>
                    <p><a href="mailto:<?php echo $email ?>">Email Us</a></p>
                </div>
			</div>

			<div class="row">
				<div class="col-lg-12 text-center">
                    <h4 class="section-heading">Or leave a message below:</h4>
                </div>
			</div>

            <div class="row">
                <div class="col-lg-12">
                    <form name="sentMessage" id="contactForm" novalidate>
                        <div class="row">
                            <div class="col-md-6">
                                <div class="form-group">
                                    <input type="text" class="form-control" placeholder="Your Name *" id="name" required data-validation-required-message="Please enter your name.">
                                    <p class="help-block text-danger"></p>
                                </div>
                                <div class="form-group">
                                    <input type="email" class="form-control" placeholder="Your Email *" id="email" required data-validation-required-message="Please enter your email address.">
                                    <p class="help-block text-danger"></p>
                                </div>
                                <div class="form-group">
                                    <input type="tel" class="form-control" placeholder="Your Phone *" id="phone" required data-validation-required-message="Please enter your phone number.">
                                    <p class="help-block text-danger"></p>
                                </div>
                            </div>
                            <div class="col-md-6">
                                <div class="form-group">
                                    <textarea class="form-control" placeholder="Your Message *" id="message" required data-validation-required-message="Please enter a message."></textarea>
                                    <p class="help-block text-danger"></p>
                                </div>
                            </div>
                            <div class="clearfix"></div>
                            <div class="col-lg-12 text-center"">
                            <div id="success"></div>
                        </div>
                        <div class="col-lg-12 text-center">
                            <button type="submit" class="btn btn-xl">Send Message</button>
                        </div>
                        <div class="col-lg-12">
                            <div  class="form-group" id="recaptcha_widget">
                                <div class="g-recaptcha" data-sitekey="6LdiexoTAAAAAK0d13mM2u3nEAY1okXkuEO0cZwp"></div>
                            </div>
                        </div>
                    </form>
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

    <!-- build:js assets/js/feui-cont.min.js -->
    <script src="assets/js/jqBootstrapValidation.js"></script>
    <script src="assets/js/contact_me.js"></script>
    <!-- endbuild -->

    <!--
    <script src="assets/js/feui-core.min.js"></script>
    <script src="assets/js/feui-cust.min.js"></script>
    <script src="assets/js/feui-cont.min.js"></script>
    -->

	<!-- google recaptcha -->
    <script src='https://www.google.com/recaptcha/api.js'></script>

</body>

</html>