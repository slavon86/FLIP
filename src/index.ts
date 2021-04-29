import { renderCards } from "./render";
import { Card } from "./state";

function getRandomInt(max: number): number {
    return Math.floor(Math.random() * (max + 1));
}
function shuffleOfArray<Type>(inputArr: Array<Type>): Array<Type> {
    const arr: Array<Type> = inputArr.map((value) => value);
    for (let index = arr.length - 1; index > 0; index--) {
        const randomIndex = getRandomInt(index);
        const shuffledSign = arr[randomIndex];
        arr[randomIndex] = arr[index];
        arr[index] = shuffledSign;
    }
    return arr;
}

function generateRandomPairs(
    inputSigns: string,
    numberOfPairs: number,
    shuffleInput?: boolean
): Array<string> {
    if (inputSigns.length < numberOfPairs) {
        throw "Incorrect string of signs or number of pairs";
    }
    let outputSigns: Array<string> = inputSigns.split("");
    if (shuffleInput === true) {
        outputSigns = shuffleOfArray(outputSigns);
    }
    outputSigns = outputSigns.slice(0, numberOfPairs);
    outputSigns = outputSigns.concat(outputSigns);
    return shuffleOfArray(outputSigns);
}

const signs = "☽☂☏☆☀☁☃☺ABCD";
const pairs = 8;
const cards: Card[] = generateRandomPairs(signs, pairs, true).map((sign) => {
    const result = new Card();
    result.sign = sign;
    result.inGame = true;
    result.isFlipped = true;
    return result;
});

document.onreadystatechange = function () {
    if (document.readyState === "complete") {
        renderCards(cards);
    }
};
