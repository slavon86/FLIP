import { renderCards } from "./render";
import { Card } from "./state";
import { shuffleOfArray } from "./helpers";

function generateRandomPairs(
    inputSigns: string,
    difficulty?: string,
    shuffleInput?: boolean
): Array<string> {
    let numberOfPairs = 8;
    if (difficulty === "medium") {
        numberOfPairs = 18;
    }
    if (difficulty === "hard") {
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

const signs = "☽☂☏☆☀☁☃☺1234567890QWERTYUIOPASDFGHJKLZXCVBNM";
const difficultyOfGame = "hard";
const cards: Card[] = generateRandomPairs(signs, difficultyOfGame, true).map(
    (sign) => {
        const result = new Card();
        result.sign = sign;
        result.inGame = true;
        result.isFlipped = true;
        return result;
    }
);

document.onreadystatechange = function () {
    if (document.readyState === "complete") {
        renderCards(cards, difficultyOfGame);
    }
};
