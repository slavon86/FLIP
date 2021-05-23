import * as React from "react";
import { Card } from "../state";
import { GameDifficulty, gameDifficultyToString } from "../helpers";
import { GameCard } from "./GameCard";

export class GameField extends React.Component<GameFieldProps> {
    constructor(props: GameFieldProps) {
        super(props);
    }

    render() {
        return (
            <div
                className={
                    "field " + gameDifficultyToString(this.props.difficulty)
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
