let score = JSON.parse(localStorage.getItem('score')) || {
wins: 0,
losses: 0,
ties: 0
};
// to access and display the score in web page
updateScoreElement();
let isAutoPlaying = false;
let intervalId; //undefined
function autoplay(){
if(!isAutoPlaying){
    intervalId = setInterval(() => {
        const playerMove = pickComputerMove();
        playGame(playerMove, score);
    }, 1000);
    isAutoPlaying = true;
} else {
    // to stop auto-playing
    clearInterval(intervalId);
    isAutoPlaying = false;
        
}
}
// to play the game w/o onclick attribute
document.querySelector('.js-rock-button')
.addEventListener('click', () => playGame('Rock', score));
document.querySelector('.js-paper-button')
.addEventListener('click', () => playGame('Paper', score));
document.querySelector('.js-scissor-button')
    .addEventListener('click', () => playGame('Scissor', score));
    document.querySelector('.js-reset-score-button')
    .addEventListener('click', () => {
    score.wins = 0;
    score.losses = 0;
    score.ties = 0;
    localStorage.removeItem('score');
    updateScoreElement();
    });
document.querySelector('.js-auto-play-button')
.addEventListener('click', () => autoplay());

// to play the game with key down
document.body.addEventListener('keydown', (event) => {
    if(event.key === 'r') playGame('Rock', score);
    else if(event.key === 'p') playGame('Paper', score);
    else if(event.key === 's') playGame('Scissor', score);
});

function playGame(playerMove, score) {
    const computerMove = pickComputerMove();
    let result = '';
    if(playerMove === 'Rock'){
        if(computerMove === 'Rock') {
            result = 'Match Ties';
        }
        else if(computerMove === 'Paper') {
            result = 'You lose';
        }
        else{
            result = 'You win';
        }
    }
    if(playerMove === 'Paper') {
        if(computerMove === 'Paper') {
            result = 'Match Ties';
        }
        else if(computerMove === 'Scissor') {
            result = 'You lose';
        }
        else{
            result = 'You win';
        }
    }
    if(playerMove === 'Scissor') {
        if(computerMove === 'Scissor') {
            result = 'Match Ties';
        }
        else if(computerMove === 'Rock') {
            result = 'You lose';
        }
        else{
            result = 'You win';
        }
    }

    if(result === 'You win') {
        score.wins++;
    }
    else if(result === 'You lose') {
        score.losses++;
    }
    else {
        score.ties++;
    }
        
    document.querySelector('.js-result')
    .innerHTML = `${result}`
    document.querySelector('.js-moves')
    .innerHTML = 
    `<p class="js-moves moves">
        you
        <img src="images/${playerMove}-emoji.png" class="emoji-icon" alt="">
        <img src="images/${computerMove}-emoji.png" class="emoji-icon" alt="">
        computer
    </p>`
    updateScoreElement();
}
function updateScoreElement() {
    document.querySelector('.js-score')
    .innerHTML = `Wins: ${score.wins}, Losses: ${score.losses}, Ties: ${score.ties}`;
    localStorage.setItem('score', JSON.stringify(score));
}

function pickComputerMove() {
    const randomNumber = Math.random();
    let computerMove = '';

    if(randomNumber >= 0 && randomNumber < 1/3) {
        computerMove = 'Rock';
    } 
    else if(randomNumber >= 1/3 && randomNumber < 2/3) {
        computerMove = 'Paper';
    }
    else if(randomNumber >= 2/3 && randomNumber < 1) {
        computerMove = 'Scissor';
    }
    return computerMove;
}
