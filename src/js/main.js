import { pointCounterUpdates, notifyGameOver, obstacleRespawned } from "./reactive/observables";
import { makeJumpMainCharacter } from "./reactive/engine";
import { increasePointCounter } from "./reactive/engine";
import { moveMainCharacter } from "./reactive/engine";
import { moveObstacles } from "./reactive/engine";
import { checkGameOver } from "./reactive/engine";
import { increaseLevel } from "./reactive/engine";
import { gameOver } from "./reactive/engine";
import { initGame } from "./reactive/engine";
import { gameReset } from "./reactive/engine";
import { mainCharacterJump } from "./reactive/engine";
import { gameLoop } from "./reactive/engine";
import { render } from "./reactive/engine";
import { SPACE_KEY } from "./reactive/engine";

require("../css/main.scss");

function preventSpacebarDefault() {
    document.addEventListener('keydown', (e) =>{
        if (e.code == SPACE_KEY || e.key == SPACE_KEY) {
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



