import { State } from "./state";

document.onreadystatechange = function () {
    if (document.readyState === "complete") {
        const state = new State();
        // setTimeout(() => {
        //     state.startGame(2);
        // }, 3000);
    }
};
