$(function() {
  var footerButton = "";
  $('.barButton').click(function() {
    footerButton = $(this).val();
    $("#" + footerButton).fadeIn(800, 'easeOutExpo');
    $("#background").fadeIn(800, 'easeOutExpo');
  });
  
  $("#background").click(function(){
    $("#background").fadeOut(800, 'easeOutExpo');
    $("#" + footerButton).fadeOut(800, 'easeOutExpo');
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

    if(headButton == 'sort') {
      $(document).click( function(e){
        $('#' + headButton + 'PopUp').fadeOut(800, 'easeOutExpo');
      }); 
    }   
    else {
      $(document).click( function(e){
        if ( $(e.target).parents("#" + headButton + "PopUp").length == 0 ) $('#' + headButton + 'PopUp').fadeOut(800, 'easeOutExpo');
      }); 
    }

  });     
});

$(function() {
  var toggleDropDownButton = "";

  $('.toggleDropDownButton').click(function(e) {
    toggleDropDownButton = $(this).val();

    if(toggleDropDownButton == 'adults') {
      if($('#childrenDropDown').is(':visible')){
        $('#childrenDropDown').fadeOut(800, 'easeOutExpo');
      }
      if($('#timeslotsDropDown').is(':visible')){
        $('#timeslotsDropDown').fadeOut(800, 'easeOutExpo');
      }
    }
    else if(toggleDropDownButton == 'children') {
      if($('#adultsDropDown').is(':visible')){
        $('#adultsDropDown').fadeOut(800, 'easeOutExpo');
      }
      if($('#timeslotsDropDown').is(':visible')){
        $('#timeslotsDropDown').fadeOut(800, 'easeOutExpo');
      }
    }
    else if(toggleDropDownButton == 'timeslots') {
      if($('#adultsDropDown').is(':visible')){
        $('#adultsDropDown').fadeOut(800, 'easeOutExpo');
      }
      if($('#childrenDropDown').is(':visible')){
        $('#childrenDropDown').fadeOut(800, 'easeOutExpo');
      }
    }

    if(!$('#' + toggleDropDownButton + 'DropDown').is(':visible')){
        $('#' + toggleDropDownButton + 'DropDown').fadeIn(800, 'easeOutExpo');
        e.stopPropagation();
    }
    else{
        $('#' + toggleDropDownButton + 'DropDown').fadeOut(800, 'easeOutExpo');
    } 

    $(document).click( function(e){
      $('#' + toggleDropDownButton + 'DropDown').fadeOut(800, 'easeOutExpo');
    });    
  });     
});