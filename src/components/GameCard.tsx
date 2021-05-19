import * as React from "react";
import { Card } from "../state";

export class GameCard extends React.Component<GameCardProps> {
    constructor(props: GameCardProps) {
        super(props);
    }

    render() {
        let cardClasses = "card";
        if (this.props.card.isFlipped === true) {
            cardClasses += " active";
        }
        if (this.props.card.inGame === false) {
            cardClasses += " out";
        }
        return (
            <div className={cardClasses} onClick={this.props.onClick}>
                <div className="flipper">
                    <div className="f">
                        <p>{this.props.card.sign}</p>
                    </div>
                    <div className="b">
                        <p>😀</p>
                    </div>
                </div>
            </div>
        );
    }
}

interface GameCardProps {
    card: Card;
    onClick: () => void;
}
