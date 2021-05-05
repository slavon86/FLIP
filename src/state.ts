import { Renderer } from "./render";
import {
    CardsState,
    GameDifficulty,
    generateRandomPairs,
    GlobalState,
    settings,
} from "./helpers";

export class Card {
    sign = "";
    inGame = false;
    isFlipped = false;
    isEqual(anotherCard: Card): boolean {
        return this.sign === anotherCard.sign;
    }
}

export class State {
    cards: Card[] = [];
    cardState: CardsState;
    globalState: GlobalState;
    firstCard: number | undefined;
    secondCard: number | undefined;
    difficulty: GameDifficulty;
    numberOfPairs: number | undefined;
    emodji: Array<string> = [
        "🧠",
        "😀",
        "😵",
        "😎",
        "😱",
        "😈",
        "🤖",
        "👽",
        "🎃",
        "👊",
        "👍",
        "👎",
        "👈",
        "👉",
        "👆",
        "👇",
        "🖖",
        "🦾",
        "💪",
        "👁",
        "👂",
        "🦶",
        "🦷",
        "☂",
        "🌂",
        "👓",
        "🥽",
        "💼",
        "🎒",
        "⛑",
        "👞",
        "👠",
        "👑",
    ];
    renderer: Renderer;
    constructor() {
        this.cardState = CardsState.NoCardsOpen;
        this.globalState = GlobalState.StartScreen;
        this.difficulty = GameDifficulty.Easy;
        this.firstCard = undefined;
        this.secondCard = undefined;
        this.renderer = new Renderer();
        this.renderer.onStartClick((selectedDifficulty) => {
            this.startGame(selectedDifficulty);
        });
        this.renderer.renderStartScreen();
    }

    startGame(d: GameDifficulty) {
        this.difficulty = d;
        //const N = settings[d].size;
        //const T = settings[d].time;
        this.numberOfPairs = Math.pow(settings[d].size, 2) / 2;
        this.cards = generateRandomPairs(
            this.emodji,
            this.numberOfPairs,
            true
        ).map((sign) => {
            const result = new Card();
            result.sign = sign;
            result.inGame = true;
            result.isFlipped = false;
            return result;
        });
        this.renderer.renderCards(this.cards, this.difficulty);
        this.globalState = GlobalState.GameInProgress;
        this.renderer.onCardClick((cardIndex: number) => {
            const card = this.cards[cardIndex];
            if (card.isFlipped === true) {
                card.isFlipped = false;
            } else {
                card.isFlipped = true;
            }
            // if (this.cardState === CardsState.NoCardsOpen) {
            //     card.isFlipped = true;
            //     this.firstCard = cardIndex;
            //     this.cardState = CardsState.OneCardOpen;
            // } else if (this.cardState === CardsState.OneCardOpen) {
            //     //do some magic
            //     if (card.isFlipped === true) { doNothing }
            //     card.isFlipped = true;
            //     this.secondCard = cardIndex;
            //     this.cardState = CardsState.TwoCardsOpen;
            //     // turn on timer and wait (show two flipped cards for 0.5 second)
            //     // compare cards
            //     // IF cards are different THEN flip back
            //     // ELSE out from field, and remove event handler
            // }
            //some cards changed their state? re-render
            this.renderer.renderCards(this.cards, this.difficulty);
        });
    }
}
/*
class Timer {
    constructor(timeSec: number);
    start();
    onTimeout(()=>void);
    private progress: number; // 0-100
    onProgressChange((progress: number)=>void);
}
*/
