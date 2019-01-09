/**
* This file handles the functions used to display dates properly.
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
		var displayedDay = dateObj.getDate();
		var displayedMonth = dateObj.getMonth() + 1;
		var year = dateObj.getFullYear();
		var startInputVal = document.getElementById("start").value;
		var d = new Date(startInputVal);



		var dateVal = year + "|" + (displayedMonth - 1);
		var timeSlotSpanId = "lTermTimeSlot" + i;
				if (monthOfYear == "Dec") {
			year = year-1;
		}
		var timeSlotSpan = '<span class="lTermTimeIncColHeader" id="' + timeSlotSpanId + '" dateVal="' + dateVal + '">' + monthOfYear + ' ' + year + '</span>';
		$( '#' + timeSlotSpanId ).replaceWith(timeSlotSpan);

		monthOfYear = months[dateObj.getMonth()];
		dateObj.setMonth(dateObj.getMonth() + 1);

		changeLongTermLabelTextAndVal(0, 29, 30, '#lTermTimeSlot1', 'March ' + year, 'Feb ' + year);
		changeLongTermLabelTextAndVal(0, 29, 30, '#lTermTimeSlot2', 'April ' + year, 'March ' + year);
		changeLongTermLabelTextAndVal(0, 29, 30, '#lTermTimeSlot3', 'May ' + year, 'April ' + year);
		changeLongTermLabelTextAndVal(0, 29, 30, '#lTermTimeSlot4', 'June ' + year, 'May ' + year);
		changeLongTermLabelTextAndVal(0, 29, 30, '#lTermTimeSlot5', 'July ' + year, 'June ' + year);
		changeLongTermLabelTextAndVal(0, 29, 30, '#lTermTimeSlot6', 'Aug ' + year, 'July ' + year);

		changeLongTermLabelTextAndVal(0, 31, 31, '#lTermTimeSlot0', 'Jan ' + year, 'Feb ' + year);

		changeLongTermLabelTextAndVal(1, 28, 29, '#lTermTimeSlot0', 'Feb ' + year, 'March ' + year);
		changeLongTermLabelTextAndVal(1, 28, 29, '#lTermTimeSlot1', 'March ' + year, 'April ' + year);
		changeLongTermLabelTextAndVal(1, 28, 29, '#lTermTimeSlot2', 'April ' + year, 'May ' + year);
		changeLongTermLabelTextAndVal(1, 28, 29, '#lTermTimeSlot3', 'May ' + year, 'June ' + year);
		changeLongTermLabelTextAndVal(1, 28, 29, '#lTermTimeSlot4', 'June ' + year, 'July ' + year);
		changeLongTermLabelTextAndVal(1, 28, 29, '#lTermTimeSlot5', 'July ' + year, 'Aug ' + year);
		changeLongTermLabelTextAndVal(1, 28, 29, '#lTermTimeSlot6', 'Aug ' + year, 'Sept ' + year);

		changeLongTermLabelTextAndVal(2, 31, 31, '#lTermTimeSlot0', 'March ' + year, 'April ' + year);

		changeLongTermLabelTextAndVal(3, 30, 30, '#lTermTimeSlot0', 'April ' + year, 'May ' + year);
		changeLongTermLabelTextAndVal(3, 30, 30, '#lTermTimeSlot1', 'May ' + year, 'June ' + year);
		changeLongTermLabelTextAndVal(3, 30, 30, '#lTermTimeSlot2', 'June ' + year, 'July ' + year);
		changeLongTermLabelTextAndVal(3, 30, 30, '#lTermTimeSlot3', 'July ' + year, 'Aug ' + year);
		changeLongTermLabelTextAndVal(3, 30, 30, '#lTermTimeSlot4', 'Aug ' + year, 'Sept ' + year);
		changeLongTermLabelTextAndVal(3, 30, 30, '#lTermTimeSlot5', 'Sept ' + year, 'Oct ' + year);
		changeLongTermLabelTextAndVal(3, 30, 30, '#lTermTimeSlot6', 'Oct ' + year, 'Nov ' + year);

		changeLongTermLabelTextAndVal(4, 31, 31, '#lTermTimeSlot0', 'May ' + year, 'June ' + year);

		changeLongTermLabelTextAndVal(5, 30, 30, '#lTermTimeSlot0', 'June ' + year, 'July ' + year);
		changeLongTermLabelTextAndVal(5, 30, 30, '#lTermTimeSlot1', 'July ' + year, 'Aug ' + year);
		changeLongTermLabelTextAndVal(5, 30, 30, '#lTermTimeSlot2', 'Aug ' + year, 'Sept ' + year);
		changeLongTermLabelTextAndVal(5, 30, 30, '#lTermTimeSlot3', 'Sept ' + year, 'Oct ' + year);
		changeLongTermLabelTextAndVal(5, 30, 30, '#lTermTimeSlot4', 'Oct ' + year, 'Nov ' + year);
		changeLongTermLabelTextAndVal(5, 30, 30, '#lTermTimeSlot5', 'Nov ' + year, 'Dec ' + year);
		
		changeLongTermLabelTextAndVal(5, 30, 30, '#lTermTimeSlot6', 'Dec ' + year, 'Jan ' + d.getFullYear(d.setFullYear(d.getFullYear()+1)));

		changeLongTermLabelTextAndVal(7, 31, 31, '#lTermTimeSlot0', 'Aug ' + year, 'Sept ' + year);

		changeLongTermLabelTextAndVal(8, 30, 30, '#lTermTimeSlot0', 'Sept ' + year, 'Oct ' + year);
		changeLongTermLabelTextAndVal(8, 30, 30, '#lTermTimeSlot1', 'Oct ' + year, 'Nov ' + year);
		changeLongTermLabelTextAndVal(8, 30, 30, '#lTermTimeSlot2', 'Nov ' + year, 'Dec ' + year);
		changeLongTermLabelTextAndVal(8, 30, 30, '#lTermTimeSlot3', 'Dec ' + year, 'Jan ' + d.getFullYear(d.setFullYear(d.getFullYear()+1)));
		changeLongTermLabelTextAndVal(8, 30, 30, '#lTermTimeSlot4', 'Jan ' + year, 'Feb ' + year);
		changeLongTermLabelTextAndVal(8, 30, 30, '#lTermTimeSlot5', 'Feb ' + year, 'March ' + year);
		changeLongTermLabelTextAndVal(8, 30, 30, '#lTermTimeSlot0', 'March ' + year, 'April ' + year);

		changeLongTermLabelTextAndVal(9, 31, 31, '#lTermTimeSlot0', 'Oct ' + year, 'Nov ' + year);

		changeLongTermLabelTextAndVal(10, 30, 30, '#lTermTimeSlot0', 'Nov ' + year, 'Dec ' + year);
		changeLongTermLabelTextAndVal(10, 30, 30, '#lTermTimeSlot1', 'Dec ' + year, 'Jan ' + d.getFullYear(d.setFullYear(d.getFullYear()+1)));
		changeLongTermLabelTextAndVal(10, 30, 30, '#lTermTimeSlot2', 'Jan ' + year, 'Feb ' + year);

		changeLongTermLabelTextAndVal(11, 30, 30, '#lTermTimeSlot2', 'March ' + year, 'Feb ' + year);
		changeLongTermLabelTextAndVal(11, 30, 30, '#lTermTimeSlot3', 'April ' + year, 'March ' + year);
		changeLongTermLabelTextAndVal(11, 30, 30, '#lTermTimeSlot4', 'May ' + year, 'April ' + year);
		changeLongTermLabelTextAndVal(11, 30, 30, '#lTermTimeSlot5', 'June ' + year, 'May ' + year);
		changeLongTermLabelTextAndVal(11, 30, 30, '#lTermTimeSlot6', 'July ' + year, 'June ' + year);

		changeLongTermLabelTextAndVal(11, 31, 31, '#lTermTimeSlot0', 'Dec ' + year, 'Jan ' + d.getFullYear(d.setFullYear(d.getFullYear()+1)));
		changeLongTermLabelTextAndVal(11, 31, 31, '#lTermTimeSlot1', 'Jan ' + year, 'Feb ' + year);

	}
};
 

 function changeLongTermLabelTextAndVal(monthFromStartInput, dateFromStartInput1, dateFromStartInput2, divWithLabelToReplace, incorrectMonth, correctMonth){
 	var startInputVal = document.getElementById("start").value;
	var d = new Date(startInputVal);

 	if ((d.getMonth() == monthFromStartInput) && (d.getDate() == dateFromStartInput1 || d.getDate() == dateFromStartInput2)){
					if ($(divWithLabelToReplace).text() == incorrectMonth){

			    		$(divWithLabelToReplace).text(correctMonth);
			    		var dateObj = new Date(startInputVal);
			    		var year = dateObj.getFullYear();

					}

					if ($(divWithLabelToReplace).val() == incorrectMonth){
			    		$(divWithLabelToReplace).val(correctMonth);
					}
				}
 }


var canvas;
var context;
