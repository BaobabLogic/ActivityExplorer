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
        $('#refinePopUp').hide();
    	}
    	if($('#sortPopUp').is(':visible')){
        $('#sortPopUp').hide();
    	}
  	}
  	else if(headButton == 'refine') {
  		if($('#themesPopUp').is(':visible')){
        $('#themesPopUp').hide();
    	}
    	if($('#sortPopUp').is(':visible')){
        $('#sortPopUp').hide();
    	}
  	}
  	else if(headButton == 'sort') {
    	if($('#themesPopUp').is(':visible')){
        $('#themesPopUp').hide();
    	}
  		if($('#refinePopUp').is(':visible')){
        $('#refinePopUp').hide();
    	}
  	}

    if(!$('#' + headButton + 'PopUp').is(':visible')){
        $('#' + headButton + 'PopUp').show();
        e.stopPropagation();
    }
    else{
        $('#' + headButton + 'PopUp').hide();
    } 

		$(document).click( function(e){
	    if (e.target.id != headButton + 'PopUp') $('#' + headButton + 'PopUp').hide();
		});    
	});     
});