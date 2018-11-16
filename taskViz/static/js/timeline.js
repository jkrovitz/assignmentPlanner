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