import * as React from "react";
import {
    GameDifficulty,
    gameDifficultyToString,
    GlobalState,
    stringToGameDifficulty,
} from "../helpers";

export class StartScreen extends React.Component<
    StartScreenProps,
    StartScreenState
> {
    constructor(props: StartScreenProps) {
        super(props);
        this.state = {
            difficulty: GameDifficulty.Easy,
            theme: "theme-1",
        };
    }

    difficultyInput(diff: GameDifficulty) {
        return (
            <input
                type="radio"
                id={gameDifficultyToString(diff)}
                name="difficulty"
                value={gameDifficultyToString(diff)}
                checked={this.state.difficulty === diff}
                onChange={(event) =>
                    this.setState({
                        difficulty: stringToGameDifficulty(event.target.value),
                    })
                }
            />
        );
    }

    themeInput(theme: string) {
        return (
            <input
                type="radio"
                id={theme}
                name={theme}
                value={theme}
                checked={this.state.theme === theme}
                onChange={(event) => {
                    this.setState({
                        theme: event.target.value,
                    });
                    this.props.onChangeTheme(event.target.value);
                }}
            />
        );
    }

    render() {
        return (
            <div className={"start-screen"}>
                <div className="settings">
                    <div className="difficulty-form">
                        <form name="difficulty">
                            <p>Difficulty:</p>
                            {this.difficultyInput(GameDifficulty.Easy)}
                            <label htmlFor="easy">Easy</label>
                            <br />
                            {this.difficultyInput(GameDifficulty.Medium)}
                            <label htmlFor="medium">Medium</label>
                            <br />
                            {this.difficultyInput(GameDifficulty.Hard)}
                            <label htmlFor="hard">Hard</label>
                        </form>
                    </div>
                    <div className="result-of-game">
                        {this.props.resultLastGame === GlobalState.GameFail ? (
                            <div className="fail">
                                <p>FAIL</p>
                                <p>🙁</p>
                            </div>
                        ) : (
                            <p> </p>
                        )}

                        {this.props.resultLastGame === GlobalState.GameWin ? (
                            <div className="win">
                                <p>WIN</p>
                                <p>😀</p>
                            </div>
                        ) : (
                            <p> </p>
                        )}
                    </div>
                    <div className="theme-form">
                        <form name="theme">
                            <p>Theme:</p>
                            {this.themeInput("theme-1")}
                            <label htmlFor="theme-1">Theme 1</label>
                            <br />
                            {this.themeInput("theme-2")}
                            <label htmlFor="theme-2">Theme 2</label>
                            <br />
                            {this.themeInput("theme-3")}
                            <label htmlFor="theme-3">Theme 3</label>
                        </form>
                    </div>
                </div>
                <div className="button-area">
                    <button
                        className="button"
                        onClick={() => {
                            this.props.onGameStart(this.state.difficulty);
                        }}
                    >
                        <p>Start</p>
                    </button>
                </div>
            </div>
        );
    }
}

interface StartScreenProps {
    onGameStart: (diff: GameDifficulty) => void;
    resultLastGame: GlobalState;
    onChangeTheme: (theme: string) => void;
}

interface StartScreenState {
    difficulty: GameDifficulty;
    theme: string;
}
