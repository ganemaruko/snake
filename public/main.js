// -1 = player head
// 0~X*Y = player body
// -2 = food
let LENGTH_X = 20;
let LENGTH_Y = 10;
let direction = null;
let position = [0, 0];
let positionFeed = null;
let length = 1;
let board = new Array(LENGTH_X);
let boardElement = document.getElementById("board");
let WIDTH_X = 90 / LENGTH_X;
let WIDTH_Y = 90 / LENGTH_Y;
console.log(WIDTH_Y, WIDTH_X);
console.log(boardElement);
// init
for (let x = 0; x < LENGTH_X; x++) {
    board[x] = new Array(LENGTH_Y);
    for (y = 0; y < LENGTH_Y; y++) {
        board[x][y] = 0;
        let newElement = document.createElement("div");
        newElement.setAttribute("id", String(x) + "-" + String(y));
        newElement.setAttribute("class", "box");
        newElement.style.height = String(WIDTH_Y) + "vh";
        newElement.style.width = String(WIDTH_X) + "vw";
        newElement.style.left = String(WIDTH_X * x) + "vw";
        newElement.style.top = String(WIDTH_Y * y) + "vh";
        boardElement.appendChild(newElement);

    }
}

// key settings
document.addEventListener('keydown',
    event => {
        if (event.key === 'ArrowUp') {
            direction = [0, -1]
        }
        if (event.key === 'ArrowDown') {
            direction = [0, 1]
        }
        if (event.key === 'ArrowLeft') {
            direction = [-1, 0]
        }
        if (event.key === 'ArrowRight') {
            direction = [1, 0]
        }
    });
setInterval(() => {
    move();
    console.log(position);
    isCollapsed();
    decay();
    draw();
}, 200);

function makeFeed(){
    while(true){
        let randX = Math.round(Math.random()*WIDTH_X);
        let randY = Math.round(Math.random()*WIDTH_Y);
        if(board[randX][randY] == 0){
            board[randX][randY] = -2;
            positionFeed = [randX, randY];
            break;
        }
    }
}

function move() {
    if (direction) {
        position[0] += direction[0];
        position[1] += direction[1];
    }
}
function decay() {
    for (let x = 0; x < LENGTH_X; x++) {
        for (let y = 0; y < LENGTH_Y; y++) {
            if (board[x][y] >= 1) {
                board[x][y] -= 1;
            }
        }
    }
    board[position[0]][position[1]] = length;

}
function isCollapsed() {
    if(position[0]==positionFeed[0] & position[1] == positionFeed[1]){
        console.log("eat!");
        makeFeed();
        length += 1;
    }

}

function draw() {
    let element = document.getElementById("player")
    for (let x = 0; x < LENGTH_X; x++) {
        for (let y = 0; y < LENGTH_Y; y++) {
            let element = document.getElementById(String(x) + "-" + String(y))
            element.innerHTML = board[x][y];
            if (board[x][y] >= 1) {
                element.classList.add("snake");
                element.classList.remove("feed");

            }
            else if (board[x][y] == -2) {
                element.classList.add("feed");
                element.classList.add("snake");
            }
            else if( board[x][y] == 0){
                element.classList.remove("snake");
                element.classList.remove("feed");

            }
        }
    }
}
let randX = Math.round(Math.random()*WIDTH_X);
let randY = Math.round(Math.random()*WIDTH_Y);
position = [randX, randY]
// initialize
decay();
makeFeed();
draw();