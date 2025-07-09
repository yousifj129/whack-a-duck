function init() {
    const gridElem = document.querySelector(".grid")
    const textElem = document.querySelector("#text")
    const restartElem = document.querySelector("#restart")
    const difficultySelectorElem = document.querySelector("#difficultySelector")
    const cells = []
    difficulties = [
        2000,
        1000,
        800,
        500,
        300
    ]
    let timerOfAppear = 800;
    let score = 0
    let currentCell;
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
    function play() {
        timerOfAppear = difficulties[Number(difficultySelectorElem.value)]
        if (currentCell != undefined) {
            currentCell.remove()
        }
        if (score > 900) {
            textElem.textContent = "YOU WON!"
            clearInterval(intrevalId)

        }
        else {
            const chosenCell = cells[Math.floor(Math.random() * 100)]
            const duck = document.createElement("div")
            duck.className = "duck"
            chosenCell.appendChild(duck)
            duck.addEventListener("click", function () {
                score += 100;
                textElem.textContent = `current score: ${score}/1000, accuracy: ${(score/100)}/${userClicks}`
                this.remove()
                gameRunning = true
            })
            currentCell = duck
        }


    }
    function start() {
        userClicks = 0
        timerOfAppear = difficulties[Number(difficultySelectorElem.value)]
        score = 0;
        clearInterval(intrevalId)
        intrevalId = setInterval(play, timerOfAppear)
        textElem.textContent = "click on the duck to start"
        gameRunning = false;
    }
    createGrid()
    intrevalId = setInterval(play, timerOfAppear);
    restartElem.addEventListener("click", start)
    difficultySelectorElem.addEventListener("change",start)
    window.addEventListener("click", ()=>{
        if(gameRunning){
        userClicks += 1;textElem.textContent = `current score: ${score}/1000, accuracy: ${(score/100)}/${userClicks}`;

        }
    
    })
    
    
}


document.addEventListener("DOMContentLoaded", init)