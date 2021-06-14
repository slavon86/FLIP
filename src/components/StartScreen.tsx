import React, { useState } from "react";
import {
    GameDifficulty,
    gameDifficultyToString,
    GlobalState,
    stringToGameDifficulty,
} from "../helpers";

const difficultyList = [
    { value: GameDifficulty.Easy, label: "Easy" },
    { value: GameDifficulty.Medium, label: "Medium" },
    { value: GameDifficulty.Hard, label: "Hard" },
];

const themeList = [
    { value: "theme-1", label: "Theme-1" },
    { value: "theme-2", label: "Theme-2" },
    { value: "theme-3", label: "Theme-3" },
];

export function StartScreen(props: StartScreenProps) {
    const [difficulty, setDifficulty] = useState(GameDifficulty.Easy);
    const [theme, setTheme] = useState("theme-1");

    return (
        <div className={"start-screen"}>
            <div className="settings">
                <div className="difficulty-form">
                    <form name="difficulty">
                        <p>Difficulty:</p>
                        {difficultyList.map((item) => (
                            <p key={gameDifficultyToString(item.value)}>
                                <input
                                    type="radio"
                                    id={gameDifficultyToString(item.value)}
                                    name="difficulty"
                                    value={gameDifficultyToString(item.value)}
                                    checked={difficulty === item.value}
                                    onChange={(event) =>
                                        setDifficulty(
                                            stringToGameDifficulty(
                                                event.target.value
                                            )
                                        )
                                    }
                                />
                                <label
                                    htmlFor={gameDifficultyToString(item.value)}
                                >
                                    {item.label}
                                </label>
                            </p>
                        ))}
                    </form>
                </div>
                <div className="result-of-game">
                    {props.globalState === GlobalState.GameFail && (
                        <div className="fail">
                            <p>FAIL</p>
                            <p>🙁</p>
                        </div>
                    )}
                    {props.globalState === GlobalState.GameWin && (
                        <div className="win">
                            <p>WIN</p>
                            <p>😀</p>
                        </div>
                    )}
                    {props.globalState === GlobalState.StartScreen && (
                        <div className="start-screen">
                            <p> </p>
                            <p> </p>
                        </div>
                    )}
                </div>
                <div className="theme-form">
                    <form name="theme">
                        <p>Theme:</p>
                        {themeList.map((item) => (
                            <p key={item.value}>
                                <input
                                    type="radio"
                                    id={item.value}
                                    name="theme"
                                    value={item.value}
                                    checked={theme === item.value}
                                    onChange={(event) => {
                                        setTheme(event.target.value);
                                        props.onChangeTheme(item.value);
                                    }}
                                />
                                <label htmlFor={item.value}>{item.label}</label>
                            </p>
                        ))}
                    </form>
                </div>
            </div>
            <div className="button-area">
                <button
                    className="button"
                    onClick={() => {
                        props.onGameStart(difficulty);
                    }}
                >
                    <p>Start</p>
                </button>
            </div>
        </div>
    );
}

interface StartScreenProps {
    globalState: GlobalState;
    theme: string;
    onGameStart: (diff: GameDifficulty) => void;
    onChangeTheme: (theme: string) => void;
}
