const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

musicImg = $(".img-area img");
musicName = $(".song-details .name");
musicArtist = $(".song-details .artist");
mainAudio = $("#main-audio");
playPauseBtn = $(".play-pause");
prevBtn = $("#prev");
nextBtn = $("#next");
progressBar = $(".progress-bar");
progressArea = $(".progress-area");
repeatBtn = $("#repeat-plist");
playlistBtn = $("#more-music");
playlist = $(".music-list");
closeBtn = $("#close");
isRepeat = false;
ulTag = playlist.querySelector("ul");

let songs = [
  {
    name: "Liyue hills",
    artist: "Liyue",
    path: "./songs/1.mp3",
    images: "https://i.ytimg.com/vi/yTQ0AiOm42o/hqdefault.jpg?sqp=-oaymwEcCOADEI4CSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLBY5NbVDfkOhnMAeCkNB8dFNiv6Og",
  },
  {
    name: "Lover's Oath",
    artist: "Liyue",
    path: "./songs/2.mp3",
    images: "https://i.ytimg.com/vi/3CV4yrXm9qI/hq720.jpg?sqp=-oaymwEcCNAFEJQDSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLC_qtG09vOXW_g9DLHlkADKZbGgCw",
  },
  {
    name: "Rapid as Wildfires",
    artist: "Liyue",
    path: "./songs/3.mp3",
    images: "https://i.ytimg.com/vi/gK_Mm9Zql8E/hq720.jpg?sqp=-oaymwEcCNAFEJQDSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLBkrgLUSoQQJJ-NdkuoOozayRa75Q",
  },
  {
    name: "Chasing the turrets",
    artist: "Liyue",
    path: "./songs/4.mp3",
    images: "https://i.ytimg.com/vi/gK_Mm9Zql8E/hq720.jpg?sqp=-oaymwEcCNAFEJQDSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLBkrgLUSoQQJJ-NdkuoOozayRa75Q",
  },
];

let musicIndex = 0;
window.addEventListener("load", () => {
  loadMusic(musicIndex);
});

function loadMusic(indexNumb) {
  musicName.innerText = songs[indexNumb].name;
  musicArtist.innerText = songs[indexNumb].artist;
  musicImg.src = `${songs[indexNumb].images}`;
  mainAudio.src = `${songs[indexNumb].path}`;
}

function playMusic() {
  playPauseBtn.classList.add("paused");
  playPauseBtn.querySelector("i").innerText = "pause";
  mainAudio.play();
}

function pauseMusic() {
  playPauseBtn.classList.remove("paused");
  playPauseBtn.querySelector("i").innerText = "play_arrow";
  mainAudio.pause();
}

playPauseBtn.addEventListener("click", () => {
  const isMusicPaused = playPauseBtn.classList.contains("paused");
  isMusicPaused ? pauseMusic() : playMusic();
});

function nextMusic() {
  musicIndex++;
  if (musicIndex >= songs.length) {
    musicIndex = 0;
  }
  loadMusic(musicIndex);
  playMusic();
}

nextBtn.addEventListener("click", () => {
  nextMusic();
});

function prevMusic() {
  musicIndex--;
  if (musicIndex < 0) {
    musicIndex = songs.length - 1;
  }
  loadMusic(musicIndex);
  playMusic();
}
prevBtn.addEventListener("click", () => {
  prevMusic();
});

mainAudio.addEventListener("timeupdate", (e) => {
  const currentTime = e.target.currentTime;
  const duration = e.target.duration;
  const percent = (currentTime / duration) * 100;

  progressBar.style.width = `${percent}%`;

  mainAudio.addEventListener("loadeddata", () => {
    let musicDuration = $(".max-duration");

    //get song total duration
    let audioDuration = mainAudio.duration;
    let totalMin = Math.floor(audioDuration / 60);
    let totalSec = Math.floor(audioDuration % 60);
    if (totalSec < 10) {
      totalSec = `0${totalSec}`;
    }

    musicDuration.innerText = `${totalMin}:${totalSec}`;
  });
  let musicCurrentTime = $(".current-time");

  //get song total duration
  let audioDuration = mainAudio.currentTime;
  let totalMin = Math.floor(audioDuration / 60);
  let totalSec = Math.floor(audioDuration % 60);
  if (totalSec < 10) {
    totalSec = `0${totalSec}`;
  }

  musicCurrentTime.innerText = `${totalMin}:${totalSec}`;
});

progressArea.addEventListener("click", (e) => {
  let progressAreaWidthValue = progressArea.clientWidth;
  let clickedOffsetX = e.offsetX;
  let songDuration = mainAudio.duration;

  mainAudio.currentTime =
    (clickedOffsetX / progressAreaWidthValue) * songDuration;
  playMusic();
});

repeatBtn.addEventListener("click", (e) => {
  let getText = repeatBtn.innerText;

  switch (getText) {
    case "repeat":
      repeatBtn.innerText = "repeat_one";
      break;
    case "repeat_one":
      repeatBtn.innerText = "shuffle";
      break;
    case "shuffle":
      repeatBtn.innerText = "repeat";
      break;
  }
});

mainAudio.onended = () => {
  let getText = repeatBtn.innerText;

  switch (getText) {
    case "repeat":
      nextMusic();
      break;
    case "repeat_one":
      mainAudio.currentTime = 0;
      loadMusic(musicIndex);
      playMusic();
      break;
    case "shuffle":
      let randomSong = Math.floor(Math.random() * songs.length + 1);

      do {
        randomSong = Math.floor(Math.random() * songs.length + 1);
      } while (musicIndex == randomSong);
      musicIndex = randomSong;
      loadMusic(musicIndex);
      playMusic();

      break;
  }
};

playlistBtn.addEventListener("click", function () {
  playlist.classList.toggle("show");
});

closeBtn.addEventListener("click", function () {
  playlistBtn.click();
});

for (var i = 0; i < songs.length; i++) {
  let liTag = `
        <li class="song_index${i}">
        <div class="row">
        <span>${songs[i].name}</span>
        <p>${songs[i].artist}</p>
        </div>
        <audio class="${"song" + i}" src="${songs[i].path}"></audio>
        <span id="${"song" + i}" class="audio-duration"></span>
    </li>  
    `;
  ulTag.insertAdjacentHTML("beforeend", liTag);

  let liAudioDuration = ulTag.querySelector(`#${"song" + i}`);
  let liAudioTag = ulTag.querySelector(`.${"song" + i}`);
  let liFullItem = ulTag.querySelector(`.song_index${i}`);
  liAudioTag.addEventListener("loadeddata", () => {
    let songDuration = liAudioTag.duration;
    let totalMin = Math.floor(songDuration / 60);
    let totalSec = Math.floor(songDuration % 60);
    if (totalSec < 10) {
      totalSec = `0${totalSec}`;
    }
    liAudioDuration.innerText = `${totalMin}:${totalSec}`;
    liAudioDuration.setAttribute("t-duration", `${totalMin}:${totalSec}`); 
  
  });

  liFullItem.addEventListener('click', function(){
        let musicIndex = liFullItem.getAttribute('class').split('song_index')[1]
        console.log(liFullItem.getAttribute('class'))
        loadMusic(musicIndex);
        playMusic();
  })
}
function playingSong(){
  const allLiTags = ulTags.querySelectorAll('li');

  for(let i = 0; i < allLiTags.length; i++) {
    let audioTag = allLiTags[i].querySelector('.audio-duration');

    if(allLiTag[j].classList.contains("playing")){
      allLiTag[j].classList.remove("playing");
      let adDuration = audioTag.getAttribute("t-duration");
      audioTag.innerText = adDuration;
    }
    //if the li tag index is equal to the musicIndex then add playing class in it
    if(allLiTag[j].getAttribute("li-index") == musicIndex){
      allLiTag[j].classList.add("playing");
      audioTag.innerText = "Playing";
    }
    allLiTag[j].setAttribute("onclick", "clicked(this)");
  }
}

function clicked(element){
  let getLiIndex = element.getAttribute("li-index");
  musicIndex = getLiIndex; //updating current song index with clicked li index
  loadMusic(musicIndex);
  playMusic();
  playingSong();
}
