/**
* This file contains the functions for displaying
* time increments for the short and long term
* views. It also handles click events for form
* submission, as well as setting the color
* for each category based on user input.
/*


/* Returns day of week based on value from start input, which is translated
into a string object.*/
function getDayOfWeek(startDateVar) {
	var dateObj = new Date(startDateVar);
	var weekdays = ["Mon", "Tues", "Wed", "Thur",	"Fri", "Sat", "Sun"];
	var dayOfWeek = weekdays[dateObj.getDay()];

    // For loop that adds new headings
    for (var i = 0; i < 7; i++) {
    	var timeSlotSpanId = "sTermTimeSlot" + i + "";
    	var timeSlotSpan = '<span class="sTermTimeIncColHeader" id="' +
			timeSlotSpanId + '">' + dayOfWeek + ' ' + (dateObj.getMonth()+1) +
			'/' + (dateObj.getDate()+1) + '</span>';
    	$( '#' + timeSlotSpanId ).replaceWith(timeSlotSpan);
    	dateObj.setDate(dateObj.getDate() + 1);
    	dayOfWeek = weekdays[dateObj.getDay()];
    }
};



/* Returns months based on value from start input, which is translated
into a string object.*/
function getMonthOfYear(startDateVar) {
	var dateObj = new Date(startDateVar);
	var months = ["Jan","Feb","March","April","May","June","July",
            "Aug","Sept","Oct","Nov","Dec"];
	var monthOfYear = months[dateObj.getMonth()];
	var monthOffset = months.length - dateObj.getMonth();
    // For loop that adds new headings
  for (var i = 0; i < 12; i++) {
  	var timeSlotSpanId = 'lTermTimeSlot' + i + '';
		if (i == monthOffset) {
			var monthIncrement = 1;
			monthOfYear = months[0];
		}
		if (monthIncrement){
			monthOfYear = months[monthIncrement - 1];
			monthIncrement ++;
		}
		else {
			monthOfYear = months[dateObj.getMonth() + i];
			monthIncrement ++;
		}
		var timeSlotSpan = '<span class="lTermTimeIncColHeader"	id="' + timeSlotSpanId + '">' + monthOfYear + ' ' + '</span>';
		$( '#' + timeSlotSpanId ).replaceWith(timeSlotSpan);
  }
};


$(document).ready(function () {
	getDayOfWeek($('#start').val());
	getMonthOfYear($('#start').val());

	$('#taskFormSubmit').click( function() {
		$('#testingDiv2').load('localhost:5000/static/untitled.txt');

		var task_name = $('#new_task_input').val();
		console.log("The Task Name is: " + task_name);

		$.ajax({
				url : '/home',
				data : $('#newTaskFormId').serialize(),
				type : 'POST',
				success: function(response) {
					console.log(response);
					console.log(" ~ ajax happened ~ ");
				},
				error: function(error) {
					console.log(error);
				}
		});



		$('#newTaskForm').hide();
	});


	/* START-DATE LISTENER */

	$('#start').change(function () {
		 getDayOfWeek($('#start').val());
		 getMonthOfYear($('#start').val());
	});


	/* BEGIN CLICK BUTTONS, OPEN POP-UPS LISTENERS */

	$('#newTaskButton').click(function () {
		$('#newTaskForm').css("display", "block");
	});

	/* END CLICK BUTTONS, OPEN POP-UPS LISTENERS */


	/* BEGIN CLICK SHORT TERM/LONG FORM BUTTON LISTENERS */

	$("#shortTermButton").click(function() {
		$('.sTermTimeIncColHeader').show();
		$('.lTermTimeIncColHeader').hide();
	});

	$("#longTermButton").click(function() {
		$('.sTermTimeIncColHeader').hide();
		$('.lTermTimeIncColHeader').show();
	});

	/* END CLICK SHORT TERM/LONG FORM BUTTON LISTENERS */


	/* BEGIN SUBMIT FORM BUTTON LISTENERS */

	// $('#taskFormSubmit').click(function () {
	// 	console.log("well the hiding thing works");
	// 	$('#newTaskForm').hide();
	// });
	$('#shortTermSubmit').click(function () {
		$('#shortTermForm').hide();
	});
	$('#longTermSubmit').click(function () {
		$('#longTermForm').hide();
	});
	/* END SUBMIT FORM BUTTONS LISTENERS */


	/* BEGIN CANCEL FORM BUTTON LISTENERS */
	$('#cancelIdTask').click(function () {
		$('#newTaskForm').hide();
	});
	$('#cancelId').click(function () {
		$('#shortTermForm').hide();
	});
	$('#cancelIdLongTerm').click(function () {
		$('#longTermForm').hide();
	});
	/* END CANCEL FORM BUTTON LISTENERS */


	/* Function for changing category colors  */
	$('#category_color').on('change', function (e) {
		var optionSelected = $("option:selected", this);
		var valueSelected = this.value;
		$(".background").css("background-color", valueSelected);
	});

});


// ---------- PLEASE DO NOT REMOVE THE BELOW CODE --------

/* Calculates the width of the div with the Class called Timeline. */
function calculateTimelineWidth(){
  var selectTimelineWidth = document.querySelector('.Timeline');
  timelineWidth = selectTimelineWidth.clientWidth;
  // return console.log("Width of Timeline div:" + timelineWidth);
};

/* Calculates the width of the div with the Class called Category. */
function calculateCategoryWidth(){
  var selectCategoryWidth = document.querySelector('.Category');
  categoryWidth = selectCategoryWidth.clientWidth;
  // return console.log("Width of Category div:" + categoryWidth);
};

/* A helper function. Calculates the height width of various elments, such as divs when the window
is resized. This function is placed within the html body tag and is called when the window is resized. */
function calculateOnResize() {
	// calculate timeline Width
	calculateTimelineWidth();
	// Calculate Timeline Height
	calculateCategoryWidth();
};
