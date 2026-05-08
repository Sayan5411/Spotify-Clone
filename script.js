console.log("Welcome to Spotify");

let songIndex = 0;
let audioElement = new Audio();

const masterPlay = document.getElementById('masterPlay');
const myProgressBar = document.getElementById('myProgressBar');
const gif = document.getElementById('gif');
const currentSong = document.getElementById('currentSong');
const playTopSliderTrack = document.querySelector('#playTopSlider .playTopSliderTrack');
const headlineTickerTrack = document.getElementById('headlineTickerTrack');

const songItems = Array.from(document.getElementsByClassName('songItem'));

const songs = [
    { songName: "Prithibita Naki", filePath: "Songs/1.mp3", coverpath: "cover.png" },
    { songName: "Bhromor", filePath: "Songs/2.mp3", coverpath: "cover.png" },
    { songName: "Hare Krishna", filePath: "Songs/3.mp3", coverpath: "cover.png" },
    { songName: "Anandabazar", filePath: "Songs/4.mp3", coverpath: "cover.png" }
];

// Populate UI
songItems.forEach((el, i) => {
    el.querySelector("img").src = songs[i].coverpath;
    el.querySelector("span").innerText = songs[i].songName;
});

const picFrames = Array.from({ length: 10 }, (_, i) => `pic${i + 1}.jpg`);

if (playTopSliderTrack) {
    const loopFrames = [...picFrames, ...picFrames];
    playTopSliderTrack.innerHTML = loopFrames
        .map((src, i) => `<img src="${src}" alt="Music visual ${i + 1}" class="sliderPic">`)
        .join('');
}

if (headlineTickerTrack) {
    const renderHeadlineTicker = () => {
        const oneCycleHtml = picFrames
            .map((src, i) => `<img src="${src}" alt="Headline visual ${i + 1}" class="headlineTickerPic">`)
            .join('');

        // Measure one full cycle (pic1...pic10) to drive seamless animation distance.
        headlineTickerTrack.innerHTML = oneCycleHtml;
        const cycleWidth = headlineTickerTrack.scrollWidth;
        const tickerWidth = headlineTickerTrack.parentElement ? headlineTickerTrack.parentElement.clientWidth : cycleWidth;

        // Repeat enough cycles so the row is always filled without empty gaps.
        const repeatCount = Math.max(4, Math.ceil((tickerWidth + cycleWidth) / cycleWidth) + 2);
        const repeatedHtml = Array.from({ length: repeatCount }, () => oneCycleHtml).join('');
        headlineTickerTrack.innerHTML = repeatedHtml;
        headlineTickerTrack.style.setProperty('--headline-cycle-width', `${cycleWidth}px`);
    };

    renderHeadlineTicker();
    window.addEventListener('resize', renderHeadlineTicker);
}

const setPlaybackVisuals = (isPlaying) => {
    gif.style.opacity = isPlaying ? 1 : 0;
    document.body.classList.toggle('music-playing', isPlaying);
};

// Helper
const playSong = (index) => {
    songIndex = index;
    audioElement.src = songs[songIndex].filePath;
    audioElement.currentTime = 0;
    audioElement.play();

    makeAllPlays();
    const activePlayButton = document.getElementById(songIndex.toString());
    if (activePlayButton) {
        activePlayButton.classList.remove('fa-play-circle');
        activePlayButton.classList.add('fa-pause-circle');
    }

    masterPlay.classList.replace('fa-play-circle', 'fa-pause-circle');
    currentSong.innerText = songs[songIndex].songName;
    setPlaybackVisuals(true);
};

// Play / Pause
masterPlay.addEventListener('click', () => {
    if (audioElement.paused || !audioElement.src) {
        playSong(songIndex);
    } else {
        audioElement.pause();
        masterPlay.classList.replace('fa-pause-circle', 'fa-play-circle');
        makeAllPlays();
        setPlaybackVisuals(false);
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
        const index = parseInt(e.target.id, 10);
        playSong(index);
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

audioElement.addEventListener('ended', () => {
    masterPlay.classList.replace('fa-pause-circle', 'fa-play-circle');
    makeAllPlays();
    setPlaybackVisuals(false);
});
