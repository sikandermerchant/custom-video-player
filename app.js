const video = document.getElementById("video");
const play = document.getElementById("play");
const stopPlay = document.getElementById("stop");
const progress = document.getElementById("progress");
const timeStamp = document.getElementById("timestamp");

//Functions
//Play and pause video
function toggleVideoStatus() {
  if (video.paused) {
    //https://developer.mozilla.org/en-US/docs/Web/API/HTMLMediaElement/paused
    video.play(); //https://developer.mozilla.org/en-US/docs/Web/API/HTMLMediaElement/play
  } else {
    video.pause(); //https://developer.mozilla.org/en-US/docs/Web/API/HTMLMediaElement/pause
  }
}

//Update play/pause icon
function updatePlayIcon() {
  if (video.paused) {
    play.innerHTML = '<i class="fa fa-play fa-2x"></i';
  } else {
    play.innerHTML = '<i class="fa fa-pause fa-2x"></i';
  }
}

//Update progress and timestamp
function updateProgress() {
  // console.log(video.currentTime); ///console logs the current time of the video
  //To get the progress update in time on the progress bar, we have to get a percentage of the progress value with its current time and duration of teh video as follows
  progress.value = (video.currentTime / video.duration) * 100; //https://developer.mozilla.org/en-US/docs/Web/API/HTMLMediaElement/duration

  ///Get minutes
  let mins = Math.floor(video.currentTime / 60);
  if (mins < 10) {
    mins = "0" + String(mins);
  }

  //Get Seconds
  let secs = Math.floor(video.currentTime % 60);
  if (secs < 10) {
    secs = "0" + String(secs);
  }
  timeStamp.innerHTML = `${mins}:${secs}`;
}
//Set video time to progress - use the scroller on the progress bar to set the video based on time
function setVideoProgress() {
  video.currentTime = (+progress.value * video.duration) / 100;
}

//Stop Video
function stopVideo() {
  video.currentTime = 0; //There is no stop or reset function for video/audio. Hence we reset the current time to 0 and the pause the video//https://developer.mozilla.org/en-US/docs/Web/API/HTMLMediaElement/currentTime
  video.pause();
}

//Event Listeners
//Event Listeners for video player - https://developer.mozilla.org/en-US/docs/Web/Guide/Events/Media_events

video.addEventListener("click", toggleVideoStatus);
video.addEventListener("pause", updatePlayIcon);
video.addEventListener("play", updatePlayIcon);
video.addEventListener("timeupdate", updateProgress);

//Event Listener for play
play.addEventListener("click", toggleVideoStatus);

//Event listener for stop
stopPlay.addEventListener("click", stopVideo);

//Event Listener for progress bar
progress.addEventListener("change", setVideoProgress);
