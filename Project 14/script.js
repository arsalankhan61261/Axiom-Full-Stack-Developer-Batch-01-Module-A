// Get all DOM elements required
// HTML5 Main element for the grid
const main = document.getElementById('main');
// Select box for changing voices
const voiceSelect = document.getElementById('voices');
// Toggle button to display custom text input
const toggleBtn = document.getElementById('toggle');
// Button to close the custom text div
const closeBtn = document.getElementById('close');
// Text area for custom text input
const customText = document.getElementById('text');
// Button to read the custom text input
const readBtn = document.getElementById('read');
// Custom Text Div
const customTextDiv = document.getElementById('custom-text');

// Array for holding all images and text to be read
const data = [
    {
        image: './Images/angry.jpg',
        text: "I'm Angry"
    },
    {
        image: './Images/drink.jpg',
        text: "I'm Thirsty"
    },
    {
        image: './Images/food.jpg',
        text: "I'm Hungry"
    },
    {
        image: './Images/grandma.jpg',
        text: "I want to go to Grandma's"
    },
    {
        image: './Images/happy.jpg',
        text: "I'm Happy"
    },
    {
        image: './Images/home.jpg',
        text: "I Want to go Home"
    },
    {
        image: './Images/hurt.jpg',
        text: "I'm Hurt"
    },
    {
        image: './Images/outside.jpg',
        text: "I Want to go Outside"
    },
    {
        image: './Images/sad.jpg',
        text: "I'm Sad"
    },
    {
        image: './Images/scared.jpg',
        text: "I'm Scared"
    },
    {
        image: './Images/school.jpg',
        text: "I Want to go to School"
    },
    {
        image: './Images/tired.jpg',
        text: "I'm Tired"
    }
]

// Array for all Web Speech API Voices
 let voicesArray = [];

// Create a box for each object in the data array
data.forEach(createBox);

// Functions
// 1. Function to create speech boxes
function createBox(imageObj) {
    // Create empty div for the image to be added to the main grid later
    const box = document.createElement('div');
    // Get the image url and text from the data array
    const { image, text } = imageObj;
    // Apply a CSS class to the new div
    box.classList.add('box');
    // Add the image inside the box
    box.innerHTML = `
        <img src="${image}" alt="${text}" />
        <p class="imageInfo">${text}</p>
    `;
    // Add event for speaking text
    box.addEventListener('click', () => {
        setMessage(text);
        speakText();
    })
    // Add the new box to the DOM
    main.appendChild(box);
};

// Initialize speech synthesis
const message = new SpeechSynthesisUtterance();
// console.log(message);

// Function to fetch voices from Web Speech API
function renderVoices() {
	const voices = speech.getVoices(); // now should have an array of all voices
    // Get voices from speech synthesis get voices method
    voicesArray = voices;
    // Render voices in the dropdown
    voicesArray.forEach((voice) => {
        console.log(voicesArray);
        let option = document.createElement('option');
        option.textContent = `${voice.name} (${voice.lang}) `;
        if ( voice.default ) {
            option.textContent += '(DEFAULT VOICE)';
        }
        option.setAttribute('data-lang', voice.lang);
        option.setAttribute('data-name', voice.name);
        voiceSelect.appendChild(option);
    })
};

// 3. Set the text for speech synthesis
function setMessage(text) {
    message.text = text;
}

// 4. To speak the text
function speakText() {
    speechSynthesis.speak(message);
}

const speech = window.speechSynthesis;

// Function to fetch voices from Web Speech API
function fetchVoices() {
    if(speech.onvoiceschanged !== undefined) {
        speech.onvoiceschanged = () => renderVoices();
    }
};
  
// Execute populateVoiceList function
renderVoices();

// Event Listeners
// 1. Toggle Button
toggleBtn.addEventListener('click', () => {
    customTextDiv.classList.toggle('show');
})

// 2. Close Button in Custom Text Div
closeBtn.addEventListener('click', () => {
    customTextDiv.classList.remove('show');
})

// 3. Event Listener when changing voices
speechSynthesis.addEventListener('voiceschanged', renderVoices);
// voiceSelect.addEventListener('change', fetchVoices);

// 4. Event Listener for custom text reader
readBtn.addEventListener('click', () => {
    setMessage(customText.value);
    speakText();
})