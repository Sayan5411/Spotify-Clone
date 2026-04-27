console.log("Welcome to Spotify");

let songIndex = 0;
let audioElement = new Audio();

const masterPlay = document.getElementById('masterPlay');
const myProgressBar = document.getElementById('myProgressBar');
const gif = document.getElementById('gif');

const songItems = Array.from(document.getElementsByClassName('songItem'));

const songs = [
    { songName: "Prithibita Naki", filePath: "Songs/1.mp3", coverpath: "1.jpg" },
    { songName: "Bhromor", filePath: "Songs/2.mp3", coverpath: "2.jpg" },
    { songName: "Hare Krishna", filePath: "Songs/3.mp3", coverpath: "3.jpg" },
    { songName: "Anandabazar", filePath: "Songs/4.mp3", coverpath: "4.jpg" }
];

// Populate UI
songItems.forEach((el, i) => {
    el.querySelector("img").src = songs[i].coverpath;
    el.querySelector("span").innerText = songs[i].songName;
});

// Helper
const playSong = (index) => {
    songIndex = index;
    audioElement.src = songs[songIndex].filePath;
    audioElement.currentTime = 0;
    audioElement.play();

    masterPlay.classList.replace('fa-play-circle', 'fa-pause-circle');
    gif.style.opacity = 1;
};

// Play / Pause
masterPlay.addEventListener('click', () => {
    if (audioElement.paused || !audioElement.src) {
        playSong(songIndex);
    } else {
        audioElement.pause();
        masterPlay.classList.replace('fa-pause-circle', 'fa-play-circle');
        gif.style.opacity = 0;
    }
});

// Progress bar update
audioElement.addEventListener('timeupdate', () => {
    if (audioElement.duration) {
        myProgressBar.value = (audioElement.currentTime / audioElement.duration) * 100;
    }
});

// Seek
myProgressBar.addEventListener('input', () => {
    if (audioElement.duration) {
        audioElement.currentTime = (myProgressBar.value / 100) * audioElement.duration;
    }
});

// Reset all play buttons
const makeAllPlays = () => {
    document.querySelectorAll('.songItemPlay').forEach(el => {
        el.classList.remove('fa-pause-circle');
        el.classList.add('fa-play-circle');
    });
};

// Individual song play
document.querySelectorAll('.songItemPlay').forEach(el => {
    el.addEventListener('click', (e) => {
        makeAllPlays();

        const index = parseInt(e.target.id);
        playSong(index);

        e.target.classList.remove('fa-play-circle');
        e.target.classList.add('fa-pause-circle');
    });
});

// Next
document.getElementById('next').addEventListener('click', () => {
    songIndex = (songIndex + 1) % songs.length;
    playSong(songIndex);
});

// Previous
document.getElementById('previous').addEventListener('click', () => {
    songIndex = (songIndex - 1 + songs.length) % songs.length;
    playSong(songIndex);
});