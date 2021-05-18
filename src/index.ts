import { State } from "./state";
import { GameDifficulty } from "./helpers";

export let state: State;
document.onreadystatechange = function () {
    if (document.readyState === "complete") {
        state = new State();
        state.startGame(GameDifficulty.Medium);
    }
};
