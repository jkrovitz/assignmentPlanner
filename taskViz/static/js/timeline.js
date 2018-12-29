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

		dayOfWeek = weekdays[dateObj.getDay()];
		dateObj.setDate(dateObj.getDate() + 1);

	}
	return new Date(startDateVar);
};



function getFormattedDate (date) {
    return date.getFullYear()
        + "-"
        + ("0" + (date.getMonth() + 1)).slice(-2)
        + "-"
        + ("0" + date.getDate()).slice(-2);
}

var today = getFormattedDate(new Date()); 
$("#start").val(today);




/* Returns months based on value from start input, which is translated into a string object.*/
function getMonthOfYear(startDateVar) {
	var dateObj = new Date(startDateVar);
	var months = ["Jan","Feb","March","April","May","June","July", "Aug","Sept","Oct","Nov","Dec"];
	var monthOfYear = months[dateObj.getMonth()];

	dateObj.setMonth(dateObj.getMonth() + 1);

	// For loop that adds new headings
	for (let i = 0; i < 12; i++) {
		var displayedMonth = dateObj.getMonth() + 1;
		var year = dateObj.getFullYear();

		if (monthOfYear == "Dec") {
			year = year-1;
		}
		var dateVal = year + "|" + (displayedMonth - 1);
		var timeSlotSpanId = "lTermTimeSlot" + i;
		var timeSlotSpan = '<span class="lTermTimeIncColHeader" id="' + timeSlotSpanId + '" dateVal="' + dateVal + '">' + monthOfYear + ' ' + year + '</span>';
		$( '#' + timeSlotSpanId ).replaceWith(timeSlotSpan);

		monthOfYear = months[dateObj.getMonth()];
		dateObj.setMonth(dateObj.getMonth() + 1);
	}
};

var canvas;
var context;

// ------------------LISTENERS AND CANVAS DRAWING---------------------
$(document).ready(function () {
	var taskStartColumn, taskEndColumn;

	// these lines are important
	getDayOfWeek($('#start').val());
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
		getDayOfWeek($('#start').val());
		 if($('lTermTimeIncColHeader').is(":visible")){
        $('.lTermTimeIncColHeader').hide();
        $('.sTermTimeIncColHeader').show();
    }
		
		shortTermView = true;
		longTermView = false;

		localStorage.setItem("shortTermView", shortTermView);
		localStorage.setItem("longTermView", longTermView);

		$('#shortTermButton').css({'background-color': '#007bff', 'color': '#ffffff'});
		$('#longTermButton').css({'background-color': '#ffffff', 'color': '#007bff'});

		drawAllTheTasks();
	});

	$('#longTermButton').click(function longterm() {
		getMonthOfYear($('#start').val());
		 if($('sTermTimeIncColHeader').is(":visible")){
        $('.sTermTimeIncColHeader').hide();
        $('.lTermTimeIncColHeader').show();
    }
		
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

	function drawAllTheTasks() {
		console.log("DRAWING ALL THE TASKS");
		$.getJSON('/retrieveTasks', function(data, status) {
			console.log("RUNNING JSON");
			//----------------CANVAS SETUP-----------------------
			const numTimeIncrements = 7;  // number of columns
			const ySpaceIncrement = 60;
			var yPos = 0;



			redrawCanvas();

			//--------------------ITERATE THROUGH TASKS-------------------
			for (let i = 0; i < data.length; i++) {
				task = data[i];

				// First we get the task dates from the database for this particular task.
				var stringifiedTask = JSON.stringify(task); // turn JSON object into something readable by JavaScript
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


				if (localStorage.getItem("shortTermView") == "true") {
					//----------------VARIABLES FOR DISPLAYING TASKS-----------------------
					// for loop to get the values of currently displayed calendar time time slots

					var sCalColYearArray = [];
					var sCalColMonthArray = [];
					var sCalColDayArray = [];

					var sCalColYear;
					var sCalColMonth;
					var sCalColDay;
					//--------------------ITERATE THROUGH SHORT TERM COLUMN SPANS-------------------
					//to get their date and separate into year, month, and day
					$("span.sTermTimeIncColHeader").each(function() {
						var sCalColDate = $(this).attr('dateVal');
						var sCalColDatePartsArray = sCalColDate.split('|');

						sCalColYear = sCalColDatePartsArray[0]; //get the year from the dateVal
						sCalColMonth = sCalColDatePartsArray[1]; //get the month from the dateVal
						sCalColDay = sCalColDatePartsArray[2]; //get the day from the dateVal

						sCalColYearArray.push(sCalColYear);
						sCalColMonthArray.push(sCalColMonth);
						sCalColDayArray.push(sCalColDay);
					});

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
						for (let j = 0; j < sCalColDayArray.length; j++) {	// iterates over days being viewed on the timeline
							if (taskEndDay == sCalColDayArray[j]) {
								taskEndColumn = j;
								drawTaskLine(canvas, context, taskStartColumn, taskEndColumn, xSpaceIncrement, yPos, parsedTask);
							}
						}
					};

					function drawLineInsideShortTerm() {
						yPos = yPos + ySpaceIncrement;
						for (let j = 0; j < sCalColDayArray.length; j++) {	// iterates over days being viewed on the timeline
							if (taskStartDay == sCalColDayArray[j]) {
								taskStartColumn = j;
							}
							if (taskEndMonth == sCalColMonthArray[j] && taskEndDay == sCalColDayArray[j]) {
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
						var didWeFindTheStartDateShortTerm = false;
						var didWeDrawTheLineShortTerm = false;
						if (taskStartDay == sCalColDayArray[j] && taskStartMonth == sCalColMonthArray[j] && taskStartYear == sCalColYearArray[j]){
							drawLineInsideShortTerm();
							didWeFindTheStartDateShortTerm = true;
							var didWeDrawTheLineShortTerm = true;
							break;
						} else {
							if (taskEndDay == sCalColDayArray[j] && taskEndMonth == sCalColMonthArray[j] && taskEndYear == sCalColYearArray[j]) {
								drawLineFromLeftShortTerm();
								var didWeDrawTheLineShortTerm = true;
								break;
							}
						}
					}

					if (didWeDrawTheLineShortTerm == false) {
						if (taskStartYear <= sCalColYearArray[0] && taskEndYear >= sCalColYearArray[6]) { // if the task begins at or before the calendar year and ends at or after the calendar year
							if (taskStartYear < sCalColYearArray[0] && taskEndYear > sCalColYearArray[6] ) { //if the task starts before and ends after the current display
								drawLineThroughShortTerm();
							} else if (taskEndYear > sCalColYearArray[6]) { //if the task start year is the same as the first column and the end year is after the last column year
								if (taskStartMonth < sCalColMonthArray[0]) {
									drawLineThroughShortTerm();
								} else if (taskStartMonth == sCalColMonthArray[0]) {
									if (taskStartDay < sCalColDayArray[0]){
										drawLineThroughShortTerm();
									}
								}
							} else if (taskStartYear < sCalColYearArray[0]) { // in this case the End year equals the Calendar and Start Year is before or equal to sCalendar.
								if (taskEndMonth > sCalColMonthArray[6]) {
									drawLineThroughShortTerm();
								} else if (taskEndMonth == sCalColMonthArray[6]) {
									if (taskEndDay > sCalColDayArray[6]) {
										drawLineThroughShortTerm();
									}
								}
							} else if (taskStartYear == sCalColYearArray[0] && taskEndYear == sCalColYearArray[6]) { //Years are all equal. CHECK EVERYTHING!
								if (taskStartMonth <= sCalColMonthArray[0] && taskEndMonth >= sCalColMonthArray[6]) { // if the task begins at or before the calendar month and ends at or after the calendar month
									if (taskStartMonth < sCalColMonthArray[0] && taskEndMonth > sCalColMonthArray[6] ) { //if the task starts before and ends after the current display
										drawLineThroughShortTerm();
									} else if (taskEndMonth > sCalColMonthArray[6]) { //if the task start month is the same as the first column and the end month is after the last column month
										if (taskStartDay < sCalColDayArray[0]) {
											drawLineThroughShortTerm();
										}
									} else if (taskStartMonth < sCalColMonthArray[0]) {// in this case the End month equals the Calendar and Start month is before or equal to calendar.
										if (taskEndDay > sCalColDayArray[6]) {
											drawLineThroughShortTerm();
										}
									} else if (taskStartMonth == sCalColMonthArray[0] && taskEndMonth == sCalColMonthArray[6]) { // Month starts and ends at the same displayed time. Check DAY!
										if (taskStartDay < sCalColDayArray[0]) {
											if (taskEndDay > sCalColDayArray[6]) {
												drawLineThroughShortTerm();
											}
										}
									}
								}
							}  // end check years are equal
						} // end if the task begins at or before the calendar year and ends at or after the calendar year
					}


				} else if (localStorage.getItem("longTermView") == "true") {
					//----------------VARIABLES FOR DISPLAYING TASKS-----------------------
					// for loop to get the values of currently displayed calendar time time slots

					var lCalColYearArray = [];
					var lCalColMonthArray = [];
					var lCalColDayArray = [];

					var lCalColYear;
					var lCalColMonth;
					var lCalColDay;
					//--------------------ITERATE THROUGH SHORT TERM COLUMN SPANS-------------------
					//to get their date and separate into year, month, and day
					$("span.lTermTimeIncColHeader").each(function() {
						var lCalColDate = $(this).attr('dateVal');
						var lCalColDatePartsArray = lCalColDate.split('|');

						lCalColYear = lCalColDatePartsArray[0]; //get the year from the dateVal
						lCalColMonth = lCalColDatePartsArray[1]; //get the month from the dateVal

						lCalColYearArray.push(lCalColYear);
						lCalColMonthArray.push(lCalColMonth);
					});

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
						for (let j = 0; j < lCalColMonthArray.length; j++) {	// iterates over months being viewed on the timeline
							if (taskEndMonth == lCalColMonthArray[j]) {
								taskEndColumn = j;
								drawTaskLine(canvas, context, taskStartColumn, taskEndColumn, xSpaceIncrement, yPos, parsedTask);
							}
						}
					};

					function drawLineInsideLongTerm() {
						yPos = yPos + ySpaceIncrement;
						for (let k = 0; k < lCalColMonthArray.length; k++) {	// iterates over months being viewed on the timeline
							if (taskStartMonth == lCalColMonthArray[k]) {
								taskStartColumn = k;
							}
							if (taskEndYear == lCalColYearArray[k] && taskEndMonth == lCalColMonthArray[k]) {
								taskEndColumn = k;
								break;
							} else {
								taskEndColumn = 10;
							}
						}
						drawTaskLine(canvas, context, taskStartColumn, taskEndColumn, xSpaceIncrement, yPos, parsedTask);
					};

					// LONG TERM------------------COMPARING CALENDAR COLUMN DATES WITH TASK DATES TO DISPLAY TASKS-----------------------


					for (var m = 0; m < 7; m++) {
						var didWeFindTheStartDateLongTerm = false;
						var didWeDrawTheLineLongTerm = false;
						if (taskStartMonth == lCalColMonthArray[m] && taskStartYear == lCalColYearArray[m]){
							drawLineInsideLongTerm();
							didWeFindTheStartDateLongTerm = true;
							didWeDrawTheLineLongTerm = true;
							break;
						} else {
							if (taskEndMonth == lCalColMonthArray[m] && taskEndYear == lCalColYearArray[m]) {
								drawLineFromLeftLongTerm();
								didWeDrawTheLineLongTerm = true;
								break;
							}
						}
					}

					if (didWeDrawTheLineLongTerm == false) {
						if (taskStartYear <= lCalColYearArray[0] && taskEndYear >= lCalColYearArray[6]) {
							if (taskStartYear < lCalColYearArray[0] && taskEndYear > lCalColYearArray[6] ) {
								drawLineThroughLongTerm();
							} else if (taskEndYear > lCalColYearArray[6]) {
								if (taskStartMonth < lCalColMonthArray[0]) {
									drawLineThroughLongTerm();
								}
							} else if (taskStartYear < lCalColYearArray[0]) {
								if (taskEndMonth > lCalColMonthArray[6]) {
									drawLineThroughLongTerm();
								} else if (taskEndMonth == lCalColMonthArray[6]) {
									drawLineFromLeftLongTerm();
								}
							} else if (taskStartYear == lCalColYearArray[0] && taskEndYear == lCalColYearArray[6]) { //Years are all equal. CHECK EVERYTHING!
								if (taskStartMonth <= lCalColMonthArray[0] && taskEndMonth >= lCalColMonthArray[6]) {
									if (taskStartMonth < lCalColMonthArray[0] && taskEndMonth > lCalColMonthArray[6] ) {
										drawLineThroughLongTerm();
									} else if (taskStartMonth < lCalColMonthArray[0]) {// in this case the End month equals the Calendar and Start month is before or equal to calendar.
										drawLineThroughLongTerm();
									}
								}
							}
						}
					}
				}

			} // end for loop over data.length
	 	}); // end $.getJSON('/retrieveTasks', function(data, status)
	}; // end DrawAllTheTasks

	// ============================================================END COMPARISONS OF TASK DATES AND CAL DATES FOR SHORT AND LONG TERM=============================================================

	//-----------------AJAX CALL TO CREATE NEW TASKS--------------------
	$('#newTaskFormId').submit( function(e) {
		e.preventDefault();
		var task_name = $('#new_task_input').val();
		var taskStartDate = $('#new_task_start_date_input').val();
		var taskEndDate = $('#new_task_end_date_input').val();

		if (taskEndDate < taskStartDate) {
			$('#newTaskForm').hide();
			alert("End date should be AFTER start date. TRY AGAIN.");
		} else {
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
		}
	});

	// ---------------------INPUT/BUTTON LISTENERS------------------------
	/* START-DATE LISTENER */
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

function redrawCanvas() {
	$('#DemoCanvas').remove();
	$('#dates').after('<canvas id="DemoCanvas" width="' + calculateTimelineWidth() + '" height="600px"></canvas>'); // TODO:

	canvas = document.getElementById('DemoCanvas');
	context = canvas.getContext("2d");
}


/* Function for drawing a task to the canvas */
function drawTaskLine(canvas, context, taskStartColumn, taskEndColumn, xSpaceIncrement, yPos, parsedTask) {
	if (canvas.getContext) {
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
};


/* Calculates the width of the div with the Class called Category. */
function calculateCategoryWidth() {
	var selectCategoryWidth = document.querySelector('.Category');
	categoryWidth = selectCategoryWidth.clientWidth;
};


/* A helper function. Calculates the height width of various elments, such as divs when the window
is resized. This function is placed within the html body tag and is called when the window is resized. */
function calculateOnResize() {
	calculateTimelineWidth();
	calculateCategoryWidth();
};
