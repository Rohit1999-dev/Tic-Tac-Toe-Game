$(document).ready(function() {

    // initialize variables
    // player = either x or o, whatever the player picks
    // computer = either x or o, whatever the player doesn't pick
    var player, computer;
  
    // each of these corresponds to a cell in the game table
    var c00, c01, c02, c10, c11, c12, c20, c21, c22;
  
    // to keep track of whose turn it is
    var turn = 0;
  
    // player picks x or o
    $("#x").click(function() {
      player = "X";
      computer = "O";
      $("#choice").fadeOut();
      $("#board").fadeTo("slow",1);
    });
    $("#o").click(function() {
      player = "O";
      computer = "X";
      $("#choice").fadeOut();
      $("#board").fadeTo("slow",1);
    });
  
    //all squares should be empty
    //clears the board
    function clearBoard() {
      c00 = $("#c00").text("");
      c01 = $("#c01").text("");
      c02 = $("#c02").text("");
      c10 = $("#c10").text("");
      c11 = $("#c11").text("");
      c12 = $("#c12").text("");
      c20 = $("#c20").text("");
      c21 = $("#c21").text("");
      c22 = $("#c22").text("");
      turn = 0;
    }
  
    //when "New game" button is pressed, clear the board
    $("#new-game").click(function() {
      clearBoard();
      $("#final-screen").hide();
      $("#choice").fadeTo("slow",1);
    });
  
    // The player clicks a square. If the square is empty, an x is placed in that square. If the square is not empty, have the player pick a different square.
    $("td").click(function() {
      if (turn === 0) {
        if ($(this).text() === "") {
          $(this).text(player);
          checkSquareValues();
          checkBoardState();
          turn = 1;
          computerMove();
          checkSquareValues();
          checkBoardState();
        } else {
          alert("There is already a move on that square. Please pick a different square.");
        }
      }
    }); 

    
    function computerMove() {
      // case 1: if there is a chance to win
      if (c00 === "" && ((c01 === computer && c02 === computer) || (c10 === computer && c20 === computer) || (c11 === computer && c22 === computer))) {
        $("#c00").text(computer);
        turn = 0;
      }
      else if (c01 === "" && ((c00 === computer && c02 === computer) || (c11 === computer && c21 === computer))) {
        $("#c01").text(computer);
        turn = 0;
      }
      else if (c02 === "" && ((c00 === computer && c01 === computer) || (c12 === computer && c22 === computer) || (c11 === computer && c20 === computer))) {
        $("#c02").text(computer);
        turn = 0;
      }
      else if (c10 === "" && ((c00 === computer && c20 === computer) || (c11 === computer && c12 === computer))) {
        $("#c10").text(computer);
        turn = 0;
      }
      else if (c11 === "" && ((c10 === computer && c12 === computer) || (c00 === computer && c22 === computer) || (c02 === computer && c20 === computer))) {
        $("#c11").text(computer);
        turn = 0;
      }
      else if (c12 === "" && ((c10 === computer && c11 === computer) || (c02 === computer && c22 === computer))) {
        $("#c12").text(computer);
        turn = 0;
      }
      else if (c20 === "" && ((c21 === computer && c22 === computer) || (c00 === computer && c10 === computer) || (c02 === computer && c11 === computer))) {
        $("#c20").text(computer);
        turn = 0;
      }
      else if (c21 === "" && ((c20 === computer && c22 === computer) || (c01 === computer && c11 === computer))) {
        $("#c21").text(computer);
        turn = 0;
      }
      else if (c22 === "" && ((c20 === computer && c21 === computer) || (c02 === computer && c12 === computer) || (c00 === computer && c11 === computer))) {
        $("#c22").text(computer);
        turn = 0;
      }
      // case 2: if there is a chance to block
      else if (c00 === "" && ((c01 === player && c02 === player) || (c10 === player && c20 === player) || (c11 === player && c22 === player))) {
        $("#c00").text(computer);
        turn = 0;
      }
      else if (c01 === "" && ((c00 === player && c02 === player) || (c11 === player && c21 === player))) {
        $("#c01").text(computer);
        turn = 0;
      }
      else if (c02 === "" && ((c00 === player && c01 === player) || (c12 === player && c22 === player) || (c11 === player && c20 === player))) {
        $("#c02").text(computer);
        turn = 0;
      }
      else if (c10 === "" && ((c00 === player && c20 === player) || (c11 === player && c12 === player))) {
        $("#c10").text(computer);
        turn = 0;
      }
      else if (c11 === "" && ((c10 === player && c12 === player) || (c00 === player && c22 === player) || (c02 === player && c20 === player))) {
        $("#c11").text(computer);
        turn = 0;
      }
      else if (c12 === "" && ((c10 === player && c11 === player) || (c02 === player && c22 === player))) {
        $("#c12").text(computer);
        turn = 0;
      }
      else if (c20 === "" && ((c21 === player && c22 === player) || (c00 === player && c10 === player) || (c02 === player && c11 === player))) {
        $("#c20").text(computer);
        turn = 0;
      }
      else if (c21 === "" && ((c20 === player && c22 === player) || (c01 === player && c11 === player))) {
        $("#c21").text(computer);
        turn = 0;
      }
      else if (c22 === "" && ((c20 === player && c21 === player) || (c02 === player && c12 === player) || (c00 === player && c11 === player))) {
        $("#c22").text(computer);
        turn = 0;
      }
      // case 3: center
      else if (c11 === "") {
        $("#c11").text(computer);
        turn = 0;
      }
      // case 4: opposite corner
      else if (c00 === "" && (c02 === player  || c20 === player)) {
        $("#c00").text(computer);
        turn = 0;
      }
      else if (c02 === "" && (c00 === player  || c22 === player)) {
        $("#c02").text(computer);
        turn = 0;
      }
      else if (c22 === "" && (c02 === player  || c20 === player)) {
        $("#c22").text(computer);
        turn = 0;
      }
      else if (c20 === "" && (c00 === player  || c22 === player)) {
        $("#c20").text(computer);
        turn = 0;
      }
      // case 5: corner
      else if (c00 === "") {
        $("#c00").text(computer);
        turn = 0;
      }
      else if (c02 === "") {
        $("#c02").text(computer);
        turn = 0;
      }
      else if (c20 === "") {
        $("#c20").text(computer);
        turn = 0;
      }
      else if (c22 === "") {
        $("#c22").text(computer);
        turn = 0;
      }
      // case 6: empty side
      else if (c01 === "") {
        $("#c01").text(computer);
        turn = 0;
      }
      else if (c12 === "") {
        $("#c12").text(computer);
        turn = 0;
      }
      else if (c21 === "") {
        $("#c21").text(computer);
        turn = 0;
      }
      else if (c10 === "") {
        $("#c10").text(computer);
        turn = 0;
      }
    }
  
    // The program checks what is in each box after each move.
    function checkSquareValues() {
      c00 = $("#c00").html();
      c01 = $("#c01").html();
      c02 = $("#c02").html();
      c10 = $("#c10").html();
      c11 = $("#c11").html();
      c12 = $("#c12").html();
      c20 = $("#c20").html();
      c21 = $("#c21").html();
      c22 = $("#c22").html();
    }
  
    // The program should check the state: keep playing, someone won, or a draw.
    function checkBoardState() {
      // player wins
      if ((c00 === c01 && c00 === c02 && (c00 === player)) || //first row
        (c10 === c11 && c10 === c12 && (c10 === player)) || //second row
        (c20 === c21 && c20 === c22 && (c20 === player)) || //third row
        (c00 === c10 && c00 === c20 && (c00 === player)) || //first column
        (c01 === c11 && c01 === c21 && (c01 === player)) || //second column
        (c02 === c12 && c02 === c22 && (c02 === player)) || //third column
        (c00 === c11 && c00 === c22 && (c00 === player)) || //diagonal 1
        (c02 === c11 && c02 === c20 && (c02 === player)) //diagonal 2
      ) {
        $("#board").fadeOut("slow");
        $("#winner").text("You win!");
        $("#final-screen").fadeTo("slow",1);
      }
      // computer wins
      else if ((c00 === c01 && c00 === c02 && (c00 === computer)) || //first row
        (c10 === c11 && c10 === c12 && (c10 === computer)) || //second row
        (c20 === c21 && c20 === c22 && (c20 === computer)) || //third row
        (c00 === c10 && c00 === c20 && (c00 === computer)) || //first column
        (c01 === c11 && c01 === c21 && (c01 === computer)) || //second column
        (c02 === c12 && c02 === c22 && (c02 === computer)) || //third column
        (c00 === c11 && c00 === c22 && (c00 === computer)) || //diagonal 1
        (c02 === c11 && c02 === c20 && (c02 === computer)) //diagonal 2
      ) {
        $("#board").fadeOut("slow");
        $("#winner").text("Computer wins!");
        $("#final-screen").fadeTo("slow",1);
      }
      // tie
      else if (c00 && c01 && c02 && c10 && c11 && c12 && c20 && c21 && c22) {
        $("#board").fadeOut("slow");
        $("#winner").text("It's a tie!");
        $("#final-screen").fadeTo("slow",1);
      }
    }
  
  }); 