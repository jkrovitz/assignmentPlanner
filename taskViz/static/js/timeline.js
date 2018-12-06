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



/* CATEGORY FORMS*/

// function openNewCategoryForm() {
//     $('#newCategoryForm').css("display", "block");
// }


var n = 0;  // temporary
function closeNewCategoryForm() {   // TODO: remove excess variables
    n++;
    $('#newCategoryForm').hide();

    var valueOfCategoryNameId = $('#category_name').val();
    var valueOfBackgroundColor = $('#category_color').val();
    var myNewButton = '<button class="new-subcategory-button" onclick="openNewSubcategoryForm() id="createSubButtonId' + n + '">+ Add Subcategory</button>';
    $('.new-category-button').after(' <div id="category' + n + '" class="individual_category">' + '<input type="checkbox" id="checkboxId' + n + '">'  + valueOfCategoryNameId + myNewButton + ' </div>');
    var backgroundColorStr = "#category" + n;
    $(backgroundColorStr).css("backgroundColor", "#" + valueOfBackgroundColor);
 
    // var paddingOfCategories = "#category" + n; 
    // $(paddingOfCategories).css("padding","20px");

    /* These two lines of code set the value to an empty string
    so that if a user creates a new category, the fields from
    the previous category submitted will not be populated with
    the input from the previous category. */
    document.getElementById('categoryName').value="";
    document.getElementById('categoryColor').value="";
}

  $('#newCategoryForm').on('shown.bs.modal', function () {
  $('#myInput').trigger('focus')
})

function cancelFillingOutCategoryForm(){    // TODO: change to get parent
    $('#newCategoryForm').hide();
     //Sets category input value to empty string if the user decides to cancel creating a new category.
     document.getElementById('categoryInput').value="";
}


/* SUBCATEGORY FORMS */

function openNewSubcategoryForm(){

}


/* TASK FORMS */

function closeNewTaskForm() {   // TODO: remove excess variables
    n++;
    $('#newTaskForm').hide();
    var valueOfTaskNameId = $('#newTaskInput').val();
    var valueOfStartDateInputId = $('#newTaskStartDateInput').val();
    console.log(valueOfTaskNameId);
    console.log(valueOfStartDateInputId);

     $('.newTaskButton').after('<div id="task' + n + '">'  + valueOfTaskNameId + ' </div>');


    /* These two lines of code set the value to an empty string
    so that if a user creates a new category, the fields from
    the previous category submitted will not be populated with
    the input from the previous category. */
    document.getElementById('newTaskInput').value="";
    document.getElementById('newTaskStartDateInput').value="";
    return false;
}

var cn = 0;  // temporary
function addMilestoneForm() {
    cn++;

    if (cn<=3){
      var myNewMilestone = '<label>Milestone:</label><input type="text" id="milestoneNameId'+cn+'"><label>Milestone date:</label><input type="date" id="milestoneDateId'+cn+'" style="margin-right:50px">';
      $('#newMilestoneButton').after(' <div id="milestonDiv' + cn + '">' + myNewMilestone + ' </div>');
    }
  }

function cancelFillingOutTaskForm(){    // TODO: change to get parent
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
//   $('.category-form').on('submit', function(event) {
//     const categoryName = document.getElementById('category_name').value;
//     const categoryColor = document.getElementById('category_color').value;
//     console.log(categoryName);
//     $.post('/categories',
//         {
//             category : categoryName,
//             color : categoryColor,
//         }
//       )
//     .done(function(data) {
//       if (data.error) {
//         $('#categoryErrorAlert').text(data.error).show();
//         $('#background').hide();
//       }
//       else {
//         //$('#background').text(data.color).show();
//         $('#categoryErrorAlert').hide();
//         $('#categorySuccessId').css('background-color');
//         $( ".form-popup" ).hide();
//         var text = $( "#category_name" ).text();
//         $( "#textFromCategory" ).val( text );
//       }
//
//     });
    // $.get('/categories', null, function(data){
    //   console.log(data, 'data')
    // })
//     event.preventDefault();
//
//   });
});

    $(document).ready(function(){

        $('#category_color').on('change', function (e) {

            var optionSelected = $("option:selected", this);
            var valueSelected = this.value;
            $(".background").css("background-color", valueSelected);
        });
    });



// changed this to post correctly
  $('.task-form').on('submit', function(event) {
    const taskName = document.getElementById('newTaskInput').value;
    const taskStartDate = document.getElementById('newTaskStartDateInput').value;
    console.log(taskName);
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
        var textFromTask = $( "#newTaskInput" ).text();
        $('#textFromTask').val(text);
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

//This function calculates the width of the div with the Class called Timeline.
function calculateTimelineWidth(){
  var selectTimelineWidth = document.querySelector('.Timeline');
  timelineWidth = selectTimelineWidth.clientWidth;
  return console.log("Width of Timeline div:" + timelineWidth);
}


$(function() {
    var $selectTimeline = $('.Timeline');//the element we want to measure
    var timelineWidth = $selectTimeline.width();//get its width    
    console.log("Width of Timeline div:" + timelineWidth);
    $(window).resize(function() {
        //reget the size of width on window resize.
        timelineWidth = $selectTimeline.width();
        console.log("Width of Timeline div:" + timelineWidth);
    });
});

$(function() {
    var $selectCategory = $('.Category');//the element we want to measure
    var categoryWidth = $selectCategory.width();//get its width    
    console.log("Width of Category div:" + categoryWidth);
    $(window).resize(function() {
        //reget the size of width on window resize.
        categoryWidth = $selectCategory.width();
        console.log("Width of Category div:" + categoryWidth);
    });
});


//This function calculates the width of the div with the Class called Category.
function calculateCategoryWidth(){
  var selectCategoryWidth = document.querySelector('.Category');
  categoryWidth = selectCategoryWidth.clientWidth;
  return console.log("Width of Category div:" + categoryWidth);
}

// calculateTimelineWidth();
// calculateCategoryWidth();
