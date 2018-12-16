/**
* This file contains the functions for displaying
* time increments for the short and long term
* views. It also handles click events for form
* submission, as well as setting the color
* for each category based on user input.
**/

shortTermView = true;
var dateVal;

/* Returns day of week based on value from start input, which is translated
into a string object.*/
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


/* Returns months based on value from start input, which is translated
into a string object.*/
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

$(document).ready(function () {
	var taskStartColumn, taskEndColumn;
	// these lines are important
	getDayOfWeek($('#start').val());
	getMonthOfYear($('#start').val());

	$('body').resize(calculateOnResize());

	var task = [];
	$.getJSON('/retrieveTasks', function(data, status) {
		//----------------CANVAS SETUP-----------------------
		$('#dates').after('<canvas id="DemoCanvas" width="' + calculateTimelineWidth() + '" height="200px"></canvas>'); // TODO: currently static
		var canvas = document.getElementById('DemoCanvas');
		var context = canvas.getContext("2d");

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

		//below we iterate through the column spans to get their date and separate into year, month, and day
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


		for (let i = 0; i < data.length; i++) {	// iterates over tasks
			task = data[i];
			console.log("_________LOOK HERE_______" + task); // this prints [object Object]

			// First we get the task dates from the database for this particular task.
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
			if (shortTermView) {
				var xSpaceIncrement = canvas.width / numTimeIncrements;
					/* draw timeline line on canvas if start date of task equal start date view */

					//----------------------------------------------------------------------------------------

				function drawLineThrough() {
					taskStartColumn = -1;
					taskEndColumn = 10;
					yPos = yPos + ySpaceIncrement;
					drawTaskLine(canvas, context, taskStartColumn, taskEndColumn, xSpaceIncrement, yPos, parsedTask);
				};

				function drawLineFromLeft() {
					yPos = yPos + ySpaceIncrement;
					taskStartColumn = -1;
					for (let j = 0; j < calColDayArray.length; j++) {	// iterates over dates being viewed on the timeline
						if (taskEndDay == calColDayArray[j]) {
							taskEndColumn = j;
							drawTaskLine(canvas, context, taskStartColumn, taskEndColumn, xSpaceIncrement, yPos, parsedTask);
						}
					}
				};

				function drawLineFromRight() {
					yPos = yPos + ySpaceIncrement;
					taskEndColumn = 10;
					for (let j = 0; j < calColDayArray.length; j++) {	// iterates over dates being viewed on the timeline
						if (taskStartDay == calColDayArray[j]) {
							taskStartColumn = j;
							drawTaskLine(canvas, context, taskStartColumn, taskEndColumn, xSpaceIncrement, yPos, parsedTask);
						}
					}
				};

				function drawLineInside() {
					yPos = yPos + ySpaceIncrement;
					for (let j = 0; j < calColDayArray.length; j++) {	// iterates over dates being viewed on the timeline
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

				for (var j = 0; j < 7; j++) {
					if(taskStartDay == calColDayArray[j] && taskStartMonth == calColMonthArray[j]   && taskStartYear == calColYearArray[j]){
						drawLineInside();
					}
				}

				if (taskStartYear <= calColYearArray[0] && taskEndYear >= calColYearArray[6]) { // if the task begins at or before the calendar year and ends at or after the calendar year
					if (taskStartYear < calColYearArray[0] && taskEndYear > calColYearArray[6] ) { //if the task starts before and ends after the current display
							drawLineThrough();
					} else if (taskEndYear > calColYearArray[6]) { //if the task start year is the same as the first column and the end year is after the last column year
							if (taskStartMonth < calColMonthArray[0]) {
								drawLineThrough();
							} else if (taskStartMonth == calColMonthArray[0]) {
								if (taskStartDay < calColDayArray[0]){
									drawLineThrough();
								}
							}
					} else if (taskStartYear < calColYearArray[0]) { // in this case the End year equals the Calendar and Start Year is before or equal to calendar.
							console.log("sad sad beep");
							if (taskEndMonth > calColMonthArray[6]) {
								drawLineThrough();
							} else if (taskEndMonth == calColMonthArray[6]) {
								console.log("Cautious beep");
									if (taskEndDay > calColDayArray[6]) {
										drawLineThrough();
									} else if (taskStartDay >= calColDayArray[0]) {
										drawLineFromLeft();
									}
							}
						} else if (taskStartYear == calColYearArray[0] && taskEndYear == calColYearArray[6]) { //Years are all equal. CHECK EVERYTHING!
								if (taskStartMonth <= calColMonthArray[0] && taskEndMonth >= calColMonthArray[6]) { // if the task begins at or before the calendar month and ends at or after the calendar month
									if (taskStartMonth < calColMonthArray[0] && taskEndMonth > calColMonthArray[6] ) { //if the task starts before and ends after the current display
										drawLineThrough();
									} else if (taskEndMonth > calColMonthArray[6]) { //if the task start month is the same as the first column and the end month is after the last column month
										if (taskStartDay < calColDayArray[0]) {
											drawLineThrough();
										}
									} else if (taskStartMonth < calColMonthArray[0]) {// in this case the End month equals the Calendar and Start month is before or equal to calendar.
										if (taskEndDay > calColDayArray[6]) {
											drawLineThrough();
										}
									} else if (taskStartMonth == calColMonthArray[0] && taskEndMonth == calColMonthArray[6]) { // Month starts and ends at the same displayed time. Check DAY!
										if (taskStartDay < calColDayArray[0]) {
											if (taskEndDay > calColDayArray[6]) {
												drawLineThrough();
											} else {
												drawLineFromLeft();
											}
										}
									}
								}

				}  // end check years are equal
			}  // end if the task begins at or before the calendar year and ends at or after the calendar year
		}  // end if shortTermView


					//----------------------------------------------------------------------------------------


		// 			for(var j = 0; j < calColDayArray.length ; j++) {
		// 				if (taskStartDay == calColDayArray[j]) {
		// 					if (taskStartYear == calColYearArray[0] || taskStartYear == calColYearArray[6]) {
		// 						if (taskStartMonth >= calColMonthArray[0]) {
		// 								console.warn("The Days match");
		// 								//drawing logic
		// 								taskStartColumn = j;
		// 								console.log("taskStartDay" + taskStartDay);
		// 								console.log("taskStartMonth" + taskStartMonth);
		// 								if (taskEndDay < taskStartDay) {
		// 									if (calColMonthArray[0] == 2) { //if task starts in February
		// 										if ((taskStartYear%4) == 0 ) { //if task starts in a leap year
		// 											taskEndDay = taskEndDay + 29;
		// 										} else {
		// 											taskEndDay = taskEndDay + 28;
		// 										}
		// 									}else if (calColMonthArray[0] == 1 || calColMonthArray[0] == 3 || calColMonthArray[0] == 5 || calColMonthArray[0] == 7 || calColMonthArray[0] == 8 || calColMonthArray[0] == 10 || calColMonthArray[0] == 12) { //If task starts in month with 31 days
		// 											taskEndDay = taskEndDay + 31;
		// 									}else{
		// 											taskEndDay = taskEndDay + 30;
		// 									}
		// 								} else if (taskEndDay == taskStartDay) {
		// 									if (taskEndMonth > taskStartMonth || taskEndYear > taskStartYear) {
		// 										taskStartDay = -10;
		// 									}
		// 								}
		// 								taskEndColumn = (taskEndDay - taskStartDay) + taskStartColumn;
		// 								console.log("taskEndDay = " +  taskEndDay + ", taskStartDay = " + taskStartDay + ", taskStartColumn = " + taskStartColumn + ", taskEndColumn = " + taskEndColumn);
		// 								var xSpaceIncrement = canvas.width / numTimeIncrements;
		// 								var yPos = yPos + ySpaceIncrement;
		// 								drawTaskLine(canvas, context, taskStartColumn, taskEndColumn, xSpaceIncrement, yPos, parsedTask);
		// 						} // end month check
		// 					} // end year check
		// 				} else if (taskEndDay == calColDayArray[i]) { // end start day check
		// 					var zzzzzz = 1;
		// 				} //end end day check
		// 			} // end for loop over calColDayArray.length
		// 	} // end if short term view
		} // end for loop over data.length

 	}); // end $.getJSON('/retrieveTasks', function(data, status)

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
