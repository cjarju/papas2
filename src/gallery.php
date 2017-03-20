<?php
require_once 'assets/php/php_functions.php';
?>

<!DOCTYPE html>
<html lang="en">

<head>

    <title>Gallery - Papa's Media Production, Gambia</title>

    <meta charset="utf-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta name="description" content="Gallery, Papa's Media Production, Gambia" />
    <meta name="author" content="Charles Jarju" />

    <!-- You can use Open Graph tags to customize link previews -->
    <meta property="og:url"           content="https://papasmedia.com/gallery" />
    <meta property="og:type"          content="website" />
    <meta property="og:title"         content="Gallery - Papa's Media Production, Gambia" />
    <meta property="og:description"   content="Gallery - Papa's Media Production, Gambia, Pictures, Photos, Events, Equipments" />
    <meta property="og:image"         content="https://papasmedia.com/assets/images/logos/papasmedia.png" />

    <!-- build:css assets/css/feui-glry.min.css -->
    <link href="assets/css/elastislide.css" rel="stylesheet" />
    <link href="assets/css/gallery.css" rel="stylesheet" />
    <!-- endbuild -->

    <!--
    <link href="assets/css/feui-main.min.css" rel="stylesheet" />
    <link href="assets/css/feui-glry.min.css" rel="stylesheet" />
    -->

    <?php require_once '_head_elems.php' ?>

</head>

<body id="page-top" class="navbgcolor">

    <?php
        require_once 'includes/_social_share.php';
        require_once 'assets/php/get_business_info.php';
        require_once '_nav.php';
    ?>

	<!-- Gallery Section -->
    <section id="gallery" class="bg-darkest-gray">
        <div class="container">
            <div class="row">
                <div class="col-lg-12">
					<h2 class="section-heading text-center">Gallery</h2>
						<div class="content">
							<div id="rg-gallery" class="rg-gallery">

                                <!-- thumbnail viewer parent div -->
								<div class="rg-thumbs">
									<div class="es-carousel-wrapper">
										<div class="es-nav">
											<span class="es-nav-prev">Previous</span>
											<span class="es-nav-next">Next</span>
										</div>
										<div class="es-carousel">
											<ul>
												<?php								
													$sql = "select * from gphotos";
													$result = $conn->query($sql);
													
													if ($result->num_rows > 0) {
														while($row = $result->fetch_assoc()) {
															$id = $row['id'];
															$img_name = $row['img_name'];
															$img_descr = $row['img_descr'];
                                                            $img_file_path = "assets/images/gallery/$img_name";
                                                            list($width, $height) = getimagesize($img_file_path);
															echo "<li><a href='#'><img src='assets/images/gallery/thumbs/$img_name' width='65' height='65' data-large='assets/images/gallery/$img_name' alt='image$id' data-description='$img_descr' data-width='$width' data-height='$height'/></a></li>";
														}
													}
													/* free result set */
													$result->free_result();
												?>
											</ul>
										</div> <!-- carousel-wrapper -->
									</div> <!-- es-carousel-wrapper -->
								</div><!-- rg-thumbs -->

                                <!-- rg-image-wrapper -->
                                <!--
                                     x-tmpl has no real meaning, it simply stops the browser from interpreting the script as javascript.
                                     It's mostly used with jquery templates. At some point, a javascript data object will be used in conjunction with the
                                     template to render some html.
                                 -->
                                <script id="img-wrapper-tmpl" type="text/x-jquery-tmpl">
                                    <div class="rg-image-wrapper">
                                        {{if itemsCount > 1}}
                                            <div class="rg-image-nav">
                                                <a href="#" class="rg-image-nav-prev">Previous Image</a>
                                                <a href="#" class="rg-image-nav-next">Next Image</a>
                                                </div>
                                        {{/if}}
                                        <div class="rg-image"></div>
                                        <div class="rg-loading"></div>
                                        <div class="rg-caption-wrapper">
                                            <div class="rg-caption display_none">
                                                <p></p>
                                            </div>
                                        </div>
                                    </div>
                                </script>

							</div><!-- rg-gallery -->
						</div><!-- content -->
					</div><!-- container -->
                </div>
            </div>
    </section>

    <?php
        require_once 'includes/_quick_links.php';
        require_once '_footer.php';
		/* close database connection */
		$conn->close();
    ?>

    <!-- build:js assets/js/feui-glry.min.js -->
    <!-- gallery -->
    <script src="assets/js/elastislide.js"></script>
    <script src="assets/js/gallery.js"></script>
    <!-- endbuild -->

    <!--
    <script src="assets/js/feui-core.min.js"></script>
    <script src="assets/js/feui-cust.min.js"></script>
    <script src="assets/js/feui-glry.min.js"></script>
     -->

</body>

</html>