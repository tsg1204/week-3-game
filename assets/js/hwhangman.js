var wordlist = ["Albani", "Andorra", "Austria", "Belarus", "Belgium", "Bosnia and Herzegovina", "Bulgaria", "Croatia", 
                "Czech Republic", "Denmark", "Estonia", "Faroe Islands", "Finland", "France", "Georgia", "Germany", 
                "Gibraltar", "Greece", "Guernsey", "Hungary", "Iceland", "Ireland", "Isle of Man", "Italy", "Jersey", 
                "Kosovo", "Latvia", "Liechtenstein", "Lithuania", "Luxembourg", "Macedonia", "Malta", "Moldova", "Monaco", 
                "Montenegro", "Netherlands", "Norway", "Poland", "Portugal", "Romania", "Russia", "San Marino", "Serbia", 
                "Slovakia", "Slovenia", "Spain", "Svalbard and Jan Mayen", "Sweden", "Switzerland", "Ukraine", "United Kingdom", 
                "Vatican City"];
var targetWord = '';
var guesses = [];
var maxLives = 6;
var wins = 0;


function newWord() {
    targetWord = wordlist[Math.floor(Math.random() * wordlist.length)];
}

function guessWord() {
    var gWord = '';

    for (var i = 0; i < targetWord.length; i++) {
        if (guesses.indexOf(targetWord[i].toLowerCase(), 0) == -1) {
            gWord += ' _ ';
        } else {
            gWord += targetWord[i];
        }
    }
    return gWord;
}

function drawWord() {   
    while (targetWord == '') {
        newWord();
    }

    var html = "<p>Current word: </p>" + guessWord();

    document.getElementById("target-word").innerHTML = html;
}

function drawGuesses() {
    guesses.sort();
    document.getElementById('previous-guesses').innerHTML = "Letters already guessed:" + guesses.join(', ');
}

function cleanGuess() {
    var uniqueGuesses = [];
    for (var i = 0; i < guesses.Length; i++) {
        if (guesses.length > 0 && quesses.inArray(guesses[i], uniqueGuesses) == -1) {
            uniqueGuesses.push(guesses[i]);
        }
    }
    guesses = uniqueGuesses;
}

function addGuess() {
    if (/^[a-zA-Z]*$/.test(document.getElementById('previous-guesses')) && 
        typeof document.getElementById('previous-guesses') !== "undefined") {
        guesses.push(document.getElementById('previous-guesses').toLowerCase());
    }

}

function reviewLives() {
    var livesRemaining = maxLives,
            string = targetWord.toLowerCase();

    for (var i = 0; i < guesses.length; i++) {
        if (string.indexOf(guesses[i], 0) == -1) {
            livesRemaining--;
        }
    }

    if (livesRemaining <= 0) {
        //image  to alife
        document.getElementById('lost-sound').play();
        resetGame();
        return;
    }
}

function checkIfWon() {
    if (guessWord() == targetWord) {
        document.getElementById('in-sound').play();
        wins++;
    }
}

function resetGame() {
    //image to alife;
    document.querySelector('#wins').innerHTML = "Wins: " + wins;
    targetWord = '';
    guesses = [];
    newWord();
}

function update() {
    addGuess();
    cleanGuess();
    drawWord();
    drawGuesses();
    reviewLives();
    checkIfWon();
    document.querySelector('#wins').innerHTML = "Wins: " + wins;
}

document.onkeyup = function(event) {
    drawWord();
    drawGuesses();
    update();
};
