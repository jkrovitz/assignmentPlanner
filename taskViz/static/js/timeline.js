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
    var valueOfCategoryNameId = $('#category-name').val();
    var valueOfColorInputId = $('#category-color');
    var background = $('#category-color').val();
    var myNewButton = '<button class="new-subcategory-button" onclick="openNewSubcategoryForm() id="createSubButtonId' + n + '">+ Add Subcategory</button>'
    $('.new-category-button').after(' <div id="category' + n + '">' + '<input type="checkbox" id="checkboxId' + n + '">'  + valueOfCategoryNameId + myNewButton + ' </div>');
    var backgroundColorStr = "#category" + n;
    $(backgroundColorStr).css("background-color", "#" + background);

    /* These two lines of code set the value to an empty string
    so that if a user creates a new category, the fields from
    the previous category submitted will not be populated with
    the input from the previous category. */
    document.getElementById('category-name').value="";
    document.getElementById('category-color').value="";

}

function openNewSubcategoryForm(){

}


function cancelFillingOutCategoryForm(){    // TODO: change to get parent
    $('#new-category-form').hide();
     //Sets category input value to empty string if the user decides to cancel creating a new category.
     document.getElementById('categoryInput').value="";
}

    function cancelFillingOutTaskForm(){    // TODO: change to get parent
    $('#new-task-form').hide();


}
    var n = 0;  // temporary
function closeNewTaskForm() {   // TODO: remove excess variables
    n++;
    $('#new-task-form').hide();
    var valueOfTaskNameId = $('#new_task_input').val();
    var valueOfStartDateInputId = $('#new_task_start_date_input').val();
    console.log(valueOfTaskNameId); 
    console.log(valueOfStartDateInputId);
    
     $('.newTaskButton').after('<div id="task' + n + '">'  + valueOfTaskNameId + ' </div>');
    /* These two lines of code set the value to an empty string
    so that if a user creates a new category, the fields from
    the previous category submitted will not be populated with
    the input from the previous category. */
    document.getElementById('new_task_input').value="";
    document.getElementById('new_task_start_date_input').value="";
    return false;
}




// TERM FORMS

function openNewShortTermForm() {
    $('#shortTermForm').css("display", "block");
}

function openNewLongTermForm() {
    $('#longTermForm').css("display", "block");
}

function openNewTaskForm() {
    $('#new-task-form').css("display", "block");
}



function cancelFillingOutShortTermForm(){       // TODO: FIX THIS
    $('#shortTermForm').hide();
}


function cancelFillingOutLongTermForm(){
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

    $('#taskFormSubmit').click(function() {
        $('#task-form').hide();

    });


        // closeNewTermForm
    $('#longTermSubmit').click(function() {
        $('#longTermForm').hide();
        console.log($('#amountLongTimeUnits').val());
        console.log($('#longTimeUnit').val());
    });


// changed this to post correctly
  $('.category-form').on('submit', function(event) {
    const categoryName = document.getElementById('category-name').value;
    const categoryColor = document.getElementById('category-color').value;
    console.log(categoryName)
    $.post('/categories',
        {
            category : categoryName,
            color : categoryColor,
        }
      )
    .done(function(data) {
      if (data.error) {
        $('#categoryErrorAlert').text(data.error).show();
        $('#background').hide();
      }
      else {
        //$('#background').text(data.color).show();
        $('#categoryErrorAlert').hide();
        $('#categorySuccessId').css('background-color');
        $( ".form-popup" ).hide();
        var text = $( "#category-name" ).text();
        $( "#textFromCategory" ).val( text );
      }

    });
    // $.get('/categories', null, function(data){
    //   console.log(data, 'data')
    // })
    event.preventDefault();

  });
});






    $(document).ready(function(){

        $('#category-color').on('change', function (e) {

            var optionSelected = $("option:selected", this);
            var valueSelected = this.value;
            $(".background").css("background-color", valueSelected);
        });
    });



// changed this to post correctly
  $('.task-form').on('submit', function(event) {
    const taskName = document.getElementById('new_task_input').value;
    const taskStartDate = document.getElementById('new_task_start_date_input').value;
    console.log(taskName)
    $.post('/home',
        {
            task : taskName,
            startDate : taskStartDate,
        }
      )
    .done(function(data) {
      if (data.error) {
        $('#taskErrorAlert').text(data.error).show();
        // $('#background').hide();
      }
      else {
        //$('#background').text(data.color).show();
        $('#taskErrorAlert').hide();
        // $('#categorySuccessId').css('background-color');
        $( ".form-popup" ).hide();
        var textFromTask = $( "#new_task_input" ).text();
        $('#textFromTask').val(text)
         $( "#textFromCategory" ).val( textFromTask );
      }

    });
    // $.get('/categories', null, function(data){
    //   console.log(data, 'data')
    // })
    event.preventDefault();

  });


// var dateControl = document.querySelector('input[type="date"]');
// dateControl.value = new Date(month, day, year);

//This function calculates the width of the div with the Class called timeline.
function calculateTimelineWidth(){
  var selectTimelineWidth = document.querySelector('.Timeline');
  timelineWidth = selectTimelineWidth.clientWidth;
  return console.log(timelineWidth);
}

calculateTimelineWidth();
