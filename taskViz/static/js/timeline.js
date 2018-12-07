
function populateCalendarDates (startDateVar) {
/*  */
	var dates = [];
	for (var i = 0; i < 7; i++) {
		var newDate = new Date(startDateVar);
		var day = newDate.getDate();
		dates[i] = newDate.getDay();
	};

	var datesHTML = "";
	for (var i = 0; i < 7; i++) {
		datesHTML += '<span class="timeIncrementColHeader">' + dates[i]+ '</span> \n';
	};

	$('#datesContainer').after(datesHTML);
};

function getDayOfWeek() {
	$('#start').change(function () {
		//Get date
		var startDateVar = $('#start').val();
		var dateObj = new Date(startDateVar);
		var weekdays = new Array(6);
    weekdays[6] = "Sun";
    weekdays[0] = "Mon";
    weekdays[1] = "Tues";
    weekdays[2] = "Wed";
    weekdays[3] = "Thur";
    weekdays[4] = "Fri";
    weekdays[5] = "Sat";
		var dayOfWeek = weekdays[dateObj.getDay()];
    // Now we fill in the view accordingly
		// $( "#timeSlot1" ).replaceWith( "<span class=\"timeIncrementColHeader\" id=\"timeSlot1\">"+ dayOfWeek + " " + (dateObj.getMonth()+1) + "/" +dateObj.getDate() + "</span>" );
		var tomorrow = dateObj;
		for (var i = 0; i <= 7; i++) {
			$( "#timeSlot" + i ).replaceWith( "<span class=\"timeIncrementColHeader\" id=\"timeSlot1\">"+ dayOfWeek + " " + (tomorrow.getMonth()+1) + "/" +tomorrow.getDate() + "</span>" );
			tomorrow.setDate(tomorrow.getDate() + 1);
			dayOfWeek = weekdays[tomorrow.getDay()];
		}


	});
};



$(document).ready(function () {

/* BEGIN START-DATE LISTENER */
	$('#start').change(function () {
		console.log($('#start').val());
		var startDateVar = $('#start').val();
		// var startDayOfWeekVar = startDateVar.getDay();
    // getDayOfWeek();
		// populateCalendarDates(startDateVar);
		 getDayOfWeek();
	});
	/* END START-DATE LISTENER */

	/* CLICK BUTTONS. OPEN POP-UPS */
	$('#newTaskButton').click(function () {
		$('#newTaskForm').css("display", "block");
	});

	$('#shortTermButton').click(function () {
		$('#shortTermForm').css("display", "block");
	});

	$('#longTermButton').click(function () {
		$('#longTermForm').css("display", "block");
	});
	/* END CLICK BUTTONS. OPEN POP-UPS */


	/* BEGIN SUBMIT FORM BUTTONS */
	$('#taskFormSubmit').click(function () {
		$('#newTaskForm').hide();
	});
	$('#shortTermSubmit').click(function () {
		$('#shortTermForm').hide();
	});
	$('#longTermSubmit').click(function () {
		$('#longTermForm').hide();
	});
	/* END SUBMIT FORM BUTTONS */


	/* BEGIN CANCEL FORMS */
	$('#cancelIdTask').click(function () {
		$('#newTaskForm').hide();
		console.log("task form cancel works!")
	});
	$('#cancelId').click(function () {
		$('#shortTermForm').hide();
		console.log("short term cancel works!")
	});
	$('#cancelIdLongTerm').click(function () {
		$('#longTermForm').hide();
		console.log("long term cancel works!")
	});
	/* END CANCEL FORMS */


	$('#category_color').on('change', function (e) {

		var optionSelected = $("option:selected", this);
		var valueSelected = this.value;
		$(".background").css("background-color", valueSelected);
	});
});

// changed this to post correctly
$('.task-form').on('submit', function (event) {
	const taskName = document.getElementById('newTaskInput').value;
	const taskStartDate = document.getElementById('newTaskStartDateInput').value;
	console.log(taskName);
	$.post('/home', {
			task: taskName,
			startDate: taskStartDate,
		})
		.done(function (data) {
			if (data.error) {
				$('#taskErrorAlert').text(data.error).show();
				// $('#background').hide();
			} else {
				// $('#background').text(data.color).show();
				$('#taskErrorAlert').hide();
				// $('#categorySuccessId').css('background-color');
				$(".form-popup").hide();
				var textFromTask = $("#newTaskInput").text();
				$('#textFromTask').val(text);
				$("#textFromCategory").val(textFromTask);
			}

		});
	event.preventDefault();

});



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
