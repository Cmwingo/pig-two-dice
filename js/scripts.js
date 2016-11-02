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
  console.log(points);
  player.score += points;
  console.log(player.score);
  return player.score;
};

$(document).ready(function(){
  die1 = new Die();
  player1 = new Player();
  player2 = new Player();
  points = 0;

  $("#player1-roll").click(function(){
    points = die1.roll();
    console.log(points);
    $("#player1").text(updateScore(player1, points));
  });

  $("#player2-roll").click(function(){
    points = die1.roll();
    console.log(points);
    $("#player2").text(updateScore(player2, points));
  });

});
