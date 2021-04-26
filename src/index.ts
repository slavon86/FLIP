import { renderCards } from "./render";
import { Card } from "./state";

const signs = "☽☂☏☆☀☁☃☺☽☂☏☆☀☁☃☺";
const cards: Card[] = signs.split("").map((sign) => {
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
