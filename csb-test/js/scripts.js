// ***** HEADER *****
// Hide Header on on scroll down
var didScroll;
var lastScrollTop = 0;
var delta = 5;
var navbarHeight = $('header').outerHeight();

$(window).scroll(function(event){
    didScroll = true;
});

setInterval(function() {
    if (didScroll) {
        hasScrolled();
        didScroll = false;
    }
}, 250);

function hasScrolled() {
    var st = $(this).scrollTop();
    
    // Make sure they scroll more than delta
    if(Math.abs(lastScrollTop - st) <= delta)
        return;
    
    // If they scrolled down and are past the navbar, add class .nav-up.
    // This is necessary so you never see what is "behind" the navbar.
    if (st > lastScrollTop && st > navbarHeight){
        // Scroll Down
        $('header').removeClass('nav-down').addClass('nav-up');
    } else {
        // Scroll Up
        if(st + $(window).height() < $(document).height()) {
            $('header').removeClass('nav-up').addClass('nav-down');
        }
    }
    
    lastScrollTop = st;
}


// ***** SLIDER *****
$(document).ready(function(){

    /*
     * Variables
     */

    var slides;

    //Crea un objeto con informaciÃ³n de los slides
    slides = $('#product-slider .product-list > .box');


    /*
     * Funciones
     */
    
    //Desplaza el contenedor hacia la direcciÃ³n definida
    //@direction = [left,right]
    function sliderScroll(direction){

       //Calcula la posiciÃ³n actual del contenedor
       position = $('#product-slider').scrollLeft();

       //Calcula la anchura total menos el Ãºltimo slide.
       //Se usa para calcular cuando el scroll llega al final.
       totalWidth = (slides.length * slides[0].offsetWidth) - slides[0].offsetWidth

       //Se comprueba la variable direction para hacer el scroll hacia izquierda o derecha
       switch (direction) {
            case 'right': //Derecha
                if (position+slides[0].offsetWidth > totalWidth){ //Si la siguiente posiciÃ³n se sale del contenedor, vuelve al principio.
                    $('#slider:not(:animated)').animate({scrollLeft:0},1000);
                } else { //Si no es el final, suma a la posiciÃ³n actual la anchura del slide.
                    $('#slider:not(:animated)').animate({scrollLeft:position+slides[0].offsetWidth},1000);
                }
                break;

            case 'left': //Izquierda
                if (position-slides[0].offsetWidth < 0){ //Si la siguiente posiciÃ³n se sale del contenedor, vuelve al final.
                    $('#slider:not(:animated)').animate({scrollLeft:totalWidth},1000);
                } else { //Si no es el final, resta a la posiciÃ³n actual la anchura del slide.
                    $('#slider:not(:animated)').animate({scrollLeft:position-slides[0].offsetWidth},1000);
                }
                break;
        }

   }
   /*
    * CÃ³digo
    */

    //Asigna el ancho total de los slides al contenedor
    //La anchura total se obtiene multiplicando la medida de un slide por el nÃºmero de slides)
    $('#slider .slidesContainer').css('width',slides[0].offsetWidth * slides.length);


    //Click en el botÃ³n "next"
    $('.next').click(function(){
        sliderScroll('right'); //Mueve el scroll a la derecha
        initTimer(); //Vuelve a activar el temporizador
        return false;
    });

    //Click en el botÃ³n "prev"
    $('.prev').click(function(){
        sliderScroll('left'); //Mueve el scroll a la izquierda
        initTimer(); //Vuelve a activar el temporizador
        return false;
    });


});


// ***** NAV *****
$(".toggle-nav").on('click', function (e) {
    $("#main-menu").toggleClass("show");
    e.preventDefault();
})