/* 
File contains functions for creating the canvas and drawings tasks 
on it. 
*/

function redrawCanvas() {
	$('#DemoCanvas').remove();
	$('#dates').after('<canvas id="DemoCanvas" width="' + calculateTimelineWidth() + '" height="600px"></canvas>'); // TODO:

	canvas = document.getElementById('DemoCanvas');
	context = canvas.getContext("2d");
}

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
					compareCalendarColumnDates(); 
					function compareCalendarColumnDates(){
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

			}
			} // end for loop over data.length
	 	}); // end $.getJSON('/retrieveTasks', function(data, status)
	}; // end DrawAllTheTasks