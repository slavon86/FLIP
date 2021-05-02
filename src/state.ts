import { renderCards, renderStartScreen } from "./render";
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
    //current: number;
    //previous: number;
    difficulty: GameDifficulty;
    constructor() {
        this.cardState = 0;
        this.globalState = 0;
        this.difficulty = 0;
        renderStartScreen();
    }

    startGame(d: GameDifficulty) {
        this.difficulty = d;
        const N = settings[d].size;
        const T = settings[d].time;
        const signs = "☽☂☏☆☀☁☃☺1234567890QWERTYUIOPASDFGHJKLZXCVBNM";
        this.cards = generateRandomPairs(signs, d, true).map((sign) => {
            const result = new Card();
            result.sign = sign;
            result.inGame = true;
            result.isFlipped = false;
            return result;
        });
        renderCards(this.cards, this.difficulty);
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
    inputSigns: string,
    difficulty?: GameDifficulty,
    shuffleInput?: boolean
): Array<string> {
    let numberOfPairs = 8;
    if (difficulty === 1) {
        numberOfPairs = 18;
    }
    if (difficulty === 2) {
        numberOfPairs = 32;
    }
    if (inputSigns.length < numberOfPairs) {
        throw "Incorrect string of signs or number of pairs";
    }
    let outputSigns = inputSigns.split("");
    if (shuffleInput === true) {
        outputSigns = shuffleOfArray(outputSigns);
    }
    outputSigns = outputSigns.slice(0, numberOfPairs);
    outputSigns = outputSigns.concat(outputSigns);
    return shuffleOfArray(outputSigns);
}
