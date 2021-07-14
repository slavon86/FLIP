import React, { useState } from "react";
import {
    GameDifficulty,
    gameDifficultyToString,
    GlobalState,
    stringToGameDifficulty,
} from "../helpers";
import { RadioButtonGroup } from "./RadioButtonGroup";
import { RootState } from "../store";
import { useDispatch, useSelector } from "react-redux";
import { setTheme } from "../features/theme/themeSlice";

const difficultyList = [
    { value: "easy", label: "Easy" },
    { value: "medium", label: "Medium" },
    { value: "hard", label: "Hard" },
];

const themeList = [
    { value: "theme-1", label: "Theme-1" },
    { value: "theme-2", label: "Theme-2" },
    { value: "theme-3", label: "Theme-3" },
];

export function StartScreen(props: StartScreenProps) {
    const [difficulty, setDifficulty] = useState(GameDifficulty.Easy);
    const theme = useSelector((state: RootState) => state.theme.value);
    const dispatch = useDispatch();

    return (
        <div className={"start-screen"}>
            <div className="settings">
                <div className="difficulty-form">
                    <form name="difficulty">
                        <p>Difficulty:</p>
                        <RadioButtonGroup
                            groupName="difficulty"
                            groupItems={difficultyList}
                            currentValue={gameDifficultyToString(difficulty)}
                            onValueChange={(value) => {
                                setDifficulty(stringToGameDifficulty(value));
                            }}
                        />
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
                            <p></p>
                            <p></p>
                        </div>
                    )}
                </div>
                <div className="theme-form">
                    <form name="theme">
                        <p>Theme:</p>
                        <RadioButtonGroup
                            groupName="theme"
                            groupItems={themeList}
                            currentValue={theme}
                            onValueChange={(value) => {
                                dispatch(setTheme(value));
                            }}
                        />
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
    onGameStart: (diff: GameDifficulty) => void;
}
