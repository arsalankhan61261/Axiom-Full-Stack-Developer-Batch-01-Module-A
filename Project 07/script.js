// Get DOM Elements
const word = document.getElementById('word');
const incorrectLetters = document.getElementById('incorrect-letters');
const popup = document.getElementById('popup-container');
const finalMessage = document.getElementById('final-message');
const playBtn = document.getElementById('play-btn');
const notification = document.getElementById('notification-container');

// Get DOM Elements for Hangman
const figureParts = document.querySelectorAll('.figure-part');

// This is the pool of words which will be used to select a random word
const words = ["modern","labor","shout","pan","food","rhythm","nuts","pool","scientist","cover","bit","jar","habit","escape","birth","ocean","construction","silence","main","stop","hospital","pack","verb","personal","longer","difference","wait","newspaper","aloud","whistle","hide","certainly","spin","shape","paper","wide","rush","stop","swept","bicycle","therefore","personal"];

// Select a word at random from words array
let selectedWord = words[Math.floor(Math.random() * words.length)]
console.log(selectedWord);

// console.log(Math.random());
// console.log(words.length);
// console.log(Math.random() * words.length);
// console.log(Math.floor(Math.random() * words.length));

// Tracking arrays for correct and incorrect guesses
const correctLettersArray = [];
const incorrectLettersArray = [];

// Function to display the selected word in the DOM
function displayWord() {
    // Display the selected word
    word.innerHTML = `
        ${selectedWord
            .split('')
            .map(letter => `
                <span class="letter">
                    ${correctLettersArray.includes(letter) ? letter : ''}
                </span>
                `
            )
            .join('')
        }
    `;

    console.log(word.innerText);
};

// Execute display word on page load
displayWord();