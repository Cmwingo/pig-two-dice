var roll = 0;
var roundPoints = 0; //initialize//
//business logic// Manipulate Data, action, not interacting with DOM

function Die() {
  this.pip = 1;
};

Die.prototype.roll = function() {
  return this.pip = Math.floor((Math.random() * 6) + 1);
};

function Player(){ //constructor of PLAYER OBJECT
  this.score = 0;
};

function updateScore(player, points){
  player.score += points;
  roundPoints = 0;
  return player.score;
};

//user interface//
$(document).ready(function(){
  die1 = new Die();
  player1 = new Player(); //constructor call
  player2 = new Player();
  score = 0;

  $("#player1-roll").click(function(){
    $("#current-roll").text("");
    roll = die1.roll();
    $("#round-total").text(roundPoints);
    $("#current-roll").append("<img src=img/" + roll.toString() + ".png>");
    if(roll === 1) {
      roundPoints = 0;
      $("#round-total").text(roundPoints);
      $("#player2-roll").prop("disabled", false);
      $("#player1-roll").prop("disabled", true);
      $("#player2-stop").prop("disabled", false);
      $("#player1-stop").prop("disabled", true);
    } else {
      roundPoints += roll;
    }
    console.log(roll);
    $("#round-total").text(roundPoints);
  });

  $("#player1-stop").click(function(){
    $("#player2-roll").prop("disabled", false);
    $("#player1-roll").prop("disabled", true);
    $("#player2-stop").prop("disabled", false);
    $("#player1-stop").prop("disabled", true);
    $("#round-total").text(roundPoints);
    $("#player1").text(updateScore(player1, roundPoints));
    roundPoints = 0; //reset or value for new player//
    if(player1.score >= 10){
      $("#player2-roll").prop("disabled", true);
      $("#player2-stop").prop("disabled", true);
      $("#winner").text('Player 1 Wins!');
      $("#win").toggle();
    }
  });


  $("#player2-roll").click(function(){
    $("#current-roll").text("");
    roll = die1.roll();
    $("#round-total").text(roundPoints);
    $("#current-roll").append('<img src="img/' + roll.toString() + '.png">');
    if(roll === 1) {
      $("#round-total").text(roundPoints);
      roundPoints = 0;
      $("#player1-roll").prop("disabled", false);
      $("#player2-roll").prop("disabled", true);
      $("#player1-stop").prop("disabled", false);
      $("#player2-stop").prop("disabled", true);
    } else {
      roundPoints += roll;
    }
    console.log(roll);
    $("#round-total").text(roundPoints);
  });

  $("#player2-stop").click(function(){
    $("#player1-roll").prop("disabled", false);
    $("#player2-roll").prop("disabled", true);
    $("#player1-stop").prop("disabled", false);
    $("#player2-stop").prop("disabled", true);
    $("#round-total").text(roundPoints);
    $("#player2").text(updateScore(player2, roundPoints));
    roundpoints = 0;
    if(player2.score >= 10){
      $("#player1-roll").prop("disabled", true);
      $("#player1-stop").prop("disabled", true);
      $("#winner").text('Player 2 Wins!');
      $("#win").toggle();
    }
  });

  $("#play-again").click(function(){
    alert("clicked");
    player1.score = 0;
    player2.score = 0;
    console.log(player1.score);
    console.log(player2.score);
    $("#player1").text("0");
    $("#player2").text("0");
    $("#player1-roll").prop("disabled", false);      $("#player1-stop").prop("disabled", false);
    roll = 0;
    roundPoints = 0;
    $("#round-total").text(roundPoints);
    $("#win").hide();
  });
});
