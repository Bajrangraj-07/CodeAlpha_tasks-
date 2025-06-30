let images = document.querySelectorAll('.gallery img');
let currentIndex = 0;

function openLightbox(img) {
  document.getElementById('lightbox').style.display = 'block';
  document.getElementById('lightbox-img').src = img.src;
  currentIndex = Array.from(images).indexOf(img);
}

function closeLightbox() {
  document.getElementById('lightbox').style.display = 'none';
}

function changeImage(n) {
  currentIndex += n;
  if (currentIndex < 0) currentIndex = images.length - 1;
  if (currentIndex >= images.length) currentIndex = 0;
  document.getElementById('lightbox-img').src = images[currentIndex].src;
}

function filterImages(category) {
  images.forEach(img => {
    if (category === 'all' || img.classList.contains(category)) {
      img.style.display = 'block';
    } else {
      img.style.display = 'none';
    }
  });
}
artist;
  audio.src = song.src;
  highlightPlaylist();
}

function togglePlay() {
  if (audio.paused) {
    audio.play();
    playPauseBtn.textContent = '⏸';
  } else {
    audio.pause();
    playPauseBtn.textContent = '▶️';
  }
}

function nextSong() {
  currentSong = (currentSong + 1) % songs.length;
  loadSong(songs[currentSong]);
  audio.play();
  playPauseBtn.textContent = '⏸';
}

function prevSong() {
  currentSong = (currentSong - 1 + songs.length) % songs.length;
  loadSong(songs[currentSong]);
  audio.play();
  playPauseBtn.textContent = '⏸';
}

audio.addEventListener('timeupdate', updateProgress);
audio.addEventListener('ended', nextSong); // autoplay
audio.addEventListener('loadedmetadata', () => {
  durationEl.textContent = formatTime(audio.duration);
});

function updateProgress() {
  const progressPercent = (audio.currentTime / audio.duration) * 100;
  progress.style.width = `${progressPercent}%`;
  currentTimeEl.textContent = formatTime(audio.currentTime);
  durationEl.textContent = formatTime(audio.duration);
}

function setProgress(e) {
  const width = e.currentTarget.clientWidth;
  const clickX = e.offsetX;
  const duration = audio.duration;
  audio.currentTime = (clickX / width) * duration;
}

function formatTime(sec) {
  const minutes = Math.floor(sec / 60);
  const seconds = Math.floor(sec % 60);
  return `${minutes}:${seconds < 10 ? '0' + seconds : seconds}`;
}

function changeVolume(value) {
  audio.volume = value;
}

// Playlist creation
songs.forEach((song, index) => {
  const li = document.createElement('li');
  li.textContent = `${song.title} - ${song.artist}`;
  li.onclick = () => {
    currentSong = index;
    loadSong(song);
    audio.play();
    playPauseBtn.textContent = '⏸';
  };
  playlist.appendChild(li);
});

function highlightPlaylist() {
  const items = playlist.querySelectorAll('li');
  items.forEach((item, index) => {
    item.classList.toggle('active', index === currentSong);
  });
}

// Initial load
loadSong(songs[currentSong]);
