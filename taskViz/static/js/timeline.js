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

	dateObj.setDate(dateObj.getDate() + 1);

	// For loop that adds new headings
	for (var i = 0; i < 7; i++) {
		var displayedDay = dateObj.getDate();
		var displayedMonth = dateObj.getMonth() + 1;

		var dateVal = dateObj.getFullYear() + "|" + (displayedMonth) + '|' + (displayedDay);

		var timeSlotSpanId = "sTermTimeSlot" + i;
		var timeSlotSpan = '<span class="sTermTimeIncColHeader" id="' + timeSlotSpanId + '" dateVal="' + dateVal + '">' + dayOfWeek + ' ' + (displayedMonth) + '/' + (displayedDay) +  '</span>';
		console.warn("my string says: "+ timeSlotSpan);
		$( '#' + timeSlotSpanId ).replaceWith(timeSlotSpan);

		console.log("MONTH EQUALS: " + (dateObj.getMonth() + 1));
		console.log("DAY EQUALS: " + dateObj.getDate());

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
		}	else {
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
	$.getJSON('/retrieveTasks', function(data, status) {
		//----------------CANVAS SETUP-----------------------
		$('#dates').after('<canvas id="DemoCanvas" width="' + calculateTimelineWidth() + '" height="200px"></canvas>'); // TODO: currently static

		var canvas = document.getElementById('DemoCanvas');

		var numTimeIncrements = 7;  // number of columns
		var ySpaceIncrement = 60; //
		var yPos = 0;

		var context = canvas.getContext("2d");

		//----------------VARIABLES FOR DISPLAYING TASKS-----------------------
		// for loop to get the values of currently displayed calendar time time slots
		var calStartYear =  present_day.getFullYear();
		var calStartMonth = present_day.getMonth()+1;
		var calStartDay = present_day.getDate()+1;

		var calColYearArray = [];
		var calColMonthArray = [];
		var calColDayArray = [];

		var calColYear;
		var calColMonth;
		var calColDay;

		//below we iterate through the column spans to get their date and separate into year, month, and day
		$("span.sTermTimeIncColHeader").each(function() {
			var calColDate = $(this).attr('dateVal');
			var calColDatePartsArray = calColDate.split('|');

			calColYear = calColDatePartsArray[0]; //get the year from the dateVal
			calColMonth = calColDatePartsArray[1]; //get the month from the dateVal
			calColDay = calColDatePartsArray[2]; //get the day from the dateVal

			console.log("The year for a column is: " + calColDatePartsArray[0]);
			console.log("The month for a column is: " + calColDatePartsArray[1]);
			console.log("The day for a column is: " + calColDatePartsArray[2]);

			calColYearArray.push(calColYear);
			calColMonthArray.push(calColMonth);
			calColDayArray.push(calColDay);
		});
		console.log("The years of the columns are: " + calColYearArray);
		console.log("The months of the columns are: " + calColMonthArray);
		console.log("The days of the columns are: " + calColDayArray);


		for(var i = 0; i < data.length; i++) {
			task = data[i];
			console.log("_________LOOK HERE_______" + task); //this prints [object Object]
			//First we get the task dates from the database for this particular task.
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


			//------------------COMPARING CALENDAR COLUMN DATES WITH TASK DATES TO DISPLAY TASKS-----------------------
			if (shortTermView){
					//these variables are probably superfluous since we have the calColYearArray, calColMonthArray, and calColDayArray
					var calStartYear =  present_day.getFullYear();
					var calStartMonth = present_day.getMonth()+1;
					var calStartDay = present_day.getDate()+1;

					/* draw timeline line on canvas if start date of task equal start date view */
					for(var j = 0; j < calColDayArray.length ; j++){
						if (taskStartDay == calColDayArray[j]) {
							if (taskStartYear == calColYearArray[0] || taskStartYear == calColYearArray[6]) {
								if (taskStartMonth >= calColMonthArray[0]) {
										console.warn("The Days match");
										//drawing logic
										taskStartColumn = j;
										console.log("taskStartDay" + taskStartDay);
										console.log("taskStartMonth" + taskStartMonth);
										if (taskEndDay < taskStartDay){
											if (calColMonthArray[0] == 2) { //if task starts in February
												if ((taskStartYear%4) == 0 ){ //if task starts in a leap year
													taskEndDay = taskEndDay + 29;
												} else {
													taskEndDay = taskEndDay + 28;
												}
											}else if (calColMonthArray[0] == 1 || calColMonthArray[0] == 3 || calColMonthArray[0] == 5 || calColMonthArray[0] == 7 || calColMonthArray[0] == 8 || calColMonthArray[0] == 10 || calColMonthArray[0] == 12){ //If task starts in month with 31 days
													taskEndDay = taskEndDay + 31;
											}else{
													taskEndDay = taskEndDay + 30;
											}
										} else if (taskEndDay == taskStartDay) {
											if (taskEndMonth > taskStartMonth || taskEndYear > taskStartYear){
												taskStartDay = -10;
											}
										}
										taskEndColumn = (taskEndDay - taskStartDay) + taskStartColumn;
										console.log("taskEndDay = " +  taskEndDay + ", taskStartDay = " + taskStartDay + ", taskStartColumn = " + taskStartColumn + ", taskEndColumn = " + taskEndColumn);
										var xSpaceIncrement = canvas.width / numTimeIncrements;
										var yPos = yPos + ySpaceIncrement;
										drawTaskLine(canvas, context, taskStartColumn, taskEndColumn, xSpaceIncrement, yPos, parsedTask);
								} // end month check
							} // end year check
						} else if (taskEndDay == calColDayArray[i]) { // end start day check
							var zzzzzz = 1;
						} //end end day check
					} // end for loop over calColDayArray.length
			} // end if short term view
		} // end for loop over data.length
	}); // end $.getJSON('/retrieveTasks', function(data, status)

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
});


/* Function for drawing a task to the canvas */
function drawTaskLine(canvas, context, taskStartColumn, taskEndColumn, xSpaceIncrement, yPos, parsedTask){
	if (canvas.getContext) {
		console.log(taskStartColumn);
		console.log(taskEndColumn);
		console.log("task name" + parsedTask.task_name);

		var xPos1 = taskStartColumn * xSpaceIncrement + xSpaceIncrement / 2;
		var xPos2 = taskEndColumn * xSpaceIncrement + xSpaceIncrement / 2;

		var color = $('#category' + parsedTask.category_id).css('color'); // return RGB

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
};


function drawCircles(context, xPos1, xPos2, yPos, color){
	var radius = 20;

	context.beginPath();
	context.arc(xPos1, yPos, radius, 0, 2 * Math.PI, false);
	context.fillStyle = color;
	context.fill();

	context.lineWidth = 5;

	context.beginPath();
	context.arc(xPos2, yPos, radius, 0, 2 * Math.PI, false);
	context.fillStyle = color;

	context.fill();
};


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
