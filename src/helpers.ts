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
