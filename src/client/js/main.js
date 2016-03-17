// add scripts

$(document).on('ready', function() {
  console.log('sanity check!');
  new WOW().init();


$('[data-toggle="popover"]').popover();



$('.americans').on('click', function() {
    for (var i = 0; i < $(".american").length; i++){
        if ( $(".american .name")[i].innerHTML === $(this)[0].innerText ) {
           $($(".american")[i]).toggleClass('newhighlight');
                      $(this).toggleClass('newhighlight');

        }
    }
});

$('.germans').on('click', function() {
    for (var i = 0; i < $(".german").length; i++){
        if ( $(".german .name")[i].innerHTML === $(this)[0].innerText ) {
           $($(".german")[i]).toggleClass('newhighlight');
           $(this).toggleClass('newhighlight');
        }
    }
});

$('.englishs').on('click', function() {
    for (var i = 0; i < $(".english").length; i++){
        if ( $(".english .name")[i].innerHTML === $(this)[0].innerText ) {
           $($(".english")[i]).toggleClass('newhighlight');
                      $(this).toggleClass('newhighlight');

        }
    }
});

$('.bohemians').on('click', function() {
    for (var i = 0; i < $(".bohemian").length; i++){
        if ( $(".bohemian .name")[i].innerHTML === $(this)[0].innerText ) {
           $($(".bohemian")[i]).toggleClass('newhighlight');
                      $(this).toggleClass('newhighlight');

        }
    }
});

$('.belgians').on('click', function() {
    for (var i = 0; i < $(".belgian").length; i++){
        if ( $(".belgian .name")[i].innerHTML === $(this)[0].innerText ) {
           $($(".belgian")[i]).toggleClass('newhighlight');
                      $(this).toggleClass('newhighlight');

        }
    }
});

$('.frenchs').on('click', function() {
    for (var i = 0; i < $(".french").length; i++){
        if ( $(".french .name")[i].innerHTML === $(this)[0].innerText ) {
           $($(".french")[i]).toggleClass('newhighlight');
                      $(this).toggleClass('newhighlight');

        }
    }
});

$('.others1').on('click', function() {
    for (var i = 0; i < $(".others").length; i++){
        if ( $(".others .name")[i].innerHTML === $(this)[0].innerText ) {
           $($(".others")[i]).toggleClass('newhighlight');
                      $(this).toggleClass('newhighlight');

        }
    }
});






$('.americanbtn').on('click', function(body){
  
    $('.americans').toggleClass('show');
    $('.american').toggleClass('highlight');
 
});



$('.germanbtn').on('click', function(body){
  
    $('.germans').toggleClass('show');
    $('.german').toggleClass('highlight');
    
});




$('.bohemianbtn').on('click', function(body){
  
    $('.bohemians').toggleClass('show');
    $('.bohemian').toggleClass('highlight');
    
});



$('.belgianbtn').on('click', function(body){

    $('.belgians').toggleClass('show');
    $('.belgian').toggleClass('highlight');
     
});

$('.englishbtn').on('click', function(body){
  
    $('.englishs').toggleClass('show');
    $('.english').toggleClass('highlight');
    
});



$('.frenchbtn').on('click', function(body){
  
    $('.frenchs').toggleClass('show');
    $('.french').toggleClass('highlight');  
  
});



$('.othersbtn').on('click', function(body){

    $('.others1').toggleClass('show');
    $('.others').toggleClass('highlight');
  
});

});
