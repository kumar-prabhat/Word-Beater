window.addEventListener('load',init);

//Available levels
const levels = {easy: 10,
medium: 5,
hard: 3 };
 
//To change level
var currentLevel = levels.easy;


let score = 0;
let isPlaying; 
let time;
let interval;
const wordInput = document.querySelector('#word-input');
const currentWord = document.querySelector('#current-word');
const scoreDisplay = document.querySelector('#score');
const timeDisplay = document.querySelector('#time');
const message = document.querySelector('#message');
const seconds = document.querySelector('#seconds');
const select = document.querySelector('#select');

const words = ['Recommended','frequent','element','solution','traverse','hashing','Afghanistan',
'American','Bulgaria','Colombia','Ecuador','Guadeloupe','Mcdonald','monitor','program',
'application','javascript','network','querySelector','Instructions','handkerchief',
'accommodate','conscience','playwright','rhythm','something','aggressively','shrewdness',
'impervious','describe','possessions','importance','liveliness','disposed','chronologically',
'accompanied','disease','opposite','individual','preference'];

function init(){
    select.addEventListener('change',selectLevel)
    changeLevel();
    //start matching on word input
    wordInput.addEventListener('input',startMatch)


}
function changeLevel(){
    seconds.innerHTML = currentLevel;
    //Load word from array
    showWord(words);
    time = currentLevel;
        //call countdown every second
     
        clearInterval(interval);

       interval =  setInterval(countDown,1000);

        //Check game status
         setInterval(checkStatus,50);

}
//select level
function selectLevel(e){
   if(e.target.selectedIndex == 0)
   {
      currentLevel = levels.easy;
   }else if(e.target.selectedIndex == 1){
     currentLevel = levels.medium;
   }
   else{
    currentLevel = levels.hard;
   }
   changeLevel();

}
//start match
function startMatch(){
    if(matchWords()){
        isPlaying = true;
        time = currentLevel + 1;
        showWord(words);
        wordInput.value = '';
        score++;
    }
    if(score === -1){
        scoreDisplay.innerHTML = 0;
    }else{
        scoreDisplay.innerHTML = score;

    }
} 
//Match currentWord to wordInput
function matchWords(){
    if(wordInput.value === currentWord.innerHTML){
        message.innerHTML = 'Correct !!!';
        return true;
    }
    else{
        message.innerHTML = '';
        return false;
    }
} 

//Pick and show random words
function showWord(){
    //Generate random index
    const randIndex = Math.floor(Math.random() * words.length)
    //Output the random word
    currentWord.innerHTML = words[randIndex];
}

//Countdown timer
function countDown( ){
    if(time > 0){
        time--;
    }else if(time == 0){
        isPlaying = false;
    }
    timeDisplay.innerHTML = time;
}

//check game status
function checkStatus(){
    if(!isPlaying && time == 0){
        message.innerHTML = 'Game Over !!!';
        score = -1;
    }
}