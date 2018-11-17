//Jeremy Krovitz
//Homework 3

//This is an object constructor function called Event Item. It takes in six
//parameters and contains two methods. One method creates the div and the
//other method renders the div to the selected day's column.
// function EventItem(eventName, location, dayOfWeek, startTime, endTime, duration){
//   this.eventName = eventName;
//   this.location = location;
//   this.dayOfWeek = dayOfWeek;
//   this.startTime = startTime;
//   this.endTime = endTime;
//   this.duration = duration;
//   this.createEventDiv = function(){
//     var countup = this;
//     var newNode = document.createElement('div');
//     newNode.className = 'event-item';
//     newNode.innerHTML = '<strong>' + this.eventName + '</strong><br>' + this.location + '<br>' + this.startTime + ' - ' + this.endTime + '<br>';
//     var heightOfContent = calculateContentHeight();
//     var topOfContent = calculateContentTop();
//     var numberofIntervals = 96; //Each quarter hour multiplied by 24 is 96.
//     var quarterOfHourDecimalVal = 0.25;
//     var heightPerInterval = heightOfContent / numberofIntervals;
//     var calculatedTopPosition = calculateTop(heightPerInterval, heightOfContent, topOfContent);
//     var heightOfEvent = calculateHeightOfEvent(duration, heightPerInterval, quarterOfHourDecimalVal);
//     newNode.style.top = calculatedTopPosition.toString() + "px";
//     newNode.style.height = heightOfEvent.toString() + "px";
//     newNode.style.position = "absolute";
//     weekId =   document.getElementById('week');
//     return weekId.appendChild(newNode);
//   };
//   this.renderToDayColumn = function(){
//     var contentDivs = document.getElementsByClassName("content")
//     var daysOfWeekArray = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
//     var daySelector = document.getElementById("daysInWeekId");
//     var  daySelectorVal = daySelector.options[daySelector.selectedIndex].value;
//     if(daySelectorVal === "Sunday"){
//       this.dayOfWeek = "Sunday";
//       contentDivs[0].append(this.createEventDiv());
//     }
//     if(daySelectorVal === "Monday"){
//       this.dayOfWeek = "Monday";
//       contentDivs[1].append(this.createEventDiv());
//     }
//     if(daySelectorVal === "Tuesday"){
//       this.dayOfWeek = "Tuesday";
//       contentDivs[2].append(this.createEventDiv());
//     }
//     if(daySelectorVal === "Wednesday"){
//       this.dayOfWeek = "Wednesday";
//       contentDivs[3].append(this.createEventDiv());
//     }
//     if(daySelectorVal === "Thursday"){
//       this.dayOfWeek = "Thursday";
//       contentDivs[4].append(this.createEventDiv());
//     }
//     if(daySelectorVal === "Friday"){
//       this.dayOfWeek = "Friday";
//       contentDivs[5].append(this.createEventDiv());
//     }
//     if(daySelectorVal === "Saturday"){
//       this.dayOfWeek = "Saturday";
//       contentDivs[6].append(this.createEventDiv());
//     }
//     return this.EventItem;
//   };
// }



function EventItem(eventName, location, dayOfWeek, startTime, endTime, duration){
  this.eventName = eventName;
  this.location = location;
  this.dayOfWeek = dayOfWeek;
  this.startTime = startTime;
  this.endTime = endTime;
  this.duration = duration;
  this.createEventDiv = function(){
    var newNode = document.createElement('div');
    newNode.className = 'event-item';
    newNode.innerHTML = '<strong>' + this.eventName + '</strong><br>' + this.location + '<br>' + this.startTime + ' - ' + this.endTime + '<br>';
    var heightOfContent = calculateContentHeight();
    var topOfContent = calculateContentTop();
    var numberofIntervals = 96; //Each quarter hour multiplied by 24 is 96.
    var quarterOfHourDecimalVal = 0.25;
    var heightPerInterval = heightOfContent / numberofIntervals;
    var calculatedTopPosition = calculateTop(heightPerInterval, heightOfContent, topOfContent);
    var heightOfEvent = calculateHeightOfEvent(duration, heightPerInterval, quarterOfHourDecimalVal);
    newNode.style.top = calculatedTopPosition.toString() + "px";
    newNode.style.height = heightOfEvent.toString() + "px";
    newNode.style.position = "absolute";
    weekId =   document.getElementById('week');
    return weekId.appendChild(newNode);
  };
  this.renderToDayColumn = function(){
    var contentDivs = document.getElementsByClassName("content")
    var daysOfWeekArray = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    var daySelector = document.getElementById("daysInWeekId");
    var  daySelectorVal = daySelector.options[daySelector.selectedIndex].value;
    if(daySelectorVal === "Sunday"){
      this.dayOfWeek = "Sunday";
      contentDivs[0].append(this.createEventDiv());
    }
    if(daySelectorVal === "Monday"){
      this.dayOfWeek = "Monday";
      contentDivs[1].append(this.createEventDiv());
    }
    if(daySelectorVal === "Tuesday"){
      this.dayOfWeek = "Tuesday";
      contentDivs[2].append(this.createEventDiv());
    }
    if(daySelectorVal === "Wednesday"){
      this.dayOfWeek = "Wednesday";
      contentDivs[3].append(this.createEventDiv());
    }
    if(daySelectorVal === "Thursday"){
      this.dayOfWeek = "Thursday";
      contentDivs[4].append(this.createEventDiv());
    }
    if(daySelectorVal === "Friday"){
      this.dayOfWeek = "Friday";
      contentDivs[5].append(this.createEventDiv());
    }
    if(daySelectorVal === "Saturday"){
      this.dayOfWeek = "Saturday";
      contentDivs[6].append(this.createEventDiv());
    }
    return this.EventItem;
  };
}

//When the "+Add New Event" button is clicked this function is called. This function displays the form
//that allows the user to input the eventName and location, as well as select the day, the start time, and
//the end time.
function displayForm(){
    document.getElementById("add_event_form").style.display = "block";
  }

//This function calculates the height of the content div.
function calculateContentHeight(){
  var selectContentHeight = document.querySelector('.content');
  var computedContentHeight = getComputedStyle(selectContentHeight);
  contentHeight = selectContentHeight.clientHeight;
  return contentHeight;
}

//This function returns the pixel location of the top of the content.
function calculateContentTop(){
  var selectContentTop = document.querySelector('.content');
  contentTop = selectContentTop.offsetTop;
  return contentTop;
}

//This function returns the top of the div with attribute class called event-item.
function calculateTop(heightOfEachInterval, contentHeight, contentTop){
  var startTimeVar = document.getElementById("startTimeFifteenMinInterval").value;
  var numberOfIntervalsAtStart = startTimeVar / .25;
  // var topOffset = contentTop + (numberOfIntervalsAtStart * heightOfEachInterval);
  var topOffset = numberOfIntervalsAtStart * heightOfEachInterval;
  return topOffset;
}

//This function takes three perameters - theDuration and heightOfEachInterval, and the
//quarterOfHourDecimalVal. The quotient of theDuration and
//quarterOfHourDecimalVal will be the number of intervals that make up the
//height of the event, which is then multiplied by heightOfEachInterval, which
//returns the total height of the event.
function calculateHeightOfEvent(theDuration, heightOfEachInterval, quarterOfHourDecimalVal){
  return (theDuration / quarterOfHourDecimalVal) * heightOfEachInterval;
}

//This function hdies the form and gets the inputs the user input and the options
//the user selected for their event.
function closeFormAndGetInputs(){
      document.getElementById("new_event_button").disabled = false;
  var eventNameIdVariable = document.getElementById("eventNameId").value;
  if(eventNameIdVariable == ""){
    alert("You must enter an event name");
  }else{
    var locationIdVariable = document.getElementById("locationId").value;
    var daysInWeekIdVariable = document.getElementById("daysInWeekId");
    var getStartTimeFifteenMinIntervalVar = document.getElementById("startTimeFifteenMinInterval");
    var  startTimeFifteenMinIntervalVarVal = getStartTimeFifteenMinIntervalVar.options[getStartTimeFifteenMinIntervalVar.selectedIndex].value;
    var  startTimeFifteenMinIntervalVarText = getStartTimeFifteenMinIntervalVar.options[getStartTimeFifteenMinIntervalVar.selectedIndex].text;
    if(startTimeFifteenMinIntervalVarVal == ""){
      alert("You must choose a start time.");
    }
    else{
      var getEndTimeFifteenMinIntervalVar = document.getElementById("endTimeFifteenMinInterval");
      var endTimeFifteenMinIntervalVarVal = getEndTimeFifteenMinIntervalVar.options[getEndTimeFifteenMinIntervalVar.selectedIndex].value;
      var endTimeFifteenMinIntervalVarText = getEndTimeFifteenMinIntervalVar.options[getEndTimeFifteenMinIntervalVar.selectedIndex].text;
      if(endTimeFifteenMinIntervalVarVal == ""){
        alert("You must choose an end time");
      }
      else{
        var duration = endTimeFifteenMinIntervalVarVal - startTimeFifteenMinIntervalVarVal;
        if(duration < 0){
          alert("Your end time cannot happen before your start time!");
        }
        else{
          var eventFromInput = new EventItem(eventNameIdVariable, locationIdVariable, daysInWeekIdVariable, startTimeFifteenMinIntervalVarText, endTimeFifteenMinIntervalVarText, duration);
          eventFromInput.renderToDayColumn();
        }
      }
    }
  }$('#myForm')[0].reset();
  document.getElementById("add_event_form").style.display = "none";
}

//This function uses Jquery to append the days of the week to options in a select dropdowns.
$(document).ready(function(){
  var daysOfWeekArray = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  for(i = 0; i < daysOfWeekArray.length; i++){
    $("#daysInWeekId").append('<option value=' + daysOfWeekArray[i]+ '>' + daysOfWeekArray[i] + '</option>');
  }
});

//This function uses Jquery to create the option values and option text for the start and end time select dropdowns.
$(document).ready(function(){
  var militaryVals = [''];
  var militaryValsString = [''];
  for(var i=0; i<24; i=i+.25){
    militaryVals.push(i);
    militaryValsString = militaryVals.toString();
  }
  var timesHours=['00','01','02','03','04','05','06','07','08','09','10','11','12','13','14','15','16','17','18','19','20','21','22','23'];
  var mi=['00','15','30','45'];
  var standardHours = [''];
  var timeVal;
  for(var i =0; i<timesHours.length; i++){
    for (var j=0; j< mi.length; j++){
      var hours = Number(timesHours[i]);
      var minutes = Number(mi[j]);
      if (hours > 0 && hours <= 12) {
        timeVal= "" + hours;
      } else if (hours > 12) {
        timeVal= "" + (hours - 12);
      } else if (hours == 0) {
        timeVal= "12";
      }
      timeVal += (minutes < 10) ? ":0" + minutes : ":" + minutes;
      timeVal += (hours >= 12) ? " P.M." : " A.M.";
      standardHours.push(timeVal);
    }
  }
  for(i=0; i < militaryVals.length; i++){
    $("#startTimeFifteenMinInterval").append('<option value=' + militaryVals[i] + '>' + standardHours[i] +  '</option>');
    $("#endTimeFifteenMinInterval").append('<option value=' + militaryVals[i] + '>' + standardHours[i] +  '</option>');
  }
});
