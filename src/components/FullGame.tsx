import React from "react";
import { Card } from "../state";
import { ProgressBar } from "./ProgressBar";
import { GameDifficulty, GlobalState } from "../helpers";
import { GameField } from "./GameField";
import { StartScreen } from "./StartScreen";
import { RootState } from "../store";
import { useDispatch, useSelector } from "react-redux";

export function FullGame(props: FullGameProps) {
    const theme = useSelector((state: RootState) => state.theme.value);
    const dispatch = useDispatch();
    return (
        <div
            className={"game " + props.theme}
            onMouseDown={(e: React.MouseEvent<HTMLElement>): void => {
                e.preventDefault();
            }}
        >
            <ProgressBar progress={props.timeProgress} />
            {props.globalState === GlobalState.GameInProgress ? (
                <GameField
                    cards={props.cards}
                    difficulty={props.difficulty}
                    onCardClick={props.onCardClick}
                />
            ) : (
                <StartScreen
                    theme={props.theme}
                    globalState={props.globalState}
                    onGameStart={props.onGameStart}
                    onChangeTheme={dispatch(setTheme(value))}
                />
            )}
        </div>
    );
}

interface FullGameProps {
    timeProgress: number;
    globalState: GlobalState;
    cards: Card[];
    difficulty: GameDifficulty;
    theme: string;
    onCardClick: (cardIndex: number) => void;
    onGameStart: (diff: GameDifficulty) => void;
}
