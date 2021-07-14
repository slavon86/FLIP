import React from "react";
import { Card } from "../state";
import { ProgressBar } from "./ProgressBar";
import { GameDifficulty, GlobalState } from "../helpers";
import { GameField } from "./GameField";
import { StartScreen } from "./StartScreen";
import { useSelector } from "react-redux";
import { RootState } from "../store";

export function FullGame(props: FullGameProps) {
    const theme = useSelector((state: RootState) => state.theme.value);
    return (
        <div
            className={"game " + theme}
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
                    globalState={props.globalState}
                    onGameStart={props.onGameStart}
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
    onCardClick: (cardIndex: number) => void;
    onGameStart: (diff: GameDifficulty) => void;
}
