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
