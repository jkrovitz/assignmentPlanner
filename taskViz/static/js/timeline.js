/**
* This file contains the functions for displaying
* time increments for the short and long term
* views. It also handles click events for form
* submission, as well as setting the color
* for each category based on user input.
**/

shortTermView = true;

/* Returns day of week based on value from start input, which is translated
into a string object.*/
function getDayOfWeek(startDateVar) {
	var dateObj = new Date(startDateVar);
	var weekdays = ["Mon", "Tues", "Wed", "Thur",	"Fri", "Sat", "Sun"];
	var dayOfWeek = weekdays[dateObj.getDay()];


	// For loop that adds new headings
	for (var i = 0; i < 7; i++) {

		var dateVal = dateObj.getFullYear() + "|" + (dateObj.getMonth()+1) + '|' + (dateObj.getDate()+1);

		var timeSlotSpanId = "sTermTimeSlot" + i;
		// var newDateObj = new Date(dateObj);
		var timeSlotSpan = '<span class="sTermTimeIncColHeader" id="' + timeSlotSpanId + '" dateVal="' + dateVal + '">' + dayOfWeek + ' ' + (dateObj.getMonth()+1) + '/' + (dateObj.getDate()+1) +  '</span>';
		console.warn("my string says: "+ timeSlotSpan);
		$( '#' + timeSlotSpanId ).replaceWith(timeSlotSpan);
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
		var timeSlotSpanId = 'lTermTimeSlot' + i;
		if (i === monthOffset) {
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
		if (dateObj.getMonth()+1+i !== 13){
			var dateVal = dateObj.getFullYear() + "|" + (dateObj.getMonth()+1+i);
		} else {
			var dateVal = dateObj.getFullYear() + "|" + (dateObj.getMonth()+1+i-12);
		}
		console.log("dateVal:" + dateVal);
		var timeSlotSpan = '<span class="lTermTimeIncColHeader"	id="' + timeSlotSpanId + '" dateVal="' + dateVal + '">' + monthOfYear + ' </span>';
		$( '#' + timeSlotSpanId ).replaceWith(timeSlotSpan);
	}
};

$(document).ready(function () {
	var taskStartColumn, taskEndColumn;
	var present_day = getDayOfWeek($('#start').val());
	console.log("Day being saved as: " + present_day);
	getMonthOfYear($('#start').val());


	console.warn("This is the day selected on the calendar: " + present_day);

	$('body').resize(calculateOnResize());

	var task = [];
	$.getJSON('/retrieveTasks', function(data, status){
		// for loop to get the values of currently displayed calendar time time slots

		for(var i=0; i< data.length; i++) {
			task = data[i];

			//First we get the task dates from the database for this particular task.
			for(var j=0; j< 7; j++) {

				if (shortTermView) {
					var sectionFullDate = $('#sTermTimeSlot' + j).attr('dateVal');
					console.log("sectionFullDate: " + sectionFullDate);
					console.log("sectionFullDate j: " + j);
					console.log('#sTermTimeSlot' + j, $('#sTermTimeSlot' + j));

					$("span.sTermTimeIncColHeader").each(function() {
						var calColDate = $(this).attr('dateVal');
						var calColDatePartsArray = calColDate.split('|');
						var calColYear = calColDatePartsArray[0];
						var calColMonth = calColDatePartsArray[1];
						var calColDay = calColDatePartsArray[2];
						console.log("The year for a column is: " + calColDatePartsArray[0]);
						console.log("The month for a column is: " + calColDatePartsArray[1]);
						console.log("The day for a column is: " + calColDatePartsArray[2]);
					});
					//Get display section info
				} else {
					//Get display section info
				}
			}

			var stringifiedTask = JSON.stringify(task); // turn JSON object into something readable by JavaScript
			$('#timelineId').after(stringifiedTask); // add task dictionary to DOM
			var parsedTask = JSON.parse(stringifiedTask); // separate dictionary into individual Task objects

			//make a date object for the start and end task dates
			var parsedTaskStartDate = new Date(parsedTask.task_start_date);
			var parsedTaskEndDate = new Date(parsedTask.task_end_date);

			//separate out year, month and day for task start date
			var taskStartYear = parsedTaskStartDate.getFullYear();
			var taskStartMonth = parsedTaskStartDate.getMonth()+1;
			var taskStartDay = parsedTaskStartDate.getDate()+1;

			//separate out year, month and day for task end date
			var taskEndYear = parsedTaskEndDate.getFullYear();
			var taskEndMonth = parsedTaskEndDate.getMonth()+1;
			var taskEndDay = parsedTaskEndDate.getDate()+1;

			//Now we get the calendar dates

			//From this point, make a for loop over each day shown to see if the timeline gets displayed
			if (shortTermView){
					var calStartYear =  present_day.getFullYear();
					var calStartMonth = present_day.getMonth()+1;
					var calStartDay = present_day.getDate()+1;

					if (taskStartDay < calStartDay && taskEndDay >= calEndDay && taskStartMonth == calStartMonth){

					}

					/* draw timeline line on canvas if start date of task equal start date view */
					if (calStartYear === taskStartYear && calStartMonth === taskStartMonth && calStartDay === taskStartDay) {
						console.warn("The Days match");
						taskStartColumn = 0;		// temporary variables
						taskEndColumn = 2;
						var xSpaceIncrement = canvas.width / numTimeIncrements;
						drawTaskLine(canvas, context, taskStartColumn, taskEndColumn, xSpaceIncrement, parsedTask);
					} else {
						console.warn("Days do not match");
						console.log("taskStartYear: " + taskStartYear);
						console.log("taskStartMonth: " + taskStartMonth);
						console.log("taskStartDay: " + taskStartDay);

						console.log("calStartYear: " + calStartYear);
						console.log("calStartMonth: " + calStartMonth);
						console.log("calStartDay: " + calStartDay);
					}

			} else { // In the case of long term view

					var calStartYear =  present_day.getFullYear();
					var calStartMonth = present_day.getMonth()+1;
					if (taskStartYear<calStartYear && taskendYear){

					}else if (taskStartYear === calStartYear && taskStartMonth < calStartMonth){

					}
					/* draw timeline line on canvas if start date of task equal start date view */
					if (calStartYear === taskStartYear && calStartMonth === taskStartMonth) {
						console.warn("The Days match");
						taskStartColumn = 0;		// temporary variables
						taskEndColumn = 2;
						var xSpaceIncrement = canvas.width / numTimeIncrements;
						drawTaskLine(canvas, context, taskStartColumn, taskEndColumn, xSpaceIncrement, parsedTask);
					} else {
						console.warn("Days do not match");
						console.log("taskStartYear: " + taskStartYear);
						console.log("taskStartMonth: " + taskStartMonth);

						console.log("calStartYear: " + calStartYear);
						console.log("calStartMonth: " + calStartMonth);
					}
				}
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
		var startVal = $('#start').val();
		getDayOfWeek(startVal);
		getMonthOfYear(startVal);
	});


	/* CLICK BUTTONS, OPEN POP-UPS LISTENERS */
	$('#newTaskButton').click(function () {
		$('#newTaskForm').css("display", "block");
	});


	/* CLICK SHORT TERM/LONG FORM BUTTON LISTENERS */
	$('#shortTermButton').click(function() {
		$('.sTermTimeIncColHeader').show();
		$('.lTermTimeIncColHeader').hide();
		shortTermView = true;
	});

	$('#longTermButton').click(function() {
		$('.sTermTimeIncColHeader').hide();
		$('.lTermTimeIncColHeader').show();
		shortTermView = false;
	});


	/* CANCEL FORM BUTTON LISTENERS */
	$('#cancelIdTask').click(function () {
		$('#newTaskForm').hide();
	});


	// /* Function for changing category colors  */
	// $('#category_color').on('change', function (e) {
	// 	var optionSelected = $("option:selected", this);
	// 	var valueSelected = this.value;
	// 	$(".background").css("background-color", valueSelected);
	// });


	// TODO: currently static
	$('#dates').after('<canvas id="DemoCanvas" width="' + calculateTimelineWidth() + '" height="100px"></canvas>');

	var canvas = document.getElementById('DemoCanvas');

	var numTimeIncrements = 7;  // temporary. for days of week
	var ySpaceIncrement = 60;

	var context = canvas.getContext("2d");

	/* Function for drawing a task to the canvas*/
});


function drawTaskLine(canvas, context, taskStartColumn, taskEndColumn, xSpaceIncrement, task){
	if (canvas.getContext) {
		console.log(taskStartColumn);
		console.log(taskEndColumn);

		var xPos1 = taskStartColumn * xSpaceIncrement + xSpaceIncrement / 2;
		var xPos2 = taskEndColumn * xSpaceIncrement + xSpaceIncrement / 2;
		var yPos = 60;

		var color = $('#category' + task.category_id).css('color'); // return RGB

		drawTimelineLine(context, xPos1, xPos2, yPos, color);
		drawCircles(context, xPos1, xPos2, yPos, color);
	}
};


function drawTimelineLine(context, xPos1, xPos2, yPos, color){
	context.beginPath();
	context.moveTo(xPos1, yPos);
	context.lineTo(xPos2, yPos);

	context.lineWidth = 5;
	context.strokeStyle = color;
	context.stroke();
}


function drawCircles(context, xPos1, xPos2, yPos, color){
	var radius = 20;

	context.beginPath();
	context.arc(xPos1, yPos, radius, 0, 2 * Math.PI, false);
	context.fillStyle = color;

	//we're probably going to have something where if a user achieves a milestone and wants to check it off, context.fill() will be executed.
	context.fill();
	context.lineWidth = 5;

	context.beginPath();
	context.arc(xPos2, yPos, radius, 0, 2 * Math.PI, false);
	context.fillStyle = color;

	//we're probably going to have something where if a user achieves a milestone and wants to check it off, context.fill() will be executed.
	context.fill();
}


/* Calculates the width of the div with the Class called Timeline. */
function calculateTimelineWidth(){
	var selectTimelineWidth = document.querySelector('.Timeline');
	timelineWidth = selectTimelineWidth.clientWidth;
	return timelineWidth;
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
