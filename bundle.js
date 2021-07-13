(function (exports, React, ReactDOM) {
    'use strict';

    function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

    var React__default = /*#__PURE__*/_interopDefaultLegacy(React);
    var ReactDOM__default = /*#__PURE__*/_interopDefaultLegacy(ReactDOM);

    function ProgressBar(props) {
        return (React__default['default'].createElement("div", { className: "progress" },
            React__default['default'].createElement("div", { className: "left", style: { width: props.progress.toString() + "%" } })));
    }

    class Timer {
        constructor(timeSec) {
            this.timeoutCallback = undefined;
            this.progressChangeCallback = undefined;
            this.progress = 100;
            this.period = timeSec / 10;
            this.isStop = false;
        }
        start() {
            setTimeout(() => {
                this.progressChange();
            }, this.period);
        }
        stop() {
            this.isStop = true;
        }
        onTimeout(callback) {
            this.timeoutCallback = callback;
        }
        onProgressChange(callback) {
            this.progressChangeCallback = callback;
        }
        progressChange() {
            if (this.isStop === true) {
                return;
            }
            this.progress = this.progress - 0.01;
            if (this.progressChangeCallback === undefined) {
                throw new Error("Error in progressChange(): this.progressChangeCallback === undefined.");
            }
            this.progressChangeCallback(this.progress);
            if (this.progress <= 0) {
                if (this.timeoutCallback === undefined) {
                    throw new Error("Error in progressChange(): this.timeoutCallback === undefined.");
                }
                this.timeoutCallback();
                return;
            }
            setTimeout(() => {
                this.progressChange(); //leak memory
            }, this.period);
        }
    }
    function getRandomInt(max) {
        return Math.floor(Math.random() * (max + 1));
    }
    function shuffleOfArray(inputArr) {
        const arr = inputArr.map((value) => value);
        for (let index = arr.length - 1; index > 0; index--) {
            const randomIndex = getRandomInt(index);
            const shuffledItem = arr[randomIndex];
            arr[randomIndex] = arr[index];
            arr[index] = shuffledItem;
        }
        return arr;
    }
    function generateRandomPairs(inputItems, numberOfPairs, shuffleInput) {
        if (inputItems.length < numberOfPairs) {
            throw "Incorrect array of items or number of pairs";
        }
        let directItems = inputItems.map((value) => value);
        if (shuffleInput === true) {
            directItems = shuffleOfArray(directItems);
        }
        directItems = directItems.slice(0, numberOfPairs);
        const reversedItems = directItems.reverse();
        const outputPairs = directItems.concat(reversedItems);
        return shuffleOfArray(outputPairs);
    }
    function getElement(selector) {
        const el = document.querySelector(selector);
        if (el === null) {
            throw new Error(`Can't find element '${selector}'.`);
        }
        return el;
    }
    function stringToGameDifficulty(diff) {
        switch (diff) {
            case "easy":
                return GameDifficulty.Easy;
            case "medium":
                return GameDifficulty.Medium;
            case "hard":
                return GameDifficulty.Hard;
            default:
                throw new Error("function stringToGameDifficulty: Incorrect string of game difficulty");
        }
    }
    function gameDifficultyToString(difficulty) {
        switch (difficulty) {
            case GameDifficulty.Easy:
                return "easy";
            case GameDifficulty.Medium:
                return "medium";
            case GameDifficulty.Hard:
                return "hard";
            default:
                throw new Error("function gameDifficultyToString: Incorrect difficulty of the game");
        }
    }
    var GameDifficulty;
    (function (GameDifficulty) {
        GameDifficulty[GameDifficulty["Easy"] = 0] = "Easy";
        GameDifficulty[GameDifficulty["Medium"] = 1] = "Medium";
        GameDifficulty[GameDifficulty["Hard"] = 2] = "Hard";
    })(GameDifficulty || (GameDifficulty = {}));
    var CardsState;
    (function (CardsState) {
        CardsState[CardsState["NoCardsOpen"] = 0] = "NoCardsOpen";
        CardsState[CardsState["OneCardOpen"] = 1] = "OneCardOpen";
        CardsState[CardsState["TwoCardsOpen"] = 2] = "TwoCardsOpen";
    })(CardsState || (CardsState = {}));
    var GlobalState;
    (function (GlobalState) {
        GlobalState[GlobalState["StartScreen"] = 0] = "StartScreen";
        GlobalState[GlobalState["InitGame"] = 1] = "InitGame";
        GlobalState[GlobalState["GameInProgress"] = 2] = "GameInProgress";
        GlobalState[GlobalState["GameWin"] = 3] = "GameWin";
        GlobalState[GlobalState["GameFail"] = 4] = "GameFail";
    })(GlobalState || (GlobalState = {}));
    const settings = {
        [GameDifficulty.Easy]: {
            time: 32,
            size: 4,
        },
        [GameDifficulty.Medium]: {
            time: 90,
            size: 6,
        },
        [GameDifficulty.Hard]: {
            time: 192,
            size: 8,
        },
    };

    function GameCard(props) {
        return (React__default['default'].createElement("div", { className: "card" +
                (props.card.isFlipped === true ? " active" : "") +
                (props.card.inGame === false ? " out" : ""), onClick: props.onClick },
            React__default['default'].createElement("div", { className: "flipper" },
                React__default['default'].createElement("div", { className: "f" },
                    React__default['default'].createElement("p", null, props.card.sign)),
                React__default['default'].createElement("div", { className: "b" },
                    React__default['default'].createElement("p", null, "\uD83D\uDE00")))));
    }

    function GameField(props) {
        return (React__default['default'].createElement("div", { className: "field " + gameDifficultyToString(props.difficulty) }, props.cards.map((card, cardNumber) => {
            return (React__default['default'].createElement(GameCard, { key: cardNumber, card: card, onClick: () => {
                    props.onCardClick(cardNumber);
                } }));
        })));
    }

    function RadioButtonGroup(props) {
        return (React__default['default'].createElement(React__default['default'].Fragment, null, props.groupItems.map((item) => {
            return (React__default['default'].createElement("p", { key: item.value },
                React__default['default'].createElement("input", { type: "radio", id: item.value, name: props.groupName, value: item.value, checked: props.currentValue === item.value, onChange: (event) => {
                        props.onValueChange(event.target.value);
                    } }),
                React__default['default'].createElement("label", { htmlFor: item.value }, item.label)));
        })));
    }

    const difficultyList = [
        { value: "easy", label: "Easy" },
        { value: "medium", label: "Medium" },
        { value: "hard", label: "Hard" },
    ];
    const themeList = [
        { value: "theme-1", label: "Theme-1" },
        { value: "theme-2", label: "Theme-2" },
        { value: "theme-3", label: "Theme-3" },
    ];
    function StartScreen(props) {
        const [difficulty, setDifficulty] = React.useState(GameDifficulty.Easy);
        const [theme, setTheme] = React.useState("theme-1");
        return (React__default['default'].createElement("div", { className: "start-screen" },
            React__default['default'].createElement("div", { className: "settings" },
                React__default['default'].createElement("div", { className: "difficulty-form" },
                    React__default['default'].createElement("form", { name: "difficulty" },
                        React__default['default'].createElement("p", null, "Difficulty:"),
                        React__default['default'].createElement(RadioButtonGroup, { groupName: "difficulty", groupItems: difficultyList, currentValue: gameDifficultyToString(difficulty), onValueChange: (value) => {
                                setDifficulty(stringToGameDifficulty(value));
                            } }))),
                React__default['default'].createElement("div", { className: "result-of-game" },
                    props.globalState === GlobalState.GameFail && (React__default['default'].createElement("div", { className: "fail" },
                        React__default['default'].createElement("p", null, "FAIL"),
                        React__default['default'].createElement("p", null, "\uD83D\uDE41"))),
                    props.globalState === GlobalState.GameWin && (React__default['default'].createElement("div", { className: "win" },
                        React__default['default'].createElement("p", null, "WIN"),
                        React__default['default'].createElement("p", null, "\uD83D\uDE00"))),
                    props.globalState === GlobalState.StartScreen && (React__default['default'].createElement("div", { className: "start-screen" },
                        React__default['default'].createElement("p", null, " "),
                        React__default['default'].createElement("p", null, " ")))),
                React__default['default'].createElement("div", { className: "theme-form" },
                    React__default['default'].createElement("form", { name: "theme" },
                        React__default['default'].createElement("p", null, "Theme:"),
                        React__default['default'].createElement(RadioButtonGroup, { groupName: "theme", groupItems: themeList, currentValue: theme, onValueChange: (value) => {
                                setTheme(value);
                                props.onChangeTheme(value);
                            } })))),
            React__default['default'].createElement("div", { className: "button-area" },
                React__default['default'].createElement("button", { className: "button", onClick: () => {
                        props.onGameStart(difficulty);
                    } },
                    React__default['default'].createElement("p", null, "Start")))));
    }

    function FullGame(props) {
        return (React__default['default'].createElement("div", { className: "game " + props.theme, onMouseDown: (e) => {
                e.preventDefault();
            } },
            React__default['default'].createElement(ProgressBar, { progress: props.timeProgress }),
            props.globalState === GlobalState.GameInProgress ? (React__default['default'].createElement(GameField, { cards: props.cards, difficulty: props.difficulty, onCardClick: props.onCardClick })) : (React__default['default'].createElement(StartScreen, { theme: props.theme, globalState: props.globalState, onGameStart: props.onGameStart, onChangeTheme: props.onChangeTheme }))));
    }

    class Renderer {
        render(state) {
            ReactDOM__default['default'].render(React__default['default'].createElement(FullGame, { difficulty: state.difficulty, cards: state.cards, globalState: state.globalState, timeProgress: state.timeProgress, theme: state.theme, onCardClick: state.processCardClick.bind(state), onGameStart: state.processGameStart.bind(state), onChangeTheme: state.processChangeTheme.bind(state) }), getElement(".react-app"));
        }
    }

    class Card {
        constructor() {
            this.sign = "";
            this.inGame = false;
            this.isFlipped = false;
        }
        isEqual(anotherCard) {
            return this.sign === anotherCard.sign;
        }
    }
    class State {
        constructor() {
            this.cards = [];
            this.firstCard = 0;
            this.secondCard = 0;
            this.count = 0;
            this.emodji = [
                "🧠",
                "😀",
                "😵",
                "😎",
                "😱",
                "😈",
                "🤖",
                "👽",
                "🎃",
                "👊",
                "👍",
                "👎",
                "👈",
                "👉",
                "👆",
                "👇",
                "🖖",
                "🦾",
                "💪",
                "👁",
                "👂",
                "🦶",
                "🦷",
                "☂",
                "🌂",
                "👓",
                "🥽",
                "💼",
                "🎒",
                "⛑",
                "👞",
                "👠",
                "👑",
            ];
            this.cardState = CardsState.NoCardsOpen;
            this.globalState = GlobalState.StartScreen;
            this.difficulty = GameDifficulty.Easy;
            this.theme = "theme-1";
            this.timeProgress = 100;
            this.previousCard = -1;
            this.renderer = new Renderer();
            this.renderer.render(this);
            this.timer = new Timer(settings[this.difficulty].time);
        }
        processGameStart(d) {
            this.difficulty = d;
            this.count = 0;
            this.previousCard = -1;
            this.numberOfPairs = Math.pow(settings[d].size, 2) / 2;
            this.cards = generateRandomPairs(this.emodji, this.numberOfPairs, true).map((sign) => {
                const result = new Card();
                result.sign = sign;
                result.inGame = true;
                result.isFlipped = false;
                return result;
            });
            this.globalState = GlobalState.InitGame;
            this.renderer.render(this);
            this.globalState = GlobalState.GameInProgress;
            this.timer = new Timer(settings[this.difficulty].time);
            this.timer.onTimeout(() => {
                this.processTimeout();
            });
            this.timer.onProgressChange((progress) => {
                this.processProgressChange(progress);
            });
            this.timer.start();
        }
        processCardClick(cardIndex) {
            const card = this.cards[cardIndex];
            if (this.cardState === CardsState.NoCardsOpen) {
                card.isFlipped = true;
                this.firstCard = cardIndex;
                this.cardState = CardsState.OneCardOpen;
            }
            else if (this.cardState === CardsState.OneCardOpen &&
                this.firstCard != cardIndex) {
                card.isFlipped = true;
                this.secondCard = cardIndex;
                this.cardState = CardsState.TwoCardsOpen;
                setTimeout(() => {
                    if (this.cards[this.firstCard].isEqual(this.cards[this.secondCard])) {
                        this.cards[this.firstCard].inGame = false;
                        this.cards[this.secondCard].inGame = false;
                        this.count++;
                        if (this.count === this.numberOfPairs) {
                            this.timer.stop();
                            this.globalState = GlobalState.GameWin;
                        }
                    }
                    else {
                        this.cards[this.firstCard].isFlipped = false;
                        this.cards[this.secondCard].isFlipped = false;
                    }
                    this.cardState = CardsState.NoCardsOpen;
                    this.renderer.render(this);
                }, 500);
            }
            this.renderer.render(this);
        }
        processProgressChange(progress) {
            this.timeProgress = progress;
            this.renderer.render(this);
        }
        processTimeout() {
            this.globalState = GlobalState.GameFail;
            this.timer.stop();
            this.renderer.render(this);
        }
        processChangeTheme(theme) {
            this.theme = theme;
            this.renderer.render(this);
        }
    }

    exports.state = void 0;
    document.onreadystatechange = function () {
        if (document.readyState === "complete") {
            exports.state = new State();
            //state.processGameStart(GameDifficulty.Medium);
        }
    };

    Object.defineProperty(exports, '__esModule', { value: true });

    return exports;

}({}, React, ReactDOM));
