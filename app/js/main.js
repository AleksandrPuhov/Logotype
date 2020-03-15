$(document).ready(function () {

    $('.slider-carousel').owlCarousel({
        loop: true,
        margin: 10,
        responsiveClass: true,
        mouseDrag: false,
        items: 1,
        dots: false,
        nav:true
    });

    $('.news-content-slider-theme').owlCarousel({
        loop: true,
        margin: 20,
        nav: true,
        responsiveClass: true,
        mouseDrag: false,
        items: 1,
        dots: false,
    });
    

});