import { Card, State } from "./state";
import { GameDifficulty } from "./state";

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export function renderCards(cards: Card[], difficulty?: GameDifficulty): void {
    const startScreenElement = document.body.querySelector(".start-screen");
    if (startScreenElement !== null) {
        startScreenElement.className += " hidden";
    }

    const fieldElement = document.body.querySelector(".field");
    if (fieldElement !== null) {
        fieldElement.className = "field"; //make it visible
        fieldElement.textContent = ""; // clear the field
        switch (difficulty) {
            case 1:
                fieldElement.className += " medium";
                break;
            case 2:
                fieldElement.className += " hard";
                break;
            default:
                fieldElement.className += " easy";
        }
        cards.forEach((card) => {
            // create cards in accord with the array of cards
            const newCardElement = document.createElement("div");
            newCardElement.className = "card";
            if (card.isFlipped === true) {
                newCardElement.className += " active";
            }
            if (card.inGame === false) {
                newCardElement.className += " out";
            }
            newCardElement.innerHTML =
                '        <div class="flipper">\n' +
                '            <div class="f"><p>' +
                card.sign +
                "</p></div>\n" +
                '            <div class="b"><p>&nbsp;</p></div>\n' +
                "        </div>\n";
            fieldElement.appendChild(newCardElement);
        });
    }
}

export function renderStartScreen(): void {
    const fieldElement = document.body.querySelector(".field");
    if (fieldElement !== null) {
        fieldElement.className += " hidden";
    }
    const startScreenElement = document.body.querySelector(".start-screen");
    if (startScreenElement !== null) {
        startScreenElement.className = "start-screen"; //make it visible
    }
}

export function changeTheme(value: string): void {
    const bodyElement = document.body;
    if (value === undefined) {
        value = "theme-1";
    }
    if (bodyElement !== null) {
        bodyElement.className = value;
    }
}
