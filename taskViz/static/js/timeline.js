
function getDayOfWeek(startDateVar) {
	$('#start').change(function () {
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
    // Now we fill in the view accordingl
		for (var i = 0; i < 7; i++) {
			var labelDivID = "#timeSlot" + i + "";
			var myText = "<span class=\"timeIncrementColHeader\" id=\"timeSlot" + i + "\">" + dayOfWeek + " " + (dateObj.getMonth()+1) + "/" + (dateObj.getDate()+1) + "</span>";
			console.log(myText);
			$( labelDivID ).replaceWith(myText);
			dateObj.setDate(dateObj.getDate() + 1);
			dayOfWeek = weekdays[dateObj.getDay()];
		}
	});
};



$(document).ready(function () {
/* START-DATE LISTENER */
	$('#start').change(function () {
		console.log($('#start').val());
		 getDayOfWeek($('#start').val());
	});

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

	/* SUBMIT FORM BUTTONS */
	$('#taskFormSubmit').click(function () {
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


	/* Function for changing category colors  */
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


/* A helper function that calculates the height width of various elments such as divs when the window
is resized. This function is placed within the html body tag and is called when the window is resized. */
function calculateOnResize() {
	// calculate timeline Width
	var selectTimelineWidth = document.querySelector('.Timeline');
  timelineWidth = selectTimelineWidth.clientWidth;
	// Calculate Timeline Height
	var selectCategoryWidth = document.querySelector('.Category');
  categoryWidth = selectCategoryWidth.clientWidth;
};
