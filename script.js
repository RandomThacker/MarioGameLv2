mario = document.querySelector(".mario")
marioImage = document.querySelector(".marioImage")
dragon = document.querySelector(".dragon")
gameOver = document.querySelector(".gameOver")
scoreCount = document.querySelector(".score")
startGame = document.querySelector(".startGame")
scoreDiv = document.querySelector(".scoreDiv")
let score = 0;
cross = true
audioNormal = new Audio("/audio/castle.mp3")
audioSpeed = new Audio("/audio/castle.mp3")
audioGameOver = new Audio("/audio/GameOver.mp3")
audioJump = new Audio("/audio/jump.mp3")

setTimeout(()=>{
    audioNormal.play()
},100)


document.onkeydown = (e) => {
    // console.log(e.keyCode)
    // if (e.keyCode == 13) {
    //     marioImage.src = "/images/mario1.gif"
    //     startGame.style.display = "none";
    //     scoreDiv.style.visibility = "visible"
    //     dragon.style.animationName = "dragon";
    //     audioNormal.play()
    // }
    if (e.keyCode == 38) {
        mario.classList.add("animateMario")
        audioJump.play()
        setTimeout(() => {
            console.log("remove")
            mario.classList.remove("animateMario")
        }, 800)
    }

    else if (e.keyCode == 39) {
        mx = parseInt(window.getComputedStyle(mario, null).getPropertyValue('left'));
        mario.style.left = mx + 15 + "px"
        mario.style.transform = "scaleX(1)";
    }

    else if (e.keyCode == 37) {
        mx = parseInt(window.getComputedStyle(mario, null).getPropertyValue('left'));
        mario.style.left = mx - 15 + "px"
        mario.style.transform = "scaleX(-1)";

    }
}

setInterval(() => {
    mx = parseInt(window.getComputedStyle(mario, null).getPropertyValue('left'));
    my = parseInt(window.getComputedStyle(mario, null).getPropertyValue('top'));

    dx = parseInt(window.getComputedStyle(dragon, null).getPropertyValue('left'));
    dy = parseInt(window.getComputedStyle(dragon, null).getPropertyValue('top'));

    console.log(dx)

    offsetX = Math.abs(mx - dx)
    offsetY = Math.abs(my - dy)

    if (offsetX < 15 && offsetY < 22) {
        dx = parseInt(window.getComputedStyle(dragon, null).getPropertyValue('left'));
        dragon.style.left = dx + "px"
        dragon.classList.remove("animateDragon")
        mario.classList.add("deadMario")
        setTimeout(() => {
            mario.style.bottom = "-100px"
        }, 1000)
        cross = false
        audioNormal.pause()
        audioSpeed.pause()
        audioGameOver.play()
        setTimeout(() => {
            gameOver.style.visibility = "visible"
        }, 1500)
    }

    else if (dx == 0 && cross) {
        updateScore()
        cross = false
        setTimeout(() => {
            cross = true;
        }, 1000)
        // setTimeout(() => {
        aniDur = parseFloat(window.getComputedStyle(dragon, null).getPropertyValue('animation-duration'));
        newDur = aniDur - 0.25;
        if (newDur <= 3) {
            audioNormal.pause()
            audioSpeed.play()
        }

        if (newDur <= 2) {
            newDur = 2
            dragon.style.animationDuration = newDur + "s";
            console.log(newDur)
        }
        else {
            dragon.style.animationDuration = newDur + "s";
            console.log(newDur)
        }
        // }, 500)
    }
})

function updateScore() {
    score += 100;
    scoreCount.innerHTML = score;
}