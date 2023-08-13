const hangmanImage = document.querySelector(".hangman-box img");
const wordDisplay = document.querySelector(".word-display");
const guessesText = document.querySelector(".guesses-text b");
const KeyboardDiv = document.querySelector(".keyboard");
const gameModal = document.querySelector(".game-modal");
const playAgainBtn = document.querySelector(".play-again");

let currentWord, correctLetters , wrongGuessCount ;
const maxGuesses = 6;
const resetGame = () => {
    // resetting all game variables and UI elements
    correctLetters =[];
    wrongGuessCount = 0;
    hangmanImage.src = `images/hangman ${wrongGuessCount}.png`;
    guessesText.innerText = `${ wrongGuessCount} / ${maxGuesses}`;
    KeyboardDiv.querySelectorAll("button").forEach(btn => btn.disabled = false);
    wordDisplay.innerHTML = currentWord.split("").map(() => `<li class="letter"></li>`).join("");
    gameModal.classList.remove("show");
}
const getRandomWord = () => {
    //selecting a random word and hint from the worfList
    const { word, hint } = wordList[Math.floor(Math.random() * wordList.length)];
    currentWord = word;
    document.querySelector(".hint-text b").innerText = hint;
    resetGame();
}
const gameOver = (isVictory) => {
    // after 600ms of game complete..showing modal with relavent details
    setTimeout(() => {
        const modalText = isVictory ? `you found the word:` : `The correct word was:`;
        gameModal.querySelector("img").src = `images/${isVictory ? 'victory' : 'lost'}.png`;
        gameModal.querySelector("h4").innerText = `${isVictory ? 'Congrats!' : 'Game Over!'}`;
        gameModal.querySelector("p").innerHTML = `${modalText} <b>${currentWord}</b>`;
        gameModal.classList.add("show");
    }, 300);
}
const initGame = (button, clickedLetter) => {
    //checking if clickedLetter is exist on the currentWord
    if(currentWord.includes(clickedLetter)) {
        //showing all correct letters on teh word display
        [...currentWord].forEach((letter, index) => {
            if(letter === clickedLetter) {
                correctLetters.push(letter);
                wordDisplay.querySelectorAll("li")[index].innerText = letter;
                wordDisplay.querySelectorAll("li")[index].classList.add("guessed");
            }
        });
        
    } else{
        // if clicked letter doesn't exist then update the wronGuessCount and hangman image
        wrongGuessCount++;
        hangmanImage.src = `images/hangman ${wrongGuessCount}.png`;
    }
    button.disabled = true;
    guessesText.innerText = `${ wrongGuessCount} / ${maxGuesses}`;
    // calling gameover function if any of these conditions meets
    if(wrongGuessCount === maxGuesses) return gameOver(false);
    if(correctLetters.length === currentWord.length) return gameOver(true);
}
//creating keyboard buttons and adding event listeners
for (let i= 97; i<= 122; i++){
    const button = document.createElement("button");
    button.innerText = String.fromCharCode(i);
    KeyboardDiv.appendChild(button);
    button.addEventListener("click",e => initGame(e.target,String.fromCharCode(i)));
}
getRandomWord();
playAgainBtn.addEventListener("click", getRandomWord);