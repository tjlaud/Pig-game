/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/
// set global variables
var scores, roundScore, activePlayer, gamePlaying;

//initialise game
init();

// Click the roll button
document.querySelector(".btn-roll").addEventListener("click", function () {
  if (gamePlaying) {
    // Randon number.
    var dice = Math.floor(Math.random() * 6) + 1;

    // display result.
    var diceDOM = document.querySelector(".dice");
    diceDOM.style.display = "block";
    diceDOM.src = "dice-" + dice + ".png";

    // update the round score IF the rolled number was NOT a 1.
    if (dice !== 1) {
      // !== means different than
      //add score
      roundScore += dice; // this is the same as writing roundScore = roundScore + dice
      document.querySelector(
        "#current-" + activePlayer
      ).textContent = roundScore;
    } else {
      nextplayer();
    }
  }
});

// click the hold button
document.querySelector(".btn-hold").addEventListener("click", function () {
  if (gamePlaying) {
    //add current score to global score
    scores[activePlayer] += roundScore;

    //update UI
    document.querySelector("#score-" + activePlayer).textContent =
      scores[activePlayer];

    //check if player won the game + change player
    scores[activePlayer] >= 60 ? endGame() : nextplayer();
  }
});

//click the new button
document.querySelector(".btn-new").addEventListener("click", init); //Not using the () at the end if "init" prevents it from being called immediatley.

// functions
function nextplayer() {
  {
    //next player
    activePlayer === 0 ? (activePlayer = 1) : (activePlayer = 0);
    //reset round score to 0
    roundScore = 0;
    document.getElementById("current-0").textContent = "0";
    document.getElementById("current-1").textContent = "0";
    // change the visual que for the active player by changing the html class
    document.querySelector(".player-0-panel").classList.toggle("active");
    document.querySelector(".player-1-panel").classList.toggle("active");
    //document.querySelector('.dice').style.display = 'none'; // the lesson said to keep this in but i think its shite.
  }
}

function endGame() {
  // hide die
  document.querySelector(".dice").style.display = "none";
  // add winner property
  document.querySelector("#name-" + activePlayer).textContent = "Winner!";
  document
    .querySelector(".player-" + activePlayer + "-panel")
    .classList.add("winner");
  document
    .querySelector(".player-" + activePlayer + "-panel")
    .classList.remove("active");
  gamePlaying = false;
}

function init() {
  //activate game
  gamePlaying = true;
  //set scores to zero
  scores = [0, 0];
  roundScore = 0;
  document.getElementById("score-0").textContent = "0";
  document.getElementById("score-1").textContent = "0";
  document.getElementById("current-0").textContent = "0";
  document.getElementById("current-1").textContent = "0";
  //set active player to player 0
  activePlayer = 0;
  document.querySelector(".player-0-panel").classList.add("active");
  document.querySelector(".player-1-panel").classList.remove("active");
  //hide die
  document.querySelector(".dice").style.display = "none";
  // set player names
  document.querySelector("#name-0").textContent = "Player 1";
  document.querySelector("#name-1").textContent = "Player 2";
  // hide "Winner" status
  document.querySelector(".player-0-panel").classList.remove("winner");
  document.querySelector(".player-1-panel").classList.remove("winner");
}

//document.querySelector("#current-" + activePlayer).textContent = dice;
//document.querySelector("#current-" + activePlayer).innerHTML = "<em>" + dice + "</em>";

//document.querySelector(".player-0-panel").classList.remove("active");
//document.querySelector(".player-1-panel").classList.add("active");

//dice = Math.floor(Math.random() * 6) + 1;  //the "floor" function means that only whole numbers will be produced.

//var x = document.querySelector("#score-o").textContent;
//console.log(x);
