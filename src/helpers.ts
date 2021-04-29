function getRandomInt(max: number): number {
    return Math.floor(Math.random() * (max + 1));
}

export function shuffleOfArray<Type>(inputArr: Array<Type>): Array<Type> {
    const arr: Array<Type> = inputArr.map((value) => value);
    for (let index = arr.length - 1; index > 0; index--) {
        const randomIndex = getRandomInt(index);
        const shuffledSign = arr[randomIndex];
        arr[randomIndex] = arr[index];
        arr[index] = shuffledSign;
    }
    return arr;
}
