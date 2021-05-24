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

    render() {
        return (
            <div
                className={"game " + this.props.theme}
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
                        theme={this.props.theme}
                        globalState={this.props.globalState}
                        onGameStart={(diff: GameDifficulty) =>
                            this.props.onGameStart(diff)
                        }
                        onChangeTheme={(theme: string) => {
                            this.props.onChangeTheme(theme);
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
    theme: string;
    onCardClick: (cardIndex: number) => void;
    onGameStart: (diff: GameDifficulty) => void;
    onChangeTheme: (theme: string) => void;
}
