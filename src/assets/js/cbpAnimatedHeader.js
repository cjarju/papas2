/**
 * cbpAnimatedHeader.js v1.0.0
 * http://www.codrops.com
 *
 * Licensed under the MIT license.
 * http://www.opensource.org/licenses/mit-license.php
 *
 * Copyright 2013, Codrops
 * http://www.codrops.com
 */
var cbpAnimatedHeader = (function() {

    var $docElem = $('html'),
        $header = $('.navbar-default'),
        didScroll = false,
        changeHeaderOn = 300;

    function init() {
        window.addEventListener( 'scroll', function( event ) {
            if( !didScroll ) {
                didScroll = true;
                setTimeout( scrollPage, 250 );
            }
        }, false );
    }

    function scrollPage() {
        var sy = scrollY(),
            $quicklinkdiv = $('.quick_button_links_bar');

        if ( sy >= changeHeaderOn ) {

            if ($(window).width() >= 768) {$quicklinkdiv.css('display','block'); }

            $($header).addClass('navbar-shrink');
        }
        else {
            $quicklinkdiv.css('display','none');
            $($header).removeClass('navbar-shrink');
        }
        didScroll = false;
    }

    function scrollY() {
        return window.pageYOffset || $docElem.scrollTop;
    }

    init();

})();