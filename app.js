/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND scoreconsole.log(dice)
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLOBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

var scores, roundScore, activePlayer, gamePlaying;

init();

document.querySelector(".btn-roll").addEventListener("click", function () {
  if (gamePlaying) {
    // 1. Generate random number
    var dice = Math.floor(Math.random() * 6 + 1);

    // 2. Display result
    var diceDOM = document.querySelector(".dice");
    diceDOM.style.display = "block";
    diceDOM.src = `dice-${dice}.png`;

    // 3. Update round score IF the rolled number is not 1
    if (dice !== 1) {
      // add score
      roundScore += dice;
      document.querySelector("#current-" + activePlayer).innerHTML = roundScore;
    } else {
      // Next Player
      nextPlayer();
    }
  }
});

document.querySelector(".btn-hold").addEventListener("click", function () {
  if (gamePlaying) {
    // Add current score to global score
    scores[activePlayer] += roundScore;

    // Update the ui
    document.querySelector("#score-" + activePlayer).innerHTML =
      scores[activePlayer];
    // Check if player won the game
    if (scores[activePlayer] >= 20) {
      // hide the dice
      document.querySelector(".dice").style.display = "none";
      // remove active red dot from current player
      document
        .querySelector(".player-" + activePlayer + "-panel")
        .classList.remove("active");
      // highlight active player as winner
      document
        .querySelector(".player-" + activePlayer + "-panel")
        .classList.add("winner");
      // replace active player name to 'WINNER!'
      document.querySelector("#name-" + activePlayer).innerHTML = "WINNER!";
      // set gamePlaying to fasle when the game has ended
      gamePlaying = false;
    } else {
      // Next Player
      nextPlayer();
    }
  }
});

// Next Player
function nextPlayer() {
  // toggle between players
  activePlayer === 0 ? (activePlayer = 1) : (activePlayer = 0);
  roundScore = 0;

  // reset current score to 0
  document.querySelector("#current-0").innerHTML = "0";
  document.querySelector("#current-1").innerHTML = "0";

  // highlight active player
  document.querySelector(".player-0-panel").classList.toggle("active");
  document.querySelector(".player-1-panel").classList.toggle("active");

  document.querySelector(".dice").style.display = "none";
}

// New game button
document.querySelector(".btn-new").addEventListener("click", init);

function init() {
  scores = [0, 0]; // default score is zero
  roundScore = 0; // score of the current round
  activePlayer = 0; // player 0 and player 1
  gamePlaying = true; // enable gamePlaying by default

  // hide the dice by default
  document.querySelector(".dice").style.display = "none";

  // reset all scores to 0 by default
  document.querySelector("#score-0").innerHTML = "0";
  document.querySelector("#score-1").innerHTML = "0";
  document.querySelector("#current-0").innerHTML = "0";
  document.querySelector("#current-1").innerHTML = "0";

  // reset WINNER! to name of the player
  document.querySelector("#name-0").innerHTML = "Player 1";
  document.querySelector("#name-1").innerHTML = "Player 2";

  // remove winner class
  document.querySelector(".player-0-panel").classList.remove("winner");
  document.querySelector(".player-1-panel").classList.remove("winner");

  // reset active class
  document.querySelector(".player-0-panel").classList.remove("active");
  document.querySelector(".player-1-panel").classList.remove("active");

  // add active class to Player 1
  document.querySelector(".player-0-panel").classList.add("active");
}
