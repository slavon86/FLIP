import { Card } from "./state";
import { GameDifficulty } from "./helpers";

type StartCallbackFunction = (d: GameDifficulty) => void;
type CardCallbackFunction = (cardNumber: number) => void;

export class Renderer {
    callbackForStartButton: StartCallbackFunction | undefined = undefined;
    callbacksForCards: CardCallbackFunction | undefined = undefined;
    renderCards(cards: Card[], difficulty: GameDifficulty): void {
        const startScreenElement = document.body.querySelector(".start-screen");
        if (startScreenElement === null) {
            throw "Element with class='start-screen' not found";
        }
        startScreenElement.className = "start-screen hidden";
        const fieldElement = document.body.querySelector(".field");
        if (fieldElement === null) {
            throw "Element with class='field' not found";
        }
        fieldElement.className = "field"; //make it visible
        fieldElement.textContent = ""; // clear the field
        switch (difficulty) {
            case GameDifficulty.Easy:
                fieldElement.classList.add("easy");
                break;
            case GameDifficulty.Medium:
                fieldElement.classList.add("medium");
                break;
            case GameDifficulty.Hard:
                fieldElement.classList.add("hard");
                break;
            default:
                throw "Incorrect difficulty of the game";
        }
        cards.forEach((card, cardNumber) => {
            // create cards in accord with the array of cards
            const newCardElement = document.createElement("div");
            newCardElement.className = "card";
            if (card.isFlipped === true) {
                newCardElement.classList.add("active");
            }
            if (card.inGame === false) {
                newCardElement.classList.add("out");
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
        });
    }

    renderStartScreen(): void {
        const fieldElement = document.body.querySelector(".field");
        if (fieldElement === null) {
            throw "Element with class='field' not found";
        }
        fieldElement.classList.add("hidden");
        const startScreenElement = document.body.querySelector(".start-screen");
        if (startScreenElement === null) {
            throw "Element with class='start-screen' not found";
        }
        startScreenElement.className = "start-screen"; //make it visible
        const startButtonElement = document.body.querySelector(".button");
        if (startButtonElement === null) {
            throw "Element with class='button' not found";
        }
        startButtonElement.addEventListener("click", this.onStart.bind(this));
        const themeFormElement = document.body.querySelector(
            'form[name="theme"]'
        );
        if (themeFormElement === null) {
            throw "Element 'form' with name='theme' not found";
        }
        themeFormElement.addEventListener("change", this.onChangeTheme);
    }

    private onChangeTheme(): void {
        const bodyElement = document.body;
        const themeFormElementChecked = document.querySelector(
            'input[name="theme"]:checked'
        );
        if (themeFormElementChecked === null) {
            throw "Checked tag 'input' not found";
        }
        const value = themeFormElementChecked.getAttribute("value");
        if (value === null) {
            throw "Error value of themeFormElementChecked is null";
        }
        bodyElement.className = value;
    }

    onStartClick(callback: StartCallbackFunction): void {
        this.callbackForStartButton = callback;
    }

    private onStart(): void {
        if (this.callbackForStartButton === undefined) {
            throw "Error: this.callbackForStartButton === undefined";
        }
        this.callbackForStartButton(this.readDifficulty());
    }

    private readDifficulty(): GameDifficulty {
        const difficultyFormElementChecked = document.querySelector(
            'input[name="difficulty"]:checked'
        );
        if (difficultyFormElementChecked === null) {
            throw "Checked tag <input> not found";
        }
        const d = difficultyFormElementChecked.getAttribute("value");
        switch (d) {
            case "easy":
                return GameDifficulty.Easy;
            case "medium":
                return GameDifficulty.Medium;
            case "hard":
                return GameDifficulty.Hard;
            default:
                throw "Incorrect difficulty of the game";
        }
    }

    onCardClick(callback: CardCallbackFunction): void {
        this.callbacksForCards = callback;
    }

    private onCard(cardNumber: number): void {
        if (this.callbacksForCards === undefined) {
            throw "Error: this.callbacksForCards === undefined";
        }
        this.callbacksForCards(cardNumber);
    }
}
