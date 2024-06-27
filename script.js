const char = document.getElementById("dino")
const cactus = document.getElementById("cactus")
const playerScore = document.getElementById("score")
const playerScoreTertinggi = document.getElementById("scoreTertinggi")



let score = 0
let highScore = localStorage.getItem("high-score") || 0;
playerScoreTertinggi.innerHTML = `Score Tertinggi: ${highScore}`;

let isGamePaused = false; 
let jumlahScore = () =>{
    if (!isGamePaused) { 
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
      const audioElement = new Audio('assets/audio/jump.mp3'); 
      try {
        audioElement.play(); 
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

      isGamePaused = true; 

      const audioElement = new Audio('assets/audio/game-over.mp3'); 

      Swal.fire({
          imageUrl: "assets/gambar/cry.png",
          imageWidth: 100,
          imageHeight: 100,
          title: "KUCING KAMU NABRAK BATU🥺",
          text: "coba lagi ya!",
          overflowY: 'auto',
          allowOutsideClick: false,
          didOpen: () => {
            try {
              audioElement.play(); 
            } catch (error) {
              console.error("Error playing audio:", error);
            }
          },
          didClose: () => {
            audioElement.pause(); 
            audioElement.currentTime = 0; 
            isGamePaused = false;
          }
        }).then(() => {
          location.reload();
        });
  }
})
