import { Card } from "./state";
export function renderCards(cards: Card[]) {
    // clear the field
    const gameElement = document.body.querySelector(".game");
    if (gameElement !== null) {
        gameElement.textContent = "";
        // create cards in accord with the array of cards
        cards.forEach((card) => {
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
