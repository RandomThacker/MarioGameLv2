//---------Declaring Variables----------------
mario = document.querySelector(".mario")
marioImage = document.querySelector(".marioImage")
dragon = document.querySelector(".dragon")
gameOver = document.querySelector(".gameOver")
scoreCount = document.querySelector(".score")
startGame = document.querySelector(".startGame")
scoreDiv = document.querySelector(".scoreDiv")
up = document.querySelector(".up")
right = document.querySelector(".right")
let score = 0;
cross = true
audioNormal = new Audio("castle.mp3")
audioSpeed = new Audio("castle.mp3")
audioGameOver = new Audio("GameOver.mp3")
audioJump = new Audio("jump.mp3")
stageClear = new Audio("stage_clear.wav")

setTimeout(()=>{
    marioImage.src = "stillMario.png"
},3000)

setTimeout(()=>{
    startGame.style.visibility = "visible"
},2000)

function gameStart(){
    marioImage.src = "mario1.gif"
    dragon.style.visibility = "visible"
    startGame.style.display = "none";
    scoreDiv.style.visibility = "visible"
    dragon.style.animationName = "dragon";
    mario.classList.remove("marioEnter")

    audioNormal.play()
}

//-----------Key Actions-------------
document.onkeydown = (e) => {
    // console.log(e.keyCode)
    //----------"1" Key----------
    if (e.keyCode == 49) {
       gameStart()
    }

    else if (e.keyCode == 97) {
        gameStart()
     }

    //------------Up Key--------------
    else if (e.keyCode == 38) {
        onUp();
    }

    //----------Right Key---------------
    else if (e.keyCode == 39) {
        onRight()
    }

    //----------Left Key------------
    else if (e.keyCode == 37) {
       onLeft()
    }
}


//---------To check collison and Increase score
setInterval(() => {
    mx = parseInt(window.getComputedStyle(mario, null).getPropertyValue('left'));
    my = parseInt(window.getComputedStyle(mario, null).getPropertyValue('top'));

    dx = parseInt(window.getComputedStyle(dragon, null).getPropertyValue('left'));
    dy = parseInt(window.getComputedStyle(dragon, null).getPropertyValue('top'));

    // console.log(dx)

    offsetX = Math.abs(mx - dx)
    offsetY = Math.abs(my - dy)

    // console.log(offsetX,)


    //------------Check Collision-----------
    if (offsetX < 73 && offsetY < 52) {
        dx = parseInt(window.getComputedStyle(dragon, null).getPropertyValue('left'));
        dragon.style.left = dx + "px"
        dragon.classList.remove("animateDragon")
        mario.classList.add("deadMario")
        setTimeout(() => {
            mario.style.display = "none";
        }, 700)
        cross = false
        audioNormal.pause()
        audioSpeed.pause()
        audioGameOver.play()
        setTimeout(() => {
            gameOver.style.visibility = "visible"
        }, 1500)
    }

    //-----------Increase score and speed----------------
    else if (dx < 0 && cross) {

        if(score ==1100){
            updateScore()
            dragon.style.display = "none"
            // dragon.style.animationName = "none";
            mario.style.transform = "scaleX(1)";
            mario.classList.remove("animateMario")
            mario.classList.add("marioExit")
            audioNormal.pause()
            audioSpeed.pause()
            stageClear.play()
            setTimeout (()=>{
            document.querySelector(".end").style.display = "block"
            mario.style.display = "none"
            },5000)
        }

        else{
        updateScore()
        cross = false
        setTimeout(() => {
            cross = true;
        }, 1000)
        // setTimeout(() => {
        aniDur = parseFloat(window.getComputedStyle(dragon, null).getPropertyValue('animation-duration'));
        newDur = aniDur - 0.2;
        if (newDur <= 3.5) {
            audioNormal.pause()
            audioSpeed.play()
        }
        if (newDur <= 2) {
            newDur = 2
            dragon.style.animationDuration = newDur + "s";
            // console.log(newDur)
        }
        else if((score/100)%2==0) {
            dragon.style.animationDuration = newDur + "s";
            // console.log(newDur)
        }
        // }, 1000)
    }
}
})

function updateScore() {
    score += 100;
    scoreCount.innerHTML = score;
}

function onUp(){
    mario.classList.add("animateMario")
        audioJump.play()
        setTimeout(() => {
            // console.log("remove")
            mario.classList.remove("animateMario")
        }, 800)
}

function onRight(){
    mx = parseInt(window.getComputedStyle(mario, null).getPropertyValue('left'));
        mario.style.left = mx + 75 + "px"
        mario.style.transform = "scaleX(1)";
}

function onLeft(){
    mx = parseInt(window.getComputedStyle(mario, null).getPropertyValue('left'));
    mario.style.left = mx - 75 + "px"
    mario.style.transform = "scaleX(-1)";

}



function openFullscreen() {
    body = document.querySelector(".gameContainer")
    if (body.requestFullscreen) {
      elem.requestFullscreen();
    } else if (body.webkitRequestFullscreen) { /* Safari */
      elem.webkitRequestFullscreen();
    } else if (body.msRequestFullscreen) { /* IE11 */
      elem.msRequestFullscreen();
    }
  }