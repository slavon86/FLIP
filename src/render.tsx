import { State } from "./state";
import React from "react";
import ReactDOM from "react-dom";
import { FullGame } from "./components/FullGame";
import { getElement } from "./helpers";
import { store } from "./store";
import { Provider } from "react-redux";

export class Renderer {
    render(state: State): void {
        ReactDOM.render(
            <Provider store={store}>
                <FullGame
                    difficulty={state.difficulty}
                    cards={state.cards}
                    globalState={state.globalState}
                    timeProgress={state.timeProgress}
                    onCardClick={state.processCardClick.bind(state)}
                    onGameStart={state.processGameStart.bind(state)}
                />
            </Provider>,
            getElement(".react-app")
        );
    }
}
