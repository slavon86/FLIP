import * as React from "react";
import {
    GameDifficulty,
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

    render() {
        return (
            <div className={"start-screen"}>
                <div className="settings">
                    <div className="difficulty-form">
                        <form name="difficulty">
                            <p>Difficulty:</p>
                            <input
                                type="radio"
                                id="easy"
                                name="difficulty"
                                value="easy"
                                checked={
                                    this.state.difficulty ===
                                    GameDifficulty.Easy
                                }
                                onChange={(event) =>
                                    this.setState({
                                        difficulty: stringToGameDifficulty(
                                            event.target.value
                                        ),
                                    })
                                }
                            />
                            <label htmlFor="easy">Easy</label>
                            <br />
                            <input
                                type="radio"
                                id="medium"
                                name="difficulty"
                                value="medium"
                                checked={
                                    this.state.difficulty ===
                                    GameDifficulty.Medium
                                }
                                onChange={(event) =>
                                    this.setState({
                                        difficulty: stringToGameDifficulty(
                                            event.target.value
                                        ),
                                    })
                                }
                            />
                            <label htmlFor="medium">Medium</label>
                            <br />
                            <input
                                type="radio"
                                id="hard"
                                name="difficulty"
                                value="hard"
                                checked={
                                    this.state.difficulty ===
                                    GameDifficulty.Hard
                                }
                                onChange={(event) =>
                                    this.setState({
                                        difficulty: stringToGameDifficulty(
                                            event.target.value
                                        ),
                                    })
                                }
                            />
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
                            <input
                                type="radio"
                                id="theme-1"
                                name="theme"
                                value="theme-1"
                                checked={this.state.theme === "theme-1"}
                                onChange={(event) => {
                                    this.setState({
                                        theme: event.target.value,
                                    });
                                    this.props.onChangeTheme("theme-1");
                                }}
                            />
                            <label htmlFor="theme-1">Theme 1</label>
                            <br />
                            <input
                                type="radio"
                                id="theme-2"
                                name="theme"
                                value="theme-2"
                                checked={this.state.theme === "theme-2"}
                                onChange={(event) => {
                                    this.setState({
                                        theme: event.target.value,
                                    });
                                    this.props.onChangeTheme("theme-2");
                                }}
                            />
                            <label htmlFor="theme-2">Theme 2</label>
                            <br />
                            <input
                                type="radio"
                                id="theme-3"
                                name="theme"
                                value="theme-3"
                                checked={this.state.theme === "theme-3"}
                                onChange={(event) => {
                                    this.setState({
                                        theme: event.target.value,
                                    });
                                    this.props.onChangeTheme("theme-3");
                                }}
                            />
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
