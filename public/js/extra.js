$(function() {
  var footerButton = "";
  $('.barButton').click(function() {
    footerButton = $(this).val();
    $("#" + footerButton).show();
    $("#background").show();
  });
  
  $("#background").click(function(){
    $("#background").hide();
    $("#" + footerButton).hide();
  });        
});

  
$(function() {
  var headButton = "";

  $('.headButton').click(function(e) {
    headButton = $(this).val();

    if(headButton == 'themes') {
      if($('#refinePopUp').is(':visible')){
        $('#refinePopUp').fadeOut(800, 'easeOutExpo');
      }
      if($('#sortPopUp').is(':visible')){
        $('#sortPopUp').fadeOut(800, 'easeOutExpo');
      }
    }
    else if(headButton == 'refine') {
      if($('#themesPopUp').is(':visible')){
        $('#themesPopUp').fadeOut(800, 'easeOutExpo');
      }
      if($('#sortPopUp').is(':visible')){
        $('#sortPopUp').fadeOut(800, 'easeOutExpo');
      }
    }
    else if(headButton == 'sort') {
      if($('#themesPopUp').is(':visible')){
        $('#themesPopUp').fadeOut(800, 'easeOutExpo');
      }
      if($('#refinePopUp').is(':visible')){
        $('#refinePopUp').fadeOut(800, 'easeOutExpo');
      }
    }

    if(!$('#' + headButton + 'PopUp').is(':visible')){
        $('#' + headButton + 'PopUp').fadeIn(800, 'easeOutExpo');
        e.stopPropagation();
    }
    else{
        $('#' + headButton + 'PopUp').fadeOut(800, 'easeOutExpo');
    } 

    $(document).click( function(e){
      if ( $(e.target).parents("#" + headButton + "PopUp").length == 0 ) $('#' + headButton + 'PopUp').fadeOut(800, 'easeOutExpo');
    });    
  });     
});