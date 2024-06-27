const char = document.getElementById("dino")
const cactus = document.getElementById("cactus")
const playerScore = document.getElementById("score")
const playerScoreTertinggi = document.getElementById("scoreTertinggi")



let score = 0
let highScore = localStorage.getItem("high-score") || 0;
playerScoreTertinggi.innerHTML = `Score Tertinggi: ${highScore}`;

let isGamePaused = false; // Add a flag to indicate whether the game is paused or not

let jumlahScore = () =>{
    if (!isGamePaused) { // Only increment the score if the game is not paused
        score++
        playerScore.innerHTML = `Score : ${score}`
        
        if (score > highScore) {
            highScore = score;
            localStorage.setItem("high-score", highScore);
        }
    }
}

function jump(){
  if(char.classList!= "animate"){
      char.classList.add("animate")
      
      const audioElement = new Audio('assets/audio/jump.mp3'); // Create the audioElement instance here
      try {
        audioElement.play(); // Play the audio file
      } catch (error) {
        console.error("Error playing audio:", error);
      }
  }
  setTimeout(function(){
      char.classList.remove("animate")
    
  }, 500)
  let score = 0
  interval = setInterval(jumlahScore, 100)
}

const ifHitCactus = setInterval(function(){
  const charTop = parseInt(window.getComputedStyle(char).getPropertyValue("top"))
  const cactusLeft = parseInt(window.getComputedStyle(cactus).getPropertyValue("left"))
  if(cactusLeft < 60 && cactusLeft > 0 && charTop >= 80){
      cactus.style.animation = "none"
      cactus.style.display = "none"

      isGamePaused = true; // Set the game to paused when the modal is opened

      const audioElement = new Audio('assets/audio/game-over.mp3'); // Create the audioElement instance here

      Swal.fire({
          imageUrl: "assets/gambar/cry.png",
          imageWidth: 100,
          imageHeight: 100,
          title: "KUCING KAMU NABRAK BATU🥺",
          text: "coba lagi ya!",
          
          overflowY: 'auto',
          didOpen: () => {
            try {
              audioElement.play(); // play the audio file
            } catch (error) {
              console.error("Error playing audio:", error);
            }
          },
          didClose: () => {
            audioElement.pause(); // pause the audio when the modal is closed
            audioElement.currentTime = 0; // reset the audio to the beginning
            isGamePaused = false; // Set the game to unpaused when the modal is closed
          }
        }).then(() => {
          location.reload(); // reload the page when the modal is closed
        });
  }
})