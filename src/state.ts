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
    private cardState: CardsState;
    globalState: GlobalState;
    private firstCard = 0;
    private secondCard = 0;
    difficulty: GameDifficulty;
    private numberOfPairs: number | undefined;
    private count = 0;
    private emodji: Array<string> = [
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
    private renderer: Renderer;
    constructor() {
        this.cardState = CardsState.NoCardsOpen;
        this.globalState = GlobalState.StartScreen;
        this.difficulty = GameDifficulty.Easy;
        this.renderer = new Renderer();
        this.renderer.onStartClick((selectedDifficulty) => {
            this.startGame(selectedDifficulty);
        });
        this.renderer.render(this);
    }

    private startGame(d: GameDifficulty) {
        this.difficulty = d;
        this.count = 0;
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
        this.globalState = GlobalState.InitGame;
        this.renderer.render(this);
        this.globalState = GlobalState.GameInProgress;
        this.renderer.onCardClick((cardIndex: number) => {
            const card = this.cards[cardIndex];
            if (this.cardState === CardsState.NoCardsOpen) {
                card.isFlipped = true;
                this.firstCard = cardIndex;
                this.cardState = CardsState.OneCardOpen;
            } else if (this.cardState === CardsState.OneCardOpen) {
                //do some magic
                card.isFlipped = true;
                this.secondCard = cardIndex;
                this.cardState = CardsState.TwoCardsOpen;
                setTimeout(() => {
                    if (
                        this.cards[this.firstCard].isEqual(
                            this.cards[this.secondCard]
                        )
                    ) {
                        this.cards[this.firstCard].inGame = false;
                        this.cards[this.secondCard].inGame = false;
                        this.count++;
                        if (this.count === this.numberOfPairs) {
                            this.globalState = GlobalState.GameWin;
                        }
                    } else {
                        this.cards[this.firstCard].isFlipped = false;
                        this.cards[this.secondCard].isFlipped = false;
                    }
                    this.cardState = CardsState.NoCardsOpen;
                    this.renderer.render(this);
                }, 500);
            }
            this.renderer.render(this);
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
