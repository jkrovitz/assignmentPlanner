// function task(taskName) {
//   this.taskName = taskName;
//   // this.taskStartTime = taskStartTime;
//   // this.taskEndTime = taskEndTime;
//   // this.taskCategory = taskCategory;
//   // this.taskSubcategory = taskSubcategory;
//   // this.taskMilestones = taskMilestones;
//   // this.taskComplete = taskComplete;
// }

// function milestone(milestoneTask, milestoneName, milestoneDate, milestoneComplete) {
//   this.milestoneTask = milestoneTask;
//   this.milestoneName = milestoneName;
//   this.milestoneDate = milestoneDate;
//   this.milestoneComplete = milestoneComplete;
// }

// function category() {
//   this.categoryName = categoryName;
//   this.categoryColor = categoryColor;
//   this.isChecked = function() {
//     return this.categoryName + this.categoryColor;
//   }
// }



// function TaskItem(taskName){
//   this.taskName = taskName; 
//   this.outputTaskName = function(){
//     var newNode = document.createElement('div');
//     newNode.className = 'task-item';
//     newNode.innerHTML = '<strong>' + this.taskName;
//     newNode.style.position = "absolute";
//     getTimelineId =   document.getElementById('timelineId');
//     return getTimelineId.appendChild(newNode);
    

//   };
// }

 


// function closeNewTaskForm(){
//   // document.getElementById("newTaskInputId").reset();
//   document.getElementById("new-task-form").style.display = "none";
//   var valueOfNewTaskInputId = document.getElementById("newTaskInputId").value;
//   display_message.innerHTML = valueOfNewTaskInputId;
      
//   var taskFromInput = new TaskItem(display_message);
//   taskFromInput.outputTaskName();
  
 

    
// }


        // function showMessage(){
        //     var message = document.getElementById("message").value;
        //     display_message.innerHTML= message;
        // }



// CATEGORY FORMS

function openNewCategoryForm() {
    $('#new-category-form').css("display", "block");
}

var n = 0;  // temporary
function closeNewCategoryForm() {   // TODO: remove excess variables
    n++;
    $('#new-category-form').hide();
    var valueOfCategoryNameId = $('#categoryInput').val();
    var valueOfColorInputId = $('#colorInput');
    var background = $('#bgcolor').val();
    $('.new-category-button').after('<div id="category' + n + '">' + valueOfCategoryNameId + '</div>');
    var str = "#category" + n;
    $(str).css("background-color", "#" + background);
}

function cancelFillingOutForm(){    // TODO: change to get parent
    $('#new-category-form').hide();
}



// TERM FORMS

function openNewShortTermForm() {
    $('#shortTermForm').css("display", "block");
}

function openNewLongTermForm() {
    $('#longTermForm').css("display", "block");
}


// MOVED THIS INTO `$(document).ready()`

// function closeNewTermForm() {
//     $('#shortTermForm').hide();
//     // $('#longTermForm').hide();
//     console.log($('#amountShortTimeUnits').val());
//     console.log($('#shortTimeUnit').val());
// }

function cancelFillingOutTermForm(){       // TODO: FIX THIS
    $('#shortTermForm').hide();
    $('#longTermForm').hide();
}



// TODO: Why do we have 3 `$(document).ready()` things?

// TODO: Are we going to have `onclick=""` in HTML files, or as `$('').click(function(){})` things in JS files>?

$(document).ready(function() {

    // closeNewTermForm
    $('#shortTermSubmit').click(function() {
        $('#shortTermForm').hide();
        console.log($('#amountShortTimeUnits').val());
        console.log($('#shortTimeUnit').val());
    });

  $('.category-form').on('submit', function(event) {

    $.ajax({
      data : {
        category : $('#categoryInput').val(),
        color : $('#colorInput').val()
      },
      type : 'POST',
      url : '/newprocess'
    })
    .done(function(data) {

      if (data.error) {
        $('#categoryErrorAlert').text(data.error).show();
        $('#background').hide();
      }
      else {
        $('#background').text(data.category).show();
        $('#categoryErrorAlert').hide();
        $('#categorySuccessId').css('background-color');
        $( ".form-popup" ).hide();
        var text = $( "#categoryInput" ).text();
        $( "#textFromCategory" ).val( text );


      }

    });


    event.preventDefault();

  });


});


    $(document).ready(function(){

        $('#bgcolor').on('change', function (e) {

            var optionSelected = $("option:selected", this);
            var valueSelected = this.value;
            $(".background").css("background-color", valueSelected);
        });
    });



$(document).ready(function(){

$('#bgcolor').on('change', function (e) {
var optionSelected = $("option:selected", this);
var valueSelected = '#' +this.value;

$("#background").css("background-color", valueSelected);

});
});
// function openNewTaskForm() {
//     document.getElementById("new-task-form").style.display = "block";
// }

// function closeNewTaskForm() {
//     document.getElementById("new-task-form").style.display = "none";
// }

// var dateControl = document.querySelector('input[type="date"]');
// dateControl.value = new Date(month, day, year);

//This function calculates the width of the div with the Class called timeline. 
function calculateTimelineWidth(){
  var selectTimelineWidth = document.querySelector('.Timeline');
  timelineWidth = selectTimelineWidth.clientWidth;
  return console.log(timelineWidth);
}

calculateTimelineWidth();