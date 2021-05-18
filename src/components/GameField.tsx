import * as React from "react";
import { Card } from "../state";
import { GameDifficulty } from "../helpers";
import { GameCard } from "./GameCard";

export class GameField extends React.Component<GameFieldProps> {
    constructor(props: GameFieldProps) {
        super(props);
    }
    private getDifficultyClass(difficulty: GameDifficulty) {
        switch (difficulty) {
            case GameDifficulty.Easy:
                return "easy";
            case GameDifficulty.Medium:
                return "medium";
            case GameDifficulty.Hard:
                return "hard";
            default:
                throw new Error("Incorrect difficulty of the game");
        }
    }

    render() {
        return (
            <div
                className={
                    "field " + this.getDifficultyClass(this.props.difficulty)
                }
            >
                {this.props.cards.map((card, cardNumber) => {
                    return (
                        <GameCard
                            key={cardNumber}
                            card={card}
                            onClick={() => {
                                this.props.onCardClick(cardNumber);
                            }}
                        />
                    );
                })}
            </div>
        );
    }
}

interface GameFieldProps {
    cards: Card[];
    difficulty: GameDifficulty;
    onCardClick: (cardIndex: number) => void;
}
