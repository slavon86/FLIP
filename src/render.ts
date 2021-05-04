import { Card } from "./state";
import { GameDifficulty } from "./helpers";

type StartCallbackFunction = (d: GameDifficulty) => void;

export class Renderer {
    callbackForStartButton: StartCallbackFunction | undefined = undefined;

    renderCards(cards: Card[], difficulty?: GameDifficulty): void {
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
            console.log(
                'themeFormElement.addEventListener("change", this.onChangeTheme);'
            );
            themeFormElement.addEventListener("change", this.onChangeTheme);
        }
    }

    private onChangeTheme(): void {
        const bodyElement = document.body;
        const themeFormElementChecked = document.querySelector(
            'input[name="theme"]:checked'
        );
        console.log("themeFormElementChecked ", themeFormElementChecked);
        if (themeFormElementChecked !== null) {
            let value = themeFormElementChecked.getAttribute("value");
            console.log("value", value);
            if (value === null) {
                value = "theme-1";
            }
            if (bodyElement !== null) {
                bodyElement.className = value;
            }
        }
    }

    onStartClick(callback: StartCallbackFunction): void {
        this.callbackForStartButton = callback;
    }

    private onStart(): void {
        let selectedDifficulty = GameDifficulty.Easy;
        let d: string | null = null;
        const difficultyFormElementChecked = document.querySelector(
            'input[name="difficulty"]:checked'
        );
        if (difficultyFormElementChecked !== null) {
            d = difficultyFormElementChecked.getAttribute("value");
            switch (d) {
                case "medium":
                    selectedDifficulty = GameDifficulty.Medium;
                    break;
                case "hard":
                    selectedDifficulty = GameDifficulty.Hard;
                    break;
                default:
                    selectedDifficulty = GameDifficulty.Easy;
            }
        }
        if (this.callbackForStartButton !== undefined) {
            this.callbackForStartButton(selectedDifficulty);
        }
    }
}
