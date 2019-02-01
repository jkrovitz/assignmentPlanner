/*
	Contains functions for displaying timeline lines on canvas as well as 
	the event listeners for displaying them. 
*/ 



var canvas;
var context;

// ------------------LISTENERS AND CANVAS DRAWING---------------------
$(document).ready(function () {

				$.ajax({
				url : '/create_category',
				data : $('#newCategoryFormId').serialize(),
				type : 'POST',
				success: function(response) {
					console.log(response);
					console.log(" ~ ajax happened FOR CATEGORY ~ ");
					var category_name = $('#category_name').val();
					var category_color = $('#category_color').val();
					var category_id = $('#category_id').val();

				},
				error: function(error) {
					console.log(error);
				}
			});

			
			$('#newCategoryForm').hide();
			var stringifiedCategory;
			var parsedCategory; 
			var category_name; 
			var category_id;
	


			var category = [];
			$(document).ready(function () {
					
			$.getJSON('/retrieveCategories', function(data, status) {
			
			

			var checkboxElementList = [];
			for (let i = 0; i < data.length; i++) {
				category = data[i];


				// First we get the task dates from the database for this particular task.
				stringifiedCategory = JSON.stringify(category); // turn JSON object into something readable by JavaScript
			   parsedCategory = JSON.parse(stringifiedCategory); // separate dictionary into individual Task objects
				category_name = parsedCategory.category_name; 
				category_id = parsedCategory.category_id; 
				category_color = parsedCategory.category_color;
				

				var divElement = document.createElement("div");
				divElement.setAttribute("id", "category" + category_id);
				divElement.setAttribute("class", "d-flex p2" );


				var hrefVar ="category/"+category_id+"/edit";
				// var labelEl1AndSpan = ('<label class="checkmarkContainer"><span class="checkmark"></span></label>');
				var checkboxContainer = document.createElement("label");
				checkboxContainer.setAttribute("class", "checkmarkContainer");
				checkboxContainer.setAttribute("style","border: solid 2px #"+category_color );
				var spanElement = document.createElement("span"); 
				spanElement.setAttribute("class", "checkmark");
				var checkboxElement = document.createElement("input"); 
				checkboxElement.setAttribute("type", "checkbox");
				// checkboxElement.setAttribute("value", "");
				// xcheckboxElement.setAttribute("id", "category" + category_id);
				// checkboxElement.setAttribute("class", "checkbox checkbox-primary");
				// checkboxElement.setAttribute("style", "border: solid 4px #"+category_color);
				// checkboxElement.setAttribute("name", "category" + category_id);
				checkboxElement.type = "checkbox"; 
				checkboxElement.name = "category" + category_id;
				checkboxElement.id = "category" + category_id; 
				checkboxElement.value = "category" + category_id; 
				checkboxElementId = checkboxElement.id;
				var labelElement2 = document.createElement("label");
				labelElement2.setAttribute("for", "category" + category_id);
 				var aTag = document.createElement("a");
  				aTag.setAttribute("href", hrefVar);
  				aTag.setAttribute("class", "category-name btn rounded text-center")
   				aTag.setAttribute("style", "border: solid 2px #"+category_color);
   				aTag.innerHTML = category_name; 
   				labelElement2.append(aTag);
   				spanElement.append(checkboxElement);
   				checkboxContainer.append(checkboxElement);
   				// labelElement1.append(checkboxElement);
   				//var checkboxElementId = checkboxElement.getElementById('');
   				checkboxElementList.push(checkboxElement.id); 
   				console.log(checkboxElementList);
		// for( i=0; i < checkboxElementList.length; i++){
// var categoryJSId = document.getElementById('category' + category_id); 
// $('input').click(function(){
	
// 	   				  if (((categoryJSId).checked == true) && (categoryJSId == checkboxElementList[i])){
//     		console.log("Checkbox with id of " + checkboxElementList[i] + " is checked");
//   } else {
//     //console.log ("Checkbox with id of " + checkboxElementId + " is NOT checked");
//   }


// });

   	// }	



   	divElement.append(checkboxElement);
   				// divElement.append(labelElement1);


   				divElement.append(labelElement2);
   				$('#categoryList').append(divElement);

   				getAllTheCategories(); 

	

}

});

		}); 


		$('#newCategoryFormId').submit( function(e) {
		e.preventDefault();
		
			$.ajax({
				url : '/create_category',
				data : $('#newCategoryFormId').serialize(),
				type : 'POST',
				success: function(response) {
					console.log(response);
					console.log(" ~ ajax happened FOR CATEGORY ~ ");
					var category_name = $('#category_name').val();
					var category_color = $('#category_color').val();
					var category_id = $('#category_id').val();

				},
				error: function(error) {
					console.log(error);
				}
			});

			
			$('#newCategoryForm').hide();
			var stringifiedCategory;
			var parsedCategory; 
			var category_name; 
			var category_id;
	
			$(document).ready(function () {

			var category = [];
					
			$.getJSON('/retrieveCategories', function(data, status) {
			
			

			var checkboxElementList = [];
			// for (let i = 0; i < data.length; i++) {
			// 	category = data[i];


				// First we get the task dates from the database for this particular task.
				stringifiedCategory = JSON.stringify(category); // turn JSON object into something readable by JavaScript
			   parsedCategory = JSON.parse(stringifiedCategory); // separate dictionary into individual Task objects
				category_name = parsedCategory.category_name; 
				category_id = parsedCategory.category_id; 
				category_color = parsedCategory.category_color;
				

				var divElement = document.createElement("div");
				divElement.setAttribute("id", "category" + category_id);
				divElement.setAttribute("class", "d-flex p2" );


				var hrefVar ="category/"+category_id+"/edit";
				// var labelEl1AndSpan = ('<label class="checkmarkContainer"><span class="checkmark"></span></label>');
				var checkboxContainer = document.createElement("label");
				checkboxContainer.setAttribute("class", "checkmarkContainer");
				checkboxContainer.setAttribute("style","border: solid 2px #"+category_color );
				var spanElement = document.createElement("span"); 
				spanElement.setAttribute("class", "checkmark");
				var checkboxElement = document.createElement("input"); 
				checkboxElement.setAttribute("type", "checkbox");
				// checkboxElement.setAttribute("value", "");
				// xcheckboxElement.setAttribute("id", "category" + category_id);
				// checkboxElement.setAttribute("class", "checkbox checkbox-primary");
				// checkboxElement.setAttribute("style", "border: solid 4px #"+category_color);
				// checkboxElement.setAttribute("name", "category" + category_id);
				checkboxElement.type = "checkbox"; 
				checkboxElement.name = "category" + category_id;
				checkboxElement.id = "category" + category_id; 
				checkboxElement.value = "category" + category_id; 
				checkboxElementId = checkboxElement.id;
				var labelElement2 = document.createElement("label");
				labelElement2.setAttribute("for", "category" + category_id);
 				var aTag = document.createElement("a");
  				aTag.setAttribute("href", hrefVar);
  				aTag.setAttribute("class", "category-name btn rounded text-center")
   				aTag.setAttribute("style", "border: solid 2px #"+category_color);
   				aTag.innerHTML = category_name; 
   				labelElement2.append(aTag);
   				spanElement.append(checkboxElement);
   				checkboxContainer.append(checkboxElement);
   				// labelElement1.append(checkboxElement);
   				//var checkboxElementId = checkboxElement.getElementById('');
   				checkboxElementList.push(checkboxElement.id); 
   				console.log(checkboxElementList);
		// for( i=0; i < checkboxElementList.length; i++){
// var categoryJSId = document.getElementById('category' + category_id); 
// $('input').click(function(){
	
// 	   				  if (((categoryJSId).checked == true) && (categoryJSId == checkboxElementList[i])){
//     		console.log("Checkbox with id of " + checkboxElementList[i] + " is checked");
//   } else {
//     //console.log ("Checkbox with id of " + checkboxElementId + " is NOT checked");
//   }


// });

   	// }	



   	divElement.append(checkboxElement);
   				// divElement.append(labelElement1);


   				divElement.append(labelElement2);
   				$('#categoryList').append(divElement);

   				getAllTheCategories(); 

	

// }


});

});

		});
		

	var taskStartColumn, taskEndColumn; 
	var today = moment().format('YYYY-MM-DD');
	$("#start").val(today);

	// these lines are important
	getDayOfWeek(today);
	$('.sTermTimeIncColHeader').show();
	$('.lTermTimeIncColHeader').hide();
	shortTermView = true;
	longTermView = false;

	localStorage.setItem("shortTermView", shortTermView);
	localStorage.setItem("longTermView", longTermView);

	$('#shortTermButton').css({'background-color': '#007bff', 'color': '#ffffff'});
	$('#longTermButton').css({'background-color': '#ffffff', 'color': '#007bff'});

	drawAllTheTasks();
	getMonthOfYear($('#start').val());


	$('body').resize(calculateOnResize());

	if (localStorage.getItem("shortTermView") == true) {
		shortterm();
	} else if (localStorage.getItem("longTermView") == true) {
		longterm();
	}


	$('#start').change(function startFunction(){
		$('.sTermTimeIncColHeader').show();
		$('.lTermTimeIncColHeader').hide();
		// console.log(document.getElementById('start').value);
		shortTermView = true;
		longTermView = false;

		localStorage.setItem("shortTermView", shortTermView);
		localStorage.setItem("longTermView", longTermView);

		$('#shortTermButton').css({'background-color': '#007bff', 'color': '#ffffff'});
		$('#longTermButton').css({'background-color': '#ffffff', 'color': '#007bff'});

		drawAllTheTasks();

	});
	/* SHORT/LONG TERM BUTTON LISTENERS */
	$('#shortTermButton').click(function shorterm() {
		$('.sTermTimeIncColHeader').show();
		$('.lTermTimeIncColHeader').hide();
		shortTermView = true;
		longTermView = false;

		localStorage.setItem("shortTermView", shortTermView);
		localStorage.setItem("longTermView", longTermView);

		$('#shortTermButton').css({'background-color': '#007bff', 'color': '#ffffff'});
		$('#longTermButton').css({'background-color': '#ffffff', 'color': '#007bff'});

		drawAllTheTasks();
	});

	$('#longTermButton').click(function longterm() {
		$('.sTermTimeIncColHeader').hide();
		$('.lTermTimeIncColHeader').show();
		shortTermView = false;
		longTermView = true;

		localStorage.setItem("shortTermView", shortTermView);
		localStorage.setItem("longTermView", longTermView);

		$('#longTermButton').css({'background-color': '#007bff', 'color': '#ffffff'});
		$('#shortTermButton').css({'background-color': '#ffffff', 'color': '#007bff'});

		drawAllTheTasks();
	});

	var category = []; //only ever holds one task at a time
	var task = [];
	function getParsedTask(){
		var parsedTask; 
		$.getJSON('/retrieveTasks', function(data, status) {
			// console.log("RUNNING JSON");
			//----------------CANVAS SETUP-----------------------

			//--------------------ITERATE THROUGH TASKS-------------------
			for (let i = 0; i < data.length; i++) {
				task = data[i];


				// First we get the task dates from the database for this particular task.
				var stringifiedTask = JSON.stringify(task); // turn JSON object into something readable by JavaScript
			
				parsedTask = JSON.parse(stringifiedTask); // separate dictionary into individual Task objects

				

			}

			return parsedTask

		}); 

	}

	function getAllTheCategories() {
		// console.log("DRAWING ALL THE TASKS");
		$.getJSON('/retrieveCategories', function(data, status) {
			// console.log("RUNNING JSON");
			//----------------CANVAS SETUP-----------------------
			

			//--------------------ITERATE THROUGH TASKS-------------------
			for (let i = 0; i < data.length; i++) {
				category = data[i];


				// First we get the task dates from the database for this particular task.
				var stringifiedCategory = JSON.stringify(category); // turn JSON object into something readable by JavaScript
				var parsedCategory = JSON.parse(stringifiedCategory); // separate dictionary into individual Task objects
				

}
});
}
	var task = []; //only ever holds one task at a time
	var category = []; 
	function drawAllTheTasks() {
		// console.log("DRAWING ALL THE TASKS");
		$.getJSON('/retrieveTasks', function(data, status) {
			// console.log("RUNNING JSON");
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
				
				if(parsedTask.category_id == 1){
					console.log(parsedTask.task_name +" has a category_id equal to 1.");
				}
				// var parsedTask = getParsedTask();
				var taskCategoryId = parsedTask.category_id;
				var taskName = parsedTask.task_name; 
				console.log(taskCategoryId);

				$('input').click(function(){

   	var sList = "";
$('input[type=checkbox]').each(function () {
    sList += "(" + $(this).val() + "-" + (this.checked ? "checked" : "not checked") + ")";
});
console.log (sList);
});
				// var sList = "";
// $('input[type=checkbox]').change(function () {
//     var sThisVal = (this.checked ? "1" : "0");
//     sList += (sList=="" ? sThisVal : "," + sThisVal);
// });

// $('input[type="checkbox"]').mousedown(function() {
//     if (!$(this).is(':checked')) {
//         this.checked = confirm("Are you sure?");
//         $(this).trigger("change");
//     }
// });
// console.log (sList);


				var momentTaskStartDate = moment(parsedTask.task_start_date, 'YYYY-MM-DD');
				var momentTaskEndDate = moment(parsedTask.task_end_date, 'YYYY-MM-DD');
				//separate out year, month and day for task start date
				var taskStartYear = moment(momentTaskStartDate).format('YYYY');
				var taskStartMonth = moment(momentTaskStartDate).format('MM'); 
				var taskStartDay = moment(momentTaskStartDate).format('DD');
				var taskStartFullDate = moment(momentTaskStartDate).format('YYYY|MM|DD');
				var taskStartMonthAndYear = moment(momentTaskStartDate).format('YYYY|MM');
				
				//separate out year, month and day for task end date
				var taskEndYear = moment(momentTaskEndDate).format('YYYY');
				var taskEndMonth = moment(momentTaskEndDate).format('MM'); 
				var taskEndDay = moment(momentTaskEndDate).format('DD');
				var taskEndFullDate = moment(momentTaskEndDate).format('YYYY|MM|DD');
				var taskEndMonthAndYear = moment(momentTaskEndDate).format('YYYY|MM');


				if (localStorage.getItem("shortTermView") == "true") {
					//----------------VARIABLES FOR DISPLAYING TASKS-----------------------
					// for loop to get the values of currently displayed calendar time time slots

					var sCalColYearArray = [];
					var sCalColMonthArray = [];
					var sCalColDayArray = [];
					var sCalColFullDateArray = []; 

					var sCalColYear;
					var sCalColMonth;
					var sCalColDay;
					var sCalColFullDate; 
					//--------------------ITERATE THROUGH SHORT TERM COLUMN SPANS-------------------
					//to get their date and separate into year, month, and day
					$("span.sTermTimeIncColHeader").each(function() {
						var sCalColDate = $(this).attr('dateVal');
						var sCalColDatePartsArray = sCalColDate.split('|');
	
						sCalColFullDateArray.push(sCalColDate);

						// console.log(sCalColFullDateArray);
						
						sCalColYear = sCalColDatePartsArray[0]; //get the year from the dateVal
						sCalColMonth = sCalColDatePartsArray[1]; //get the month from the dateVal
						sCalColDay = sCalColDatePartsArray[2]; //get the day from the dateVal

						sCalColYearArray.push(sCalColYear);
						// console.log('sCalColYearArray' + sCalColYearArray);
						sCalColMonthArray.push(sCalColMonth);
						sCalColDayArray.push(sCalColDay);
					});

					var xSpaceIncrement = canvas.width / numTimeIncrements;

					//-------------------FUNCTIONS TO DRAW TASKS ONTO THE CANVAS FOR SHORT TERM----------------
					function drawLineThroughShortTerm() {
						taskStartColumn = -1;
						taskEndColumn = 10;
						yPos = yPos + ySpaceIncrement;
						drawTaskLine(canvas, context, taskStartColumn, taskEndColumn, xSpaceIncrement, yPos, parsedTask);
					};

					function drawLineFromLeftShortTerm() {
						yPos = yPos + ySpaceIncrement;
						taskStartColumn = -1;
						for (let j = 0; j < sCalColFullDateArray.length; j++) {	// iterates over days being viewed on the timeline
							if (taskEndFullDate == sCalColFullDateArray[j]) {
								taskEndColumn = j;
								drawTaskLine(canvas, context, taskStartColumn, taskEndColumn, xSpaceIncrement, yPos, parsedTask);
							}
						}
					};

					function drawLineFromRightShortTerm() {
						yPos = yPos + ySpaceIncrement;
						taskEndColumn = 10;
						for (let j = 0; j < sCalColFullDateArray.length; j++) {	// iterates over days being viewed on the timeline
							if (taskStartFullDate == sCalColFullDateArray[j]) {
								taskStartColumn = j;
								drawTaskLine(canvas, context, taskStartColumn, taskEndColumn, xSpaceIncrement, yPos, parsedTask);
							}
						}
					};

					function drawLineInsideShortTerm() {
						yPos = yPos + ySpaceIncrement;
						for (let j = 0; j < sCalColDayArray.length; j++) {	// iterates over days being viewed on the timeline
							if (taskStartYear == sCalColYearArray[j] && taskStartMonth == sCalColMonthArray[j] && taskStartDay == sCalColDayArray[j]) {
								taskStartColumn = j;
							}
							if (taskEndYear == sCalColYearArray[j] && taskEndMonth == sCalColMonthArray[j] && taskEndDay == sCalColDayArray[j]) {
								taskEndColumn = j;
								break;
							} else {
								taskEndColumn = 10;
							}
						}
						drawTaskLine(canvas, context, taskStartColumn, taskEndColumn, xSpaceIncrement, yPos, parsedTask);
					};

					// SHORT TERM------------------COMPARING CALENDAR COLUMN DATES WITH TASK DATES TO DISPLAY TASKS-----------------------
					var didWeFindTheStartDateShortTerm = false;
					var didWeDrawTheLineShortTerm = false;
					if (taskStartFullDate < sCalColFullDateArray[0] && taskEndFullDate > sCalColFullDateArray[6]){
						drawLineThroughShortTerm();
						didWeFindTheStartDateShortTerm = true;
						didWeDrawTheLineShortTerm = true;
					}
					if (taskStartFullDate >= sCalColFullDateArray[0] && taskEndFullDate <= sCalColFullDateArray[6]){
						drawLineInsideShortTerm();
						didWeFindTheStartDateShortTerm = true;
						didWeDrawTheLineShortTerm = true;
					}
							if (taskStartFullDate < sCalColFullDateArray[0] && taskEndFullDate >= sCalColFullDateArray[0] && taskEndFullDate <= sCalColFullDateArray[6]){
					
								drawLineFromLeftShortTerm();
								didWeDrawTheLineShortTerm = true;
							}

						if (taskStartFullDate >= sCalColFullDateArray[0] && taskStartFullDate <= sCalColFullDateArray[6] && taskEndFullDate > sCalColFullDateArray[6]){
								drawLineFromRightShortTerm();
								didWeDrawTheLineShortTerm = true;
							}


				} else if (localStorage.getItem("longTermView") == "true") {
					//----------------VARIABLES FOR DISPLAYING TASKS-----------------------
					// for loop to get the values of currently displayed calendar time time slots

					var lCalColYearArray = [];
					var lCalColMonthArray = [];
					var lCalColDayArray = [];
					var lCalColFullDateArray = [];
					var lCalColMonthAndYearArray = [];

					var lCalColYear;
					var lCalColMonth;
					var lCalColDay;
					//--------------------ITERATE THROUGH SHORT TERM COLUMN SPANS-------------------
					//to get their date and separate into year, month, and day
					$("span.lTermTimeIncColHeader").each(function() {
						var lCalColDate = $(this).attr('dateVal');
						console.log(lCalColDate);
						var lCalColDateMoment = moment(lCalColDate, 'YYYY|MM|DD').format('YYYY|MM');

						var lCalColDatePartsArray = lCalColDate.split('|');
						lCalColFullDateArray.push(lCalColDate);
						lCalColMonthAndYearArray.push(lCalColDateMoment);
						console.log(lCalColFullDateArray);
						console.log(lCalColMonthAndYearArray);
						lCalColYear = lCalColDatePartsArray[0]; //get the year from the dateVal
						lCalColMonth = lCalColDatePartsArray[1]; //get the month from the dateVal
						lCalColDay = lCalColDatePartsArray[2]; 

						lCalColYearArray.push(lCalColYear);
						lCalColMonthArray.push(lCalColMonth);
						lCalColDayArray.push(lCalColDay);
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
						for (let j = 0; j < lCalColMonthAndYearArray.length; j++) {	// iterates over months being viewed on the timeline
							if (taskEndMonthAndYear == lCalColMonthAndYearArray[j] ) {
								taskStartColumn = -1;
								taskEndColumn = j;
								drawTaskLine(canvas, context, taskStartColumn, taskEndColumn, xSpaceIncrement, yPos, parsedTask);
							}

						}
											};


				function drawLineFromRightLongTerm() {
						yPos = yPos + ySpaceIncrement;
						taskEndColumn = 10;
						for (let j = 0; j < lCalColMonthAndYearArray.length; j++) {	// iterates over days being viewed on the timeline
							if (taskStartMonthAndYear == lCalColMonthAndYearArray[j]) {
								taskStartColumn = j;
								drawTaskLine(canvas, context, taskStartColumn, taskEndColumn, xSpaceIncrement, yPos, parsedTask);
							}
						}
					};


					function drawLineInsideLongTerm() {
						yPos = yPos + ySpaceIncrement;
						for (let k = 0; k < lCalColMonthAndYearArray.length; k++) {	// iterates over months being viewed on the timeline
							
							if (taskStartMonthAndYear == lCalColMonthAndYearArray[k]) {
								taskStartColumn = k;
							}
							
							if (taskEndMonthAndYear == lCalColMonthAndYearArray[k] ) {
								taskEndColumn = k;
								break;
							} else {
								taskEndColumn = 10;
							}
						}
						drawTaskLine(canvas, context, taskStartColumn, taskEndColumn, xSpaceIncrement, yPos, parsedTask);
					};

					// LONG TERM------------------COMPARING CALENDAR COLUMN DATES WITH TASK DATES TO DISPLAY TASKS-----------------------
					var didWeFindTheStartDateLongTerm = false;
						var didWeDrawTheLineLongTerm = false;
					
					if(taskStartMonthAndYear >= lCalColMonthAndYearArray[0] && taskEndMonthAndYear <= lCalColMonthAndYearArray[6]){
						didWeFindTheStartDateLongTerm = true; 
						didWeDrawTheLineLongTerm = true; 
						drawLineInsideLongTerm();
					}

					//Task start month and year < l cal col month and year array[0] and task end month and year <= l cal col month and year array [6] and task monthand task end year >= l cal col month and year array [0]; draw line left 
					if(taskStartMonthAndYear < lCalColMonthAndYearArray[0] && taskEndMonthAndYear >= lCalColMonthAndYearArray[0] && taskEndMonthAndYear <= lCalColMonthAndYearArray[6]){
						didWeFindTheStartDateLongTerm = true; 
						didWeDrawTheLineLongTerm = true; 
						drawLineFromLeftLongTerm();
					}

					if(taskStartMonthAndYear >= lCalColMonthAndYearArray[0] && taskStartMonthAndYear <= lCalColMonthAndYearArray[6] && taskEndMonthAndYear > lCalColMonthAndYearArray[6]){
						didWeDrawTheLineLongTerm = true; 
						drawLineFromRightLongTerm();
					}


					if(taskStartMonthAndYear < lCalColMonthAndYearArray[0] && taskEndMonthAndYear > lCalColMonthAndYearArray[6]){
						didWeDrawTheLineLongTerm = true; 
						drawLineThroughLongTerm();
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
					// console.log(response);
					// console.log(" ~ ajax happened ~ ");
				},
				error: function(error) {
					console.log(error);
				}
			});

			$('#newTaskForm').hide();

//Draws the new task when the new task form is 
			//submitted instead  of having to click on the 
			//term buttons again. 
			$(document).ready(function () {
					drawAllTheTasks();
			}); 


		}
	});

		$('#newCategoryFormId').submit( function(e) {
		e.preventDefault();
		
			$.ajax({
				url : '/create_category',
				data : $('#newCategoryFormId').serialize(),
				type : 'POST',
				success: function(response) {
					console.log(response);
					console.log(" ~ ajax happened FOR CATEGORY ~ ");
					var category_name = $('#category_name').val();
					var category_color = $('#category_color').val();
					var category_id = $('#category_id').val();

				},
				error: function(error) {
					console.log(error);
				}
			});

			
			$('#newCategoryForm').hide();
			var stringifiedCategory;
			var parsedCategory; 
			var category_name; 
			var category_id;
			$(document).ready(function () {
			var category = [];
			
			$.getJSON('/retrieveCategories', function(data, status) {
			
			

			
			for (let i = 0; i < data.length; i++) {
				category = data[i];


				// First we get the task dates from the database for this particular task.
				stringifiedCategory = JSON.stringify(category); // turn JSON object into something readable by JavaScript
			   parsedCategory = JSON.parse(stringifiedCategory); // separate dictionary into individual Task objects
				category_name = parsedCategory.category_name; 
				category_id = parsedCategory.category_id;
				category_id = parsedCategory.category_color;  
				

				var hrefVar ="category/"+category_id+"/edit";
 				var aTag = document.createElement("a");
  				aTag.setAttribute("href", hrefVar);
   				aTag.innerHTML = category_name; 
   				$('#categoryList').append(aTag);
   				getAllTheCategories(); 		


	

}


});
		

		

});

		});

		

		

		

	// ---------------------INPUT/BUTTON LISTENERS------------------------
	/* START-DATE LISTENER */
	$('#start').change(function () {
		var startVal = $('#start').val();
		getDayOfWeek(startVal);
		getMonthOfYear(startVal);
		// retrieveCategories();
		drawAllTheTasks();
	});


	/* CLICK BUTTONS, OPEN POP-UPS LISTENERS */
	$('#newTaskButton').click(function () {
		$('#newTaskForm').css("display", "block");
	});

	$('#new-cat-btn').click(function(){
		$('#newCategoryForm').css("display", "block");
	});

	/* CANCEL FORM BUTTON LISTENERS */
	$('#cancelIdTask').click(function () {
		$('#newTaskForm').hide();
	});

	$('#cancelIdCategory').click(function(){
		$('#newCategoryForm').hide();
	});


});

function redrawCanvas() {
	$('#DemoCanvas').remove();
	$('#dates').after('<canvas id="DemoCanvas" width="' + calculateTimelineWidth() + '" height="600px"></canvas>'); // TODO
	canvas = document.getElementById('DemoCanvas');
	context = canvas.getContext("2d");
}

/* Function for drawing a task to the canvas */
function drawTaskLine(canvas, context, taskStartColumn, taskEndColumn, xSpaceIncrement, yPos, parsedTask) {
	if (canvas.getContext) {
		var xPos1 = taskStartColumn * xSpaceIncrement + xSpaceIncrement / 2;
		var xPos2 = taskEndColumn * xSpaceIncrement + xSpaceIncrement / 2;

			var category = [];
			var category_id;
			var category_color; 
			console.log(parsedTask);
			category_color = parsedTask.category_color; 
			console.log(category_color);


			$.getJSON('/retrieveCategories', function(data, status) {
			
		var color = '#'+ category_color;
		drawLine(context, xPos1, xPos2, yPos, color);
		drawCircles(context, xPos1, xPos2, yPos, color);
		drawName(context, xPos1, yPos, taskStartColumn, parsedTask.task_name);


		});

		
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
	context.font = "14px Arial";
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
	$('body').outerWidth('100%');
	$('div.grid-container > div.Category').outerWidth('100%');
	$('.Timeline').outerWidth('100%');
	$('body').outerHeight('100%');
	calculateTimelineWidth();
	calculateCategoryWidth();
};
