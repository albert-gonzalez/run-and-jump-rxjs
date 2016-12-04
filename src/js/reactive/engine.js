import { Obstacle } from "../model/obstacle";
import { MainCharacter } from "../model/main-character";
import { Ground } from "../model/ground";
import { PointCounter } from "../model/point-counter";
import { loop, input } from "../reactive/observables";
import { GameOverText } from "../model/game-over-text";

const INIT_LEVEL = 2;
const MAX_LEVEL = 5;
const ORIGINAL_WIDTH = 400;
const MAIN_CHARACTER_X_POSITION = 20;
const CHANCE_OF_RESPAWN = 0.05;

const SPACE_KEY = 'Space';
const SPACE_KEY_CODE = 32;
const ENTER_KEY = 'Enter';
const ENTER_KEY_CODE = 13;

function createGameLoop(defaultValues = {}) {
    return loop.withLatestFrom(input)
        .scan(calculateNextState, initGame(defaultValues))
        .filter(isGameRunning);
}

function isJumpPressed(event) {
    return event.code === SPACE_KEY || event.key === ' ' || event.keyCode === SPACE_KEY_CODE || (event.target && event.target.id === 'game');
}

function isResetPressedWhenIsGameOver(event, isGameOver) {
    return isGameOver && (event.code === ENTER_KEY || event.key === ENTER_KEY || event.keyCode === ENTER_KEY_CODE ||  (event.target && event.target.id === 'game'))
}

function initCanvas() {
    let canvas = document.getElementById("game");
    canvas.height = canvas.width * 9/16;
    let ctx = canvas.getContext("2d");

    return [canvas, ctx];
}

function initGame(defaultValues = {}) {
    let [canvas, context] = initCanvas();
    let scale = calculateScale(canvas);
    let objects = initPrintableObjects(canvas, scale);

    return Object.assign({}, {
        canvas: canvas,
        context: context,
        scale: scale,
        level: INIT_LEVEL,
        isGameOver: false,
        isGameRunning, true
    }, objects, defaultValues);
}

function calculateScale(canvas) {
    return canvas.width / ORIGINAL_WIDTH;
}

function initPrintableObjects(canvas, scale) {
    let ground = new Ground(canvas, scale);
    let mainCharacter = new MainCharacter(canvas, scale);

    mainCharacter.x = MAIN_CHARACTER_X_POSITION * scale;
    mainCharacter.y = canvas.height - mainCharacter.height - ground.height + ground.height/8;

    let obstacle = new Obstacle(canvas, scale);
    respawnObstacle(obstacle, canvas, ground);

    return {
        ground: ground,
        pointCounter: new PointCounter(canvas, scale),
        mainCharacter: mainCharacter,
        obstacle: obstacle,
        gameOverText: new GameOverText(canvas, scale)
    }
}

function calculateNextState(state, [ticker, event]) {
    if (isJumpPressed(event)) {
        makeJumpMainCharacter(state.mainCharacter);
    }

    if (isResetPressedWhenIsGameOver(event, state.isGameOver)) {
        return initGame();
    }

    if (!state.isGameOver) {
        moveMainCharacter(state.mainCharacter, ticker);
        moveObstacles(state, ticker);
        calculateNextObjectsFrames(state);

        if (checkGameOver(state.mainCharacter, state.obstacle)) {
            gameOver(state);
        }
    } else {
        state.isGameRunning = false;
    }

    return state;
}

function makeJumpMainCharacter(mainCharacter) {
    mainCharacter.jump();
}

function moveMainCharacter(mainCharacter, ticker) {
    mainCharacter.moveToNextPosition(ticker.deltaTime);
}

function respawnObstacle(obstacle, canvas, ground) {
    obstacle.x = canvas.width;
    obstacle.y = canvas.height - obstacle.height - ground.height + ground.height/8;
}

function increaseLevel(level) {
    if (level < MAX_LEVEL) {
        level += 0.1;
    }

    return level;
}

function moveObstacles(state, ticker) {
    let obstacle = state.obstacle,
        canvas = state.canvas,
        level = state.level,
        ground = state.ground;

    if (obstacle.isOutOfCanvas()) {
        if (Math.random() < CHANCE_OF_RESPAWN) {
            respawnObstacle(obstacle, canvas, ground);
            // obstacleRespawned.next();
            state.level = increaseLevel(state.level);
            increasePointCounter(state.pointCounter);
        }
    } else {
        obstacle.moveToNextPosition(ticker.deltaTime, level);
    }
}

function checkGameOver(mainCharacter, obstacle) {
    return mainCharacter.x + mainCharacter.width / 2 >= obstacle.x &&
        mainCharacter.x <= obstacle.x + obstacle.width / 2 &&
        mainCharacter.y + mainCharacter.height / 2 >= obstacle.y &&
        mainCharacter.y <= obstacle.y + obstacle.height / 2;
}

function increasePointCounter(pointCounter) {
    pointCounter.increasePoints();
}

function gameOver(state) {
    state.isGameOver = true;
    state.mainCharacter.setAction('death');
    state.gameOverText.show();
}

function isGameRunning(state) {
    return state.isGameRunning;
}

function calculateNextObjectsFrames(state) {
    state.mainCharacter.calculateNextFrame();
    state.obstacle.calculateNextFrame();
    state.ground.calculateNextFrame();
}

function render(state) {
    clearCanvas(state);

    state.ground.render();
    state.obstacle.render();
    state.mainCharacter.render();
    state.pointCounter.render();
    state.gameOverText.render();
}

function clearCanvas(state) {
    state.context.fillStyle = 'rgb(0, 117, 255)';
    state.context.fillRect(0, 0, state.canvas.width, state.canvas.height);
}

export {
    render,
    gameOver,
    createGameLoop,

    SPACE_KEY,
    SPACE_KEY_CODE
};