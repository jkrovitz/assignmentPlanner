/* 
File contains many of the event listeners utilized in the program
and sets also handles getting and setting various HTML element values. 
*/ 


// ------------------LISTENERS AND CANVAS DRAWING---------------------
$(document).ready(function () {
	var taskStartColumn, taskEndColumn;
	drawAllTheTasks();
	selectShortTermView();

	
	// getMonthOfYear($('#start').val());

	$('body').resize(calculateOnResize());

	if (localStorage.getItem("shortTermView") == true) {
		shortterm();
		getDayOfWeek($('#start').val());
	} else if (localStorage.getItem("longTermView") == true) {
		longterm();
		getMonthOfYear($('#start').val());
	}


	/* SHORT/LONG TERM BUTTON LISTENERS */
	$('#shortTermButton').click(function shorterm() {
		if($('lTermTimeIncColHeader').is(":visible")){
			$('#lTermTimeSlot').hide();
			$('#sTermTimeSlot').show(); 

		}
		selectShortTermView(); 

		drawAllTheTasks();
	});

	$('#start').change(function () {
		var startVal = $('#start').val();
		getDayOfWeek(startVal);
		getMonthOfYear(startVal);

		drawAllTheTasks();
	});


	/* CLICK BUTTONS, OPEN POP-UPS LISTENERS */
	$('#newTaskButton').click(function () {
		$('#newTaskForm').css("display", "block");
	});

	/* CANCEL FORM BUTTON LISTENERS */
	$('#cancelIdTask').click(function () {
		$('#newTaskForm').hide();
	});


});

	function selectShortTermView(){
		getDayOfWeek($('#start').val());
		$('.lTermTimeIncColHeader').hide();
		$('.sTermTimeIncColHeader').show();
		shortTermView = true;
		longTermView = false;

		localStorage.setItem("shortTermView", shortTermView);
		localStorage.setItem("longTermView", longTermView);

		$('#shortTermButton').css({'background-color': '#007bff', 'color': '#ffffff'});
		$('#longTermButton').css({'background-color': '#ffffff', 'color': '#007bff'});
	}

	$('#longTermButton').click(function longterm() {
		
		if($('sTermTimeIncColHeader').is(":visible")){
			$('#sTermTimeSlot').hide(); 
			$('#lTermTimeSlot').show(); 
		}
		getMonthOfYear($('#start').val());
		$('.sTermTimeIncColHeader').hide();
		$('.lTermTimeIncColHeader').show();

		
		longTermView = true;
		shortTermView = false;

		localStorage.setItem("longTermView", longTermView);
		localStorage.setItem("shortTermView", shortTermView);
		

		$('#longTermButton').css({'background-color': '#007bff', 'color': '#ffffff'});
		$('#shortTermButton').css({'background-color': '#ffffff', 'color': '#007bff'});

		drawAllTheTasks();
	});

	localStorage.setItem("shortTermView", shortTermView);
	localStorage.setItem("longTermView", longTermView);

	var task = []; //only ever holds one task at a time


	//Sets view to short term when start date is changed. 
document.getElementById("start").addEventListener("change",startDateChanged);

function startDateChanged(){
	//When startDate changes, this function sets the 

	getDayOfWeek($('#start').val());
	// drawAllTheTasks();
	$('.lTermTimeIncColHeader').hide();
	$('.sTermTimeIncColHeader').show();
	shortTermView = true;
	longTermView = false;

	localStorage.setItem("shortTermView", shortTermView);
	localStorage.setItem("longTermView", longTermView);

	$('#shortTermButton').css({'background-color': '#007bff', 'color': '#ffffff'});
	$('#longTermButton').css({'background-color': '#ffffff', 'color': '#007bff'});


	// getMonthOfYear($('#start').val());

	$('body').resize(calculateOnResize());

	if (localStorage.getItem("shortTermView") == true) {
		shortterm();
		getDayOfWeek($('#start').val());
			drawAllTheTasks();
	} else if (localStorage.getItem("longTermView") == true) {
		longterm();
		getMonthOfYear($('#start').val());
			drawAllTheTasks();
	}

}

