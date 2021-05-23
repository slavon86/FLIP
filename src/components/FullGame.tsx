import * as React from "react";
import { Card } from "../state";
import { ProgressBar } from "./ProgressBar";
import { GameDifficulty, GlobalState } from "../helpers";
import { GameField } from "./GameField";
import { StartScreen } from "./StartScreen";

export class FullGame extends React.Component<FullGameProps> {
    constructor(props: FullGameProps) {
        super(props);
    }

    handleMouseDown(e: React.MouseEvent<HTMLElement>): void {
        e.preventDefault();
    }
    theme = "theme-1";
    render() {
        return (
            <div
                className={"game " + this.theme}
                onMouseDown={this.handleMouseDown}
            >
                <ProgressBar progress={this.props.timeProgress} />
                {this.props.globalState === GlobalState.GameInProgress ? (
                    <GameField
                        cards={this.props.cards}
                        difficulty={this.props.difficulty}
                        onCardClick={(cardIndex) => {
                            this.props.onCardClick(cardIndex);
                        }}
                    />
                ) : (
                    <StartScreen
                        onGameStart={(diff: GameDifficulty) =>
                            this.props.onGameStart(diff)
                        }
                        resultLastGame={this.props.globalState}
                        onChangeTheme={(stringTheme: string) => {
                            const el = document.querySelector(".game");
                            if (el === null) {
                                throw new Error(`Can't find element ".game".`);
                            }
                            el.className = "game " + stringTheme;
                            this.theme = stringTheme;
                        }}
                    />
                )}
            </div>
        );
    }
}

interface FullGameProps {
    timeProgress: number;
    globalState: GlobalState;
    cards: Card[];
    difficulty: GameDifficulty;
    onCardClick: (cardIndex: number) => void;
    onGameStart: (diff: GameDifficulty) => void;
}

interface FullGameState {
    theme: string;
}
