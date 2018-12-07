var canvas = document.getElementById('DemoCanvas');
   var sampleTaskStartDay = 1;
   var sampleTaskEndDay = 5;

   var sampleTaskStartDay2 = 3;
   var sampleTaskEndDay2 = 6;

   // var numTimeIncrements = $('#amountShortTimeUnits').val();   // temporarily out
   numTimeIncrements = 7;  // temporary. for days of week
   var xSpaceIncrement = canvas.width / numTimeIncrements;
   var ySpaceIncrement = 60;


if (canvas.getContext) {

   // task 1
   var context = canvas.getContext("2d");
   context.beginPath();
   context.moveTo(sampleTaskStartDay * xSpaceIncrement, ySpaceIncrement);
   context.lineTo(sampleTaskEndDay * xSpaceIncrement, ySpaceIncrement);
   context.lineWidth = 5;
   // set line color
   context.strokeStyle = '#00b500';
   context.stroke();

//circle
   // var context = canvas.getContext('2d');
   var centerX = sampleTaskStartDay * xSpaceIncrement;
   var centerY = ySpaceIncrement;
   var radius = 20;

   context.beginPath();
   context.arc(centerX, centerY, radius, 0, 2 * Math.PI, false);
   context.fillStyle = '#00b500';

   //we're probably going to have something where if a user achieves a milestone and wants to check it off, context.fill() will be executed.
   context.fill();
   context.lineWidth = 5;


   var centerX = sampleTaskEndDay * xSpaceIncrement;
   var centerY = ySpaceIncrement;
   var radius = 20;

   context.beginPath();
   context.arc(centerX, centerY, radius, 0, 2 * Math.PI, false);
   context.fillStyle = '#00b500';

   //we're probably going to have something where if a user achieves a milestone and wants to check it off, context.fill() will be executed.
   context.fill();


   // task 2

   var context = canvas.getContext("2d");
   context.beginPath();
   context.moveTo(sampleTaskStartDay2 * xSpaceIncrement, ySpaceIncrement*2);
   context.lineTo(sampleTaskEndDay2 * xSpaceIncrement, ySpaceIncrement*2);
   context.lineWidth = 5;
   // set line color
   context.strokeStyle = '#00b500';
   context.stroke();

//circle
   // var context = canvas.getContext('2d');
   var centerX = sampleTaskStartDay2 * xSpaceIncrement;
   var centerY = ySpaceIncrement*2;
   var radius = 20;

   context.beginPath();
   context.arc(centerX, centerY, radius, 0, 2 * Math.PI, false);
   context.fillStyle = '#00b500';

   //we're probably going to have something where if a user achieves a milestone and wants to check it off, context.fill() will be executed.
   context.fill();
   context.lineWidth = 5;
   context.strokeStyle = '2E1919';
   context.stroke();
   context.fillStyle = '#2E1919';

   var centerX = sampleTaskEndDay2 * xSpaceIncrement;
   var centerY = ySpaceIncrement*2;
   var radius = 20;

   context.beginPath();
   context.arc(centerX, centerY, radius, 0, 2 * Math.PI, false);
   context.fillStyle = '#00b500';

   //we're probably going to have something where if a user achieves a milestone and wants to check it off, context.fill() will be executed.
   context.fill();
}
