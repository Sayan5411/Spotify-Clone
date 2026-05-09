# Spotify Clone - Best of Fakira Edition

A custom Spotify-inspired music player built with **HTML, CSS, and JavaScript**.
This version includes personalized visuals, animated image strips, and playlist controls for a smooth local music experience.

![Project Preview](images.png)

## Features

- Play, pause, next, and previous controls
- Individual song play buttons per track
- Live progress bar with seek support
- Current song name updates while playing
- Animated playing indicator (`playing.gif`)
- Custom background (`bg.png`) and themed UI
- Title-side cover image (`cover2.png`) beside **Best of Fakira**
- Continuous headline-style image animation using `pic1.jpg` to `pic10.jpg`
- Responsive adjustments for smaller screens

## Tech Stack

- HTML5
- CSS3
- Vanilla JavaScript (no frameworks)
- Font Awesome (icons)
- Google Fonts (`Ubuntu`, `Varela Round`)

## Project Structure

```text
Spotify-Clone/
|-- index.html
|-- style.css
|-- script.js
|-- README.md
|-- logo.png
|-- bg.png
|-- cover.png
|-- cover2.png
|-- playing.gif
|-- pic1.jpg ... pic10.jpg
|-- Songs/
|   |-- 1.mp3
|   |-- 2.mp3
|   |-- 3.mp3
|   |-- 4.mp3
```

## Run Locally

1. Clone the repository:
   ```bash
   git clone https://github.com/Sayan5411/Spotify-Clone.git
   ```
2. Open the project folder.
3. Run `index.html` in your browser (double-click or use Live Server).

No build tools or package installation are required.

## Player Controls

- `Master Play/Pause`: Center control in the bottom bar
- `Next / Previous`: Skip through playlist
- `Song Row Play Icon`: Play a specific track instantly
- `Progress Bar`: Drag to seek within the current track

## Customization Guide

Edit `script.js` to change playlist content:

```js
const songs = [
  { songName: "Song Name", filePath: "Songs/1.mp3", coverpath: "cover.png" }
];
```

You can also:

- Replace `bg.png` for a new app background
- Replace `cover.png` / `cover2.png` for list and title artwork
- Replace `pic1.jpg` to `pic10.jpg` for the animated ticker visuals

## Notes

- Keep audio file paths valid inside the `Songs/` folder.
- Internet is needed for Google Fonts and Font Awesome icons.
- This is a learning/personal project and is not affiliated with Spotify.

## Author

Created by **Sayan5411** with custom UI/animation enhancements.
