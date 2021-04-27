import { renderCards } from "./render";
import { Card } from "./state";

function getRandomInt(max: number): number {
    return Math.floor(Math.random() * max);
}

function generateRandomPairs(
    inputSigns: string,
    numberOfPairs: number
): string {
    if (inputSigns.length < numberOfPairs) {
        throw "Incorrect string of signs or number of pairs";
    }
    let outputSigns: Array<string> = inputSigns
        .slice(0, numberOfPairs)
        .split("");
    outputSigns = outputSigns.concat(outputSigns);
    const numberOfMix = getRandomInt(numberOfPairs + 1) + numberOfPairs * 2;
    for (let index = 0; index < numberOfMix; index++) {
        const firstIndex = getRandomInt(outputSigns.length);
        const secondIndex = getRandomInt(outputSigns.length);
        const firstSign = outputSigns[firstIndex];
        outputSigns[firstIndex] = outputSigns[secondIndex];
        outputSigns[secondIndex] = firstSign;
    }
    return outputSigns.join("");
}

const signs = "☽☂☏☆☀☁☃☺";
const pairs = 8;
const cards: Card[] = generateRandomPairs(signs, pairs)
    .split("")
    .map((sign) => {
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
