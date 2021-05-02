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

export function renderStartScreen(): void {
    const gameElement = document.body.querySelector(".field");
    if (gameElement !== null) {
        gameElement.textContent = ""; // clear the field
        gameElement.innerHTML =
            '<div class="settings">\n' +
            '                <div class="difficulty">\n' +
            "                    <form>\n" +
            "                        <p>Difficulty:</p>\n" +
            '                        <input type="radio" id="easy" name="difficulty" value="easy" checked>\n' +
            '                        <label for="easy">Easy</label><br>\n' +
            '                        <input type="radio" id="medium" name="difficulty" value="medium">\n' +
            '                        <label for="medium">Medium</label><br>\n' +
            '                        <input type="radio" id="hard" name="difficulty" value="hard">\n' +
            '                        <label for="hard">Hard</label>\n' +
            "                    </form>\n" +
            "                </div>\n" +
            '                <div class="theme">\n' +
            "                    <form>\n" +
            "                        <p>Theme:</p>\n" +
            '                        <input type="radio" id="theme-1" name="difficulty" value="theme-1" checked>\n' +
            '                        <label for="theme-1">Theme 1</label><br>\n' +
            '                        <input type="radio" id="theme-2" name="difficulty" value="theme-2">\n' +
            '                        <label for="theme-2">Theme 2</label><br>\n' +
            '                        <input type="radio" id="theme-3" name="difficulty" value="theme-3">\n' +
            '                        <label for="theme-3">Theme 3</label>\n' +
            "                    </form>\n" +
            "                </div>\n" +
            "            </div>\n" +
            '            <div class="button-area">\n' +
            '                <button class="button"><p>Start</p></button>\n' +
            "            </div>";
    }
}
