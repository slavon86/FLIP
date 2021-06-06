import React from "react";
import { Card } from "../state";

export function GameCard(props: GameCardProps) {
    return (
        <div
            className={
                "card" +
                (props.card.isFlipped === true ? " active" : "") +
                (props.card.inGame === false ? " out" : "")
            }
            onClick={props.onClick}
        >
            <div className="flipper">
                <div className="f">
                    <p>{props.card.sign}</p>
                </div>
                <div className="b">
                    <p>😀</p>
                </div>
            </div>
        </div>
    );
}

interface GameCardProps {
    card: Card;
    onClick: () => void;
}
