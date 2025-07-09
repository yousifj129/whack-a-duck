function init(){
    const gridWrapperElem = document.querySelector(".grid-wrapper")
    const gridElem = document.querySelector(".grid")
    const textElem = document.querySelector("h1")
    const cells = []
    let score = 0
    let currentCell;
    let intrevalId;
    function createGrid(){
        
        for(let i=0; i<100; i++){
            const cell = document.createElement("div")
            
            cell.className = "cell"
            cells.push(cell)
            gridElem.append(cell)
        }
    }
    function play(){
        if(currentCell != undefined){
            currentCell.remove()
        }
        if(score > 900)
        {
            textElem.textContent = "YOU WON!"
            clearInterval(intrevalId)
            
        }
        else{
            const chosenCell = cells[Math.floor(Math.random()*100)]
            console.log(chosenCell)
            const duck = document.createElement("div")
            duck.className = "duck"
            chosenCell.appendChild(duck)
            duck.addEventListener("click", function(){
                score += 100;
                textElem.textContent = `current score: ${score}/1000`
                this.remove()
            })
            currentCell = duck
        }

        
    }
    createGrid()
    intrevalId = setInterval(play, 2000);
}


document.addEventListener("DOMContentLoaded", init)