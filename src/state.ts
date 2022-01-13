import { Renderer } from "./render";
import {
    CardsState,
    GameDifficulty,
    generateRandomPairs,
    GlobalState,
    Timer,
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
    globalState: GlobalState;
    difficulty: GameDifficulty;
    theme: string;
    timeProgress: number;
    private cardState: CardsState;
    private numberOfPairs: number;
    private count: number;
    private firstCard: number;
    private secondCard: number;
    private renderer: Renderer;
    private timer: Timer;
    private emodji: Array<string> = ["🧠","😀","😵","😎","😱","😈","🤖","👽","🎃","👊","👍","👎","👈","👉","👆",
                    "👇","🖖","🦾","💪","👁","👂","🦶","🦷","☂","🌂","👓","🥽","💼","🎒","⛑","👞","👠","👑", ];

    constructor() {
        this.globalState = GlobalState.StartScreen;
        this.difficulty = GameDifficulty.Easy;
        this.count = 0;
        this.firstCard = 0;
        this.secondCard = 0;    
        this.cardState = CardsState.NoCardsOpen;
        this.numberOfPairs = 0;
        this.theme = "theme-1";
        this.timeProgress = 100;
        this.renderer = new Renderer();
        this.renderer.render(this);
        this.timer = new Timer(settings[this.difficulty].time);
    }

    processGameStart(d: GameDifficulty) {
        this.difficulty = d;
        this.count = 0;
        this.firstCard = 0;
        this.secondCard = 0;    
        this.cardState = CardsState.NoCardsOpen;
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
        this.timer = new Timer(settings[this.difficulty].time);
        this.timer.onTimeout(() => {
            this.processTimeout();
        });
        this.timer.onProgressChange((progress) => {
            this.processProgressChange(progress);
        });
        this.timer.start();
    }

    processCardClick(cardIndex: number) {
        const card = this.cards[cardIndex];
        if (this.cardState === CardsState.NoCardsOpen) {
            card.isFlipped = true;
            this.firstCard = cardIndex;
            this.cardState = CardsState.OneCardOpen;
        } else if (
            this.cardState === CardsState.OneCardOpen &&
            this.firstCard != cardIndex
        ) {
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
                        this.timer.stop();
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
    }

    private processProgressChange(progress: number) {
        this.timeProgress = progress;
        this.renderer.render(this);
    }

    private processTimeout() {
        this.globalState = GlobalState.GameFail;
        this.timer.stop();
        this.renderer.render(this);
    }

    processChangeTheme(theme: string) {
        this.theme = theme;
        this.renderer.render(this);
    }
}
