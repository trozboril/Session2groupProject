// add scripts

$(document).on('ready', function() {
  console.log('sanity check!');
  new WOW().init();



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
