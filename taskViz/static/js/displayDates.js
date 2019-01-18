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
	// For loop that adds new headings
	for (let i = 0; i < 7; i++) {
		var anotherDateVal = moment(startDateVar).add(i, 'days').format("ddd MM/DD");
		var dateVal = moment(startDateVar).add(i, 'days').format("YYYY|MM|DD");
		var timeSlotSpanId = "sTermTimeSlot" + i;
		var timeSlotSpan = '<span class="sTermTimeIncColHeader" id="' + timeSlotSpanId + '" dateVal="' + dateVal + '">' + anotherDateVal + '</span>';
		$( '#' + timeSlotSpanId ).replaceWith(timeSlotSpan);
	}
};

/* Returns months based on value from start input, which is translated into a string object.*/
function getMonthOfYear(startDateVar) {
	// For loop that adds new headings
	for (let i = 0; i < 12; i++) {
		var anotherDateVal = moment(startDateVar).add(i, 'months').format("MMM YYYY");
		var dateVal = moment(startDateVar).add(i, 'months').format("YYYY|MM|DD");
		var timeSlotSpanId = "lTermTimeSlot" + i;
		var timeSlotSpan = '<span class="lTermTimeIncColHeader" id="' + timeSlotSpanId + '" dateVal="' + dateVal + '">' + anotherDateVal + '</span>';
		$( '#' + timeSlotSpanId ).replaceWith(timeSlotSpan);
	}
};