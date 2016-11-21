import { Obstacle } from "./model/obstacle";
import { MainCharacter } from "./model/main-character";
import { Ground } from "./model/ground";
import { PointCounter } from "./model/point-counter";
import { loop, input, pointCounterUpdates } from "./reactive/streams";
import {notifyGameOver} from "./reactive/streams";
import {GameOverText} from "./model/game-over-text";

require("../css/main.scss");

const INIT_LEVEL = 1;
const MAX_LEVEL = 5;
const SPACE_KEY = 32;
const ENTER_KEY = 13;

let canvas = document.getElementById("game");
let scale = calculateScale();
let ctx = canvas.getContext("2d");
let obstacle = new Obstacle(canvas, scale);
let mainCharacter = new MainCharacter(canvas, scale);
let ground = new Ground(canvas, scale);
let pointCounter = new PointCounter(canvas, scale);
let level = INIT_LEVEL;
let isGameOver = false;
let gameOverText = new GameOverText(canvas, scale);

console.log(scale);

const gameLoop = loop.filter(() => !isGameOver);
const gameInput = gameLoop.withLatestFrom(input);

const mainCharacterJump = gameInput
    .filter(([ticker, keyPressed]) => keyPressed === SPACE_KEY);

const gameReset = input
    .filter((keyPressed) => keyPressed === ENTER_KEY);

function initGame() {
    respawnObstacle(obstacle, canvas);
    mainCharacter = new MainCharacter(canvas, scale);
    mainCharacter.x = 20 * scale;
    mainCharacter.y = canvas.height - mainCharacter.height - ground.height;
    pointCounter.points = 0;
    level = INIT_LEVEL;
    isGameOver = false;
    gameOverText.hide();
}

function calculateScale() {
    return canvas.width / 400;
}

function makeJumpMainCharacter() {
    mainCharacter.jump();
}

function moveMainCharacter([ticker]) {
    mainCharacter.moveToNextPosition(ticker.deltaTime);
}

function respawnObstacle(obstacle, canvas) {
    obstacle.x = canvas.width;
    obstacle.y = canvas.height - obstacle.height - ground.height;
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

initGame();
mainCharacterJump.subscribe(makeJumpMainCharacter);
gameInput.subscribe(moveMainCharacter);
gameLoop.subscribe(moveObstacles);
gameLoop.subscribe(checkGameOver);
pointCounterUpdates.subscribe(increasePointCounter);
gameLoop.subscribe(render);
gameReset.subscribe(initGame);



