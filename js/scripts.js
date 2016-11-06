var roll = 0;
var roundPoints = 0;
var playTo = 100;
var opponent = "";
 //initialize//
//business logic// Manipulate Data, action, not interacting with DOM

function Die() {
  this.pip = 1;
};

Die.prototype.roll = function() {
  return this.pip = Math.floor((Math.random() * 6) + 1);
};

function Player() { //constructor of PLAYER OBJECT
  this.score = 0;
};

function updateScore(player, points) {
  player.score += points;
  roundPoints = 0;
  return player.score;
};

function Ai() {
  this.playState = "play";
  this.scores = [];
};

Ai.prototype.strat = function() {
  alert("Strategy");
  if(die1.pip === die2.pip) {
    this.playState = "play";
  } else if(player2.score + roundPoints >= playTo) {
    alert("Stopping");
    this.playState = "stop";
  } else if(player2.score - player1.score > 20 && roundPoints > 4) {
    alert("Stopping");
    this.playState = "stop";
  } else if(player2.score - player1.score <= 20 && roundPoints > 9) {
    alert("Stopping");
    this.playState = "stop";
  } else {
    this.playState = "play";
  }
};

Ai.prototype.play = function(i) {
  alert(this.playState);
  if(this.playState === "play") {
    $("#player2-roll").click();
    this.scores[i] = [die1.pip, die2.pip, roll];
    console.log("Round " + i + ": " + this.scores[i]);
    this.strat();
  }
};
  // setInterval(function() { while (this.playState != "stop") { $("#player2-roll").click(); } }, 2000);

//   while(x != 0){
//     roll = die1.roll() + die2.roll();
//     if(roll === 2){
//       roundPoints = 0;
//       Ai.score = 0;
//       $("#player2").text("0");
//       player2EndTurn();
//       x = 0;
//     } else if(die1.pip === 1 || die2.pip === 1) {
//       roundPoints = 0;
//       player2EndTurn();
//       x = 0;
//     } else if(die1.pip === die2.pip){
//       alert("Player 2 Bonus Roll!");
//       $("#player2-stop").prop("disabled", true);
//       roundPoints += roll;
//       Ai.play();
//     } else {
//       roundPoints += roll;
//       Ai.play();
//     }
//   }


//user interface//
$(document).ready(function(){
  die1 = new Die();
  die2 = new Die();
  player1 = new Player(); //constructor call
  player2 = new Player();
  aiOpponent = new Ai();

  function player1EndTurn() {
    var i = 0;
    $("#round-total").text(roundPoints);           //Sets the display for the round points back to zero
    $("#player2-roll").prop("disabled", false);    //And toggles the player controls and turn icon
    $("#player1-roll").prop("disabled", true);
    $("#player2-stop").prop("disabled", false);
    $("#player1-stop").prop("disabled", true);
    $("#player1-turn").hide();
    $("#player2-turn").show();
    console.log(opponent);
    if(opponent === "computer" && document.getElementById("player2-roll").getAttribute("disabled") === null && player1.score < playTo && player2.score < playTo) { //Checks for an AI Player
      alert("Calling the AI");
      console.log(aiOpponent.playState);
      console.log(document.getElementById("player2-stop").getAttribute("disabled"));
      if(aiOpponent.playState === "stop" && document.getElementById("player2-stop").getAttribute("disabled") === null) {
        i--;
        $("#player2-stop").click();
      } else {
          while (document.getElementById("player2-roll").getAttribute("disabled") === null) {
            if(aiOpponent.playState === "stop" && document.getElementById("player2-stop").getAttribute("disabled") === null) {
                alert("Taking points");
                $("#player2-stop").click();
              } aiOpponent.play(i++);}
      }
      $("#player1-roll").prop("disabled", true);
      $("#player1-stop").prop("disabled", true);
      setInterval(function() {
        i -= 2;
        for(n = 0; n <= i; n ++) {
          console.log("n=" + n);
          console.log("i=" + i);
          var displayRound = aiOpponent.scores.pop();
          console.log(displayRound);
          $("#current-roll").text("");
          $("#round-total").text(displayRound[2]);
          $("#current-roll").append('<img src="img/' + displayRound[0].toString() + '.png">' + '<img src="img/' + displayRound[1].toString() + '.png">');
        } }, 1500);
        $("#player1-roll").prop("disabled", false);
        $("#player1-stop").prop("disabled", false);
    }
  };

  function player2EndTurn() {
    alert("Player2 Stopping");
    aiOpponent.playState = "stop";
    $("#round-total").text(roundPoints);
    $("#player1-roll").prop("disabled", false);
    $("#player2-roll").prop("disabled", true);
    $("#player1-stop").prop("disabled", false);
    $("#player2-stop").prop("disabled", true);
    console.log(document.getElementById("player2-roll").getAttribute("disabled") === null);
    $("#player2-turn").hide();
    $("#player1-turn").show();
  }

  $("#human").click(function(){
    $("#load-screen").hide();
    $("#rules").show();
    $("#game").show();
    opponent = "human";
  });

  $("#computer").click(function(){
    $("#load-screen").hide();
    $("#rules").show();
    $("#game").show();
    opponent = "computer";
  });

  $("#player1-roll").click(function(){
    aiOpponent.playState = "play";
    $("#rules").hide();
    $("#player1-stop").prop("disabled", false);
    $("#current-roll").text("");
    roll = die1.roll() + die2.roll();
    console.log(roll);
    $("#round-total").text(roundPoints);
    $("#current-roll").append('<img src="img/' + die1.pip.toString() + '.png">' + '<img src="img/' + die2.pip.toString() + '.png">');
    if(roll === 2){
      roundPoints = 0;
      player1.score = 0;
      $("#player1").text("0");
      player1EndTurn();
    } else if(die1.pip === 1 || die2.pip === 1) {
      roundPoints = 0;
      player1EndTurn();
    } else if(die1.pip === die2.pip){
      alert("Player 1 Bonus Roll!");
      $("#player1-stop").prop("disabled", true);
      roundPoints += roll;
    } else {
      roundPoints += roll;
    }
    console.log(roll);
    $("#round-total").text(roundPoints);
  });

  $("#player1-stop").click(function(){
    $("#player1").text(updateScore(player1, roundPoints));
    roundPoints = 0; //reset or value for new player//
    if(player1.score >= playTo) {
      aiOpponent.playState = "stop";
      $("#player2-roll").prop("disabled", true);
      $("#player2-stop").prop("disabled", true);
      $("#winner").text('Player 1 Wins!');
      $("#win").toggle();
    }
    player1EndTurn();
  });


  $("#player2-roll").click(function(){
    alert("Player 2 Rolling");
    $("#player2-stop").prop("disabled", false);
    $("#current-roll").text("");
    roll = die1.roll() + die2.roll();
    console.log(roll);
    $("#round-total").text(roundPoints);
    console.log("Round Points: " + roundPoints);
    $("#current-roll").append('<img src="img/' + die1.pip.toString() + '.png">' + '<img src="img/' + die2.pip.toString() + '.png">');
    if(roll === 2){
      roundPoints = 0;
      player2.score = 0;
      $("#player2").text("0");
      player2EndTurn();
    } else if(die1.pip === 1 || die2.pip === 1) {
      roundPoints = 0;
      player2EndTurn();
    } else if(die1.pip === die2.pip){
      alert("Player 2 Bonus Roll!");
      $("#player2-stop").prop("disabled", true);
      roundPoints += roll;
    } else {
      roundPoints += roll;
    }
    console.log(roundPoints);
    if(opponent === "human"){
      $("#round-total").text(roundPoints);
    } else if(opponent === "computer") {
      setInterval(function(){$("#round-total").text(roundPoints);}, 1000);
    }
  });

  $("#player2-stop").click(function(){
    $("#player2").text(updateScore(player2, roundPoints));
    roundpoints = 0;
    if(player2.score >= playTo){
      $("#player1-roll").prop("disabled", true);
      $("#player1-stop").prop("disabled", true);
      $("#winner").text('Player 2 Wins!');
      $("#win").toggle();
    }
    player2EndTurn();
  });

  $("#play-again").click(function(){
    alert("THANKS FOR PLAYING!");
    player1.score = 0;
    player2.score = 0;
    console.log(player1.score);
    console.log(player2.score);
    $("#player1").text("0");
    $("#player2").text("0");
    $("#player1-roll").prop("disabled", false);
    $("#player1-stop").prop("disabled", false);
    $("#player2-turn").hide();
    $("#player1-turn").show();
    roll = 0;
    roundPoints = 0;
    $("#round-total").text(roundPoints);
    $("#win").hide();
    $("#game").hide();
    $("#load-screen").show();
  });
});
