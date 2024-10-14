const startLvlBtns = document.querySelectorAll(".start-levelBtn");

const timerElement = document.getElementById("timer");

const levelsBtn = document.getElementById("menu-btn-levels");
const tutorialBtn = document.getElementById("menu-btn-tutorial");
const settingsBtn = document.getElementById("menu-btn-settings");
const creditsBtn = document.getElementById("menu-btn-credits");

const menuBtns = document.querySelectorAll(".menu-btn");

const gamePage = document.getElementById("game");
const menuPage = document.getElementById("menu");
const levelsPage = document.getElementById("levels");
const tutorialPage = document.getElementById("tutorial");
const settingsPage = document.getElementById("settings");
const creditsPage = document.getElementById("credits");
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
let gameDifficulty = 0.75;
let timerOpacity = 30;
let currentLevel = null;

levels = [
    {
        levelNum: 1,
        timeLimit: 30,
        cords: [
            "....x..",
            "....x.w",
            ".p..x..",
            "......."
        ]
    },
    {
        levelNum: 2,
        timeLimit: 8,
        cords: [
            "......x..",
            "...x..x..",
            "...x..x.w",
            ".p.x..x..",
            "...x.....",
        ]
    },
    {
        levelNum: 3,
        timeLimit: 10,
        cords: [
            "...x...xx...x",
            "...x.x....x..",
            "...x..x..xxx.",
            "...xx.x......",
            ".p.x..x..xxx.",
            ".....x..x....",
            "...xx..x..w..",
        ]
    },
    {
        levelNum: 4,
        timeLimit: 9,
        cords: [
            "...ax...x..w",
            "....x.x.x.x.",
            ".p..x.x.x.x.",
            "....x.x...x.",
            "....x.xxxxx.",
            "......b.....",
        ]
    },
    {
        levelNum: 5,
        timeLimit: 18,
        cords: [
            "......axw",
            "...xxxxx.",
            "...x...x.",
            ".p.x.x.x.",
            "...xcx.x.",
            "...xxx.d.",
            "...b...x.",
            "...xxxxxx",
            ".........",
        ]
    },
    {
        levelNum: 6,
        timeLimit: 32,
        cords: [
            "....x..........x.x.x..w",
            "....x.xxxx....x...x....",
            "....x....x....x.x..x...",
            ".p...xxx..x...x..x.xbxx",
            "xx.xx...x.x...xx.x.x...",
            "ax....x...x...x..x...x.",
            "..x.xx.xxx....x..x.xx..",
            "x...xc.x.......x.x.....",
            "xxx.xx...x.....d.x.x.xx",
            
        ]
    },
    {
        levelNum: 7,
        timeLimit: 22,
        cords: [
            "axc........x.x.w",
            "..xuxuxu.u....x.",
            "...x.x.x..uxu.xd",
            ".p....u..u...x..",
            "...xuxxx..ux..x.",
            "..xxxxxx.u..x...",
            ".xxxxxxxx.uu.bxx",
        ]
    },
    {
        levelNum: 8,
        timeLimit: 18,
        cords: [
            "................................",
            "................................",
            "................b...............",
            ".p..............................",
            "................................",
            "..xxxxxxx......................",
            "x.......xx.....................",
            "x.uuuuuuax......................",
            ".xxxxxxxx.......................",
            "................................",
            "................................",
            "................................",
            "................................",
            "................................",
            "................................",
            "................................",
            "................................",
            
        ]
    },
    {
        levelNum: 9,
        timeLimit: 18,
        cords: [
            "......axw",
            "...xxxxx.",
            "...x...x.",
            ".p.x.x.x.",
            "...xcx.x.",
            "...xxx.d.",
            "...b...x.",
            "...xxxxxx",
            ".........",
        ]
    },
];

// functions:
// ui functions:

function hideButtons() {
    for (var i = levelCompleted + 8; i <= 10; i++) {
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
        currentLevel = levelNum;
        console.log("cur" + currentLevel)
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
        settingsPage.style.display = "none";
        creditsPage.style.display = "none";
    });
});

tutorialBtn.addEventListener('click', function() {
    menuPage.style.display = "none";
    tutorialPage.style.display = "flex";
})

settingsBtn.addEventListener('click', function() {
    menuPage.style.display = "none";
    settingsPage.style.display = "flex";
})

creditsBtn.addEventListener('click', function() {
    menuPage.style.display = "none";
    creditsPage.style.display = "flex";
})

// settings functions 

const difSlider = document.getElementById('difficulty-slider');
const difText = document.getElementById('difficulty-text');

function updateDifficulty() {
    console.log("what the sigma")
    const value = difSlider.value;

    if (value == 1) {
        difText.textContent = 'Difficulty: Easy';
        gameDifficulty = 1;
    } else if (value == 2) {
        difText.textContent = 'Difficulty: Medium';
        gameDifficulty = 0.75;
    } else if (value == 3) {
        difText.textContent = 'Difficulty: Hard';
        gameDifficulty = 0.5;
    }
}

difSlider.addEventListener('input', updateDifficulty);

const opaSlider = document.getElementById('opacity-slider');
const opaText = document.getElementById('opacity-text');

function updateOpacity() {
    const value = opaSlider.value;
    opaText.textContent = 'Timer opacity: ' + value + "%";
    timerOpacity = value;
}

opaSlider.addEventListener('input', updateOpacity);

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
                console.log("da winX ist:" + winSqrX);
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
            if (symbol === "u") {
                square.className = "square uEnemy U";
                square.style.backgroundColor = "red"
            }
            if (symbol === "r") {
                square.className = "square rEnemy R";
                square.style.backgroundColor = "red"
            }
            if (symbol === "l") {
                square.className = "square rEnemy L";
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
    gameClock(level.timeLimit * gameDifficulty);
    //drawPlayer();
    //drawEnd();
}

let timerId, secondId;

function gameClock(t) {
    console.log(t);
    let remainingTime = t * 100;

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
        let uEnemies = document.querySelectorAll(".uEnemy");
        uEnemies.forEach(function(enemySqr) {
            enemySqr.offsetHeight;
            let enemyStartPosition = enemySqr.id;
            let enemyStartElement = enemySqr;
            let parts = enemyStartPosition.split('-');
            let startX = parseInt(parts[1]);
            let startY = parseInt(parts[2]);

            if (enemyStartElement.classList.contains("uEnemy") && enemyStartElement.classList.contains("U")) {
                console.log("found U element!");
                if (playerX === startX && playerY === startY - 1) {
                    killPlayer("red");
                    clearInterval(timerId);
                    clearInterval(secondId);
                    console.log("player died"); 
                }
                let enemyEndPosition = `square-${startX}-${startY - 1}`;
                let endPosition = document.getElementById(enemyEndPosition);

                endPosition.style.backgroundColor = "red";

                enemyStartElement.style.backgroundColor = "white";
                enemyStartElement.classList.remove("uEnemy");
                enemyStartElement.classList.remove("U");
                endPosition.className = "square uEnemy D";
                endPosition.offsetHeight;
            } else if (enemyStartElement.classList.contains("uEnemy") && enemyStartElement.classList.contains("D")) {
                console.log("found D element!");
                if (playerX === startX && playerY === startY + 1) {
                    killPlayer("red");
                    clearInterval(timerId);
                    clearInterval(secondId);
                    console.log("player died")
                }
                let enemyEndPosition = `square-${startX}-${startY + 1}`;
                let endPosition = document.getElementById(enemyEndPosition);

                endPosition.style.backgroundColor = "red";

                enemyStartElement.style.backgroundColor = "white";
                enemyStartElement.classList.remove("uEnemy");
                enemyStartElement.classList.remove("D");
                endPosition.className = "square uEnemy U";
                endPosition.offsetHeight;
            }
        });

        let rEnemies = document.querySelectorAll(".rEnemy");
        rEnemies.forEach(function(enemySqr) {
            enemySqr.offsetHeight;
            let enemyStartPosition = enemySqr.id;
            let enemyStartElement = enemySqr;
            let parts = enemyStartPosition.split('-');
            let startX = parseInt(parts[1]);
            let startY = parseInt(parts[2]);

            if (enemyStartElement.classList.contains("rEnemy") && enemyStartElement.classList.contains("R")) {
                console.log("found U element!");
                if (playerX === startX + 1 && playerY === startY) {
                    killPlayer("red");
                    clearInterval(timerId);
                    clearInterval(secondId);
                    console.log("player died"); 
                }
                let enemyEndPosition = `square-${startX + 1}-${startY}`;
                let endPosition = document.getElementById(enemyEndPosition);

                endPosition.style.backgroundColor = "red";

                enemyStartElement.style.backgroundColor = "white";
                enemyStartElement.classList.remove("rEnemy");
                enemyStartElement.classList.remove("R");
                endPosition.className = "square rEnemy L";
                endPosition.offsetHeight;
            } else if (enemyStartElement.classList.contains("rEnemy") && enemyStartElement.classList.contains("L")) {
                console.log("found D element!");
                if (playerX === startX - 1 && playerY === startY) {
                    killPlayer("red");
                    clearInterval(timerId);
                    clearInterval(secondId);
                    console.log("player died")
                }
                let enemyEndPosition = `square-${startX - 1}-${startY}`;
                let endPosition = document.getElementById(enemyEndPosition);

                endPosition.style.backgroundColor = "red";

                enemyStartElement.style.backgroundColor = "white";
                enemyStartElement.classList.remove("rEnemy");
                enemyStartElement.classList.remove("L");
                endPosition.className = "square rEnemy R";
                endPosition.offsetHeight;
            }
        
        });
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
            document.getElementById("timer").style.opacity = timerOpacity * 0.01;
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
        clearInterval(timerId);
        clearInterval(secondId);
        console.log("You completed the game!");
        keyApickedUp = false;
        keyBpickedUp = false;
        timerText.style.color = "black";
        killPlayer("green");
        if (currentLevel === levelCompleted) {
            levelCompleted = levelCompleted + 1;
            document.getElementById("menu-difficulty").src = "stars/level" + (levelCompleted - 1) + ".png";
            hideButtons();
        }
    }
    var playerSqr = document.getElementById(`square-${playerX}-${playerY}`)
    if (playerSqr.className === "square obstacle") {
        clearInterval(timerId);
        clearInterval(secondId);
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
        clearInterval(timerId);
        clearInterval(secondId);
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
        clearInterval(timerId);
        clearInterval(secondId);
        killPlayer("red");
    }
    if (playerSqr.classList.contains("uEnemy")) {
        clearInterval(timerId);
        clearInterval(secondId);
        killPlayer("red");
    }
}