const startLvlBtns = document.querySelectorAll(".start-levelBtn");

const timerElement = document.getElementById("timer");

const levelsBtn = document.getElementById("menu-btn-levels");
const tutorialBtn = document.getElementById("menu-btn-tutorial");

const menuBtns = document.querySelectorAll(".menu-btn");

const gamePage = document.getElementById("game");
const menuPage = document.getElementById("menu");
const levelsPage = document.getElementById("levels");
const tutorialPage = document.getElementById("tutorial");
const gameAniPage = document.getElementById("gameAnimation");

var playerX = null;
var playerY = null;

var oldPlayerX = null;
var oldPlayerY = null;

let winSqrX = null;
let winSqrY = null;

let levelSizeX = null;
let levelSizeY = null;

var firstTurn = true;
let levelRunning = false;

let keyApickedUp = false;
let keyBpickedUp = false;

var levelCompleted = 1;

levels = [
    {
        levelNum: 1,
        timeLimit: 60,
        cords: [
            "....x...",
            "....x.w.",
            ".p..x...",
            "........",
            "....x..."
        ]
    },
    {
        levelNum: 2,
        timeLimit: 20,
        cords: [
            ".......x.w.",
            "...x.......",
            "...x.......",
            ".p.x...r...",
            "...x.......",
            "...x.......",
        ]
    },
    {
        levelNum: 3,
        timeLimit: 10,
        cords: [
            "......xxxx...xxxx",
            ".....x....x.x...w",
            ".p...x....x.x....",
            "..........x......",
            "......xxxx...xxxx",
            "..........x......",
            ".....x....x.x....",
            ".....x....x.x....",
            "......xxx....xxxx",
            
        ]
    },
    {
        levelNum: 4,
        timeLimit: 25,
        cords: [
            "......x..x..x.x...w",
            ".....xa.x..x......x",
            ".p..x..x....xbxx...",
            "......x..xdx....x..",
            ".....x..x..x..x.x..",
            "....x..x...x..x.x..",
            "......x....x..x.x..",
            ".....x....x...x..x.",
            "......x..x....x..x.",
            "...c.x..x..xxx..xx.",
            "......x.......x....",
        ]
    },
    {
        levelNum: 5,
        timeLimit: 25,
        cords: [
            "......x..x..x.x...w",
            ".....xa.x..x......x",
            ".p..x..x....xbxx...",
            "......x..x.x....x..",
            ".....x..x..x..x.x..",
            "....x..x...x..x.x..",
            "......x....x..x.x..",
            ".....x....x...x..x.",
            "......x..x....x..x.",
            ".....x..x..xxx..xx.",
            "......x.......x....",
        ]
    },
];

// functions:
// ui functions:

function hideButtons() {
    for (var i = levelCompleted + 4; i <= 10; i++) {
        var btn = document.getElementById(`levelbtn-${i}`);
        if (btn) {
            btn.className = "hidden";
        }
    }
    if (levelCompleted > 1) {
        var lastLevel = levelCompleted;
        var lastLevelBtn = document.getElementById(`levelbtn-${lastLevel}`);
        console.log(lastLevelBtn)
        lastLevelBtn.className = "start-levelBtn";
        console.log(levelCompleted)

    }
}
hideButtons()

startLvlBtns.forEach(function(lvlBtn) {
    lvlBtn.addEventListener('click', function() {
        console.log(lvlBtn);
        var levelNum = parseInt(lvlBtn.id.slice("levelBtn-".length));
        console.log(levelNum)
        drawLevel(levels[levelNum - 1]);
        levelsPage.style.display = "none";
        gamePage.style.display = "block";
    });
});

levelsBtn.addEventListener('click', function() {
    menuPage.style.display = "none";
    levelsPage.style.display = "flex";
})

menuBtns.forEach(function(menuBtn) {
    menuBtn.addEventListener('click', function() {
        menuPage.style.display = "flex";
        levelsPage.style.display = "none";
        tutorialPage.style.display = "none";
    });
});

tutorialBtn.addEventListener('click', function() {
    menuPage.style.display = "none";
    tutorialPage.style.display = "flex";
})

// game functions

function drawLevel(level) {
    console.log(level)
    console.log(level.cords.length)

    for (y = 0; y < level.cords.length;y++) {
        let row = level.cords[y];
        const rowElement = document.createElement('div');
        rowElement.className = "row";
        rowElement.id = `row-${y}`;
        gamePage.appendChild(rowElement);
        levelSizeY = level.cords.length;
        for (x = 0; x < row.length; x++) {
            let symbol = row[x];
            const square = document.createElement('div');
            square.className = "square";
            square.id = `square-${x}-${y}`;

            levelSizeX = row.length;

            if (symbol === "x") {
                square.className = "square obstacle";
                square.style.backgroundColor = "black"
            }
            if (symbol === "p") {
                square.style.backgroundColor = "green";
                playerX = x;
                playerY = y;
            }
            if (symbol === "w") {
                square.style.backgroundColor = "yellow";
                square.className = "square winSquare";
                winSqrX = x;
                winSqrY = y;
                console.log(y);
                console.log(winSqrY);
                console.log(x);
                console.log(winSqrX);
            }
            if (symbol === "a") {
                square.style.backgroundColor = "#ADD8E6";
                square.className = "square keyA";
                const keyAimg = document.createElement('img');
                keyAimg.style.width = "30px";
                keyAimg.id = `keyA`;
                keyAimg.src = "key.png"
                square.appendChild(keyAimg);
            }
            if (symbol === "b") {
                square.style.backgroundColor = "#ADD8E6";
                square.className = "square keyAgate";
                const gateA = document.createElement('img');
                gateA.style.width = "30px";
                gateA.id = `gateA`;
                gateA.src = "cross.png"
                square.appendChild(gateA);
            }
            if (symbol === "c") {
                square.style.backgroundColor = "pink";
                square.className = "square keyB";
                const keyBimg = document.createElement('img');
                keyBimg.style.width = "30px";
                keyBimg.id = `keyB`;
                keyBimg.src = "key.png"
                square.appendChild(keyBimg);
            }
            if (symbol === "d") {
                square.style.backgroundColor = "pink";
                square.className = "square keyBgate";
                const gateB = document.createElement('img');
                gateB.style.width = "30px";
                gateB.id = `gateB`;
                gateB.src = "cross.png"
                square.appendChild(gateB);
            }
            if (symbol === "r") {
                square.className = "square rEnemy";
                square.style.backgroundColor = "red"
            }

            rowElement.appendChild(square);
        }
    }

    var timerText = document.getElementById("timerText");


    if (!timerText) {
        var timerText = document.createElement("h2");
        timerText.id = "timerText";
        timerText.style.fontSize = "32px";
        timerText.innerHTML = "30.00s";
        timerElement.style.display = "flex";
        timerElement.style.alignItems = "center";
        timerElement.style.justifyContent = "center";
        timerElement.appendChild(timerText);
    }



    levelRunning = true;
    gameClock(level.timeLimit);
    //drawPlayer();
    //drawEnd();
}

let intervalId;

function gameClock(t) {
    console.log(t);
    let remainingTime = t * 100;
    let timerId, secondId;

    function updateTimer() {
        let seconds = Math.floor(remainingTime / 100);
        let hundreds = remainingTime % 100;
        var timerText = document.getElementById("timerText");
        timerText.innerHTML = `${seconds}.${hundreds}s`;
        
        if (seconds < 6) {
            timerText.style.color = "green";
            if (seconds < 4) {
                timerText.style.color = "orange";
            }
            if (seconds < 2) {
                timerText.style.color = "red";
            }
        }
    }

    function runEverySecond() {
        console.log("running every second!")
        var rEnemies = document.getElementsByClassName("rEnemy");
        for (let i = 0; i < rEnemies.length; i++) {
            let enemyStartPosition = rEnemies[i].id;
            let enemyStartElement = rEnemies[i];
            let parts = enemyStartPosition.split('-');
            let startX = parseInt(parts[1]);
            let startY = parseInt(parts[2]);

            let enemyEndPosition = `square-${startX}-${startY - 1}`;
            let endPosition = document.getElementById(enemyEndPosition);

            endPosition.style.backgroundColor = "red";
            endPosition.classList.add("rEnemy");
            
            console.log("End = ", endPosition);
            console.log("End Class", endPosition.className);

            rEnemies[i].style.backgroundColor = "purple";
            rEnemies[i].className = "square";
            console.log("Start = ", rEnemies[i]);
        }
    }

    timerId = setInterval(function() {
        updateTimer();
        remainingTime--;

        if (remainingTime < 0) {
            killPlayer("red");
            clearInterval(timerId);
            clearInterval(secondId);
            var timerText = document.getElementById("timerText");
            timerText.style.color = "black";
        }
    }, 10);

    secondId = setInterval(runEverySecond, 1000);
}

function movePlayer() {
    if (levelRunning) {
        checkCollision()
        const playerElement = document.getElementById(`square-${playerX}-${playerY}`);
        playerElement.style.backgroundColor = "green";
        const oldElement = document.getElementById(`square-${oldPlayerX}-${oldPlayerY}`);
        oldElement.style.backgroundColor = "white";
        oldElement.style.background = "white";
        console.log(oldElement)
        
        if (firstTurn) {
            const playerElement = document.getElementById(`square-${playerX}-${playerY}`);
            playerElement.style.backgroundColor = "green";
        }
        console.log("WinSqr = " + winSqrX + ": " + winSqrY);
        console.log("PlayerSqr = " + playerX + ": " + playerY);
        console.log("levelSize = " + levelSizeX + ": " + levelSizeY);
        if (playerX < 3 && playerY < 2) {
            console.log("hide")
            document.getElementById("timer").style.opacity = "0.3";
        } else {
            document.getElementById("timer").style.opacity = "1";
        }
    }

}

function killPlayer (color) {
    if (color === "red") {
        backColor = "rgb(255 50 50)";
    } else if (color === "green") {
        backColor = "rgb(50 255 50)";
    }
    levelRunning = false;
    console.log(levelRunning);
    console.log("GAME OVER YOU BAD PLAYER!");
    gameAniPage.style.display = "block";
    gameAniPage.style.pointerEvents = "all";

    timerElement.style.backgroundColor = "transparent"

    gameAniPage.style.width = "100%";
    gameAniPage.style.height = "100vh";
    gameAniPage.style.backgroundColor = backColor;

    const steps = 50; 
    const interval = 1000 / steps;

    for (let x = 0; x <= steps; x++) {
        setTimeout(() => {
            gameAniPage.style.backdropFilter = "blur(" + x / steps * 100 + "px)"; 
            gameAniPage.style.opacity = x / steps / 2;
        }, x*interval);
    }

    setTimeout(() => {
        for (let i = gamePage.children.length - 1; i >= 0; i--) {
            let child = gamePage.children[i];
            if (child.id !== "timer") {
                gamePage.removeChild(child);
            }
        }
        gamePage.style.display = "none";
        menuPage.style.display = "flex";
        gameAniPage.style.display = "none";
        gameAniPage.style.pointerEvents = "none";
        timerElement.style.backgroundColor = "white";
    }, 1000);
}

document.addEventListener("keydown", function(event) {
    if (levelRunning) {
        console.log("Key pressed:", event.key);
        if (event.key == 'w') {
            oldPlayerX = playerX;
            oldPlayerY = playerY;
            playerY = playerY - 1;
            playerX = playerX;
            if (playerY === -1) {
                playerY = playerY + 1;
            }
            movePlayer()
        }
        if (event.key == 's') {
            oldPlayerX = playerX;
            oldPlayerY = playerY;
            playerY = playerY + 1;
            playerX = playerX;
            if (playerY === levelSizeY) {
                playerY = playerY - 1;
            }
            movePlayer()
        }
        if (event.key == 'a') {
            oldPlayerX = playerX;
            oldPlayerY = playerY;
            playerY = playerY;
            playerX = playerX - 1;
            if (playerX === -1) {
                playerX = playerX + 1;
            }
            movePlayer()
        }
        if (event.key == 'd') {
            oldPlayerX = playerX;
            oldPlayerY = playerY;
            playerY = playerY;
            playerX = playerX + 1;
            if (playerX === levelSizeX) {
                playerX = playerX - 1;
            }
            movePlayer()
        }
    }
})

//function drawEnd(){
//    let endYPosition = Math.floor(Math.random() * 10) + 1;
//    console.log(endYPosition);
//    const endElement = document.getElementById(`square-20-${endYPosition}`)
//    endElement.style.backgroundColor = "yellow";
//    winSqrY = endYPosition;
//}

function checkCollision() {
    if (playerX === winSqrX && playerY === winSqrY) {
        clearInterval(intervalId);
        console.log("You completed the game!");
        keyApickedUp = false;
        keyBpickedUp = false;
        timerText.style.color = "black";
        killPlayer("green");
        levelCompleted = levelCompleted + 1;
        hideButtons();
    }
    var playerSqr = document.getElementById(`square-${playerX}-${playerY}`)
    if (playerSqr.className === "square obstacle") {
        clearInterval(intervalId);
        killPlayer("red");
    }
    if (playerSqr.className === "square keyA") {
        document.getElementById("keyA").style.display = "none";
        keyApickedUp = true;
        document.getElementById("gateA").style.display = "none";
        //let gateELements = document.getElementsByClassName("square keyAgate");
        //for (let i = 0; i < gateELements.length; i++) {
        //    gateELements[i].style.backgroundColor = "white";
        //}
    }
    if (playerSqr.className === "square keyAgate" && keyApickedUp === false) {
        clearInterval(intervalId);
        killPlayer("red");
    }
    if (playerSqr.className === "square keyB") {
        document.getElementById("keyB").style.display = "none";
        keyBpickedUp = true;
        document.getElementById("gateB").style.display = "none";
        //let gateELements = document.getElementsByClassName("square keyAgate");
        //for (let i = 0; i < gateELements.length; i++) {
        //    gateELements[i].style.backgroundColor = "white";
        //}
    }
    if (playerSqr.className === "square keyBgate" && keyBpickedUp === false) {
        clearInterval(intervalId);
        killPlayer("red");
    }
    if (playerSqr.className === "square rEnemy") {
        clearInterval(intervalId);
        killPlayer("red");
    }
}