function Die() {
  this.pip = 1;
}

Die.prototype.roll = function() {
  this.pip = Math.floor((Math.random() * 6) + 1);
}

$(document).ready(function(){
  die1 = new Die();
  die1.roll();
  console.log(die1.pip);
  $("#player1-roll").click(function(){
    die1.roll();
    $("#player1").text(die1.pip);
  });

  $("#player2-roll").click(function(){
    die1.roll();
    $("#player2").text(die1.pip);
  });

});
