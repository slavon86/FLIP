import React, { useState } from "react";
import {
    GameDifficulty,
    gameDifficultyToString,
    GlobalState,
    stringToGameDifficulty,
} from "../helpers";

const difficultyList = [
    { id: GameDifficulty.Easy, name: "Easy" },
    { id: GameDifficulty.Medium, name: "Medium" },
    { id: GameDifficulty.Hard, name: "Hard" },
];

const themeList = [
    { id: "theme-1", name: "Theme-1" },
    { id: "theme-2", name: "Theme-2" },
    { id: "theme-3", name: "Theme-3" },
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
                            <p key={gameDifficultyToString(item.id)}>
                                <input
                                    type="radio"
                                    id={gameDifficultyToString(item.id)}
                                    name="difficulty"
                                    value={gameDifficultyToString(item.id)}
                                    checked={difficulty === item.id}
                                    onChange={(event) =>
                                        setDifficulty(
                                            stringToGameDifficulty(
                                                event.target.value
                                            )
                                        )
                                    }
                                />
                                <label
                                    htmlFor={gameDifficultyToString(item.id)}
                                >
                                    {item.name}
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
                            <p key={item.id}>
                                <input
                                    type="radio"
                                    id={item.id}
                                    name="theme"
                                    value={item.id}
                                    checked={theme === item.id}
                                    onChange={(event) => {
                                        setTheme(event.target.value);
                                        props.onChangeTheme(item.id);
                                    }}
                                />
                                <label htmlFor={item.id}>{item.name}</label>
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
