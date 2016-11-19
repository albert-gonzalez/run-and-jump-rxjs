import { Obstacle } from "./model/obstacle";
import { MainCharacter } from "./model/main-character";
import { Ground } from "./model/ground";
import { PointCounter } from "./model/point-counter";
import { loop, input, pointCounterUpdates, gameInput } from "./observable/observable";

let canvas = document.getElementById("game");
let ctx = canvas.getContext("2d");
let obstacle = new Obstacle(canvas);
let mainCharacter = new MainCharacter(canvas);
let ground = new Ground(canvas);
let pointCounter = new PointCounter(canvas);
let level = 1;

const SPACE_KEY = 32;
const ENTER_KEY = 13;

const gameLoop = loop.filter(() => !isGameOver());

const mainCharacterJump = gameInput
    .filter(([ticker, keyPressed]) => keyPressed === SPACE_KEY);

const gameReset = input
    .filter((keyPressed) => keyPressed === ENTER_KEY);

function initGame() {
    respawnObstacle(obstacle, canvas);
    mainCharacter = new MainCharacter(canvas);
    mainCharacter.x = 20;
    mainCharacter.y = canvas.height - mainCharacter.height - ground.height;
    pointCounter.points = 0;
}

function makeJumpMainCharacter() {
    mainCharacter.jump();
}

function moveMainCharacter([ticker]) {
    mainCharacter.moveToNextPosition(ticker.deltaTime);
}

function respawnObstacle(obstacle, canvas) {
    obstacle.x = canvas.width;
    obstacle.y = canvas.height - obstacle.height - 20;
}

function moveObstacles(ticker) {
    if (obstacle.isOutOfCanvas()) {
        if (Math.random() > 0.98) {
            if (level < 3) {
                level += 0.1;
            }

            respawnObstacle(obstacle, canvas);
        }
    } else {
        obstacle.move(-100 * level * ticker.deltaTime, 0);
    }
}

function isGameOver() {
    return mainCharacter.x + mainCharacter.width >= obstacle.x &&
        mainCharacter.x <= obstacle.x + obstacle.width &&
        mainCharacter.y + mainCharacter.height >= obstacle.y &&
        mainCharacter.y <= obstacle.y + obstacle.height;
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
}

function clearCanvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

initGame();
mainCharacterJump.subscribe(makeJumpMainCharacter);
gameInput.subscribe(moveMainCharacter);
gameLoop.subscribe(moveObstacles);
pointCounterUpdates.subscribe(increasePointCounter);
gameLoop.subscribe(render);
gameReset.subscribe(initGame);
