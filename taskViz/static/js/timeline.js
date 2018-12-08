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
	var weekdays = new Array(6);
	weekdays[0] = "Mon";
	weekdays[1] = "Tues";
	weekdays[2] = "Wed";
	weekdays[3] = "Thur";
	weekdays[4] = "Fri";
	weekdays[5] = "Sat";
	weekdays[6] = "Sun";
	var dayOfWeek = weekdays[dateObj.getDay()];

    // Loop over the number of days in a week. Increment
    for (var i = 0; i < 7; i++) {
    	var timeSlotSpanId = "timeSlot" + i + "";
    	var timeSlotSpan = "<span class=\"timeIncrementColHeader\" id=\"" + timeSlotSpanId + "\">" + dayOfWeek + " " + (dateObj.getMonth()+1) + "/" + (dateObj.getDate()+1) + "</span>";
    	$( '#' + timeSlotSpanId ).replaceWith(timeSlotSpan);
    	dateObj.setDate(dateObj.getDate() + 1);
    	dayOfWeek = weekdays[dateObj.getDay()];
    }
};

$(document).ready(function () {

	getDayOfWeek($('#start').val());

	$('#taskFormSubmit').click( function() {
		var task_id = $(this).attr('task_id');
		var task_name = $('#new_task_input' + task_id).val();
		req = $.ajax({
				url : '/update',
				type : 'POST',
				data : { task_name : task_name, task_id : task_id }
		});

		req.done(function(data) {
				console.log($('#task_name' + task_id).val());
				console.log("task name" + data.task_name);
		});
	});

/* START-DATE LISTENER */

	$('#start').change(function () {
		 getDayOfWeek($('#start').val());
	});

	/* CLICK BUTTONS. OPEN POP-UPS */
	$('#newTaskButton').click(function () {
		$('#newTaskForm').css("display", "block");
	});


	/*Since we're just going to be toggling for 
	now between short and long term, this 
	code block will show all of the timeslots 
	that correspond with the short term view
	when the button with id shortTermButton
	(the button for short term view) is clicked.*/
	$("#shortTermButton").click(function(){
		$("#timeSlot0").show();
		$("#timeSlot1").show();
		$("#timeSlot2").show();
		$("#timeSlot3").show();
		$("#timeSlot4").show();
		$("#timeSlot5").show();
		$("#timeSlot6").show();

	});

	/*Since we're just going to be toggling for 
	now between short and long term, this 
	code block hides all of the timeslots 
	that correspond with the short term view
	when the button with id longTermButton
	(the button for long term view) is clicked.*/
	$("#longTermButton").click(function(){
		$("#timeSlot0").hide();
		$("#timeSlot1").hide();
		$("#timeSlot2").hide();
		$("#timeSlot3").hide();
		$("#timeSlot4").hide();
		$("#timeSlot5").hide();
		$("#timeSlot6").hide();

	});

	/* SUBMIT FORM BUTTONS */
	$('#taskFormSubmit').click(function () {
		console.log("well the hiding thing works");
		$('#newTaskForm').hide();
	});
	$('#shortTermSubmit').click(function () {
		$('#shortTermForm').hide();
	});
	$('#longTermSubmit').click(function () {
		$('#longTermForm').hide();
	});

	/* CANCEL FORMS LISTENERS */
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
});

// changed this to post correctly
// $('.task-form').on('submit', function (event) {
// 	const taskName = document.getElementById('newTaskInput').value;
// 	const taskStartDate = document.getElementById('newTaskStartDateInput').value;
// 	$.post('/home', {
// 			task: taskName,
// 			startDate: taskStartDate,
// 		})
// 		.done(function (data) {
// 			if (data.error) {
// 				$('#taskErrorAlert').text(data.error).show();
// 				// $('#background').hide();
// 			} else {
// 				// $('#background').text(data.color).show();
// 				$('#taskErrorAlert').hide();
// 				// $('#categorySuccessId').css('background-color');
// 				$(".form-popup").hide();
// 				var textFromTask = $("#newTaskInput").text();
// 				$('#textFromTask').val(text);
// 				$("#textFromCategory").val(textFromTask);
// 			}
// 		});
// 	event.preventDefault();
// });


// ---------- PLEASE DO NOT REMOVE THE BELOW CODE --------

//This function calculates the width of the div with the Class called Timeline.
function calculateTimelineWidth(){
  var selectTimelineWidth = document.querySelector('.Timeline');
  timelineWidth = selectTimelineWidth.clientWidth;
  // return console.log("Width of Timeline div:" + timelineWidth);
}


//This function calculates the width of the div with the Class called Category.
function calculateCategoryWidth(){
  var selectCategoryWidth = document.querySelector('.Category');
  categoryWidth = selectCategoryWidth.clientWidth;
  // return console.log("Width of Category div:" + categoryWidth);
}


/* A helper function that calculates the height width of various elments such as divs when the window
is resized. This function is placed within the html body tag and is called when the window is resized. */
function calculateOnResize() {
	// calculate timeline Width
	calculateTimelineWidth();
	// Calculate Timeline Height
	calculateCategoryWidth();
};
