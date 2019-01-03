/*
	This file handles ajax calls. As of now there is only
	an ajax call used to create a new task . 
*/


	$('#newTaskFormId').submit( function(e) {
		e.preventDefault();
		var task_name = $('#new_task_input').val();
		var taskStartDate = $('#new_task_start_date_input').val();
		var taskEndDate = $('#new_task_end_date_input').val();

		if (taskEndDate < taskStartDate) {
			$('#newTaskForm').hide();
			alert("End date should be AFTER start date. TRY AGAIN.");
		} else {
			$.ajax({
				url : '/create',
				data : $('#newTaskFormId').serialize(),
				type : 'POST',
				success: function(response) {
					console.log(response);
					console.log(" ~ ajax happened ~ ");
				},
				error: function(error) {
					console.log(error);
				}
			});

			$('#newTaskForm').hide();
		}
	});