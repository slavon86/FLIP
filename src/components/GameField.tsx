import React from "react";
import { Card } from "../state";
import { GameDifficulty, gameDifficultyToString } from "../helpers";
import { GameCard } from "./GameCard";

export function GameField(props: GameFieldProps) {
    return (
        <div className={"field " + gameDifficultyToString(props.difficulty)}>
            {props.cards.map((card, cardNumber) => {
                return (
                    <GameCard
                        key={cardNumber}
                        card={card}
                        onClick={() => {
                            props.onCardClick(cardNumber);
                        }}
                    />
                );
            })}
        </div>
    );
}

interface GameFieldProps {
    cards: Card[];
    difficulty: GameDifficulty;
    onCardClick: (cardIndex: number) => void;
}
