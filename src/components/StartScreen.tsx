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
        };
    }

    difficultyInput(diff: GameDifficulty, diffString: string) {
        return (
            <p>
                <input
                    type="radio"
                    id={gameDifficultyToString(diff)}
                    name="difficulty"
                    value={gameDifficultyToString(diff)}
                    checked={this.state.difficulty === diff}
                    onChange={(event) =>
                        this.setState({
                            difficulty: stringToGameDifficulty(
                                event.target.value
                            ),
                        })
                    }
                />
                <label htmlFor={gameDifficultyToString(diff)}>
                    {diffString}
                </label>
            </p>
        );
    }

    themeInput(theme: string, themeLabel: string) {
        return (
            <p>
                <input
                    type="radio"
                    id={theme}
                    name={theme}
                    value={theme}
                    checked={this.props.theme === theme}
                    onChange={(event) => {
                        this.props.onChangeTheme(event.target.value);
                    }}
                />
                <label htmlFor={theme}>{themeLabel}</label>
            </p>
        );
    }

    render() {
        return (
            <div className={"start-screen"}>
                <div className="settings">
                    <div className="difficulty-form">
                        <form name="difficulty">
                            <p>Difficulty:</p>
                            {this.difficultyInput(GameDifficulty.Easy, "Easy")}
                            {this.difficultyInput(
                                GameDifficulty.Medium,
                                "Medium"
                            )}
                            {this.difficultyInput(GameDifficulty.Hard, "Hard")}
                        </form>
                    </div>
                    <div className="result-of-game">
                        {this.props.globalState === GlobalState.GameFail && (
                            <div className="fail">
                                <p>FAIL</p>
                                <p>🙁</p>
                            </div>
                        )}
                        {this.props.globalState === GlobalState.GameWin && (
                            <div className="win">
                                <p>WIN</p>
                                <p>😀</p>
                            </div>
                        )}
                        {this.props.globalState === GlobalState.StartScreen && (
                            <div className="start-screen">
                                <p></p>
                                <p></p>
                            </div>
                        )}
                    </div>
                    <div className="theme-form">
                        <form name="theme">
                            <p>Theme:</p>
                            {this.themeInput("theme-1", "Theme 1")}
                            {this.themeInput("theme-2", "Theme 2")}
                            {this.themeInput("theme-3", "Theme 3")}
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
    globalState: GlobalState;
    theme: string;
    onGameStart: (diff: GameDifficulty) => void;
    onChangeTheme: (theme: string) => void;
}

interface StartScreenState {
    difficulty: GameDifficulty;
}
