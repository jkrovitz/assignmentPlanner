function task(taskName, taskStartTime, taskEndTime, taskMilestones, taskComplete) {
  this.taskName = taskName;
  this.taskStartTime = taskStartTime;
  this.taskEndTime = taskEndTime;
  // this.taskCategory = taskCategory;
  // this.taskSubcategory = taskSubcategory;
  this.taskMilestones = taskMilestones;
  this.taskComplete = taskComplete;
}

function milestone(milestoneTask, milestoneName, milestoneDate, milestoneComplete) {
  this.milestoneTask = milestoneTask;
  this.milestoneName = milestoneName;
  this.milestoneDate = milestoneDate;
  this.milestoneComplete = milestoneComplete;
}

function category() {
  this.categoryName = categoryName;
  this.categoryColor = categoryColor;
  this.isChecked = function() {
    return this.categoryName + this.categoryColor;
  }
}

function openForm() {
    document.getElementById("new-category-form").style.display = "block";
}

function closeForm() {
    document.getElementById("new-category-form").style.display = "none";
}

function openNewTaskForm() {
    document.getElementById("new-task-form").style.display = "block";
}

function closeNewTaskForm() {
    document.getElementById("new-task-form").style.display = "none";
}

var dateControl = document.querySelector('input[type="date"]');
dateControl.value = new Date(month, day, year);
