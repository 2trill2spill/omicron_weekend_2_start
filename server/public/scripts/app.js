$(document).ready(function(){
    $('#next').click(function() {
      nextStudent();
    });

    $('#prev').click(function() {
      prevStudent();
    });

    $.ajax({
      type: "GET",
      url: "/data",
      success: function(data){
        var currentStudent = 0;
        var totalStudents = data.omicron.length;
        $('#workspace').data({current: currentStudent, total: totalStudents});
      	setupDOM(data.omicron)
      	processDataArray(data);
      }
    });

  function processDataArray(data) {
  	data.omicron.forEach(function(student) {
  		appendStudentToDOM(student);
  	});
  }

  function appendStudentToDOM(student) {


  }

  function display(userNum) {

  }

  function handleNextWrapAround(currentStudent) {
    /* Update the state data. */
    var state = $('#workspace').data();
    state.current = 0;
    $('#workspace').data(state);
    var last = currentStudent - 1;

    /* Switch block colors to reflect the wrap around. */
    $('#' + last).css("background-color", "yellow");
    $('#0').css("background-color", "black");

    /* Display the first user. */
    display(0);
  }

  function changeColorOnNext(currentStudent) {
    var last = currentStudent - 1;
    $('#' + last).css("background-color", "yellow")
    $('#' + currentStudent).css("background-color", "black")
  }

  function handlePrevWrapAround(currentStudent) {
    /* Update the state data. */
    var state = $('#workspace').data();
    state.current = state.total;
    $('#workspace').data(state);

    /* Switch block colors to reflect the wrap around. */
    $('#0').css("background-color", "yellow");
    $('#' + state.total).css("background-color", "black");

    /* Display the first user. */
    display(0);
  }

  function changeColorOnPrev(currentStudent) {
    var last = currentStudent + 1;
    $('#' + last).css("background-color", "yellow")
    $('#' + currentStudent).css("background-color", "black")
  }

  function nextStudent() {
    /* Grab our state from data and get the current and total students. */
    var state = $('#workspace').data();
    var currentStudent = state.current + 1;
    var totalStudents = state.total;

    /* If the currentStudent is equal to the total
      students start at the begining. */
    if(currentStudent == totalStudents) {
      handleNextWrapAround(currentStudent);
      return;
    }

    /* Were not handling a wrap around so just go forward. */
    changeColorOnNext(currentStudent);
    display(currentStudent);

    /* Update the state data. */
    state.current = currentStudent;
    $('#workspace').data(state);
    return;
  }

  function prevStudent() {
    /* Grab our state from data and get the current and total students. */
    var state = $('#workspace').data();

    /* If the currentStudent is equal to zero
      start at the end. */
    if(currentStudent == 0) {
      handlePrevWrapAround(currentStudent);
      return;
    }

    var currentStudent = state.current - 1;
    var totalStudents = state.total;

    console.log("num: ", currentStudent);
    console.log("total: ", totalStudents);

    /* Were not handling a wrap around so just go back. */
    changeColorOnPrev(currentStudent);
    display(currentStudent);

    /* Update the state data. */
    state.current = currentStudent;
    $('#workspace').data(state);
    return
  }

  /* Create the index points on the DOM. */
  function setupDOM(array) {
  	array.forEach(function(student, i) {
  		$('#workspace').append('<div id="' + i + '" class="block"></div>');

      /* Set the first div block to black. */
      if(i == 0) {
        $('#0').css("background-color", "black");
      }
  	});

  }
});
