import { State } from "./state";
import * as React from "react";
import * as ReactDOM from "react-dom";
import { FullGame } from "./components/FullGame";
import { GameDifficulty, getElement } from "./helpers";

export class Renderer {
    render(state: State): void {
        ReactDOM.render(
            <FullGame
                onCardClick={(cardIndex) => {
                    state.processCardClick(cardIndex);
                }}
                onGameStart={(diff: GameDifficulty) =>
                    state.processGameStart(diff)
                }
                difficulty={state.difficulty}
                cards={state.cards}
                globalState={state.globalState}
                timeProgress={state.timeProgress}
            />,
            getElement(".react-app")
        );
    }
}
