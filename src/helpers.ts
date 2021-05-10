type TimeoutCallbackFunction = () => void;
type ProgressChangeCallbackFunction = (progress: number) => void;

export class Timer {
    private progress: number; // 0-100
    private period: number;
    private isStop: boolean;
    private timeoutCallback: TimeoutCallbackFunction | undefined = undefined;
    private progressChangeCallback:
        | ProgressChangeCallbackFunction
        | undefined = undefined;
    constructor(timeSec: number) {
        this.progress = 100;
        this.period = timeSec / 10;
        this.isStop = false;
    }

    start(): void {
        setTimeout(() => {
            this.progressChange();
        }, this.period);
    }

    stop(): void {
        this.isStop = true;
    }

    onTimeout(callback: TimeoutCallbackFunction): void {
        this.timeoutCallback = callback;
    }

    onProgressChange(callback: ProgressChangeCallbackFunction): void {
        this.progressChangeCallback = callback;
    }

    private progressChange(): void {
        if (this.isStop === true) {
            return;
        }
        this.progress = this.progress - 0.01;
        if (this.progressChangeCallback === undefined) {
            throw new Error(
                "Error in progressChange(): this.progressChangeCallback === undefined."
            );
        }
        this.progressChangeCallback(this.progress);
        if (this.progress <= 0) {
            if (this.timeoutCallback === undefined) {
                throw new Error(
                    "Error in progressChange(): this.timeoutCallback === undefined."
                );
            }
            this.timeoutCallback();
            return;
        }
        setTimeout(() => {
            this.progressChange();
        }, this.period);
    }
}

function getRandomInt(max: number): number {
    return Math.floor(Math.random() * (max + 1));
}

export function shuffleOfArray<T>(inputArr: Array<T>): Array<T> {
    const arr = inputArr.map((value) => value);
    for (let index = arr.length - 1; index > 0; index--) {
        const randomIndex = getRandomInt(index);
        const shuffledItem = arr[randomIndex];
        arr[randomIndex] = arr[index];
        arr[index] = shuffledItem;
    }
    return arr;
}

export function generateRandomPairs(
    inputItems: Array<string>,
    numberOfPairs: number,
    shuffleInput?: boolean
): Array<string> {
    if (inputItems.length < numberOfPairs) {
        throw "Incorrect array of items or number of pairs";
    }
    let directItems = inputItems.map((value) => value);
    if (shuffleInput === true) {
        directItems = shuffleOfArray(directItems);
    }
    directItems = directItems.slice(0, numberOfPairs);
    const reversedItems = directItems.reverse();
    const outputPairs = directItems.concat(reversedItems);
    return shuffleOfArray(outputPairs);
}

export function getElement(selector: string) {
    const el = document.querySelector(selector);
    if (el === null) {
        throw new Error(`Can't find element '${selector}'.`);
    }
    return el;
}

export enum GameDifficulty {
    Easy,
    Medium,
    Hard,
}

export enum CardsState {
    NoCardsOpen,
    OneCardOpen,
    TwoCardsOpen,
}
export enum GlobalState {
    StartScreen,
    InitGame,
    GameInProgress,
    GameWin,
    GameFail,
}

export const settings = {
    [GameDifficulty.Easy]: {
        time: 32,
        size: 4,
    },
    [GameDifficulty.Medium]: {
        time: 90,
        size: 6,
    },
    [GameDifficulty.Hard]: {
        time: 192,
        size: 8,
    },
};
