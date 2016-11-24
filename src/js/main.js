import { pointCounterUpdates, notifyGameOver, obstacleRespawned } from "./reactive/observables";
import { makeJumpMainCharacter } from "./reactive/observers";
import { increasePointCounter } from "./reactive/observers";
import { moveMainCharacter } from "./reactive/observers";
import { moveObstacles } from "./reactive/observers";
import { checkGameOver } from "./reactive/observers";
import { increaseLevel } from "./reactive/observers";
import { gameOver } from "./reactive/observers";
import { initGame } from "./reactive/observers";
import { gameReset } from "./reactive/observers";
import { mainCharacterJump } from "./reactive/observers";
import { gameLoop } from "./reactive/observers";
import { render } from "./reactive/observers";
import { SPACE_KEY } from "./reactive/observers";

require("../css/main.scss");

function preventSpacebarDefault() {
    document.addEventListener('keydown', (e) =>{
        if (e.keyCode == SPACE_KEY) {
            e.preventDefault();
        }
    });
}

preventSpacebarDefault();
initGame();

mainCharacterJump.subscribe(makeJumpMainCharacter);
pointCounterUpdates.subscribe(increasePointCounter);

gameLoop.subscribe(moveMainCharacter);
gameLoop.subscribe(moveObstacles);
gameLoop.subscribe(checkGameOver);
gameLoop.subscribe(render);

obstacleRespawned.subscribe(increaseLevel);
notifyGameOver.subscribe(gameOver);
gameReset.subscribe(initGame);



