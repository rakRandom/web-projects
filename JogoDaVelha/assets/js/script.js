const $ = name => document.querySelector(name);

const table = $(".canva").children;
const turnLabel = $("#turn-label");
const winnerLabel = $("#winner-label");

let turn = (Math.random() * 100 > 50) ? "O" : "X";
let gameover = false

start();


function start() {
    turnLabel.innerText = turn;

    $("#reset-button").addEventListener("click", resetGame);

    for (let cell of table)
        cell.addEventListener("click", () => {
            playTurn(cell);
        });
}


function playTurn(cell) {
    if (cell.innerText !== "X" && cell.innerText !== "O" && !gameover){
        cell.innerText = turn;
        turn = (turn === "X") ? "O" : "X";
        
        let winner = getWinner()
        if (winner === "X" || winner === "O") {
            turnLabel.innerText = "--";
            winnerLabel.innerText = winner;
            gameover = true;
        }
        else if (winner === "V") {
            turnLabel.innerText = "--";
            winnerLabel.innerText = "Empate";
            gameover = true;
        }
        else 
            turnLabel.innerText = turn;
    }
}


function getWinner() {
    if ((table[0].innerText === "X" && table[1].innerText === "X" && table[2].innerText === "X") ||
    (table[3].innerText === "X" && table[4].innerText === "X" && table[5].innerText === "X") ||
    (table[6].innerText === "X" && table[7].innerText === "X" && table[8].innerText === "X") ||
    (table[0].innerText === "X" && table[3].innerText === "X" && table[6].innerText === "X") ||
    (table[1].innerText === "X" && table[4].innerText === "X" && table[7].innerText === "X") ||
    (table[2].innerText === "X" && table[5].innerText === "X" && table[8].innerText === "X") ||
    (table[0].innerText === "X" && table[4].innerText === "X" && table[8].innerText === "X") ||
    (table[2].innerText === "X" && table[4].innerText === "X" && table[6].innerText === "X")) {
        return "X";
    } 

    else if ((table[0].innerText === "O" && table[1].innerText === "O" && table[2].innerText === "O") ||
    (table[3].innerText === "O" && table[4].innerText === "O" && table[5].innerText === "O") ||
    (table[6].innerText === "O" && table[7].innerText === "O" && table[8].innerText === "O") ||
    (table[0].innerText === "O" && table[3].innerText === "O" && table[6].innerText === "O") ||
    (table[1].innerText === "O" && table[4].innerText === "O" && table[7].innerText === "O") ||
    (table[2].innerText === "O" && table[5].innerText === "O" && table[8].innerText === "O") ||
    (table[0].innerText === "O" && table[4].innerText === "O" && table[8].innerText === "O") ||
    (table[2].innerText === "O" && table[4].innerText === "O" && table[6].innerText === "O")) {
        return "O";
    }
    else if ((table[0].innerText !== "" && table[1].innerText !== "" && table[2].innerText !== "") &&
    (table[3].innerText !== "" && table[4].innerText !== "" && table[5].innerText !== "") &&
    (table[6].innerText !== "" && table[7].innerText !== "" && table[8].innerText !== "")) {
        return "V";
    }
    return ""
}


function resetGame() {
    for (let cell of table)
        cell.innerText = "";
    turn = (Math.random() * 100 > 50) ? "O" : "X";
    gameover = false
    turnLabel.innerText = turn;
    winnerLabel.innerText = "--";
}