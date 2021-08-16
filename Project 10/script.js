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
const tracks = ['Monolink return to OZ', 'Jay Aliyev Move On'];

// Index of currently playing songs
let trackIndex = 1;

// Load the initial track
loadTrack(tracks[trackIndex]);