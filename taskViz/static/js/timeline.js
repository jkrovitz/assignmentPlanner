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
			var newDateObj = new Date(dateObj);
    	var timeSlotSpan = '<span class="sTermTimeIncColHeader" id="' + timeSlotSpanId + '">' + dayOfWeek + ' ' + (dateObj.getMonth()+1) + '/' + (dateObj.getDate()+1) + '</span>';
			// $( '#' + timeSlotSpanId ).replaceWith(timeSlotSpan);
    	$( '#' + timeSlotSpanId ).replaceWith(timeSlotSpan).data("date", newDateObj);
			// console.log(newDateObj)
    	dateObj.setDate(dateObj.getDate() + 1);
    	dayOfWeek = weekdays[dateObj.getDay()];
    }
		return new Date(startDateVar);
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
	var present_day = getDayOfWeek($('#start').val());
	console.log("Day being saved as: " + present_day)
	getMonthOfYear($('#start').val());

	console.warn("This is the day selected on the calendar: " + present_day);

	var task = []
	$.getJSON('/retrieveTasks', function(data, status){
		for(var i=0; i< data.length; i++) {
			task = data[i];

			var stringifiedTask = JSON.stringify(task) //turn JSON object into something readable by JavaScript
			$('#timelineId').after(stringifiedTask); //add task dictionary to DOM
			var parsedTask = JSON.parse(stringifiedTask); //separate dictionary into individual Task objects
			var parsedTaskStartDate = new Date(parsedTask.task_start_date);

			var taskStartYear = parsedTaskStartDate.getFullYear();
			var taskStartMonth = parsedTaskStartDate.getMonth()+1;
			var taskStartDay = parsedTaskStartDate.getDate()+1;

			//From this point, make a for loop over each day shown to see if the timeline gets displayed

			var calStartYear =  present_day.getFullYear();
			var calStartMonth = present_day.getMonth()+1;
			var calStartDay = present_day.getDate()+1;


			if (calStartYear == taskStartYear && calStartMonth == taskStartMonth && calStartDay == taskStartDay) {
				console.warn("The Days match");
				drawTaskLine();
			} else {
				console.warn("Days do not match");
				console.log("taskStartYear: " + taskStartYear);
				console.log("taskStartMonth: " + taskStartMonth);
				console.log("taskStartDay: " + taskStartDay);

				console.log("calStartYear: " + calStartYear);
				console.log("calStartMonth: " + calStartMonth);
				console.log("calStartDay: " + calStartDay);
			}
			var parsedTaskEndDate = parsedTask.task_end_date;
		}
	});


	// var result = JSON.parse(tasks);

	$('#newTaskFormId').submit( function(e) {
		e.preventDefault();
		var task_name = $('#new_task_input').val();
		console.log("The Task Name is: " + task_name);
		var taskStartDate = $('#new_task_start_date_input').val();
		var taskEndDate = $('#new_task_end_date_input').val();


		$.ajax({
				url : '/create',
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

		 // drawTaskLine()

	});


	/* START-DATE LISTENER */
	$('#start').change(function () {
		 getDayOfWeek($('#start').val());
		 getMonthOfYear($('#start').val());
	});


	/* CLICK BUTTONS, OPEN POP-UPS LISTENERS */

	$('#newTaskButton').click(function () {
		$('#newTaskForm').css("display", "block");
	});


	/* CLICK SHORT TERM/LONG FORM BUTTON LISTENERS */

	$("#shortTermButton").click(function() {
		$('.sTermTimeIncColHeader').show();
		$('.lTermTimeIncColHeader').hide();
	});

	$("#longTermButton").click(function() {
		$('.sTermTimeIncColHeader').hide();
		$('.lTermTimeIncColHeader').show();
	});


	/* SUBMIT FORM BUTTON LISTENERS */
	$('#shortTermSubmit').click(function () {
		$('#shortTermForm').hide();
	});
	$('#longTermSubmit').click(function () {
		$('#longTermForm').hide();
	});

	/* CANCEL FORM BUTTON LISTENERS */
	$('#cancelIdTask').click(function () {
		$('#newTaskForm').hide();
	});
	$('#cancelId').click(function () {
		$('#shortTermForm').hide();
	});
	$('#cancelIdLongTerm').click(function () {
		$('#longTermForm').hide();
	});



	/* Function for changing category colors  */
	$('#category_color').on('change', function (e) {
		var optionSelected = $("option:selected", this);
		var valueSelected = this.value;
		$(".background").css("background-color", valueSelected);
	});

	var canvas = document.getElementById('DemoCanvas');
	   var sampleTaskStartDay = 1;
	   var sampleTaskEndDay = 5;

	   var sampleTaskStartDay2 = 3;
	   var sampleTaskEndDay2 = 6;

	   // var numTimeIncrements = $('#amountShortTimeUnits').val();   // temporarily out
	   numTimeIncrements = 7;  // temporary. for days of week
	   var xSpaceIncrement = canvas.width / numTimeIncrements;
	   var ySpaceIncrement = 60;

/* Function for drawing a task to the canvas*/
function drawTaskLine(){
	if (canvas.getContext) {
		//TODO: CLEAR THE CANVAS OF EVERYTHING

		 var context = canvas.getContext("2d");
		 context.beginPath();
		 context.moveTo(sampleTaskStartDay * xSpaceIncrement, ySpaceIncrement);
		 context.lineTo(sampleTaskEndDay * xSpaceIncrement, ySpaceIncrement);
		 context.lineWidth = 5;
		 // set line color
		 context.strokeStyle = '#00b500';
		 context.stroke();

		 //circle
		 var centerX = sampleTaskStartDay * xSpaceIncrement;
		 var centerY = ySpaceIncrement;
		 var radius = 20;

		 context.beginPath();
		 context.arc(centerX, centerY, radius, 0, 2 * Math.PI, false);
		 context.fillStyle = '#00b500';

		 //we're probably going to have something where if a user achieves a milestone and wants to check it off, context.fill() will be executed.
		 context.fill();
		 context.lineWidth = 5;


		 var centerX = sampleTaskEndDay * xSpaceIncrement;
		 var centerY = ySpaceIncrement;
		 var radius = 20;

		 context.beginPath();
		 context.arc(centerX, centerY, radius, 0, 2 * Math.PI, false);
		 context.fillStyle = '#00b500';

		 //we're probably going to have something where if a user achieves a milestone and wants to check it off, context.fill() will be executed.
		 context.fill();
	 }
 };

});


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
	calculateTimelineWidth();
	calculateCategoryWidth();
};
