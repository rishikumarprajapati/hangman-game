var randomWords = require('random-words');
var readlineSync = require('readline-sync');

function run_game() {
    let attempts = 6;
    let randomWord = randomWords();

    console.log("Save your girlfriend. Guess the correct word or a Dragon will slain your girlfriend");
    console.log("Good Luck! You have 6 incorrect attempts");
    
    console.log(`
                          ^\    ^                  
                      / \\  / \                 
                     /.  \\/   \      |\___/|   
  *----*           / / |  \\    \  __/  O  O\   
  |   /          /  /  |   \\    \_\/  \     \     
 / /\/         /   /   |    \\   _\/    '@___@      
/  /         /    /    |     \\ _\/       |U
|  |       /     /     |      \\\/        |
\  |     /_     /      |       \\  )   \ _|_
\   \       ~-./_ _    |    .- ; (  \_ _ _,\'
~    ~.           .-~-.|.-*      _        {-,
 \      ~-. _ .-~                 \      /\'
  \                   }            {   .*
   ~.                 '-/        /.-~----.
     ~- _             /        >..----.\\\
         ~ - - - - ^}_ _ _ _ _ _ _.-\\\
    `);

    console.log();
    console.log();
    const values = [];
    const keys = [];

    const guessed = {}; //already guessed characters


    for(let i=0; i<randomWord.length; i++) {
        keys.push(randomWord[i]);
        values.push("_");
    };

    //print function
    function getResStr() {
        let str = "";
        keys.forEach((key, index)=> {
            str += values[index] +" ";
        });
        console.log(str+"\t\t"+"Remaining incorrect attemps: "+attempts);
    }

    getResStr(); //initial print
    
    //update value array based on correct guess
    function updateVal(guess_char) {
        keys.forEach((key, index)=>{
            if(key == guess_char) {
                values[index] = guess_char;
            }
        });
    }

    //current game status
    function game_status(values) {
        for (const val of values) {
            if(val == "_") return false;
        }
        console.log();
        console.log();
        console.log("Victory shall be yours.");
        console.log();
        console.log();
        return true;
    }

    //check if guessed word is correct or not
    function isCorrect(guess) {
        if(randomWord.indexOf(guess) < 0) return false;
        return true;
    }


    //word guess function
    function guess_char() {
        if(attempts == 0 || game_status(values)) {
            if(attempts == 0) {
                console.log("User's girlfriend was slained by Dragon");
                console.log();
                console.log();
                console.log("Correct word was :" + randomWord);
                console.log();
                console.log();
            }
            return;
        }
        let answer = readlineSync.question("User: ");
        if(guessed.hasOwnProperty(answer)) {
            console.log();
            console.log();
            console.log("You already guessed that!");
            console.log();
            console.log();
        }else {
            guessed[answer] = true;
            if (attempts != 0) {
                updateVal(answer);
                if (!isCorrect(answer)) { //if incorrect guess
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

let response = readlineSync.question("Do you want to play again? Y/N: ");
while(response != "N") {
    run_game();
    response = readlineSync.question("Do you want to play again? Y/N: ");
}