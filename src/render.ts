import { Card } from "./state";
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export function renderCards(cards: Card[], difficulty?: string): void {
    const gameElement = document.body.querySelector(".field");
    if (gameElement !== null) {
        gameElement.textContent = ""; // clear the field
        switch (difficulty) {
            case "medium":
                gameElement.className += " medium";
                break;
            case "hard":
                gameElement.className += " hard";
                break;
            default:
                gameElement.className += " easy";
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
            gameElement.appendChild(newCardElement);
        });
    }
}
