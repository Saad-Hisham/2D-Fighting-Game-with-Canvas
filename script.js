import Background from './backgroundClass.js';

import cleaner from './clear.js';

import Player from './Playerclass.js';


const canvas = document.getElementById('gameCanvas');

const context = canvas.getContext('2d');

canvas.width = 1024;

canvas.height = 576;

let player1X = 0;

let player2X = canvas.width - 150;

let player2Health = document.querySelector(".game-states div.p-2 div")

let player2HealthState = 100;

let player1Health = document.querySelector(".game-states div.p-1 div")

let player1HealthState = 100;

let player1HitRegistered = false;

let player2HitRegistered = false;

let gameFinshed = false;

let gameStarted = false;

let settingsCountP1 = 0
let settingsCountP2 = 2


let playerOneSettings = [
    [96, 96, 16, 3],
    [128, 128, 10, 1],
    [96, 96, 16, 1]
]

let playerTwoSettings = [
    [96, 96, 16, 1],
    [96, 96, 16, 3],
    [128, 128, 10, 1],

]

let playerSize = 138;
let playerOneFrameWidth = playerOneSettings[settingsCountP1][0];
let playerOneFrameHeight = playerOneSettings[settingsCountP1][1];
let playerOneShotsize = playerOneSettings[settingsCountP1][2];
let playerOneShoFrames = playerOneSettings[settingsCountP1][3];
//------------------
let playerTwoFrameWidth = playerTwoSettings[settingsCountP2][0];
let playerTwoFrameHeight = playerTwoSettings[settingsCountP2][1];
let playerTwoShotsize = playerTwoSettings[settingsCountP2][2];
let playerTwoShoFrames = playerTwoSettings[settingsCountP2][3];
let allPlayersP1 = [
    [
        { src: "./assets/ninja-p1/idle.png", frameCount: 7, staggerFrames: 10 },
        { src: "./assets/ninja-p1/run.png", frameCount: 8, staggerFrames: 10 },
        { src: "./assets/ninja-p1/attack_1.png", frameCount: 5, staggerFrames: 5 },
        { src: "./assets/ninja-p1/jump.png", frameCount: 8, staggerFrames: 15 },
        { src: "./assets/ninja-p1/Hurt.png", frameCount: 4, staggerFrames: 25 },
        { src: "./assets/ninja-p1/attack_2.png", frameCount: 5, staggerFrames: 5 },
        { src: "./assets/ninja-p1/Cast.png", frameCount: 5, staggerFrames: 10 },
        { src: "./assets/ninja-p1/Dead.png", frameCount: 5, staggerFrames: 20 },
        { src: "./assets/ninja-p1/Kunai.png" },
    ],
    [
        { src: "./assets/girl-p1/idle.png", frameCount: 9, staggerFrames: 10 },
        { src: "./assets/girl-p1/run.png", frameCount: 8, staggerFrames: 10 },
        { src: "./assets/girl-p1/attack_1.png", frameCount: 6, staggerFrames: 5 },
        { src: "./assets/girl-p1/jump.png", frameCount: 10, staggerFrames: 15 },
        { src: "./assets/girl-p1/Hurt.png", frameCount: 2, staggerFrames: 25 },
        { src: "./assets/girl-p1/attack_2.png", frameCount: 8, staggerFrames: 5 },
        { src: "./assets/girl-p1/Cast.png", frameCount: 6, staggerFrames: 10 },
        { src: "./assets/girl-p1/Dead.png", frameCount: 5, staggerFrames: 20 },
        { src: "./assets/girl-p1/Spine.png" },
    ],

    [
        { src: "./assets/Ninja_Peasant-p1/Idle.png", frameCount: 6, staggerFrames: 10 },
        { src: "./assets/Ninja_Peasant-p1/Run.png", frameCount: 6, staggerFrames: 10 },
        { src: "./assets/Ninja_Peasant-p1/Attack_2.png", frameCount: 4, staggerFrames: 5 },
        { src: "./assets/Ninja_Peasant-p1/Jump.png", frameCount: 8, staggerFrames: 15 },
        { src: "./assets/Ninja_Peasant-p1/Hurt.png", frameCount: 2, staggerFrames: 25 },
        { src: "./assets/Ninja_Peasant-p1/Attack_2.png", frameCount: 4, staggerFrames: 5 },
        { src: "./assets/Ninja_Peasant-p1/Shot.png", frameCount: 6, staggerFrames: 10 },
        { src: "./assets/Ninja_Peasant-p1/Dead.png", frameCount: 4, staggerFrames: 20 },
        { src: "./assets/Ninja_Peasant-p1/Dart.png" },
    ],

]


let allPlayersP2 = [

    [
        { src: "./assets/Ninja_Peasant-p2/Idle.png", frameCount: 6, staggerFrames: 10 },
        { src: "./assets/Ninja_Peasant-p2/Run.png", frameCount: 6, staggerFrames: 10 },
        { src: "./assets/Ninja_Peasant-p2/Attack_2.png", frameCount: 4, staggerFrames: 5 },
        { src: "./assets/Ninja_Peasant-p2/Jump.png", frameCount: 8, staggerFrames: 15 },
        { src: "./assets/Ninja_Peasant-p2/Hurt.png", frameCount: 2, staggerFrames: 25 },
        { src: "./assets/Ninja_Peasant-p2/Attack_2.png", frameCount: 4, staggerFrames: 5 },
        { src: "./assets/Ninja_Peasant-p2/Shot.png", frameCount: 6, staggerFrames: 10 },
        { src: "./assets/Ninja_Peasant-p2/Dead.png", frameCount: 4, staggerFrames: 20 },
        { src: "./assets/Ninja_Peasant-p2/Dart.png" },
    ],

    [
        { src: "./assets/ninja-p2/idle.png", frameCount: 7, staggerFrames: 10 },
        { src: "./assets/ninja-p2/run.png", frameCount: 8, staggerFrames: 10 },
        { src: "./assets/ninja-p2/attack_1.png", frameCount: 5, staggerFrames: 5 },
        { src: "./assets/ninja-p2/jump.png", frameCount: 8, staggerFrames: 15 },
        { src: "./assets/ninja-p2/Hurt.png", frameCount: 4, staggerFrames: 25 },
        { src: "./assets/ninja-p2/attack_2.png", frameCount: 5, staggerFrames: 5 },
        { src: "./assets/ninja-p2/Cast.png", frameCount: 5, staggerFrames: 10 },
        { src: "./assets/ninja-p2/Dead.png", frameCount: 5, staggerFrames: 20 },
        { src: "./assets/ninja-p2/Kunai.png" },
    ],
    [
        { src: "./assets/girl-p2/idle.png", frameCount: 9, staggerFrames: 10 },
        { src: "./assets/girl-p2/run.png", frameCount: 8, staggerFrames: 10 },
        { src: "./assets/girl-p2/attack_1.png", frameCount: 6, staggerFrames: 5 },
        { src: "./assets/girl-p2/jump.png", frameCount: 10, staggerFrames: 15 },
        { src: "./assets/girl-p2/Hurt.png", frameCount: 2, staggerFrames: 25 },
        { src: "./assets/girl-p2/attack_2.png", frameCount: 8, staggerFrames: 5 },
        { src: "./assets/girl-p2/Cast.png", frameCount: 6, staggerFrames: 10 },
        { src: "./assets/girl-p2/Dead.png", frameCount: 5, staggerFrames: 20 },
        { src: "./assets/girl-p2/Spine.png" },
    ],



]


const assets = {
    images: {
        sky: "./assets/1/1.png",
        cloud: "./assets/1/cloud.png",
        cloud2: "./assets/1/cloud-2.png",
        center: "./assets/1/center.png",
        edges: "./assets/1/2.png",
        ground: "./assets/1/tile99.png",
        tree: "./assets/1/tree.png",
        tree2: "./assets/1/tree-2.png",
        tree3: "./assets/1/tree-3.png",
        tree4: "./assets/1/tree-4.png",
        start: "./assets/1/start.png",
        pick: "./assets/1/pick-screen.png",
    },
    sprites: allPlayersP1[settingsCountP1],

    sprites2: allPlayersP2[settingsCountP2],
    audio: [
        "./assets/Ninja_Monk/sword.mp3",
        "./assets/Ninja_Monk/sword-2.mp3",
        "./assets/Ninja_Monk/throw.mp3",
        "./assets/audio/sword-2.mp3",
        "./assets/audio/sword-2.mp3",
        "./assets/audio/throw.mp3"
    ],
}


const loadedAssets = {
    images: {},
    sprites: [],
    audio: {},
    sprites2: {},

};


function preloadImages(imageList) {
    const promises = Object.entries(imageList).map(([key, src]) => {
        return new Promise((resolve, reject) => {
            const img = new Image();
            img.src = src;
            img.onload = () => {
                loadedAssets.images[key] = img;
                resolve();
            };
            img.onerror = () => reject(`Failed to load image: ${src}`);
        });
    });

    return Promise.all(promises);
}


function preloadAudio(audioList) {
    const promises = audioList.map((src) => {
        return new Promise((resolve, reject) => {
            const audio = new Audio(src);
            audio.onloadeddata = () => {
                loadedAssets.audio[src] = audio;
                resolve();
            };
            audio.onerror = () => reject(`Failed to load audio: ${src}`);
        });
    });

    return Promise.all(promises);
}

function preloadSprites(spriteList) {
    const promises = spriteList.map((sprite) => {
        return new Promise((resolve, reject) => {
            const img = new Image();
            img.src = sprite.src;
            img.onload = () => {
                loadedAssets.sprites.push({ ...sprite, image: img });
                resolve();
            };
            img.onerror = () => reject(`Failed to load sprite: ${sprite.src}`);
        });
    });

    return Promise.all(promises);
}



let assetsLoaded = false;

async function preloadAssets() {
    try {
        await Promise.all([
            preloadImages(assets.images),
            preloadAudio(assets.audio),
            preloadSprites(assets.sprites),
            preloadSprites(assets.sprites2),

        ]);
        assetsLoaded = true;
    } catch (error) {
    }
}

preloadAssets();






let player1 = new Player(
    player1X,
    canvas.height - 30,
    playerSize,
    playerSize,
    "idle",
    canvas,
    "d",
    "a",
    "f",
    "w",
    "g",
    assets.sprites,
    playerOneFrameWidth,
    playerOneFrameHeight,
    false,
    assets.sprites[8]?.src, // Ensure it exists
    playerOneShotsize,
    playerOneShotsize,
    playerOneShoFrames,
    false,
    assets.audio[0],
    assets.audio[1],
    assets.audio[2]
);


let player2 = new Player(
    player2X,
    canvas.height - 30,
    playerSize,
    playerSize,
    "idle",
    canvas,
    "ArrowRight",
    "ArrowLeft",
    "j",
    "ArrowUp",
    "k",
    assets.sprites2,
    playerTwoFrameWidth,
    playerTwoFrameHeight,
    true,
    assets.sprites2[8]?.src,
    playerTwoShotsize,
    playerTwoShotsize,
    playerTwoShoFrames,
    true,
    assets.audio[3],
    assets.audio[4],
    assets.audio[5],


);

let mainSky = new Background(assets.images.sky, 0, 0, 576, 324, 0, 0, canvas.width, canvas.height);

let sky = new Background(assets.images.cloud, 0, 0, 576, 324, 0, -50, canvas.width, canvas.height / 3);

let skyreverse = new Background(assets.images.cloud2, 0, 0, 576, 324, 0, 130, canvas.width, canvas.height / 2);

let centerCloud = new Background(assets.images.center, 0, 0, 576, 324, canvas.width / 4, 14, canvas.height / 2, canvas.height / 3.9);

let animatedSky1 = new Background(assets.images.center, 0, 0, 576 * 0.8, 324 * 0.8, 0, 10, canvas.width / 2, canvas.height / 4, 0.2);

let animatedSky2 = new Background(assets.images.center, 0, 0, 576 * 0.8, 324 * 0.8, canvas.width, 10, canvas.width / 1.5, canvas.height / 4, Math.random() > 0.5 ? 0.2 : 0.2);

let animatedSky3 = new Background(assets.images.center, 0, 0, 576 * 0.8, 324 * 0.8, canvas.width / 2, 10, canvas.width / 3, canvas.height / 4, -0.2);

let animatedSkies = [animatedSky1, animatedSky2, animatedSky3];

let edges = new Background(assets.images.edges, 0, 0, 576, 324, 0, -30, canvas.width, canvas.height);

let ground = new Background(assets.images.ground, 0, 0, 48, 48, 0, canvas.height - 48, 48, 48);

let treesback = new Background(assets.images.tree4, 0, 0, 1024, 1024, 300, canvas.height - 270, 150, 250);


let trees = [
    new Background(assets.images.tree, 0, 0, 1024, 1024, 400, canvas.height - 240 * 1.2, 120 * 2, 240 * 1.2),

    new Background(assets.images.tree2, 0, 0, 1024, 1024, 850, canvas.height - 200 * 1.8, 140 * 2, 200 * 2),

    new Background(assets.images.tree3, 0, 0, 2048, 2048, 50, canvas.height - 200 * 2, 100 * 3, 200 * 2),

    new Background(assets.images.tree3, 0, 0, 2048, 2048, 700, canvas.height - 230 * 1.3, 110 * 1.7, 230 * 1.3)
];

let shots = [];

document.addEventListener("keydown", (event) => player1.handleInput(event, true));

document.addEventListener("keyup", (event) => player1.handleInput(event, false));


document.addEventListener("keydown", (event) => player2.handleInput(event, true));

document.addEventListener("keyup", (event) => player2.handleInput(event, false));

function detectCollison(x1, y1, x2, y2) {

    let xDistance = x2 - x1;

    let yDistance = y2 - y1;

    return Math.sqrt(Math.pow(xDistance, 2) + Math.pow(yDistance, 2))


}

function DeclareWinner() {
    if (player1HealthState === 0) {
        document.getElementById("winner").style.display = "block"
        document.getElementById("winner").innerHTML = "Player 2 is the Winner!"
        player2.playerImage.src = sprites2[0].src
        player2.frameCount = sprites2[0].frameCount
        player1.isDead = true;
        player1.playerImage.src = sprites[7].src
        player1.frameCount = sprites[7].frameCount
        player1.shots = [];
        player2.shots = [];
        gameFinshed = true

        player1.y = canvas.height - 30;
        player2.y = canvas.height - 30;

    } else if (player2HealthState === 0) {
        document.getElementById("winner").style.display = "block"
        document.getElementById("winner").innerHTML = "Player 1 is the Winner!"
        player1.playerImage.src = sprites[0].src
        player1.frameCount = sprites[0].frameCount

        player2.isDead = true;
        player2.playerImage.src = sprites2[7].src
        player2.frameCount = sprites2[7].frameCount
        player1.shots = [];
        player2.shots = [];
        player1.y = canvas.height - 30;
        player2.y = canvas.height - 30;
        gameFinshed = true
    }
}


function gamePlay() {
    document.querySelector(".game-states").style.display = "flex"
    DeclareWinner()

    let adjustHurtP1 = "." + player1.playerImage.src.replace(/^.*(?=\/assets)/, "");
    let adjustHurtP2 = "." + player2.playerImage.src.replace(/^.*(?=\/assets)/, "");

    DeclareWinner()
    let playerTwoOnHurt = adjustHurtP2 == assets.sprites2[4].src
    let playerOneOnHurt = adjustHurtP1 == assets.sprites[4].src


    cleaner(context, canvas);

    mainSky.draw(context, canvas);

    for (let x = 0; x < canvas.width; x += treesback.width) {

        treesback.x = x;

        treesback.draw(context);

    }

    trees.forEach(tree => {
        tree.draw(context);
    });


    context.save();

    context.globalAlpha = 0.6;

    centerCloud.draw(context, canvas);

    animatedSkies.forEach(sky => {

        sky.draw(context);

        sky.update();
    });

    context.restore();


    sky.draw(context, canvas);

    skyreverse.draw(context, canvas);

    edges.draw(context, canvas);

    for (let x = 0; x < canvas.width; x += ground.width) {

        ground.x = x;

        ground.draw(context);

    }


    player1.draw(context, canvas);

    player2.draw(context, canvas);

    if (!gameFinshed) {
        player1.update();

        player2.update();

    }



    player1.drawShots(context);

    player2.drawShots(context);


    if (detectCollison(player1.x, player1.y, player2.x, player2.y) < Math.min(player1.width, player1.height) / 5 + Math.min(player2.width, player2.height) / 5) {


        if (player1.isattacking && !player1HitRegistered) {

            player2HealthState = Math.max(0, player2HealthState - 5);

            player2Health.style.width = `${player2HealthState}%`;

            player1HitRegistered = true;

            player2.applySetting(player2.sprites[4]);
        }

        if (player2.isattacking && !player2HitRegistered) {

            player1HealthState = Math.max(0, player1HealthState - 5);

            player1Health.style.width = `${player1HealthState}%`;

            player2HitRegistered = true;

            player1.applySetting(player1.sprites[4]);
        }

        if (playerOneOnHurt) {

            if (player1.currentFrame >= player1.frameCount - 1) {

                player1.applySetting(player1.sprites[0])

            }
        }

        if (!player1.isattacking) {

            player1HitRegistered = false;
        }
        if (!player2.isattacking) {

            player2HitRegistered = false;
        }
    }
    player1.shots.forEach((shot) => {
        if (
            !shot.hit &&
            detectCollison(shot.x, shot.y, player2.x, player2.y) <
            Math.min(player1.shotWidth, player1.shotHeight) / 5 +
            Math.min(player2.width, player2.height) / 5
        ) {
            player2HealthState = Math.max(0, player2HealthState - 2);

            player2Health.style.width = `${player2HealthState}%`;

            player1HitRegistered = true;

            player2.applySetting(player2.sprites[4]);

            shot.hit = true;
        }
    });

    player2.shots.forEach((shot) => {
        if (
            !shot.hit &&
            detectCollison(shot.x, shot.y, player1.x, player1.y) <

            Math.min(player2.shotWidth, player2.shotHeight) / 5 +

            Math.min(player1.width, player1.height) / 5
        ) {
            player1HealthState = Math.max(0, player1HealthState - 2);

            player1Health.style.width = `${player1HealthState}%`;

            player2HitRegistered = true;

            player1.applySetting(player1.sprites[4]);

            shot.hit = true;
        }
    });

    if (playerTwoOnHurt) {

        if (player2.currentFrame >= player2.frameCount - 1) {
            player2.applySetting(player2.sprites[0])
        }
    }


    if (playerOneOnHurt) {
        if (player1.currentFrame >= player1.frameCount - 1) {
            player1.applySetting(player1.sprites[0])
        }
    }


    if (player2.keys.left == true && playerTwoOnHurt) {
        player2.applySetting(player2.sprites[1])




    }

    if (player2.keys.right == true && playerTwoOnHurt) {
        player2.applySetting(player2.sprites[1])


    }



    if (player1.keys.right == true && playerOneOnHurt) {
        player1.applySetting(player1.sprites[1])



    }

    if (player1.keys.left == true && playerOneOnHurt) {
        player1.applySetting(player1.sprites[1])


    }



}


// -------loading

function drawLoadingScreen() {
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;

    function draw() {
        context.clearRect(0, 0, canvas.width, canvas.height);

        // Background (optional)
        context.fillStyle = "#f0f0f0";
        context.fillRect(0, 0, canvas.width, canvas.height);

        // Draw loading text
        context.fillStyle = "black";
        context.font = "48px Arial";
        context.textAlign = "center";
        context.textBaseline = "middle";
        context.fillText("Loading...", centerX, centerY);
    }

    draw();
}


function drawStartImage() {
    if (loadedAssets.images.start) {
        context.clearRect(0, 0, canvas.width, canvas.height);

        // Draw the start.png at the center of the canvas
        const img = loadedAssets.images.start;
        const imgX = (canvas.width - img.width) / 2;
        const imgY = (canvas.height - img.height) / 2;

        context.drawImage(img, imgX, imgY);
    }
}


let start = 70;
let secondStart = 70;
let flag = 0; // Initialize flag to control the movement (0-1-2)
let secondFlag = 0; // Second player flag

function drawPickScreen() {
    if (loadedAssets.images.pick) {
        context.clearRect(0, 0, canvas.width, canvas.height);

        // Draw the start.png at the center of the canvas
        const img = loadedAssets.images.pick;
        const imgX = (canvas.width - img.width);
        const imgY = (canvas.height - img.height);

        context.drawImage(img, 0, 0, canvas.width, canvas.height);

        // Calculate border position for player 1 based on 'start'
        const borderX = (canvas.width) / 2.8; // Centered horizontally for player 1
        const borderY = start; // Initial position starts at 70 for player 1

        // Draw the red border (Player 1)
        context.strokeStyle = "red";
        context.lineWidth = 15;
        context.strokeRect(borderX, borderY, 100, 140);

        // Calculate border position for player 2 based on 'secondStart'
        const secondBorderX = (canvas.width) / 2.12; // Centered horizontally for player 2
        const secondBorderY = secondStart; // Initial position starts at 70 for player 2

        // Draw the blue border (Player 2)
        context.strokeStyle = "blue";
        context.lineWidth = 15;
        context.strokeRect(secondBorderX, secondBorderY, 100, 140);
    }
}

let startScreen = false;
let pickScreen = false;

function animate() {

    if (assetsLoaded) {

        if (!startScreen) {
            drawStartImage(); // Draw the start screen
        } else if (!pickScreen) {
            player1.sprites = allPlayersP1[flag]
            player2.sprites = allPlayersP2[secondFlag]
            settingsCountP1 = playerOneSettings[flag]
            settingsCountP2 = playerTwoSettings[secondFlag]

            player1.frameHeight = settingsCountP1[0]
            player1.frameWidth = settingsCountP1[1]
            player1.shotHeight = settingsCountP1[2]
            player1.shotFrameCount = settingsCountP1[3]


            player1.shot = allPlayersP1[flag][8].src;
            player2.shot = allPlayersP2[secondFlag][8].src;

            player2.frameHeight = settingsCountP2[0]
            player2.frameWidth = settingsCountP2[1]
            player2.shotHeight = settingsCountP2[2]
            player2.shotFrameCount = settingsCountP2[3]



            drawPickScreen();

        } else {

            gamePlay(); // Start the gameplay
        }
    } else {
        drawLoadingScreen("gameCanvas"); // Display loading screen while assets load
    }

    requestAnimationFrame(animate);
}

// Event listener to handle transitions
document.addEventListener("keyup", (e) => {
    if (e.key === "Enter") {
        if (!startScreen) {
            startScreen = true; // Transition from start to pick screen
        } else if (!pickScreen) {
            pickScreen = true; // Transition from pick screen to gameplay
        }
    }
});

// Add event listener for arrow key presses to adjust 'start'
document.addEventListener('keydown', (event) => {
    if (event.key === 'w') {
        flag = (flag === 0) ? 2 : flag - 1; // Cycle back to 2 if going below 0
        start = 70 + flag * 150; // Adjust 'start' based on 'flag'
    } else if (event.key === 's') {
        flag = (flag === 2) ? 0 : flag + 1; // Cycle back to 0 if going above 2
        start = 70 + flag * 150; // Adjust 'start' based on 'flag'
    } else if (event.key === 'ArrowUp') {
        secondFlag = (secondFlag === 0) ? 2 : secondFlag - 1; // Cycle back to 2 if going below 0
        secondStart = 70 + secondFlag * 150; // Adjust 'secondStart' based on 'secondFlag'
    } else if (event.key === 'ArrowDown') {
        secondFlag = (secondFlag === 2) ? 0 : secondFlag + 1; // Cycle back to 0 if going above 2
        secondStart = 70 + secondFlag * 150; // Adjust 'secondStart' based on 'secondFlag'
    }




    drawPickScreen(); // Redraw the screen after updating positions
});




animate();
