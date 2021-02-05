var randomWords = require('random-words');
var readlineSync = require('readline-sync');

function run_game() {
    let attempts = 6;
    let randomWord = randomWords();

    console.log("Save your girlfriend. Guess the correct word or a Dragon will slain your girlfriend");
    console.log("Good Luck! You have 6 incorrect attempts");

    
    const values = [];
    const keys = [];

    const guessed = {};


    for(let i=0; i<randomWord.length; i++) {
        keys.push(randomWord[i]);
        values.push("_");
    };

    function getResStr() {
        let str = "";
        keys.forEach((key, index)=> {
            str += values[index] +" ";
        });
        console.log(str+"\t\t"+"Remaining incorrect attemps: "+attempts);
    }

    getResStr();
    
    function updateVal(guess_char) {
        keys.forEach((key, index)=>{
            if(key == guess_char) {
                values[index] = guess_char;
            }
        });
    }

    function game_status(values) {
        for (const val of values) {
            if(val == "_") return false;
        }
        console.log("Victory shall be yours.");
        return true;
    }

    function isCorrect(guess) {
        if(randomWord.indexOf(guess) < 0) return false;
        return true;
    }

    function guess_char() {
        if(attempts == 0 || game_status(values)) {
            if(attempts == 0) {
                console.log("User's girlfriend was slained by Dragon");
                console.log("Correct word was :" + randomWord);
            }
            return;
        }
        let answer = readlineSync.question("User: ");
        if(guessed.hasOwnProperty(answer)) {
            console.log("You already guessed that!");
        }else {
            guessed[answer] = true;
            if (attempts != 0) {
                updateVal(answer);
                if (!isCorrect(answer)) {
                    attempts -= 1;
                }
                getResStr();
            }
        }
        return guess_char();
    }

    guess_char();
    
}
run_game();