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
		// var displayedDay = dateObj.getDate();
		var displayedDay = moment(dateObj).format("DD");
		//var displayedMonth = dateObj.getMonth() + 1;
		var displayedMonth = moment(dateObj).format("MM");
		var dateVal = dateObj.getFullYear() + "|" + (displayedMonth) + '|' + (displayedDay);

		var timeSlotSpanId = "sTermTimeSlot" + i;
		var timeSlotSpan = '<span class="sTermTimeIncColHeader" id="' + timeSlotSpanId + '" dateVal="' + dateVal + '">' + dayOfWeek + ' ' + (displayedMonth) + '/' + (displayedDay) +  '</span>';
		$( '#' + timeSlotSpanId ).replaceWith(timeSlotSpan);

		dayOfWeek = weekdays[dateObj.getDay()];
		dateObj.setDate(dateObj.getDate() + 1);

	}
	return new Date(startDateVar);
};

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
		var anotherDateVal = moment(startDateVar).add(i, 'months').format("MMM YYYY");
		var dateVal = year + "|" + (displayedMonth - 1);
		var timeSlotSpanId = "lTermTimeSlot" + i;
		var timeSlotSpan = '<span class="lTermTimeIncColHeader" id="' + timeSlotSpanId + '" dateVal="' + dateVal + '">' + anotherDateVal + '</span>';
		$( '#' + timeSlotSpanId ).replaceWith(timeSlotSpan);

		monthOfYear = months[dateObj.getMonth()];
		dateObj.setMonth(dateObj.getMonth() + 1);
	}
};

function getFormattedDate (date) {
    return date.getFullYear()
        + "-"
        + ("0" + (date.getMonth() + 1)).slice(-2)
        + "-"
        + ("0" + date.getDate()).slice(-2);
}



