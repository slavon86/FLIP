import { Renderer } from "./render";
import { shuffleOfArray } from "./helpers";

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
    renderer: Renderer;
    constructor() {
        this.cardState = 0;
        this.globalState = 0;
        this.difficulty = 0;
        this.firstCard = undefined;
        this.secondCard = undefined;
        this.renderer = new Renderer();
        this.renderer.renderStartScreen();
    }

    startGame(d: GameDifficulty) {
        this.difficulty = d;
        const N = settings[d].size;
        const T = settings[d].time;
        const emodji = [
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
        this.cards = generateRandomPairs(emodji, d, true).map((sign) => {
            const result = new Card();
            result.sign = sign;
            result.inGame = true;
            result.isFlipped = Math.random() > 0.8;
            return result;
        });
        this.renderer.renderCards(this.cards, this.difficulty);
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
export enum GameDifficulty {
    Easy,
    Medium,
    Hard,
}

enum CardsState {
    NoCardsOpen,
    OneCardOpen,
    TwoCardsOpen,
}
enum GlobalState {
    StartScreen,
    GameInProgress,
    GameWin,
    GameFail,
}

const settings = {
    0: {
        time: 80,
        size: 4,
    },
    1: {
        time: 300,
        size: 6,
    },
    2: {
        time: 900,
        size: 8,
    },
};

function generateRandomPairs(
    inputSigns: Array<string>,
    difficulty: GameDifficulty,
    shuffleInput?: boolean
): Array<string> {
    const numberOfPairs = Math.pow(settings[difficulty].size, 2) / 2;
    if (inputSigns.length < numberOfPairs) {
        throw "Incorrect string of signs or number of pairs";
    }
    let outputSigns = inputSigns.map((value) => value);
    if (shuffleInput === true) {
        outputSigns = shuffleOfArray(outputSigns);
    }
    outputSigns = outputSigns.slice(0, numberOfPairs);
    outputSigns = outputSigns.concat(outputSigns);
    return shuffleOfArray(outputSigns);
}
