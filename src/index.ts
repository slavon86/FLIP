import { Renderer } from "./render";
import { Card, State } from "./state";
import { shuffleOfArray } from "./helpers";
import { GameDifficulty } from "./state";

document.onreadystatechange = function () {
    if (document.readyState === "complete") {
        const state = new State();
        // setTimeout(() => {
        //     state.startGame(2);
        // }, 3000);
    }
};
