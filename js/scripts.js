var roll = 0;
var roundPoints = 0;
//business logic// Manipulate Data, action, not interacting with DOM

function Die() {
  this.pip = 1;
};

Die.prototype.roll = function() {
  return this.pip = Math.floor((Math.random() * 6) + 1);
};

function Player(){
  this.score = 0;
};

function updateScore(player, points){
  player.score = points;
  // console.log(player.score);
  return player.score;
};

// function turn() {
//   if(roll === 1) {
//     roundPoints = 0;
//     return false;
//   } else {
//     roundPoints += roll;
//     return true;
//   }
// };

 // setInterval(function() { i++; if (i <= n) { displayCount(countedNumbers[i-1]); } }, 1000); }
//user interface//
$(document).ready(function(){
  die1 = new Die();
  player1 = new Player();
  player2 = new Player();
  score = 0;

  $("#player1-roll").click(function(){
    roll = die1.roll();
    if(roll === 1) {
      roundPoints = 0;
      console.log("Trying to Disable");
      $("#player2-roll").prop("disabled", false);
      $("#player1-roll").prop("disabled", true);
    } else {
      roundPoints += roll;
    }
    console.log(roll);
    $("#player1").text(updateScore(player1, roundPoints));
  });

  $("#player2-roll").click(function(){
    roll = die1.roll();
    console.log(roll);
    $("#player2").text(updateScore(player2, score));
  });

});
