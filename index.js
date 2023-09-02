const tiles = Array.from(document.querySelectorAll('.tile'));

let isGameActive = true;
let positions = [[-1, -2, -3], [-4, -5, -6], [-7, -8, -9]];
var currentPlayer = 'X';
var winX = 0;
var winO = 0;
var tie = 0;

const fixPlayer = () => {
    if (currentPlayer === 'X') {
        document.querySelector(".tickX").classList.remove('hide');
        document.querySelector(".tickO").classList.add('hide');
    }
    else {
        document.querySelector(".tickX").classList.add('hide');
        document.querySelector(".tickO").classList.remove('hide');
    }
}

fixPlayer();

const isValidAction = (tile) => {
    if (tile.innerText === 'X' || tile.innerText === 'O'){
        return false;
    }

    return true;
};

function isTie() {
    for (let i = 0; i < positions.length; i++) {
        for (let j = 0; j < positions[i].length; j++) {
            if (positions[i][j] < 0) {
                return false;
            }
        }
    }
    return true;
}

const updatePosition =  (index) => {
    var row = Math.floor(index/3);
    var col;
    if (index > 5) {
        col = index - 6;
    }
    else if (index > 2) {
        col = index - 3;
    }
    else{
        col = index;
    }
    if (currentPlayer === 'X'){
        positions[row][col] = 1;
    }
    else{
        positions[row][col] = 0;
    }
}

function handleResultValidation() {
    for (var i=0; i<3; i++){
        if (positions[i][0] === positions[i][1] && positions[i][0] === positions[i][2]){
            return positions[i][0];
        }
        if (positions[0][i] === positions[1][i] && positions[0][i] === positions[2][i]){
            return positions[0][i];
        }
    }
    if (positions[0][0] === positions[1][1] && positions[0][0] === positions[2][2]){
        return positions[0][0];
    }
    if (positions[0][2] === positions[1][1] && positions[0][2] === positions[2][0]){
        return positions[0][2];
    }
    if (isTie()) {
        return 2;
    }
    return -1;
}

const changePlayer = () => {
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
}

function announceWinner(result) {
    isGameActive = false;
    if (result === 2) {
        tie = tie + 1;
        document.querySelector(".wins .tie").innerHTML = tie;
        document.querySelector(".result").innerHTML = "TIE! 😛";
        return;
    }
    winner = result === 1 ? "X" : "O";
    if (winner === "X") {
        winX = winX + 1;
        document.querySelector(".wins .playerX").innerHTML = winX;
        document.querySelector(".result").innerHTML = "🚩 Player 1 Wins!";
    }
    else {
        winO = winO + 1;
        document.querySelector(".wins .playerO").innerHTML = winO;
        document.querySelector(".result").innerHTML = "Player 2 Wins! 🚩";
    }
}

const userAction = (tile, index) => {
    if(isValidAction(tile) && isGameActive) {
        tile.innerText = currentPlayer;
        if (currentPlayer === 'X'){
            tile.style.color = "#4ecc5f";
        }
        else{
            tile.style.color = "#cc4ea2";
        }
        updatePosition(index);
        result = handleResultValidation();
        if (result > -1) {
            announceWinner(result);
        }
        else {
            changePlayer();
        }
    }
}

const resetGame = () => {
    isGameActive = true;
    document.querySelector(".result").innerHTML = "Let's Play! 🏁";
    changePlayer();
    fixPlayer();

    tiles.forEach(tile => {
        tile.innerText = '';
    });
    let val = 0;
    for (let i = 0; i < positions.length; i++) {
        for (let j = 0; j < positions[i].length; j++) {
            val = val - 1;
            positions[i][j] = val;
        }
    }
}

tiles.forEach( (tile, index) => {
    tile.addEventListener('click', () => userAction(tile, index));
});

document.querySelector("button").addEventListener('click', resetGame);