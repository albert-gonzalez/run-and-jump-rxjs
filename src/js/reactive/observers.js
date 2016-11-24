import { Obstacle } from "../model/obstacle";
import { MainCharacter } from "../model/main-character";
import { Ground } from "../model/ground";
import { PointCounter } from "../model/point-counter";
import { loop, input, notifyGameOver, obstacleRespawned } from "../reactive/observables";
import { GameOverText } from "../model/game-over-text";
import { Observable } from "rxjs/bundles/Rx";

const INIT_LEVEL = 2;
const MAX_LEVEL = 5;
const ORIGINAL_WIDTH = 400;
const MAIN_CHARACTER_X_POSITION = 20;
const CHANCE_OF_RESPAWN = 0.05;

const SPACE_KEY = 32;
const ENTER_KEY = 13;

let canvas = document.getElementById("game");
let ctx = canvas.getContext("2d");
let scale;
let obstacle;
let mainCharacter;
let ground;
let pointCounter;
let level;
let isGameOver;
let gameOverText;

const gameLoop = loop.filter(() => !isGameOver);
const gameInput = Observable.zip(gameLoop, input);

const mainCharacterJump = gameInput
    .filter(isJumpPressed);

const gameReset = input
    .filter(isResetPressed);

function isJumpPressed([ticker, event]) {
    return event.keyCode === SPACE_KEY || (event.target && event.target.id === 'game');
}

function isResetPressed(event) {
    return isGameOver && (event.keyCode === ENTER_KEY || (event.target && event.target.id === 'game'))
}

function initCanvas() {
    canvas.height = canvas.width * 9/16;
}

function initGame() {
    initCanvas();
    scale = calculateScale();
    level = INIT_LEVEL;
    isGameOver = false;
    initPrintableObjects();
}

function calculateScale() {
    return canvas.width / ORIGINAL_WIDTH;
}

function initPrintableObjects() {
    ground = new Ground(canvas, scale);
    pointCounter = new PointCounter(canvas, scale);
    pointCounter.points = 0;

    gameOverText = new GameOverText(canvas, scale);
    mainCharacter = new MainCharacter(canvas, scale);

    mainCharacter.x = MAIN_CHARACTER_X_POSITION * scale;
    mainCharacter.y = canvas.height - mainCharacter.height - ground.height + ground.height/8;

    obstacle = new Obstacle(canvas, scale);
    respawnObstacle(obstacle, canvas);
}

function makeJumpMainCharacter() {
    mainCharacter.jump();
}

function moveMainCharacter(ticker) {
    mainCharacter.moveToNextPosition(ticker.deltaTime);
}

function respawnObstacle(obstacle, canvas) {
    obstacle.x = canvas.width;
    obstacle.y = canvas.height - obstacle.height - ground.height + ground.height/8;
}

function increaseLevel() {
    if (level < MAX_LEVEL) {
        level += 0.1;
    }
}

function moveObstacles(ticker) {
    if (obstacle.isOutOfCanvas()) {
        if (Math.random() < CHANCE_OF_RESPAWN) {
            respawnObstacle(obstacle, canvas);
            obstacleRespawned.next();
        }
    } else {
        obstacle.moveToNextPosition(ticker.deltaTime, level);
    }
}

function checkGameOver() {
    let collision = mainCharacter.x + mainCharacter.width/2 >= obstacle.x &&
        mainCharacter.x <= obstacle.x + obstacle.width/2 &&
        mainCharacter.y + mainCharacter.height/2 >= obstacle.y &&
        mainCharacter.y <= obstacle.y + obstacle.height/2;

    if (collision) {
        notifyGameOver.next();
    }
}

function increasePointCounter() {
    pointCounter.increasePoints();
}

function gameOver() {
    isGameOver = true;
    mainCharacter.setAction('death');
    gameOverText.show();
    render();
}

function render() {
    clearCanvas();

    ground.render();
    obstacle.render();
    mainCharacter.render();
    pointCounter.render();
    gameOverText.render();
}

function clearCanvas() {
    ctx.fillStyle = 'rgb(0, 117, 255)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
}

export {
    makeJumpMainCharacter,
    increasePointCounter,
    moveMainCharacter,
    moveObstacles,
    checkGameOver,
    render,
    increaseLevel,
    gameOver,
    initGame,

    gameLoop,
    mainCharacterJump,
    gameReset,

    SPACE_KEY
};