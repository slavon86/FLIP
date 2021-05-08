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
    let outputPairs = inputItems.map((value) => value);
    if (shuffleInput === true) {
        outputPairs = shuffleOfArray(outputPairs);
    }
    outputPairs = outputPairs.slice(0, numberOfPairs);
    outputPairs = outputPairs.concat(outputPairs);
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
        time: 80,
        size: 4,
    },
    [GameDifficulty.Medium]: {
        time: 300,
        size: 6,
    },
    [GameDifficulty.Hard]: {
        time: 900,
        size: 8,
    },
};
