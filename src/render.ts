import { Card } from "./state";
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export function renderCards(cards: Card[]): void {
    const gameElement = document.body.querySelector(".game");
    if (gameElement !== null) {
        gameElement.textContent = ""; // clear the field
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
                '            <div class="f">' +
                card.sign +
                "</div>\n" +
                '            <div class="b"></div>\n' +
                "        </div>\n";
            gameElement.appendChild(newCardElement);
        });
    }
}
