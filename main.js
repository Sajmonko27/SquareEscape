const startLvlBtns = document.querySelectorAll(".start-levelBtn");

const timerElement = document.getElementById("timer");

const levelsBtn = document.getElementById("menu-btn-levels");
const tutorialBtn = document.getElementById("menu-btn-tutorial");
const settingsBtn = document.getElementById("menu-btn-settings");
const creditsBtn = document.getElementById("menu-btn-credits");
const randomLevelBtn = document.getElementById("menu-btn-random");
const achievmentsBtn = document.getElementById("menu-btn-achievments");
const resetProgressBtn = document.getElementById("reset-btn");

const menuBtns = document.querySelectorAll(".menu-btn");

const gamePage = document.getElementById("game");
const menuPage = document.getElementById("menu");
const levelsPage = document.getElementById("levels");
const tutorialPage = document.getElementById("tutorial");
const settingsPage = document.getElementById("settings");
const creditsPage = document.getElementById("credits");
const achievmentsPage = document.getElementById("achievments");
const gameAniPage = document.getElementById("gameAnimation");
const gameHintPage = document.getElementById("hintPage");

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

let levelCompleted = 1;
let gameDifficulty = 0.75;
let timerOpacity = 30;
let currentLevel = null;

let arrowControls = 0;

let achievmentOne = 0;
let achievmentOneDate = null;
let achievmentTwo = 0;
let achievmentTwoDate = null;
let achievmentThree = 0;
let achievmentThreeDate = null;

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
        timeLimit: 20,
        cords: [
            "...x...r.x....bw",
            "...x..x..xvv..x.",
            ".....x.r.x....x.",
            ".p..x...xr..l.x.",
            "...x...x....x.x.",
            "..x...x.x.uux.x.",
            ".x.r...x....x.x.",
            "xauv..x.x...x.x.",
            ".r..........x.r.",
        ]
    },
    {
        levelNum: 9,
        timeLimit: 35,
        cords: [
            "a.........x...x.....xx..x.d...w.",
            "....x.x.x...x.xr.x.lx.x.x.xxxxx.",
            "xxxxxxx.x.xx..xr.x.lx.....x.....",
            ".......x.x...x.r.x.lx.xx..x.xxxx",
            ".p......x..xx..r.x.lx.....x.....",
            "x............x.r.x.lx..xx.xxxxx.",
            ".x.xxxxx.xxx..xr.x.lx.....x.....",
            "..x....xx...x.xr.x.lx...x.x...xx",
            "..cxxx.x..x...xr.x.lx.xx....x...",
            "..x..x...x.x.x.r.x.lxx...x.x.x..",
            "x.....bx.x.x..xr.x.lx..x..x...x.",
            "...x....x.x.x....x....x.x...x...",
            
        ]
    },
    {
        levelNum: 10,
        timeLimit: 120,
        cords: [
            "...xxxxx.x.x.x.x.x.....x...xv.v.....v.vxxxxx............",
            "...x...x..x.x..x.x.....v...x...........xxxxxx..xxxxxxx..",
            "...x...x.x.x.x.x.x......r..xv.v.....vvv..xxxxx..xxxxx..x",
            "...x...x..x.x..x.x......r..x...........x.xxxxxx..xxx..xx",
            ".p.xxxxx.x.x.x.x.x.....u...x.u..xxx....x.lxxxxxx..xxx..x",
            "...............x.xr..lx....x...x.l.xu.ux.lxxxxxxx..xxx..",
            "...xxxxx...x...x.xr..lxr.r.x..x...l.x..x.lxxxxxxxx..xxx.",
            "...xx.xx..x.x..x.xr..lx.l..x.xvvvx.l.x.x.lxxxxxxxxx.xxx.",
            "...x.x.x.x.x.x.x.xr..lx.l..x.....b.r.xxx.lxxxxxxxx..xxx.",
            "...xx.xx..x.x..x.xr..lx.luuxxx...xr..x.x.lxxxxxxx..xxx..",
            "...xxxxx...x...x.xr..lx....x..xuur..x..x.lxxxxxx..xxx..x",
            "xxxxx..........x.xr..lx.lr.x...xr..x...x.lxxxxx..xxx..xx",
            "x.x.x.xxxxxxxxxx.xr..lxr.r.x....x.x....x.lxxxx..xxx..xxx",
            "xx.xx?x..........xr..lx.lr.x...........x.lxxx..xxx..xxxx",
            "x.x.x.xxxxxxxxxxxxr..lxr.r.xxxxxxxxxxx.x.lxx..xxx..xxxxx",
            "xxxxx..xx.....xxxxr..lxr.r..r..l.......x.lxx.xxx..xxxxxx",
            "........xxcxx...xxxx..xxxxxr..l.vvvxuuux.xxx..xxx..xxxxx",
            "x.......xxxxxxx..xxxx..xxxxr..l.....l..x.xxxx..xxx..xxxx",
            "xx......xxxxxxxx..xxxx.xxxxr..v.v.v..uux.xxxxx..xxx..xxx",
            "xxx......xxxxxxxx......xxxxr.u.u.u.uxx.x.xxxxxx..xxx..xx",
            "xxxx...x.xxxxxxxxx..xxxxxxxr..v.v.v..d.x.xxxxxxx.xxxx..x",
            "xxxx..xx..xxxxxx.....xxxxxxr.x.v.v.v.x.x.xxxxxx..xxxxx..",
            "xxx..xxxx..xxxx..xxx.xxxxxxr..l.xr...x.x.xxxxx..xxxxxxx.",
            "xx..xxxxxx.xxxxxxxxx.xxxxxxr..lxxr..ux.x.xxxx..xxxxxxx..",
            "x..xxxxxxx...xxxxxxx#xxxxxx..lxxxr.xxx.x.xxx..xxxxxxx..x",
            "..##########...xxxxx.xxxxxx.xxxxxx.....x.xx..xxxxxxx..xx",
            "axxxxxxxxxxxxx..x....xxx..x.xxxxxxuuuu.x.x..xxxxxxx..xxx",
            "xxxxxxxxxxxxxxx...xx.....xx.xxxxxxxxxxxx...xxxxxxx.....w",

            
        ]
    },
];

// functions:
// ui functions:

function loadLocalMaxLevel() {
    const localMaxLevel = localStorage.getItem('localMaxLevel');
    if (localMaxLevel) {
        levelCompleted = parseInt(localMaxLevel);
        console.log('Loaded localMaxLevel:', localMaxLevel);
        return localMaxLevel;
    }
    return null;
}
loadLocalMaxLevel()

function hideButtons() {
    minHiddenLevel = levelCompleted + 1;
    document.getElementById("menu-difficulty").src = "stars/level" + (levelCompleted - 1) + ".png";
    for (var i = minHiddenLevel; i <= 10; i++) {
        var btn = document.getElementById(`levelbtn-${i}`);
        if (btn) {
            btn.className = "hidden";
        }
    }
    for (var i = levelCompleted - 1; i >= 1; i--) {
        var btn = document.getElementById(`levelbtn-${i}`);
        if (btn) {
            btn.className = "start-completedLevel";
            btn.style.backgroundColor = "rgb(215 255 95)";    
        }
    }
    if (levelCompleted > 1) {
        var lastLevel = levelCompleted;
        var lastLevelBtn = document.getElementById(`levelbtn-${lastLevel}`);
        if (lastLevelBtn) {
            lastLevelBtn.className = "start-levelBtn";
        }

    }
}
hideButtons();

//achievements saving

function saveAchievment(name,value) {
    localStorage.setItem(name, value);
    console.log(name, value);
}

function currentDate() {
    const currentDate = new Date();
    
    const day = String(currentDate.getDate()).padStart(2, '0');
    const month = String(currentDate.getMonth() + 1).padStart(2, '0'); 
    const year = currentDate.getFullYear();
    
    const hours = String(currentDate.getHours()).padStart(2, '0');
    const minutes = String(currentDate.getMinutes()).padStart(2, '0'); 
    
    return `${day}/${month}/${year} ${hours}:${minutes}`;
}

function updateAchievments() {
    //update achievments from local storage
    let achievmentOneDateElement = document.getElementById("achievmentOneDate")
    let achievmentTwoDateElement = document.getElementById("achievmentTwoDate")
    let achievmentThreeDateElement = document.getElementById("achievmentThreeDate")

    if (localStorage.getItem('achievmentOne') == 1) {
        achievmentOne = 1;
        achievmentOneDate = localStorage.getItem('achievmentOneDate')
        achievmentOneDateElement.innerHTML = achievmentOneDate;
    }
    if (localStorage.getItem('achievmentTwo') == 1) {
        achievmentTwo = 1;
        achievmentTwoDate = localStorage.getItem('achievmentTwoDate')
        achievmentTwoDateElement.innerHTML = achievmentTwoDate;
    }
    if (localStorage.getItem('achievmentThree') == 1) {
        achievmentThree = 1;
        achievmentThreeDate = localStorage.getItem('achievmentThreeDate')
        achievmentThreeDateElement.innerHTML = achievmentThreeDate;
    }

    if (achievmentOne === 1) {
        document.getElementById("achievmentOne").classList.remove("hidden");
        if (achievmentOneDateElement.innerHTML === "Yet to unlock") {
            document.getElementById("achievmentOneDate").innerHTML = currentDate()
            saveAchievment("achievmentOne",1);
            saveAchievment("achievmentOneDate",currentDate())
        }
    }
    if (achievmentTwo === 1) {
        document.getElementById("achievmentTwo").classList.remove("hidden");
        if (achievmentOneDateElement.innerHTML === "Yet to unlock") {
            document.getElementById("achievmentOneDate").innerHTML = currentDate();
            document.getElementById("achievmentOne").classList.remove("hidden");
            saveAchievment("achievmentOne",1);
            saveAchievment("achievmentOneDate",currentDate())
        }
        if (achievmentTwoDateElement.innerHTML === "Yet to unlock") {
            document.getElementById("achievmentTwoDate").innerHTML = currentDate()
            console.log("completed on med diff")
            saveAchievment("achievmentTwo",1);
            saveAchievment("achievmentTwoDate",currentDate())
        }
    }
    if (achievmentThree === 1) {
        document.getElementById("achievmentThree").classList.remove("hidden");
        if (achievmentOneDateElement.innerHTML === "Yet to unlock") {
            document.getElementById("achievmentOneDate").innerHTML = currentDate()
            document.getElementById("achievmentOne").classList.remove("hidden");
            saveAchievment("achievmentOne",1);
            saveAchievment("achievmentOneDate",currentDate())
        }
        if (achievmentTwoDateElement.innerHTML === "Yet to unlock") {
            document.getElementById("achievmentTwoDate").innerHTML = currentDate()
            document.getElementById("achievmentTwo").classList.remove("hidden");
            saveAchievment("achievmentTwo",1);
            saveAchievment("achievmentTwoDate",currentDate())
        }
        if (achievmentThreeDateElement.innerHTML === "Yet to unlock") {
            document.getElementById("achievmentThreeDate").innerHTML = currentDate()
            saveAchievment("achievmentThree",1);
            saveAchievment("achievmentThreeDate",currentDate())
        }
    }
}
updateAchievments()

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
        achievmentsPage.style.display = "none";
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

achievmentsBtn.addEventListener('click', function() {
    menuPage.style.display = "none";
    achievmentsPage.style.display = "flex";
})

resetProgressBtn.addEventListener('click', function() {
    localStorage.clear();
    console.log('All progress has been reset.');
    location.reload();
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

const controlsBtn = document.getElementById('controls-button');
const controlsText = document.getElementById('controls-text');

function updateControls() {
    if (arrowControls === 0) {
        arrowControls = 1;
        controlsText.textContent = 'Arrow key controls: Enabled';
        console.log("Arrow key controls enabled", arrowControls)
    } else if (arrowControls === 1) {
        arrowControls = 0;
        controlsText.textContent = 'Arrow key controls: Disabled';
        console.log("Arrow key controls disabled", arrowControls)
    }
}

controlsBtn.addEventListener('click', updateControls);

// game functions

let hintTimerId;

function drawLevel(level) {
    console.log("lvl = " + level.levelNum)
    console.log(level.cords.length)

    if (level.levelNum === 1) {
        hintPage.style.display = "flex";
        hintText = document.getElementById("hintPage-text");
        hintMessageRect = document.getElementById("hintPage-message");
        hintMessageRect.style.filter = "none";
        hintMessageRect.style.backgroundColor = "white";
        let controlSchemeText = "Error"
        if (arrowControls === 1) {
            controlSchemeText = "ArrowKeys";
        } else if (arrowControls === 0) {
            controlSchemeText = "WSAD";
        }
        hintText.innerHTML = "Use " + controlSchemeText + " to move!";
        hintTimerId = setInterval(function() {
            hintPage.style.display = "none";
        }, 3000);
    }

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
            if (symbol === "#") {
                square.className = "square fakeObstacle";
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
            if (symbol === "?") {
                square.style.backgroundColor = "#dddddd";
                square.className = "square hint1";
                const hintQuestionMark = document.createElement('img');
                hintQuestionMark.style.width = "30px";
                hintQuestionMark.id = `questionMark`;
                hintQuestionMark.src = "questionMark.png"
                square.appendChild(hintQuestionMark);
            }
            if (symbol === "u") {
                square.className = "square uEnemy U";
                square.style.backgroundColor = "red"
            }
            if (symbol === "v") {
                square.className = "square uEnemy D";
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

function checkSurroundings(randomX,randomY) {
    const topLeft = document.getElementById(`square-${randomX - 1}-${randomY - 1}`); 
    topLeft && (topLeft.style.backgroundColor = "white", topLeft.className = "square");
    const topMid = document.getElementById(`square-${randomX}-${randomY - 1}`); 
    topMid && (topMid.style.backgroundColor = "white", topMid.className = "square");
    const topRight = document.getElementById(`square-${randomX + 1}-${randomY - 1}`); 
    topRight && (topRight.style.backgroundColor = "white", topRight.className = "square");

    const midLeft = document.getElementById(`square-${randomX - 1}-${randomY}`); 
    midLeft && (midLeft.style.backgroundColor = "white", midLeft.className = "square");
    const midMid = document.getElementById(`square-${randomX}-${randomY}`).className = "square winSquare"; 
    const midRight = document.getElementById(`square-${randomX + 1}-${randomY}`); 
    midRight && (midRight.style.backgroundColor = "white", midRight.className = "square");

    const botLeft = document.getElementById(`square-${randomX - 1}-${randomY + 1}`); 
    botLeft && (botLeft.style.backgroundColor = "white", botLeft.className = "square");
    const botMid = document.getElementById(`square-${randomX}-${randomY + 1}`); 
    botMid && (botMid.style.backgroundColor = "white", botMid.className = "square");
    const botRight = document.getElementById(`square-${randomX + 1}-${randomY + 1}`); 
    botRight && (botRight.style.backgroundColor = "white", botRight.className = "square");
}

function randomLevelGenerator() {
    levelsPage.style.display = "none";
    gamePage.style.display = "block";
    xLimit = Math.floor(Math.random() * (32 - 10 + 1)) + 10;
    yLimit = Math.floor(Math.random() * (24 - 10 + 1)) + 10;
    currentLevel = 9;
    for (y = 0; y < yLimit;y++) {
        const rowElement = document.createElement('div');
        rowElement.className = "row";
        rowElement.id = `row-${y}`;
        gamePage.appendChild(rowElement);
        levelSizeY = y + 1;
        for (x = 0; x < xLimit; x++) {
            const square = document.createElement('div');
            square.className = "square";
            square.id = `square-${x}-${y}`;
            rowElement.appendChild(square);
            levelSizeX = x + 1;
        }
    }

    obstacles = Math.floor(Math.random() * (100 - 10 + 1)) + 50;

    winGenerated = false;

    for (z = 0; z < obstacles;z++) {
        const randomX = Math.floor(Math.random() * xLimit);
        const randomY = Math.floor(Math.random() * yLimit); 
        const randomNum = Math.floor(Math.random() * 3) + 1; 
    
        const randomSquare = document.getElementById(`square-${randomX}-${randomY}`);
        if (z + 1 === obstacles) {
            randomSquare.style.backgroundColor = "yellow";
            randomSquare.classList.add("winSquare");
            winSqrX = randomX;
            winSqrY = randomY;
            checkSurroundings(randomX,randomY);
        } else if (randomSquare && randomNum === 1) {
            randomSquare.style.backgroundColor = "red";
            randomSquare.classList.add("uEnemy");
            randomSquare.classList.add("U");
        } else if (randomSquare && randomNum === 2) {
            randomSquare.style.backgroundColor = "black";
            randomSquare.classList.add("obstacle");
        } else if (randomSquare && randomNum === 3) {
            randomSquare.style.backgroundColor = "red";
            randomSquare.classList.add("rEnemy");
            randomSquare.classList.add("R");
        } 
    }


    document.getElementById("square-1-3").style.backgroundColor = "green";
    playerX = 1;
    playerY = 3;
    checkSurroundings(playerX,playerY);
    levelRunning = true;

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

    gameClock(10 * 1);
}

randomLevelBtn.addEventListener('click', function() {
    menuPage.style.display = "none";
    gamePage.style.display = "flex";
    achievmentsPage.style.display = "none";
    randomLevelGenerator()
})

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
                    killPlayer("red",1000);
                    clearInterval(timerId);
                    clearInterval(secondId);
                    console.log("player died"); 
                }
                let enemyEndPosition = `square-${startX}-${startY - 1}`;
                let endPosition = document.getElementById(enemyEndPosition);

                if (endPosition) {
                    endPosition.style.backgroundColor = "red";
    
                    enemyStartElement.style.backgroundColor = "white";
                    enemyStartElement.classList.remove("uEnemy");
                    enemyStartElement.classList.remove("U");
                    endPosition.className = "square uEnemy D";
                    endPosition.offsetHeight;
                }

            } else if (enemyStartElement.classList.contains("uEnemy") && enemyStartElement.classList.contains("D")) {
                console.log("found D element!");
                if (playerX === startX && playerY === startY + 1) {
                    killPlayer("red",1000);
                    clearInterval(timerId);
                    clearInterval(secondId);
                    console.log("player died")
                }
                let enemyEndPosition = `square-${startX}-${startY + 1}`;
                let endPosition = document.getElementById(enemyEndPosition);

                if (endPosition) {
                    endPosition.style.backgroundColor = "red";

                    enemyStartElement.style.backgroundColor = "white";
                    enemyStartElement.classList.remove("uEnemy");
                    enemyStartElement.classList.remove("D");
                    endPosition.className = "square uEnemy U";
                    endPosition.offsetHeight;
                }
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
                    killPlayer("red",1000);
                    clearInterval(timerId);
                    clearInterval(secondId);
                    console.log("player died"); 
                }
                let enemyEndPosition = `square-${startX + 1}-${startY}`;
                let endPosition = document.getElementById(enemyEndPosition);

                if (endPosition) {
                    endPosition.style.backgroundColor = "red";

                    enemyStartElement.style.backgroundColor = "white";
                    enemyStartElement.classList.remove("rEnemy");
                    enemyStartElement.classList.remove("R");
                    endPosition.className = "square rEnemy L";
                    endPosition.offsetHeight;
                }
            } else if (enemyStartElement.classList.contains("rEnemy") && enemyStartElement.classList.contains("L")) {
                console.log("found D element!");
                if (playerX === startX - 1 && playerY === startY) {
                    killPlayer("red",1000);
                    clearInterval(timerId);
                    clearInterval(secondId);
                    console.log("player died")
                }
                let enemyEndPosition = `square-${startX - 1}-${startY}`;
                let endPosition = document.getElementById(enemyEndPosition);

                if (endPosition) {
                    endPosition.style.backgroundColor = "red";

                    enemyStartElement.style.backgroundColor = "white";
                    enemyStartElement.classList.remove("rEnemy");
                    enemyStartElement.classList.remove("L");
                    endPosition.className = "square rEnemy R";
                    endPosition.offsetHeight;
                }
            }
        
        });
    }

    timerId = setInterval(function() {
        updateTimer();
        remainingTime--;

        if (remainingTime < 0) {
            killPlayer("red",1000);;
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

function killPlayer (color,aniLenght) {
    timerText = document.getElementById("timerText")
    timerText.style.color = "black";
    if (color === "red") {
        backColor = "rgb(255 50 50)";
    } else if (color === "green") {
        backColor = "rgb(50 255 50)";
    } else if (color === "yellow") {
        backColor = "yellow";
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
    const interval = aniLenght / steps;

    for (let x = 0; x <= steps; x++) {
        setTimeout(() => {
            gameAniPage.style.backdropFilter = "blur(" + x / steps * 10 + "px)"; 
            gameAniPage.style.opacity = x / steps;
        }, x*interval);
    }

    setTimeout(() => {
        for (let i = gamePage.children.length - 1; i >= 0; i--) {
            let child = gamePage.children[i];
            if (child.id !== "timer") {
                gamePage.removeChild(child);
            }
        }

        if(aniLenght !== 5000) {
            gamePage.style.display = "none";
            menuPage.style.display = "flex";
            gameAniPage.style.display = "none";
            gameAniPage.style.pointerEvents = "none";
            timerElement.style.backgroundColor = "white";
            hintPage.style.display = "none";
            clearInterval(hintTimerId);
        } else {
            hintPage.style.display = "flex";
            hintText = document.getElementById("hintPage-text");
            hintMessageRect = document.getElementById("hintPage-message");
            hintMessageRect.style.filter = "none";
            hintMessageRect.style.backgroundColor = "white";
            let difficultyName = null;
            if (gameDifficulty === 1) {
                achievmentOne = 1;
                difficultyName = "easy";
                console.log("completed achievment one")
                updateAchievments()
            } else if (gameDifficulty === 0.75) {
                achievmentOne = 1;
                achievmentTwo = 1;
                difficultyName = "medium";
                console.log("completed achievment two")
                updateAchievments()
            } else if (gameDifficulty === 0.5) {
                achievmentOne = 1;
                achievmentTwo = 1;
                achievmentThree = 1;
                difficultyName = "hard";
                console.log("completed achievment three")
                updateAchievments()
            }
            hintText.innerHTML = "You completed Square Escape on " + difficultyName + " difficulty";

            setTimeout(function() {
                hintText.innerHTML = "I guess you liked it";
            }, 3000);
            setTimeout(function() {
                hintText.innerHTML = "Thanks for playing :)";
            }, 6000);
            setTimeout(function() {
                hintPage.style.display = "none";
                gamePage.style.display = "none";
                achievmentsPage.style.display = "flex";
                gameAniPage.style.display = "none";
                gameAniPage.style.pointerEvents = "none";
                timerElement.style.backgroundColor = "white";
            }, 10000);

        }
    }, aniLenght);
}

document.addEventListener("keydown", function(event) {
    if (levelRunning) {
        console.log("Key pressed:", event.key);
        if (arrowControls === 1) {
            if (event.key === 'ArrowUp') {
                oldPlayerX = playerX;
                oldPlayerY = playerY;
                playerY = playerY - 1;
                playerX = playerX;
                if (playerY === -1) {
                    playerY = playerY + 1;
                }
                movePlayer()
            }
            if (event.key === 'ArrowDown') {
                oldPlayerX = playerX;
                oldPlayerY = playerY;
                playerY = playerY + 1;
                playerX = playerX;
                if (playerY === levelSizeY) {
                    playerY = playerY - 1;
                }
                movePlayer()
            }
            if (event.key === 'ArrowLeft') {
                oldPlayerX = playerX;
                oldPlayerY = playerY;
                playerY = playerY;
                playerX = playerX - 1;
                if (playerX === -1) {
                    playerX = playerX + 1;
                }
                movePlayer()
            }
            if (event.key === 'ArrowRight') {
                oldPlayerX = playerX;
                oldPlayerY = playerY;
                playerY = playerY;
                playerX = playerX + 1;
                if (playerX === levelSizeX) {
                    playerX = playerX - 1;
                }
                movePlayer()
            }
        } else if (arrowControls === 0) {
            if (event.key === 'w' || event.key === 'W') {
                oldPlayerX = playerX;
                oldPlayerY = playerY;
                playerY = playerY - 1;
                playerX = playerX;
                if (playerY === -1) {
                    playerY = playerY + 1;
                }
                movePlayer()
            }
            if (event.key === 's' || event.key === 'S') {
                oldPlayerX = playerX;
                oldPlayerY = playerY;
                playerY = playerY + 1;
                playerX = playerX;
                if (playerY === levelSizeY) {
                    playerY = playerY - 1;
                }
                movePlayer()
            }
            if (event.key === 'a' || event.key === 'A') {
                oldPlayerX = playerX;
                oldPlayerY = playerY;
                playerY = playerY;
                playerX = playerX - 1;
                if (playerX === -1) {
                    playerX = playerX + 1;
                }
                movePlayer()
            }
            if (event.key === 'd' || event.key === 'D') {
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
        console.log("You completed the level!");
        keyApickedUp = false;
        keyBpickedUp = false;
        timerText.style.color = "black";
        if (currentLevel === levelCompleted) {
            levelCompleted = levelCompleted + 1;
            localStorage.setItem("localMaxLevel",levelCompleted)
            hideButtons();
        }
        if (currentLevel === 10) {
            console.log("you won the game!");
            killPlayer("yellow",5000);
        } else {
            killPlayer("green",1000);
        }
    }
    var playerSqr = document.getElementById(`square-${playerX}-${playerY}`)
    if (playerSqr.className === "square obstacle") {
        clearInterval(timerId);
        clearInterval(secondId);
        killPlayer("red",1000);
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
        killPlayer("red",2000);
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
        killPlayer("red",2000);
    }
    if (playerSqr.classList.contains("uEnemy")) {
        clearInterval(timerId);
        clearInterval(secondId);
        killPlayer("red",2000);
    }
    if (playerSqr.classList.contains("rEnemy")) {
        clearInterval(timerId);
        clearInterval(secondId);
        killPlayer("red",2000);
    }
    if (playerSqr.classList.contains("hint1")) {
        hintPage.style.display = "flex";
        hintText = document.getElementById("hintPage-text");

        hintText.innerHTML = "There might be an fake obstacle...";
        setTimeout(function() {
            hintPage.style.display = "none";
        }, 5000);
    }
}