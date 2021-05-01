import { renderCards } from "./render";
import { Card } from "./state";
import { shuffleOfArray } from "./helpers";

function generateRandomPairs(
    inputSigns: string,
    numberOfPairs: number,
    shuffleInput?: boolean
): Array<string> {
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
