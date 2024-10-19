const checkBtn = document.querySelector('.check');
let randomNumber = Math.trunc(Math.random()*20)+1;
const message = document.querySelector('.message');
const correctNumber = document.querySelector('.number');
const displayedScore = document.querySelector('.score');
const bodyElement = document.querySelector('body');
console.log(randomNumber)
const highScore = document.querySelector('.highscore');

const again = document.querySelector('.again');

let score = 20;
let highScores = 0;



function checkTheNumber(){
    const guessNumber = +document.querySelector('.guess').value;
  
   
    
   
  


    if(!guessNumber){
        message.textContent = 'Select number!'
    }else if(guessNumber === randomNumber){
        message.textContent = 'Correct number!'
        correctNumber.textContent = randomNumber;
        correctNumber.style.backgroundColor = 'gold';
        bodyElement.style.backgroundColor = 'limeGreen';
        if(score > highScores){
            highScores = score;
            highScore.textContent = highScores;
        }
    }else if(guessNumber > randomNumber){
        if(score > 1){
        message.textContent = 'Your number is too high'
        score--;
        displayedScore.textContent = score;
    }else {
        message.textContent = 'You loose'
        bodyElement.style.backgroundColor = 'red';
        displayedScore.textContent = 0;
    }

    
    }else if(guessNumber < randomNumber){
        if(score > 1){
            message.textContent = 'Your number is too low'
            score--;
            displayedScore.textContent = score;
        }else {
            message.textContent = 'You loose'
            bodyElement.style.backgroundColor = 'red';
            displayedScore.textContent = 0;
        }
        

    } 
    

    }

function resetGame(){
 

     score = 20;
     displayedScore.textContent = score;
    randomNumber = Math.trunc(Math.random()*20)+1;
    bodyElement.style.backgroundColor = '#222';
    message.textContent ='Start guessing...';
    document.querySelector('.guess').value = '';
    correctNumber.style.backgroundColor = 'white';
    correctNumber.textContent = '?';



    
    

}


checkBtn.addEventListener('click',checkTheNumber);
again.addEventListener('click', resetGame);



