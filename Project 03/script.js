// Get DOM elements for JS Code
const video = document.getElementById('video');
const play = document.getElementById('play');
const stop = document.getElementById('stop');
const progress = document.getElementById('progress');
const timestamp = document.getElementById('timestamp');

// Create function for clicking on video
function toggleVideoStatus() {
    return true;
} 

// Create function for updating the play / pause icon
function updatePlayIcon() {
    return true;
}
// Create fumction to update the progress
function updateProgress() {
    return true;
}
// Create function to stop the video
function stopVideo() {
    return true;
}
// Create function to update the video progress using the slider
function setVideoProgress() {
    return true;
}
// Event Listeners
// 1. Event listener for clicking on the video
video.addEventListener('click', toggleVideoStatus);
video.addEventListener('pause', updatePlayIcon);
video.addEventListener('play', updatePlayIcon);
video.addEventListener('timeupdate', updateProgress);

// 2. Event listener for play button
play.addEventListener('click', toggleVideoStatus);

// 3. Event listener for stop button
stop.addEventListener('click', stopVideo);

// 4. Event listener for progress bar
progress.addEventListener('change', setVideoProgress);
