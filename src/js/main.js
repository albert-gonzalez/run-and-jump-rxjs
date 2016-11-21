import { Obstacle } from "./model/obstacle";
import { MainCharacter } from "./model/main-character";
import { Ground } from "./model/ground";
import { PointCounter } from "./model/point-counter";
import { loop, input, pointCounterUpdates } from "./reactive/streams";
import {notifyGameOver} from "./reactive/streams";
import {GameOverText} from "./model/game-over-text";
import {Observable} from "rxjs/bundles/Rx";

require("../css/main.scss");

const INIT_LEVEL = 2;
const MAX_LEVEL = 5;
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
    .filter(([ticker, event]) => {
        return event.keyCode === SPACE_KEY || (event.target && event.target.id === 'game');
    });

const gameReset = input
    .filter((event) => isGameOver && (event.keyCode === ENTER_KEY || (event.target && event.target.id === 'game')));

function preventSpacebarDefault() {
    document.addEventListener('keydown', (e) =>{
        if (e.keyCode == SPACE_KEY) {
            e.preventDefault();
        }
    });
}

function initCanvas() {
    canvas.height = canvas.width * 9/16;
}

function initGame() {
    initCanvas();
    scale = calculateScale();
    obstacle = new Obstacle(canvas, scale);
    ground = new Ground(canvas, scale);
    pointCounter = new PointCounter(canvas, scale);
    level = INIT_LEVEL;
    isGameOver = false;
    gameOverText = new GameOverText(canvas, scale);
    respawnObstacle(obstacle, canvas);
    mainCharacter = new MainCharacter(canvas, scale);
    mainCharacter.x = 20 * scale;
    mainCharacter.y = canvas.height - mainCharacter.height - ground.height + ground.height/8;
    pointCounter.points = 0;
}

function calculateScale() {
    return canvas.width / 400;
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

function moveObstacles(ticker) {
    if (obstacle.isOutOfCanvas()) {
        if (Math.random() > 0.98) {
            if (level < MAX_LEVEL) {
                level += 0.1;
            }

            respawnObstacle(obstacle, canvas);
        }
    } else {
        obstacle.move(-120 * level * ticker.deltaTime * scale, 0);
    }
}

function checkGameOver() {
    let collision = mainCharacter.x + mainCharacter.width/2 >= obstacle.x &&
        mainCharacter.x <= obstacle.x + obstacle.width/2 &&
        mainCharacter.y + mainCharacter.height/2 >= obstacle.y &&
        mainCharacter.y <= obstacle.y + obstacle.height/2;

    if (collision) {
        mainCharacter.setAction('death');
        gameOverText.show();

        notifyGameOver.subscribe(() => isGameOver = true);
    }
}

function increasePointCounter() {
    pointCounter.increasePoints();
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

preventSpacebarDefault();
initGame();
mainCharacterJump.subscribe(makeJumpMainCharacter);
pointCounterUpdates.subscribe(increasePointCounter);
gameLoop.subscribe(moveMainCharacter);
gameLoop.subscribe(moveObstacles);
gameLoop.subscribe(checkGameOver);
gameLoop.subscribe(render);
gameReset.subscribe(initGame);



