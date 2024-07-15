const btnSubmit = document.querySelector("#submit");
const inputField = document.querySelector("#inputField");
const btnNewGame = document.querySelector(".btn");
let answer = answerRandom();
const newMessage = document.querySelector(".message");
const boxText = document.querySelector("#textFace");


btnSubmit.addEventListener("click", play);
btnNewGame.addEventListener("click", resetGame);

// phrase
let phrase = "Challenge the computer and find out who wins!";
i = 0;
let speed = 40;
function text() {
    if (i < phrase.length) {
        document.querySelector("#textFace").textContent += phrase.charAt(i);
        i++
        setTimeout(text, speed);
    }
}
text();

inputField.addEventListener("keyup", function(e) {
    if (e.keyCode === 13) {
        play();
    }
})  

function play() {
    const userGuess = document.querySelector("#inputField").value;
    if (userGuess == answer) {
        winState();     
    }
    else if (userGuess < 1 || userGuess > 100) {
        newMessage.textContent = "Oops! Please insert number between 1 and 100";
        boxText.textContent = "ERROR!";
    }
    else if (isNaN(userGuess)) {
        newMessage.textContent = "You suppose to insert numbers!";
        boxText.textContent = "ERROR!";
    }

    else if (userGuess !== answer) {
        guessMessages();
        boxText.textContent = "-_-"
        if (document.querySelectorAll(`.hidden`).length < 5) {
            for (
                let i = 5;
                i <= 5;
                i--
            ){
            let activeStar = document.getElementById(`star-${i}`);
                if (!activeStar.classList.contains(`hidden`)) {
                    activeStar.classList.add(`hidden`);
                    break;
                }
            }
        }
        else {
          loseState();
        }
    }   
}
function answerRandom() {
    const randomNumber = Math.floor(Math.random() * 100) + 1;
    return randomNumber;
}
// if person loses
function loseState() {
    newMessage.textContent = "You lost!";
    boxText.classList.add("gameOver");
    boxText.textContent = "GAME OVER";
    setTimeout(resetGame, 5000);
}
// if person wins
function winState() {
    newMessage.classList.add("smallerSize");
    newMessage.textContent = "Congratulations on your victory! I solute your strength and honour your courage. Keep fighting and always be guided by the light of wisdom!";
    boxText.classList.add("gameOver");
    boxText.textContent = "🏆";
    setTimeout(resetGame, 10000);
}
// button reset game  
function resetGame() {
    answer = answerRandom();
    const input = document.querySelector("#inputField");
    const textFace = document.querySelector("#textFace");   
    input.value = "";
    textFace.textContent = "New game!";
    newMessage.textContent = "";
    for (
        let i = 1;
        i <=5;
        i++
    ){
        let activeStar = document.getElementById(`star-${i}`);
        if (activeStar.classList.contains("hidden")) {
            activeStar.classList.toggle("hidden");
        }
    }
}  
// messages
function guessMessages() {
    const userGuess = document.querySelector("#inputField").value;
    let differenceNumbers = Math.abs(answer - userGuess);
    if (userGuess > answer){
        if (differenceNumbers >= 20) {
            newMessage.textContent = "That was too HIGH! You are faaaaar away...";
            }
        else if (differenceNumbers <=10 && differenceNumbers > 5) {
            newMessage.textContent = "That was HIGH but pretty close!";
        }
        else if (differenceNumbers <= 5) {
            newMessage.textContent = "That was HIGH... but you're somewhere close!✨";
        }
        else {                    
            newMessage.textContent = "That was too HIGH!";
        }
        }
    else if (userGuess < answer) {
        if (differenceNumbers >= 20) {
            newMessage.textContent = "That was too LOW! You are faaaaar away...";
        }
        else if (differenceNumbers <=10 && differenceNumbers > 5) {             
           newMessage.textContent = "That was LOW but pretty close!";              
        }
        else if (differenceNumbers <= 5) {
            newMessage.textContent = "That was LOW... but you're somewhere close!✨";
        }
        else {
            newMessage.textContent = "That was too LOW!";         
        }    
    }
}
