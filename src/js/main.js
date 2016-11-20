import { Obstacle } from "./model/obstacle";
import { MainCharacter } from "./model/main-character";
import { Ground } from "./model/ground";
import { PointCounter } from "./model/point-counter";
import { loop, input, pointCounterUpdates } from "./reactive/streams";

const INIT_LEVEL = 3;
const MAX_LEVEL = 4;
const SPACE_KEY = 32;
const ENTER_KEY = 13;

let canvas = document.getElementById("game");
let ctx = canvas.getContext("2d");
let obstacle = new Obstacle(canvas);
let mainCharacter = new MainCharacter(canvas);
let ground = new Ground(canvas);
let pointCounter = new PointCounter(canvas);
let level = INIT_LEVEL;

const gameLoop = loop.filter(() => !isGameOver());
const gameInput = gameLoop.withLatestFrom(input);

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
    level = INIT_LEVEL;
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
        obstacle.move(-120 * level * ticker.deltaTime, 0);
    }
}

function isGameOver() {
    return mainCharacter.x + mainCharacter.width/2 >= obstacle.x &&
        mainCharacter.x <= obstacle.x + obstacle.width/2 &&
        mainCharacter.y + mainCharacter.height/2 >= obstacle.y &&
        mainCharacter.y <= obstacle.y + obstacle.height/2;
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
    ctx.fillStyle = 'rgb(0, 117, 255)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
}

initGame();
mainCharacterJump.subscribe(makeJumpMainCharacter);
gameInput.subscribe(moveMainCharacter);
gameLoop.subscribe(moveObstacles);
pointCounterUpdates.subscribe(increasePointCounter);
gameLoop.subscribe(render);
gameReset.subscribe(initGame);



