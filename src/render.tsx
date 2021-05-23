import { State } from "./state";
import { GameDifficulty, getElement, GlobalState } from "./helpers";
import * as React from "react";
import * as ReactDOM from "react-dom";
import { GameField } from "./components/GameField";
import { ProgressBar } from "./components/ProgressBar";
import { StartScreen } from "./components/StartScreen";

export class Renderer {
    handleMouseDown(e: React.MouseEvent<HTMLElement>): void {
        e.preventDefault();
    }

    theme = "theme-1";
    render(state: State): void {
        ReactDOM.render(
            <div
                className={"game " + this.theme}
                onMouseDown={this.handleMouseDown}
            >
                <ProgressBar progress={state.timeProgress} />
                {state.globalState === GlobalState.GameInProgress ? (
                    <GameField
                        cards={state.cards}
                        difficulty={state.difficulty}
                        onCardClick={(cardIndex) => {
                            state.processCardClick(cardIndex);
                        }}
                    />
                ) : (
                    <StartScreen
                        onGameStart={(diff: GameDifficulty) =>
                            state.processGameStart(diff)
                        }
                        resultLastGame={state.globalState}
                        onChangeTheme={(stringTheme: string) => {
                            const el = document.querySelector(".game");
                            if (el === null) {
                                throw new Error(`Can't find element ".game".`);
                            }
                            el.className = "game " + stringTheme;
                        }}
                    />
                )}
            </div>,
            getElement(".react-app")
        );
    }
}
