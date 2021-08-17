// Get DOM Elements
const container = document.getElementById('container');
const previousBtn = document.getElementById('previous');
const playBtn = document.getElementById('play');
const nextBtn = document.getElementById('next');
const audio = document.getElementById('audio');
const progress = document.getElementById('progress');
const title = document.getElementById('song-title');
const albumArt = document.getElementById('album-art');

// Songs Array
const tracks = ['monolink return to OZ', 'Jay Aliyev Move On'];

// Index of currently playing songs
let trackIndex = 1;

// Load the initial track
loadTrack(tracks[trackIndex]);

// Function to load the selected track
function loadTrack(track) {
    // Update the text for the title of track
    title.innerText = track;
    // Update the src in the audio element with the audio file of the selected track
    audio.src = `Music/${track}.mp3`;
    // Update the src in the image element with the image file of the selected track
    albumArt.src = `images/${track}.jpg`;
};

// Function to play the track
function playTrack() {
    // Add the second class 'play' to the container
    container.classList.add('play');
    // Romove the play icon and display the pause icon instead
    playBtn.innerHTML = '<i class="fas fa-pause"></i>';
    // Play the track using the audio element
    audio.play();
};

// Function to pause the track
function pauseTrack() {
    // Remove the second class 'play' from the container
    container.classList.remove('play');
    // Romove the pause icon and display the play icon instead
    playBtn.innerHTML = '<i class="fas fa-play"></i>';
    // Pause the track using the audio element
    audio.pause();
};

// Fucntion to switch to previous track
function prevTrack() {
    // Decrement the value of trackIndex by 1 to select the previous track from the trackArray
    trackIndex--;
    // Check if selected track index is greater than the index of last
    if ( trackIndex < 0 ) {
        // Reassign the trackIndex to last track in the trackArray
        trackIndex = tracks.length - 1;
    };
    // console.log(trackIndex);
    // Load the selected track
    loadTrack(tracks[trackIndex]);
    // Play the selected track
    playTrack();
};

// Fucntion to switch to next track
function nextTrack() {
    // Increment the value of trackIndex by 1 to select the next track from the trackArray
    trackIndex++;
    // Check if selected track index is greater than the index of last track
    if ( trackIndex > tracks.length - 1 ) {
        // Reassign the trackIndex to last track in the trackArray
        trackIndex = 0;
    };
    // console.log(trackIndex);
    // Load the selected track
    loadTrack(tracks[trackIndex]);
    // Play the selected track
    playTrack();
};

// Event Listeners
// 1. Listen for click on the play button
playBtn.addEventListener('click', () => {
    // Check if track is playing
    const isPlaying = container.classList.contains('play');
    // Conditional statement based on status of audio playback
    if (isPlaying) {
        // If the track is playing, pause the track
        pauseTrack();
    } else {
        // If the track is not playing, play the track
        playTrack(); 
    }
});

// 2. Listen for click on the previousBtn
previousBtn.addEventListener('click', prevTrack);

// 3. Listen for click on the nextBtn
nextBtn.addEventListener('click', nextTrack);