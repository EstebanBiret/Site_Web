$(document).ready(function() {
    $(window).scroll(function() {
        // apparition de la navbar au scroll
        if (this.scrollY > 20) {
            $('.navbar').addClass("sticky");
        } else {
            $('.navbar').removeClass("sticky");
        }

        // apparition du bouton au scroll
        if (this.scrollY > 500) {
            $('.scroll-up-btn').addClass("show");
        } else {
            $('.scroll-up-btn').removeClass("show");
        }
    });

    // aller en haut de la page au click
    $('.scroll-up-btn').click(function() {
        $('html').animate({ scrollTop: 0 });

        $('html').css("scrollBehavior", "auto");
    });

    $('.navbar .menu li a').click(function() {

        $('html').css("scrollBehavior", "smooth");
    });

    // menu navigation responsive
    $('.menu-btn').click(function() {
        $('.navbar .menu').toggleClass("active");
        $('.menu-btn i').toggleClass("active");
    });

    // code carousel framework 
    $('.carousel').owlCarousel({
        margin: 20,
        loop: true,
        autoplay: true,
        autoplayTimeOut: 2000,
        autoplayHoverPause: true,
        responsive: {
            0: {
                items: 1,
                nav: false
            },
            900: {
                items: 2,
                nav: false
            },
            1000: {
                items: 3,
                nav: false
            }
        }
    });
});