import { Card } from "./state";
import { GameDifficulty } from "./helpers";

type StartCallbackFunction = (d: GameDifficulty) => void;
type CardCallbackFunction = (cardNumber: number) => void;

export class Renderer {
    callbackForStartButton: StartCallbackFunction | undefined = undefined;
    callbacksForCards: CardCallbackFunction | undefined = undefined;
    renderCards(cards: Card[], difficulty?: GameDifficulty): void {
        const startScreenElement = document.body.querySelector(".start-screen");
        if (startScreenElement !== null) {
            startScreenElement.className = "start-screen hidden";
        }

        const fieldElement = document.body.querySelector(".field");
        if (fieldElement !== null) {
            fieldElement.className = "field"; //make it visible
            fieldElement.textContent = ""; // clear the field
            switch (difficulty) {
                case GameDifficulty.Medium:
                    fieldElement.className += " medium";
                    break;
                case GameDifficulty.Hard:
                    fieldElement.className += " hard";
                    break;
                default:
                    fieldElement.className += " easy";
            }
            cards.forEach((card, cardNumber) => {
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
                    '            <div class="b"><p>😀</p></div>\n' +
                    "        </div>\n";
                newCardElement.addEventListener(
                    "click",
                    this.onCard.bind(this, cardNumber)
                );
                fieldElement.appendChild(newCardElement);
                //add event listener for cards, but firs delete?
            });
        }
    }

    renderStartScreen(): void {
        const fieldElement = document.body.querySelector(".field");
        if (fieldElement !== null) {
            fieldElement.className += " hidden";
        }
        const startScreenElement = document.body.querySelector(".start-screen");
        if (startScreenElement !== null) {
            startScreenElement.className = "start-screen"; //make it visible
        }
        const startButtonElement = document.body.querySelector(".button");
        if (startButtonElement !== null) {
            startButtonElement.addEventListener(
                "click",
                this.onStart.bind(this)
            );
        }
        const themeFormElement = document.body.querySelector(
            'form[name="theme"]'
        );
        if (themeFormElement !== null) {
            themeFormElement.addEventListener("change", this.onChangeTheme);
        }
    }

    private onChangeTheme(): void {
        const bodyElement = document.body;
        const themeFormElementChecked = document.querySelector(
            'input[name="theme"]:checked'
        );
        if (themeFormElementChecked !== null) {
            let value = themeFormElementChecked.getAttribute("value");
            if (value === null) {
                value = "theme-1";
            }
            bodyElement.className = value;
        }
    }

    onStartClick(callback: StartCallbackFunction): void {
        this.callbackForStartButton = callback;
    }

    private onStart(): void {
        let selectedDifficulty = GameDifficulty.Easy;
        const difficultyFormElementChecked = document.querySelector(
            'input[name="difficulty"]:checked'
        );
        if (difficultyFormElementChecked !== null) {
            const d: string | null = difficultyFormElementChecked.getAttribute(
                "value"
            );
            switch (d) {
                case "medium":
                    selectedDifficulty = GameDifficulty.Medium;
                    break;
                case "hard":
                    selectedDifficulty = GameDifficulty.Hard;
                    break;
                default:
            }
        }
        if (this.callbackForStartButton !== undefined) {
            this.callbackForStartButton(selectedDifficulty);
        }
    }

    onCardClick(callback: CardCallbackFunction): void {
        this.callbacksForCards = callback;
    }

    private onCard(cardNumber: number): void {
        if (this.callbacksForCards !== undefined) {
            this.callbacksForCards(cardNumber);
        }
    }
}
