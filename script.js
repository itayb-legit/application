'use strict';
//
// Selecting elements
const player0 = document.querySelector('.player--0');
const player1 = document.querySelector('.player--1');

const bigScoreplayer0 = document.querySelector('#score--0');
const bigScoreplayer1 = document.getElementById('score--1');

const currentScorePlayer0 = document.getElementById('current--0');
const currentScorePlayer1 = document.getElementById('current--1');

const dice = document.querySelector('.dice');

const btn_New = document.querySelector('.btn--new');
const btn_Roll = document.querySelector('.btn--roll');
const btn_Hold = document.querySelector('.btn--hold');
const btn_Check = document.querySelector('.btn--check');

let scores, currentScore, activePlayer, activeGame , totalScores;

// Starting The Game - Reset all Values
  function startGame () {
    
    const randomNumber = Math.trunc(Math.random() * 11) + 1;

    dice.src = `/cards/${randomNumber}.jpg`


    totalScores = [0,0];
    currentScore = 0;
    activePlayer = 0;
    activeGame = true;
  
    bigScoreplayer0.textContent = 0;
    bigScoreplayer1.textContent = 0;

    currentScorePlayer0.textContent = 0;
    currentScorePlayer1.textContent = 0;
  
    dice.classList.add('hidden');

    player0.classList.remove('player--winner');
    player1.classList.remove('player--winner');

    player0.classList.remove('player--lost');
    player1.classList.remove('player--lost');
    

    player0.classList.add('player--active');
    player1.classList.remove('player--active');

    //console.log(`Starting New Game\nPlayer number = ${activePlayer}\nCurrent Score = ${currentScore}\nTotal Score = ${totalScores[activePlayer]}`);
  };

startGame(); // Stating the Game

function nextPlayer() {

    if(activePlayer == 1){
        activePlayer = 0;
        currentScore = 0;
    }
    else{
        activePlayer = 1;
        currentScore = 0;
    }
}

const x = btn_Roll.addEventListener('click', function (){ // Click on Roll 

    if(activeGame){
            dice.classList.remove('hidden');
            
            const randomNumber = Math.trunc(Math.random() * 11) + 1;

            dice.src = `/cards/${randomNumber}.jpg`
            currentScore += randomNumber;
            document.getElementById(`current--${activePlayer}`).textContent = currentScore;
            
            if(currentScore > 21 & currentScore !=21  ){
                activeGame = false;
                document.querySelector(`.player--${activePlayer}`).classList.add('player--lost');

            }
            else if (currentScore === 21){
                document.querySelector(`.player--${activePlayer}`).classList.add('player--winner');
                activeGame = false;
            }
            //console.log(`Player number = ${activePlayer}\nCurrent Score = ${currentScore}\nTotal Score = ${totalScores[activePlayer]}`);
    }   
});

// console.log(`Player ${activePlayer} Score=${totalScores[activePlayer]}`);

btn_Hold.addEventListener('click', function(){
    if(activeGame){     
        totalScores[activePlayer] = currentScore + totalScores[activePlayer];
        console.log(totalScores[activePlayer]);
        document.querySelector(`#score--${activePlayer}`).textContent = totalScores[activePlayer] ;

        if(totalScores[activePlayer] > "21"){
            document.querySelector(`.player--${activePlayer}`).classList.add('player--lost');
            activeGame = false;
        }
        else if (totalScores[activePlayer] == 21 ){

            if(activePlayer === 1){
                player1.classList.add('player--winner');

            }
            else{
                player0.classList.add('player--winner');

            }
        }
        nextPlayer();
    }
    // else{
    //     document.querySelector(`.player--${activePlayer}`).classList.add('player--lost');
    //     activeGame = false;
    // }
});

btn_Check.addEventListener('click', function(){

    if(activeGame){
        if(totalScores[0] > totalScores[1]){
            alert("Player 1 is the Winner 🥇");
            player0.classList.add('player--winner');
        }
        else{
            alert("Player 2 is the Winner 🥇");
            player1.classList.add('player--winner');
        }
        activeGame = false;
    }
});

btn_New.addEventListener('click', startGame);
