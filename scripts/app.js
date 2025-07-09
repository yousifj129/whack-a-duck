function init() {
    const gridElem = document.querySelector(".grid")
    const textElem = document.querySelector("#text")
    const restartElem = document.querySelector("#restart")
    const difficultySelectorElem = document.querySelector("#difficultySelector")
    const quackAudioElem = document.getElementById("quackSound")
    let numOfDucks = 6;
    const cells = []
    const difficulties = [
        2000,
        1000,
        800,
        500,
        300
    ]
    const difficultiesNumOfDucks = [
        5,4,3,2,1
    ]
    let timerOfAppear = 2000;
    let score = 0
    let currentCells = [];
    let intrevalId;
    let userClicks = 0;
    let gameRunning = false;
    function createGrid() {
        for (let i = 0; i < 100; i++) {
            const cell = document.createElement("div")

            cell.className = "cell"
            cells.push(cell)
            gridElem.append(cell)
        }
    }
    function playSound() {
        let audio = quackAudioElem;
        if (audio.paused) {
            audio.play();
        } else {
            audio.pause();
            audio.currentTime = 0
            audio.play()
        }
    }

    function play() {
        // timerOfAppear = difficulties[Number(difficultySelectorElem.value)]
        if (currentCells != undefined) {
            for (let i = 0; i < currentCells.length; i++) {
                currentCells[i].remove()
            }
        }
        if (score > 900) {
            textElem.textContent = `YOU WON! accuracy: ${(score / 100)}/${userClicks}`
            gameRunning = false
            clearInterval(intrevalId)

        }
        else {
            console.log(currentCells.length)
            for (let i = 0; i < numOfDucks; i++) {
                const chosenCell = cells[Math.floor(Math.random() * 100)]
                const duck = document.createElement("div")
                if (currentCells.length < numOfDucks) {
                    chosenCell.appendChild(duck)
                    duck.className = "duck"
                    duck.addEventListener("click", function () {
                        score += 100;
                        textElem.textContent = `current score: ${score}/1000, accuracy: ${(score / 100)}/${userClicks}`
                        this.remove();
                        gameRunning = true;
                        playSound()
                    })
                }
                else{
                    currentCells = []
                }


                currentCells.push(duck)

            }
        }


    }
    function start() {
        userClicks = 0
        timerOfAppear = difficulties[Number(difficultySelectorElem.value)]
        numOfDucks = difficultiesNumOfDucks[Number(difficultySelectorElem.value)]+1
        score = 0;
        clearInterval(intrevalId)
        if(currentCells.length != 0)
        {
            for (let i = 0; i < currentCells.length; i++) {
                currentCells[i].remove()
            }
            currentCells = 0
        }
        intrevalId = setInterval(play, timerOfAppear)
        textElem.textContent = "click on the duck to start"
        gameRunning = false;
    }
    createGrid()
    intrevalId = setInterval(play, timerOfAppear);
    restartElem.addEventListener("click", start)
    difficultySelectorElem.addEventListener("change", start)
    window.addEventListener("click", () => {
        if (gameRunning) {
            userClicks += 1; textElem.textContent = `current score: ${score}/1000, accuracy: ${(score / 100)}/${userClicks}`;

        }

    })


}


document.addEventListener("DOMContentLoaded", init)