/**
* This file contains the functions for displaying
* time increments for the short and long term
* views. It also handles click events for form
* submission, as well as setting the color
* for each category based on user input.
**/

var shortTermView;
var longTermView;
var dateVal;

/* Returns day of week based on value from start input, which is translated into a string object.*/
function getDayOfWeek(startDateVar) {
	var dateObj = new Date(startDateVar);
	var weekdays = ["Mon", "Tues", "Wed", "Thur",	"Fri", "Sat", "Sun"];
	var dayOfWeek = weekdays[dateObj.getDay()];

	dateObj.setDate(dateObj.getDate() + 1);

	// For loop that adds new headings
	for (let i = 0; i < 7; i++) {
		var displayedDay = dateObj.getDate();
		var displayedMonth = dateObj.getMonth() + 1;

		var dateVal = dateObj.getFullYear() + "|" + (displayedMonth) + '|' + (displayedDay);

		var timeSlotSpanId = "sTermTimeSlot" + i;
		var timeSlotSpan = '<span class="sTermTimeIncColHeader" id="' + timeSlotSpanId + '" dateVal="' + dateVal + '">' + dayOfWeek + ' ' + (displayedMonth) + '/' + (displayedDay) +  '</span>';
		$( '#' + timeSlotSpanId ).replaceWith(timeSlotSpan);

		dateObj.setDate(dateObj.getDate() + 1);
		dayOfWeek = weekdays[dateObj.getDay()];
	}
	return new Date(startDateVar);
};


/* Returns months based on value from start input, which is translated into a string object.*/
function getMonthOfYear(startDateVar) {
	var dateObj = new Date(startDateVar);
	var months = ["Jan","Feb","March","April","May","June","July", "Aug","Sept","Oct","Nov","Dec"];
	var monthOfYear = months[dateObj.getMonth()];
	var monthOffset = months.length - dateObj.getMonth();

	// For loop that adds new headings
	for (let i = 0; i < 12; i++) {
		var timeSlotSpanId = 'lTermTimeSlot' + i;
		if (i === monthOffset) {
			var monthIncrement = 1;
			monthOfYear = months[0];
		}
		if (monthIncrement) {
			monthOfYear = months[monthIncrement - 1];
			monthIncrement ++;
		}	else {
			monthOfYear = months[dateObj.getMonth() + i];
			monthIncrement ++;
		}
		if (dateObj.getMonth()+1+i !== 13) {
			dateVal = dateObj.getFullYear() + "|" + (dateObj.getMonth()+1+i);
		} else {
			dateVal = dateObj.getFullYear() + "|" + (dateObj.getMonth()+1+i-12);
		}
		console.log("dateVal:" + dateVal);
		var timeSlotSpan = '<span class="lTermTimeIncColHeader"	id="' + timeSlotSpanId + '" dateVal="' + dateVal + '">' + monthOfYear + ' </span>';
		$( '#' + timeSlotSpanId ).replaceWith(timeSlotSpan);
	}
};

var canvas;
var context;

// ------------------LISTENERS AND CANVAS DRAWING---------------------
$(document).ready(function () {
	var taskStartColumn, taskEndColumn;

	// these lines are important
	getDayOfWeek($('#start').val());
	getMonthOfYear($('#start').val());

	$('body').resize(calculateOnResize());


	/* SHORT/LONG TERM BUTTON LISTENERS */
	$('#shortTermButton').click(function() {
		$('.sTermTimeIncColHeader').show();
		$('.lTermTimeIncColHeader').hide();
		shortTermView = true;
		longTermView = false;

		localStorage.setItem("shortTermView", shortTermView);
		localStorage.setItem("longTermView", longTermView);

		$('#shortTermButton').css({'background-color': '#007bff', 'color': '#ffffff'});
		$('#longTermButton').css({'background-color': '#ffffff', 'color': '#007bff'});
		let canvasCurrent = document.getElementById('DemoCanvas');
		let contextCurrent = canvas.getContext("2d");
		redrawCanvas(canvas, context);
	});

	$('#longTermButton').click(function() {
		$('.sTermTimeIncColHeader').hide();
		$('.lTermTimeIncColHeader').show();
		shortTermView = false;
		longTermView = true;

		localStorage.setItem("shortTermView", shortTermView);
		localStorage.setItem("longTermView", longTermView);

		$('#longTermButton').css({'background-color': '#007bff', 'color': '#ffffff'});
		$('#shortTermButton').css({'background-color': '#ffffff', 'color': '#007bff'});
		let canvasCurrent = document.getElementById('DemoCanvas');
		let contextCurrent = canvas.getContext("2d");
		redrawCanvas(canvas, context);
	});

	var task = []; //only ever holds one task at a time
	$.getJSON('/retrieveTasks', function(data, status) {
		//----------------CANVAS SETUP-----------------------

		var something = redrawCanvas(canvas, context);
		canvas = something[0];
		context = something[1];

		const numTimeIncrements = 7;  // number of columns
		const ySpaceIncrement = 60;
		var yPos = 0;


		//----------------VARIABLES FOR DISPLAYING TASKS-----------------------
		// for loop to get the values of currently displayed calendar time time slots

		var calColYearArray = [];
		var calColMonthArray = [];
		var calColDayArray = [];

		var calColYear;
		var calColMonth;
		var calColDay;

		//--------------------ITERATE THROUGH COLUMN SPANS-------------------
		//to get their date and separate into year, month, and day
		$("span.sTermTimeIncColHeader").each(function() {
			console.log("DATE VAL: " + dateVal)
			var calColDate = $(this).attr('dateVal');
			console.log("calColDate: " + calColDate)
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

		//--------------------ITERATE THROUGH TASKS-------------------
		for (let i = 0; i < data.length; i++) {
			task = data[i];
			console.log("_________LOOK HERE_______" + task); // this prints [object Object]

			// First we get the task dates from the database for this particular task.
			var stringifiedTask = JSON.stringify(task); // turn JSON object into something readable by JavaScript
			// $('#timelineId').after(stringifiedTask); // add task dictionary to DOM
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

			console.log("SHORT TERM VIEW: " + localStorage.getItem("shortTermView"));
			console.log("LONG TERM VIEW: " + localStorage.getItem("longTermView"));

			if (localStorage.getItem("shortTermView") == true) {
				var xSpaceIncrement = canvas.width / numTimeIncrements;

				// -------------------FUNCTIONS TO DRAW TASKS ONTO THE CANVAS FOR SHORT TERM----------------
				function drawLineThroughShortTerm() {
					taskStartColumn = -1;
					taskEndColumn = 10;
					yPos = yPos + ySpaceIncrement;
					drawTaskLine(canvas, context, taskStartColumn, taskEndColumn, xSpaceIncrement, yPos, parsedTask);
				};

				function drawLineFromLeftShortTerm() {
					yPos = yPos + ySpaceIncrement;
					taskStartColumn = -1;
					for (let j = 0; j < calColDayArray.length; j++) {	// iterates over days being viewed on the timeline
						if (taskEndDay == calColDayArray[j]) {
							taskEndColumn = j;
							drawTaskLine(canvas, context, taskStartColumn, taskEndColumn, xSpaceIncrement, yPos, parsedTask);
						}
					}
				};

				function drawLineFromRightShortTerm() {
					yPos = yPos + ySpaceIncrement;
					taskEndColumn = 10;
					for (let j = 0; j < calColDayArray.length; j++) {	// iterates over days being viewed on the timeline
						if (taskStartDay == calColDayArray[j]) {
							taskStartColumn = j;
							drawTaskLine(canvas, context, taskStartColumn, taskEndColumn, xSpaceIncrement, yPos, parsedTask);
						}
					}
				};

				function drawLineInsideShortTerm() {
					yPos = yPos + ySpaceIncrement;
					for (let j = 0; j < calColDayArray.length; j++) {	// iterates over days being viewed on the timeline
						if (taskStartDay == calColDayArray[j]) {
							taskStartColumn = j;
						}
						if (taskEndDay == calColDayArray[j]) {
							taskEndColumn = j;
							break;
						} else {
							taskEndColumn = 10;
						}
					}
					drawTaskLine(canvas, context, taskStartColumn, taskEndColumn, xSpaceIncrement, yPos, parsedTask);
				};

				// SHORT TERM------------------COMPARING CALENDAR COLUMN DATES WITH TASK DATES TO DISPLAY TASKS-----------------------
				for (var j = 0; j < 7; j++) {
					if(taskStartDay == calColDayArray[j] && taskStartMonth == calColMonthArray[j] && taskStartYear == calColYearArray[j]){
						drawLineInsideShortTerm();
					}
				}

				if (taskStartYear <= calColYearArray[0] && taskEndYear >= calColYearArray[6]) { // if the task begins at or before the calendar year and ends at or after the calendar year
					if (taskStartYear < calColYearArray[0] && taskEndYear > calColYearArray[6] ) { //if the task starts before and ends after the current display
						drawLineThroughShortTerm();
					} else if (taskEndYear > calColYearArray[6]) { //if the task start year is the same as the first column and the end year is after the last column year
						if (taskStartMonth < calColMonthArray[0]) {
							drawLineThroughShortTerm();
						} else if (taskStartMonth == calColMonthArray[0]) {
							if (taskStartDay < calColDayArray[0]){
								drawLineThroughShortTerm();
							}
						}
					} else if (taskStartYear < calColYearArray[0]) { // in this case the End year equals the Calendar and Start Year is before or equal to calendar.
						console.log("sad sad beep");
						if (taskEndMonth > calColMonthArray[6]) {
							drawLineThroughShortTerm();
						} else if (taskEndMonth == calColMonthArray[6]) {
							console.log("Cautious beep");
								if (taskEndDay > calColDayArray[6]) {
									drawLineThroughShortTerm();
								} else if (taskStartDay >= calColDayArray[0]) {
									drawLineFromLeftShortTerm();
								}
						}
					} else if (taskStartYear == calColYearArray[0] && taskEndYear == calColYearArray[6]) { //Years are all equal. CHECK EVERYTHING!
						if (taskStartMonth <= calColMonthArray[0] && taskEndMonth >= calColMonthArray[6]) { // if the task begins at or before the calendar month and ends at or after the calendar month
							if (taskStartMonth < calColMonthArray[0] && taskEndMonth > calColMonthArray[6] ) { //if the task starts before and ends after the current display
								drawLineThroughShortTerm();
							} else if (taskEndMonth > calColMonthArray[6]) { //if the task start month is the same as the first column and the end month is after the last column month
								if (taskStartDay < calColDayArray[0]) {
									drawLineThroughShortTerm();
								}
							} else if (taskStartMonth < calColMonthArray[0]) {// in this case the End month equals the Calendar and Start month is before or equal to calendar.
								if (taskEndDay > calColDayArray[6]) {
									drawLineThroughShortTerm();
								}
							} else if (taskStartMonth == calColMonthArray[0] && taskEndMonth == calColMonthArray[6]) { // Month starts and ends at the same displayed time. Check DAY!
								if (taskStartDay < calColDayArray[0]) {
									if (taskEndDay > calColDayArray[6]) {
										drawLineThroughShortTerm();
									} else {
										drawLineFromLeftShortTerm();
									}
								}
							}
						}
					}  // end check years are equal
				}  // end if the task begins at or before the calendar year and ends at or after the calendar year
			} else if (localStorage.getItem("longTermView") == true) {
				var xSpaceIncrement = canvas.width / numTimeIncrements;

					// -------------------FUNCTIONS TO DRAW TASKS ONTO THE CANVAS FOR LONG TERM----------------
				function drawLineThroughLongTerm() {
					taskStartColumn = -1;
					taskEndColumn = 10;
					yPos = yPos + ySpaceIncrement;
					drawTaskLine(canvas, context, taskStartColumn, taskEndColumn, xSpaceIncrement, yPos, parsedTask);
				};

				function drawLineFromLeftLongTerm() {
					yPos = yPos + ySpaceIncrement;
					taskStartColumn = -1;
					for (let j = 0; j < calColMonthArray.length; j++) {	// iterates over months being viewed on the timeline
						if (taskEndMonth == calColMonthArray[j]) {
							taskEndColumn = j;
							drawTaskLine(canvas, context, taskStartColumn, taskEndColumn, xSpaceIncrement, yPos, parsedTask);
						}
					}
				};

				function drawLineFromRightLongTerm() {
					yPos = yPos + ySpaceIncrement;
					taskEndColumn = 10;
					for (let j = 0; j < calColMonthArray.length; j++) {	// iterates over months being viewed on the timeline
						if (taskStartMonth == calColMonthArray[j]) {
							taskStartColumn = j;
							drawTaskLine(canvas, context, taskStartColumn, taskEndColumn, xSpaceIncrement, yPos, parsedTask);
						}
					}
				};

				function drawLineInsideLongTerm() {
					yPos = yPos + ySpaceIncrement;
					for (let j = 0; j < calColMonthArray.length; j++) {	// iterates over months being viewed on the timeline
						if (taskStartMonth == calColMonthArray[j]) {
							taskStartColumn = j;
						}
						if (taskEndMonth == calColMonthArray[j]) {
							taskEndColumn = j;
							break;
						} else {
							taskEndColumn = 10;
						}
					}
					drawTaskLine(canvas, context, taskStartColumn, taskEndColumn, xSpaceIncrement, yPos, parsedTask);
				};

				// LONG TERM------------------COMPARING CALENDAR COLUMN DATES WITH TASK DATES TO DISPLAY TASKS-----------------------
				for (var j = 0; j < 7; j++) {
					if(taskStartMonth == calColMonthArray[j]   && taskStartYear == calColYearArray[j]){
						drawLineInsideLongTerm();
					}
				}

				if (taskStartYear <= calColYearArray[0] && taskEndYear >= calColYearArray[6]) { // if the task begins at or before the calendar year and ends at or after the calendar year
					if (taskStartYear < calColYearArray[0] && taskEndYear > calColYearArray[6] ) { //if the task starts before and ends after the current display
							drawLineThroughLongTerm();
					} else if (taskEndYear > calColYearArray[6]) { //if the task start year is the same as the first column and the end year is after the last column year
							if (taskStartMonth < calColMonthArray[0]) {
								drawLineThroughLongTerm();
							}
					} else if (taskStartYear < calColYearArray[0]) { // in this case the End year equals the Calendar and Start Year is before or equal to calendar.
							console.log("sad sad beep");
							if (taskEndMonth > calColMonthArray[6]) {
								drawLineThroughLongTerm();
							} else if (taskEndMonth == calColMonthArray[6]) {
								console.log("Cautious beep");
									if (taskStartDay >= calColDayArray[0]) {
										drawLineFromLeftLongTerm();
									}
							}
						} else if (taskStartYear == calColYearArray[0] && taskEndYear == calColYearArray[6]) { //Years are all equal. CHECK EVERYTHING!
								if (taskStartMonth <= calColMonthArray[0] && taskEndMonth >= calColMonthArray[6]) { // if the task begins at or before the calendar month and ends at or after the calendar month
									if (taskStartMonth < calColMonthArray[0] && taskEndMonth > calColMonthArray[6] ) { //if the task starts before and ends after the current display
										drawLineThroughLongTerm();
									} else if (taskStartMonth < calColMonthArray[0]) {// in this case the End month equals the Calendar and Start month is before or equal to calendar.
											drawLineThroughLongTerm();
									}
								}

					}  // end check years are equal
				}
			}

		} // end for loop over data.length
 	}); // end $.getJSON('/retrieveTasks', function(data, status)

	// ============================================================END COMPARISONS OF TASK DATES AND CAL DATES FOR SHORT AND LONG TERM=============================================================

	//-----------------AJAX CALL TO CREATE NEW TASKS--------------------
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
	});

	// ---------------------INPUT/BUTTON LISTENERS------------------------
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

	/* CANCEL FORM BUTTON LISTENERS */
	$('#cancelIdTask').click(function () {
		$('#newTaskForm').hide();
	});


});

function redrawCanvas() {
	console.log("CANVAS IS BEING DRAWN");
	$('#DemoCanvas').remove();
	$('#dates').after('<canvas id="DemoCanvas" width="' + calculateTimelineWidth() + '" height="200px"></canvas>'); // TODO:

	canvas = document.getElementById('DemoCanvas');
	context = canvas.getContext("2d");
	return [canvas, context];
}


/* Function for drawing a task to the canvas */
function drawTaskLine(canvas, context, taskStartColumn, taskEndColumn, xSpaceIncrement, yPos, parsedTask) {
	if (canvas.getContext) {
		console.log("taskStartColumn: " + taskStartColumn);
		console.log("taskEndColumn: " + taskEndColumn);

		var xPos1 = taskStartColumn * xSpaceIncrement + xSpaceIncrement / 2;
		var xPos2 = taskEndColumn * xSpaceIncrement + xSpaceIncrement / 2;

		var color = $('#category' + parsedTask.category_id).css('color'); // return RGB

		drawLine(context, xPos1, xPos2, yPos, color);
		drawCircles(context, xPos1, xPos2, yPos, color);
		drawName(context, xPos1, yPos, taskStartColumn, parsedTask.task_name);
	}
};


// ------------ DRAW TIMELINES ON CANVAS --------------------
function drawLine (context, xPos1, xPos2, yPos, color) {
	context.beginPath();
	context.moveTo(xPos1, yPos);
	context.lineTo(xPos2, yPos);

	context.lineWidth = 4;
	context.strokeStyle = color;
	context.stroke();
};


function drawCircles (context, xPos1, xPos2, yPos, color) {
	let radius = 12;

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

function drawName (context, xPos, yPos, taskStartColumn, taskName) {
	context.font = "20px Arial";
	context.fillStyle = "#000000";
	if (taskStartColumn < 0) {
		context.fillText(taskName, 0 + 25, yPos - 15);
	} else {
		context.fillText(taskName, xPos + 25, yPos - 15);
	}
}


/* Calculates the width of the div with the Class called Timeline. */
function calculateTimelineWidth() {
	var selectTimelineWidth = document.querySelector('.Timeline');
	timelineWidth = selectTimelineWidth.clientWidth;
	return timelineWidth;
	// return console.log("Width of Timeline div:" + timelineWidth);
};


/* Calculates the width of the div with the Class called Category. */
function calculateCategoryWidth() {
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
