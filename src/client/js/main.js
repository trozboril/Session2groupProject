// add scripts

$(document).on('ready', function() {
  console.log('sanity check!');
  new WOW().init();


$('[data-toggle="popover"]').popover();


//if the inner text of one element matches the other element
//highlight the other element.

$('.americans').on('click', function() {
if($('.american').innerText === $('.name').innerText){
    $('.american').toggleClass('newhighlight');
}
    



});


$.each($(".american.element .name"), function (index, el) { console.log(el.innerText) });




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
