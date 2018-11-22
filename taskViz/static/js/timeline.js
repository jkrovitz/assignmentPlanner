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




function cancelFillingOutForm(){
    document.getElementById('new-category-form').style.display = "none";
}

function openNewCategoryForm() {
    document.getElementById("new-category-form").style.display = "block";
    console.log(document.getElementById("new-category-form"));
}

var n = 0;  // temporary
function closeNewCategoryForm() {
    n++;
    $('#new-category-form').hide();
    var valueOfCategoryNameId = $('#categoryNameId').val();
    // var valueOfColorInputId = $('#colorInput');
    var background = $('#background');
    background.after('<div id="category' + n + '">' + valueOfCategoryNameId + '</div>');
    // background.css("background-color", $('#colorInput'));

    console.log(valueOfCategoryNameId);
}


$(document).ready(function() {

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
