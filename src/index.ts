class Card {
    symbol: string = "";
    inGame: boolean = false;
    isFlipped: boolean = false;
    isEqual(anotherCard: Card): boolean {
        return this.symbol === anotherCard.symbol;
    }
}

class State {
    cards: Card[] = [];
    cardState: CardsState;
    globalState: GlobalState;
    current: number;
    previous: number;
    difficulty: GameDifficulty;

    startGame(d: GameDifficulty) {
        const N = settings[d].size;
        const T = settings[d].time;
    }
}

class Timer {
    constructor(timeSec: number);
    start();
    onTimeout(()=>void);
    private progress: number; // 0 - 100
    onProgressChange((progress: number)=>void);
}

enum GameDifficulty {
    Easy,
    Medium,
    Hard
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
    Easy: {
        time: 80,
        size: 4,
    },
    Medium: {
        time: 140,
        size: 6,
    },
    Hard: {
        time: 230,
        size: 8
    }
}