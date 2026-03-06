const canvas = document.getElementById("canvas");
const canvasContext = canvas.getContext("2d");
const pacmanFrames = document.getElementById("animation");
const ghostFrames = document.getElementById("ghosts");



let createRect = (x, y, width, height, color) => {
    canvasContext.fillStyle = color;
    canvasContext.fillRect(x, y, width, height);
};
let touchStartX = 0;
let touchStartY = 0;

const DIRECTION_RIGHT = 4;
const DIRECTION_UP = 3;
const DIRECTION_LEFT = 2;
const DIRECTION_BOTTOM = 1;
let lives = 3;
let ghostCount = 4;
let ghostImageLocations = [
    { x: 0, y: 0 },
    { x: 176, y: 0 },
    { x: 0, y: 121 },
    { x: 176, y: 121 },
];


// Game variables
let fps = 30;
let pacman;
let oneBlockSize = 20;
let score = 0;
let ghosts = [];
let wallSpaceWidth = oneBlockSize / 1.6;
let wallOffset = (oneBlockSize - wallSpaceWidth) / 2;
let wallInnerColor = "black";
let gameOverState = false;
let victoryState = false;
let isDying = false;

// we now create the map of the walls,
// if 1 wall, if 0 not wall
// 21 columns // 23 rows
// 

let map = [
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1],
    [1, 2, 1, 1, 1, 2, 1, 1, 1, 2, 1, 2, 1, 1, 1, 2, 1, 1, 1, 2, 1],
    [1, 2, 1, 1, 1, 2, 1, 1, 1, 2, 1, 2, 1, 1, 1, 2, 1, 1, 1, 2, 1],
    [1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1],
    [1, 2, 1, 1, 1, 2, 1, 2, 1, 1, 1, 1, 1, 2, 1, 2, 1, 1, 1, 2, 1],
    [1, 2, 2, 2, 2, 2, 1, 2, 2, 2, 1, 2, 2, 2, 1, 2, 2, 2, 2, 2, 1],
    [1, 1, 1, 1, 1, 2, 1, 1, 1, 2, 1, 2, 1, 1, 1, 2, 1, 1, 1, 1, 1],
    [0, 0, 0, 0, 1, 2, 1, 2, 2, 2, 2, 2, 2, 2, 1, 2, 1, 0, 0, 0, 0],
    [1, 1, 1, 1, 1, 2, 1, 2, 1, 1, 0, 1, 1, 2, 1, 2, 1, 1, 1, 1, 1],
    [2, 2, 2, 2, 2, 2, 2, 2, 1, 0, 0, 0, 1, 2, 2, 2, 2, 2, 2, 2, 2],
    [1, 1, 1, 1, 1, 2, 1, 2, 1, 0, 0, 0, 1, 2, 1, 2, 1, 1, 1, 1, 1],
    [0, 0, 0, 0, 1, 2, 1, 2, 1, 1, 1, 1, 1, 2, 1, 2, 1, 0, 0, 0, 0],
    [0, 0, 0, 0, 1, 2, 1, 2, 2, 2, 2, 2, 2, 2, 1, 2, 1, 0, 0, 0, 0],
    [1, 1, 1, 1, 1, 2, 2, 2, 1, 1, 1, 1, 1, 2, 2, 2, 1, 1, 1, 1, 1],
    [1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1],
    [1, 2, 1, 1, 1, 2, 1, 1, 1, 2, 1, 2, 1, 1, 1, 2, 1, 1, 1, 2, 1],
    [1, 2, 2, 2, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 2, 2, 2, 1],
    [1, 1, 2, 2, 1, 2, 1, 2, 1, 1, 1, 1, 1, 2, 1, 2, 1, 2, 2, 1, 1],
    [1, 2, 2, 2, 2, 2, 1, 2, 2, 2, 1, 2, 2, 2, 1, 2, 2, 2, 2, 2, 1],
    [1, 2, 1, 1, 1, 1, 1, 1, 1, 2, 1, 2, 1, 1, 1, 1, 1, 1, 1, 2, 1],
    [1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
];
let originalMap = JSON.parse(JSON.stringify(map));  
let randomTargetsForGhosts = [
    { x: 1 * oneBlockSize, y: 1 * oneBlockSize },
    { x: 1 * oneBlockSize, y: (map.length - 2) * oneBlockSize },
    { x: (map[0].length - 2) * oneBlockSize, y: oneBlockSize },
    {
        x: (map[0].length - 2) * oneBlockSize,
        y: (map.length - 2) * oneBlockSize,
    },
];

// for (let i = 0; i < map.length; i++) {
//     for (let j = 0; j < map[0].length; j++) {
//         map[i][j] = 2;
//     }
// }

let createNewPacman = () => {
    pacman = new Pacman(
       10 * oneBlockSize,
        17 * oneBlockSize,
        oneBlockSize,
        oneBlockSize,
        oneBlockSize / 5
    );
};

let gameLoop = () => {
    update();
    draw();
};


let restartPacmanAndGhosts = () => {
    createNewPacman();
    createGhosts();
};

let onGhostCollision = () => {
    
    if (isDying) return;

    isDying = true;
    lives--;

    setTimeout(() => {

        if (lives <= 0) {
            clearInterval(gameInterval);
           gameOver();
        } else {
            restartPacmanAndGhosts();
            isDying = false;
        }

        

    }, 1500);
};

function checkWin() {
    for (let i = 0; i < map.length; i++) {
        for (let j = 0; j < map[0].length; j++) {

            if (map[i][j] == 2) {
                return; // todavía queda comida
            }

        }
    }

    victoryState = true;
    clearInterval(gameInterval);
     draw();
}

function gameOver(){
    gameOverState = true;
    clearInterval(gameInterval);
     draw();
}

function drawEndMessage(){

    canvasContext.textAlign = "center";
    canvasContext.font = "40px Arial";

 
    if(gameOverState){


        canvasContext.fillStyle = "rgba(0,0,0,0.7)";
        canvasContext.fillRect(0,0,canvas.width,canvas.height);
        canvasContext.fillStyle = "red"
        canvasContext.fillText(
            "GAME OVER",
            canvas.width/2,
            canvas.height/2
        )

    }

    if(victoryState){

        
        canvasContext.fillStyle = "rgba(0,0,0,0.7)";
        canvasContext.fillRect(0,0,canvas.width,canvas.height);
        canvasContext.fillStyle = "yellow"
        canvasContext.fillText(
            "VICTORY",
            canvas.width/2,
            canvas.height/2
        )

    }
}

let update = () => {

    if (isDying) return;

    pacman.moveProcess();
    pacman.eat();
    updateGhosts();

    if (pacman.checkGhostCollision(ghosts)) {
        onGhostCollision();
    }
    checkWin();
};
let drawFoods = () => {
    for (let i = 0; i < map.length; i++) {
        for (let j = 0; j < map[0].length; j++) {
            if (map[i][j] == 2) {
                createRect(
                    j * oneBlockSize + oneBlockSize / 3,
                    i * oneBlockSize + oneBlockSize / 3,
                    oneBlockSize / 3,
                    oneBlockSize / 3,
                    "#FEB897"
                );
            }
        }
    }
};

let drawRemainingLives = () => {
    canvasContext.font = "20px Emulogic";
    canvasContext.fillStyle = "white";
    canvasContext.fillText("Lives: ", 220, oneBlockSize * (map.length + 1));

    for (let i = 0; i < lives; i++) {
        canvasContext.drawImage(
            pacmanFrames,
            2 * oneBlockSize,
            0,
            oneBlockSize,
            oneBlockSize,
            250 + i * oneBlockSize,
            oneBlockSize * map.length + 2,
            oneBlockSize,
            oneBlockSize
        );
    }
};

let drawScore = () => {
    canvasContext.font = "20px Emulogic";
    canvasContext.fillStyle = "white";
    canvasContext.fillText(
        "Score: " + score,
        100,
        oneBlockSize * (map.length + 1)
    );
};

let draw = () => {
    canvasContext.clearRect(0, 0, canvas.width, canvas.height);
    createRect(0, 0, canvas.width, canvas.height, "black");

    drawWalls();
    drawFoods();
    drawGhosts();

    pacman.draw();

    drawScore();
    drawRemainingLives();

    drawEndMessage();
};

let drawWalls = () => {
    for (let i = 0; i < map.length; i++) {
        for (let j = 0; j < map[0].length; j++) {
            if (map[i][j] == 1) {
                createRect(
                    j * oneBlockSize,
                    i * oneBlockSize,
                    oneBlockSize,
                    oneBlockSize,
                    "#342DCA"
                );
                if (j > 0 && map[i][j - 1] == 1) {
                    createRect(
                        j * oneBlockSize,
                        i * oneBlockSize + wallOffset,
                        wallSpaceWidth + wallOffset,
                        wallSpaceWidth,
                        wallInnerColor
                    );
                }

                if (j < map[0].length - 1 && map[i][j + 1] == 1) {
                    createRect(
                        j * oneBlockSize + wallOffset,
                        i * oneBlockSize + wallOffset,
                        wallSpaceWidth + wallOffset,
                        wallSpaceWidth,
                        wallInnerColor
                    );
                }

                if (i < map.length - 1 && map[i + 1][j] == 1) {
                    createRect(
                        j * oneBlockSize + wallOffset,
                        i * oneBlockSize + wallOffset,
                        wallSpaceWidth,
                        wallSpaceWidth + wallOffset,
                        wallInnerColor
                    );
                }

                if (i > 0 && map[i - 1][j] == 1) {
                    createRect(
                        j * oneBlockSize + wallOffset,
                        i * oneBlockSize,
                        wallSpaceWidth,
                        wallSpaceWidth + wallOffset,
                        wallInnerColor
                    );
                }
            }
        }
    }
};

let createGhosts = () => {
    ghosts = [];

    let spawnPositions = [
        {x: 9, y: 10},  // dentro
        {x: 10, y: 10}, // dentro
        {x: 9, y: 11},  // dentro
        {x: 10, y: 11}  // dentro
    ];

    for (let i = 0; i < ghostCount; i++) {

        let pos = spawnPositions[i];
let newGhost = new Ghost(
    pos.x * oneBlockSize,
    pos.y * oneBlockSize,
    oneBlockSize,
    oneBlockSize,
    pacman.speed / 2,
    ghostImageLocations[i].x,
    ghostImageLocations[i].y,
    124,
    116,
    6 + i
);

newGhost.leavingHouse = false;

ghosts.push(newGhost);
    }

ghosts[0].x = 10 * oneBlockSize;
ghosts[0].y = 8 * oneBlockSize;
setTimeout(() => {
    ghosts[1].leavingHouse = true;
}, 2000);

setTimeout(() => {
    ghosts[2].leavingHouse = true;
}, 4000);

setTimeout(() => {
    ghosts[3].leavingHouse = true;
}, 8000);
};

let gameInterval = null;

function startGame() {
    createNewPacman();
    createGhosts();

     startCountdown(3);
}

function stopGame() {
    if (gameInterval) {
        clearInterval(gameInterval);
        gameInterval = null;
    }
}
function resetGame() {

    stopGame();

    score = 0;
    lives = 3;
    isDying = false;
    gameOverState = false;
    victoryState = false;

    
    // restaurar mapa
    map = JSON.parse(JSON.stringify(originalMap));

    ghosts = [];
}

window.addEventListener("keydown", (event) => {

    if (!pacman) return;

    let k = event.keyCode;

    setTimeout(() => {

        if (k == 37 || k == 65) {
            pacman.nextDirection = DIRECTION_LEFT;
        } 
        else if (k == 38 || k == 87) {
            pacman.nextDirection = DIRECTION_UP;
        } 
        else if (k == 39 || k == 68) {
            pacman.nextDirection = DIRECTION_RIGHT;
        } 
        else if (k == 40 || k == 83) {
            pacman.nextDirection = DIRECTION_BOTTOM;
        }

    }, 1);
});
canvas.addEventListener("touchend", function (e) {

    if (!pacman) return;

    let touchEndX = e.changedTouches[0].clientX;
    let touchEndY = e.changedTouches[0].clientY;

    let dx = touchEndX - touchStartX;
    let dy = touchEndY - touchStartY;

    if (Math.abs(dx) > Math.abs(dy)) {

        if (dx > 0) {
            pacman.nextDirection = DIRECTION_RIGHT;
        } else {
            pacman.nextDirection = DIRECTION_LEFT;
        }

    } else {

        if (dy > 0) {
            pacman.nextDirection = DIRECTION_BOTTOM;
        } else {
            pacman.nextDirection = DIRECTION_UP;
        }

    }

});

function startCountdown(seconds) {

    let count = seconds;

    let countdownInterval = setInterval(() => {

        canvasContext.clearRect(0, 0, canvas.width, canvas.height);
        createRect(0, 0, canvas.width, canvas.height, "black");

        canvasContext.fillStyle = "yellow";
        canvasContext.font = "60px Arial";
        canvasContext.textAlign = "center";

        if (count > 0) {
            canvasContext.fillText(count, canvas.width / 2, canvas.height / 2);
        } else {
            canvasContext.fillText("GO!", canvas.width / 2, canvas.height / 2);
        }

        count--;

        if (count < -1) {
            clearInterval(countdownInterval);

            gameInterval = setInterval(gameLoop, 1000 / fps);
        }

    }, 1000);
}

document.addEventListener("DOMContentLoaded", function () {
const modal = document.getElementById("miModal");
const cuerpo = document.getElementById("body")

modal.addEventListener("shown.bs.modal", function () {

    modal.style.overflow = "hidden";
    startGame();
});

modal.addEventListener("hidden.bs.modal", function () {
     cuerpo.style.overflow = "auto";
    resetGame();
});

const restart = document.getElementById("restart");
restart.addEventListener("click", function(){
    resetGame();
    startGame();
})
});