import { createGameLoop } from "./reactive/engine";
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

createGameLoop().subscribe(render);



