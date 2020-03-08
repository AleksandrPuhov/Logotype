$(document).ready(function () {


    var owl = $('.owl-carousel');
    owl.owlCarousel({
        loop: true,
        margin: 10,
        responsiveClass: true,
        mouseDrag: false,
        items: 1,
        nav: false,
        dots: false
    });

    $('.btn-slider-left').click(function () {
        owl.trigger('prev.owl.carousel');
    });

    $('.btn-slider-right').click(function () {
        owl.trigger('next.owl.carousel');
    });


});