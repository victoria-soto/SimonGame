var buttonColors = ["red", "blue", "green", "yellow"];
var gamePattern = [];

var userClickedPattern = [];

// must be global so it's not redefined as true at every keypress
var gameStarted = true;
var level = 0;

// game started after SINGLE keypress
$(document).keypress(function gameControl() {
  if (gameStarted === true) {
    nextSequence();
  } else {
    $("#level-title").text("Game Over, Press Any Key to Restart");
  }
});

function nextSequence() {
  gameStarted = true;
  var randomNumber = Math.round(Math.random() * 3);

  // stores single random "color"
  // using random # calculated to get "color" stored in
  // buttonColors array
  var randomChosenColor = buttonColors[randomNumber];

  gamePattern.push(randomChosenColor);

  // selects id name = name as random button
  $("#" + randomChosenColor).fadeOut(100).fadeIn(100);
  playSound(randomChosenColor);
  animatePress(randomChosenColor);

  level++;

  $("#level-title").text("Level " + level);
}

// MUST call function in console--else promise error for play()
// nextSequence();

// keeps listening for clicks
$(".btn").click(function clickHandler(event) {

  // gets clicked object's "id" which is a "color"
  var userChosenColor = this.id;

  userClickedPattern.push(userChosenColor);
  playSound(userChosenColor);
  animatePress(userChosenColor);
  answerCheck(userChosenColor);

});

function answerCheck(currentUserColor) {
  // check currentUserColor against gamePattern, level -1 bc array starts at 0

  if (currentUserColor === gamePattern[userClickedPattern.length - 1]) {
    if (gamePattern.length === userClickedPattern.length) {
      userClickedPattern = [];
      setTimeout(function() {
        nextSequence();

      }, 1000);
    }
  } else {

    playSound("wrong");

    $("body").addClass("game-over");
    startOver();
    setTimeout(function() {
      $("body").removeClass("game-over");
    }, 200);
  }
}

function startOver() {
  $("#level-title").text("Game Over, Press Any Key to Restart");
  level = 0;
  gamePattern = [];
  gameStarted = true;
}

function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

// takes in "color" and adds "pressed" class
function animatePress(currentColor) {
  $("." + currentColor).addClass("pressed");

  setTimeout(function() {
    $("." + currentColor).removeClass("pressed");
  }, 100);

}

/**********DEBUGGING COMMENTS*****************/
// console.log("^^^^^START^^^^^");
//
// console.log("-------RANDO---------randomChosenColor: " + randomChosenColor + "   gamePattern: " + gamePattern + "    userClickedPattern: " + userClickedPattern);
//
// console.log("*******USER********userChosenColor: " + userChosenColor + "   gamePattern: " + gamePattern + "    userClickedPattern: " + userClickedPattern);
//
// console.log("^^^^^ChkAns^^^^currentUserColor: " + currentUserColor + "   gamePattern[userClickedPattern.length - 1]: " + gamePattern[userClickedPattern.length - 1] + "   userClickedPattern.length - 1 " + ((userClickedPattern.length) - 1));
//
// console.log("******WRONG*****");
//
// console.log("-------STARTOVER------");
