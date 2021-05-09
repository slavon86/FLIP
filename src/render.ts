import { Card, State } from "./state";
import { GameDifficulty, getElement, GlobalState } from "./helpers";

type StartCallbackFunction = (d: GameDifficulty) => void;
type CardCallbackFunction = (cardNumber: number) => void;

export class Renderer {
    currentPage = GamePage.NotInit;
    callbackForStartButton: StartCallbackFunction | undefined = undefined;
    callbacksForCards: CardCallbackFunction | undefined = undefined;
    render(state: State): void {
        if (state.globalState === GlobalState.StartScreen) {
            this.renderStartScreen();
            return;
        }

        if (state.globalState === GlobalState.GameWin) {
            this.showPage(GamePage.StartPage);
            return;
        }

        this.showPage(GamePage.FieldPage);
        if (state.globalState === GlobalState.GameInProgress) {
            this.updateOnlyClassOfCards(state);
            return;
        }

        const fieldElement = getElement(".field");
        fieldElement.textContent = ""; // clear the field
        switch (state.difficulty) {
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
        state.cards.forEach((card, cardNumber) => {
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

    private updateOnlyClassOfCards(state: State): void {
        const fieldElement = getElement(".field");
        const listOfCardsElements = fieldElement.querySelectorAll(".card");
        if (listOfCardsElements == null) {
            throw new Error("Can't find elements '.card'.");
        }
        state.cards.forEach((card, cardNumber) => {
            if (card.isFlipped === true) {
                listOfCardsElements.item(cardNumber).classList.add("active");
            } else {
                listOfCardsElements.item(cardNumber).classList.remove("active");
            }
            if (card.inGame === false) {
                listOfCardsElements.item(cardNumber).classList.add("out");
            }
        });
    }

    private renderStartScreen(): void {
        this.showPage(GamePage.StartPage);

        const startButtonElement = getElement(".button");
        startButtonElement.addEventListener("click", this.onStart.bind(this));

        const themeFormElement = getElement('form[name="theme"]');
        themeFormElement.addEventListener("change", this.onChangeTheme);
    }

    private onChangeTheme(): void {
        const bodyElement = document.body;
        const themeFormElementChecked = getElement(
            'input[name="theme"]:checked'
        );
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
        const difficultyFormElementChecked = getElement(
            'input[name="difficulty"]:checked'
        );
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

    private showPage(page: GamePage): void {
        if (this.currentPage === page) {
            return; // nothing to do
        }
        const fieldElement = getElement(".field");
        const startScreenElement = getElement(".start-screen");
        // show needed page code
        switch (page) {
            case GamePage.StartPage:
                {
                    fieldElement.classList.add("hidden");
                    startScreenElement.classList.remove("hidden"); //make it visible
                }
                break;
            case GamePage.FieldPage:
                {
                    startScreenElement.classList.add("hidden");
                    fieldElement.classList.remove("hidden"); // make it visible
                }
                break;
            default:
                throw "showPage: 'Incorrect page:GamePage'";
        }
        this.currentPage = page; // remember current page
    }

    renderProgressBar(progress: number): void {
        const progressElement = getElement(".left");
        progressElement.setAttribute("width", `${progress}%`);
    }
}

enum GamePage {
    NotInit,
    StartPage,
    FieldPage,
    // GameOverPage,
}
