$(function() {
    $('.barButton').click(function() {
        $("#test").html("Button");
		$("#popup").fadeIn("slow");
		$("#background").fadeIn("slow");
		$("#popup").html("<h2>" + $(this).val() + "</h2>");
	});
	
    $("#background").click(function(){
        $("#background").fadeOut("slow");
        $("#popup").fadeOut("slow");
    });        
});

$(function() {
	$(".slider").slider({
		min: 1,
		max: 10,
		step: 1,
		value: 6,
		animate: true,
		slide: function(event, ui) {
			id = $(this).attr('id');
			val = ui.value;
			switch (id){
				case "budgetS": 
					if(val==1){
						$("#budget").html("R100 or less"); 
					}
					else if(val==2){
						$("#budget").html("R250 or less"); 
					}
					else if(val==3){
						$("#budget").html("R500 or less"); 
					}
					else if(val==4){
						$("#budget").html("R1000 or less"); 
					}
					else if(val==5){
						$("#budget").html("R1500 or less"); 
					}
					else if(val<=9){
						$("#budget").html("R" + ((val-4)*1000) + " or less");						
					}
					else{
						$("#budget").html("R5000 or more"); 
					}
					break;
				case "durationS": 
					if(val==1){
						$("#duration").html(val + " hour or less"); 
					}
					else if(val<=5){
						$("#duration").html(val + " hours or less"); 
					}
					else if(val==6){
						$("#duration").html((val-5) + " day or less"); 
					}
					else if(val<=9){
						$("#duration").html((val-5) + " days or less");						
					}
					else{
						$("#duration").html((val-6) + " days or more"); 
					}
					break;					
			}
		}
	});
});