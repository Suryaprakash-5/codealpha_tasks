const songs = [
  {
    title: "Believer",
    artist: "Imagine Dragons",
    emoji: "🎸",
    url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
  },
  {
    title: "CKay - The First",
    artist: "CKay",
    emoji: "🎤",
    url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3",
  },
  {
    title: "Rava Rava",
    artist: "Tamil Hit",
    emoji: "🎼",
    url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3",
  },
  {
    title: "Blinding Lights",
    artist: "The Weeknd",
    emoji: "✨",
    url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3",
  },
  {
    title: "Levitating",
    artist: "Dua Lipa",
    emoji: "🚀",
    url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3",
  },
  {
    title: "As It Was",
    artist: "Harry Styles",
    emoji: "💫",
    url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-6.mp3",
  },
  {
    title: "Anti-Hero",
    artist: "Taylor Swift",
    emoji: "👑",
    url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-7.mp3",
  },
  {
    title: "Flowers",
    artist: "Miley Cyrus",
    emoji: "🌸",
    url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-8.mp3",
  },
  {
    title: "Sunroof",
    artist: "Nicky Youre",
    emoji: "☀️",
    url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-9.mp3",
  },
  {
    title: "Unholy",
    artist: "Sam Smith",
    emoji: "🎭",
    url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-10.mp3",
  },
];

let current = 0;
let playing = false;
const audio = document.getElementById("audio");
const progress = document.getElementById("progress");
const current_time = document.getElementById("current");
const length_time = document.getElementById("length");
const playBtn = document.getElementById("playBtn");
const status = document.getElementById("status");

function loadSong(index) {
  const song = songs[index];
  document.getElementById("title").textContent = song.title;
  document.getElementById("artist").textContent = song.artist;
  document.getElementById("emoji").textContent = song.emoji;
  audio.src = song.url;
  updatePlaylist();
}

function playPause() {
  if (playing) {
    audio.pause();
    playBtn.textContent = "▶";
    status.textContent = "";
  } else {
    audio.play();
    playBtn.textContent = "⏸";
    status.textContent = "♫ Now Playing";
  }
  playing = !playing;
}

function nextSong() {
  current = (current + 1) % songs.length;
  loadSong(current);
  if (playing) audio.play();
}

function prevSong() {
  current = (current - 1 + songs.length) % songs.length;
  loadSong(current);
  if (playing) audio.play();
}

function changeVolume() {
  audio.volume = document.getElementById("volume").value / 100;
}

function formatTime(sec) {
  if (isNaN(sec)) return "0:00";
  const mins = Math.floor(sec / 60);
  const secs = Math.floor(sec % 60);
  return mins + ":" + (secs < 10 ? "0" : "") + secs;
}

function updatePlaylist() {
  const list = document.getElementById("playlist");
  list.innerHTML = "";
  songs.forEach((song, i) => {
    const div = document.createElement("div");
    div.className = "song" + (i === current ? " active" : "");
    div.innerHTML = `<div class="song-name">${song.title}</div><div class="song-artist">${song.artist}</div>`;
    div.onclick = () => {
      current = i;
      loadSong(current);
      audio.play();
      playBtn.textContent = "⏸";
      playing = true;
      status.textContent = "♫ Now Playing";
    };
    list.appendChild(div);
  });
}

audio.addEventListener("timeupdate", () => {
  if (audio.duration) {
    progress.value = (audio.currentTime / audio.duration) * 100;
    current_time.textContent = formatTime(audio.currentTime);
    length_time.textContent = formatTime(audio.duration);
  }
});

progress.addEventListener("change", () => {
  audio.currentTime = (progress.value / 100) * audio.duration;
});

audio.addEventListener("ended", nextSong);

loadSong(0);
updatePlaylist();
