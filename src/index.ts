import { renderCards, renderStartScreen, changeTheme } from "./render";
import { Card, State } from "./state";
import { shuffleOfArray } from "./helpers";
import { GameDifficulty } from "./state";

// const signs = "☽☂☏☆☀☁☃☺1234567890QWERTYUIOPASDFGHJKLZXCVBNM";
// const difficultyOfGame = "hard";
// const cards: Card[] = generateRandomPairs(signs, difficultyOfGame, true).map(
//     (sign) => {
//         const result = new Card();
//         result.sign = sign;
//         result.inGame = true;
//         result.isFlipped = Math.random() > 0.8;
//         return result;
//     }
// );

//  renderCards(cards, difficultyOfGame);
document.onreadystatechange = function () {
    if (document.readyState === "complete") {
        const state = new State();
    }
};
