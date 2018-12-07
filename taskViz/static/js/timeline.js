/* CATEGORY FORMS */
// function openNewCategoryForm() {
//     $('#newCategoryForm').css("display", "block");
// }


var n = 0; // temporary
function closeNewCategoryForm() { // TODO: remove excess variables
	n++;
	$('#newCategoryForm').hide();

	var valueOfCategoryNameId = $('#category_name').val();
	var valueOfBackgroundColor = $('#category_color').val();
	var myNewButton = '<input type="button" class="new-subcategory-button" onclick="openNewSubcategoryForm() id="createSubButtonId' + n + '">+ Add Subcategory</input>';
	$('.mt-4').after(' <div id="category' + n + '" class="individual_category"> <input type="checkbox" id="checkboxId' + n + '">' + valueOfCategoryNameId + myNewButton + ' </div>');
	var backgroundColorStr = "#category" + n;
	$(backgroundColorStr).css("backgroundColor", "#" + valueOfBackgroundColor);

	/* These two lines of code set the value to an empty string
	so that if a user creates a new category, the fields from
	the previous category submitted will not be populated with
	the input from the previous category. */
	document.getElementById('categoryName').value = "";
	document.getElementById('categoryColor').value = "";
}

$('#newCategoryForm').on('shown.bs.modal', function () {
	$('#myInput').trigger('focus')
})

function cancelFillingOutCategoryForm() { // TODO: change to get parent
	$('#newCategoryForm').hide();
	// Sets category input value to empty string if the user decides to cancel creating a new category.
	document.getElementById('categoryInput').value = "";
}


/* SUBCATEGORY FORMS */

function openNewSubcategoryForm() {

}


/* TASK FORMS */

function closeNewTaskForm() { // TODO: remove excess variables
	n++;
	$('#newTaskForm').hide();
	var valueOfTaskNameId = $('#newTaskInput').val();
	var valueOfStartDateInputId = $('#newTaskStartDateInput').val();
	console.log(valueOfTaskNameId);
	console.log(valueOfStartDateInputId);

	$('.newTaskButton').after('<div id="task' + n + '">' + valueOfTaskNameId + ' </div>');

	/* These two lines of code set the value to an empty string
	so that if a user creates a new category, the fields from
	the previous category submitted will not be populated with
	the input from the previous category. */
	document.getElementById('newTaskInput').value = "";
	document.getElementById('newTaskStartDateInput').value = "";
	return false;
}

var cn = 0; // temporary
function addMilestoneForm() {
	cn++;

	if (cn <= 3) {
		var myNewMilestone = '<label>Milestone:</label><input type="text" id="milestoneNameId' + cn + '"><label>Milestone date:</label><input type="date" id="milestoneDateId' + cn + '" style="margin-right:50px">';
		$('#newMilestoneButton').after(' <div id="milestonDiv' + cn + '">' + myNewMilestone + ' </div>');
	}
}

function cancelFillingOutTaskForm() { // TODO: change to get parent
	$('#newTaskForm').hide();
}


/* TERM FORMS */

function openNewShortTermForm() {
	$('#shortTermForm').css("display", "block");
}

function openNewLongTermForm() {
	$('#longTermForm').css("display", "block");
}

function openNewTaskForm() {
	$('#newTaskForm').css("display", "block");
}

function cancelFillingOutShortTermForm() { // TODO: FIX THIS
	$('#shortTermForm').hide();
}

function cancelFillingOutLongTermForm() {
	$('#longTermForm').hide();
}


$(document).ready(function () {
	// closeNewTermForm
	$('#shortTermSubmit').click(function () {
		$('#shortTermForm').hide();
		console.log($('#amountShortTimeUnits').val());
		console.log($('#shortTimeUnit').val());
	});
	// hide form on click
	$('#taskFormSubmit').click(function () {
		$('#task-form').hide();
	});
	// closeNewTermForm
	$('#longTermSubmit').click(function () {
		$('#longTermForm').hide();
		console.log($('#amountLongTimeUnits').val());
		console.log($('#longTimeUnit').val());
	});

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
	console.log("Width of Timeline div:" + timelineWidth);
	// Calculate Timeline Height
	var selectCategoryWidth = document.querySelector('.Category');
	categoryWidth = selectCategoryWidth.clientWidth;
	console.log("Width of Category div:" + categoryWidth);
}
