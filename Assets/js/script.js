//Selectors
const answerButtons = document.getElementsByClassName('ansbtn');
const questionEl = document.querySelector('.question-container p');
const answerContainer = document.querySelector('.answer-container');
const scoreEl = document.querySelector('.score-count');
const finalScoreContainer = document.querySelector('.final-score-container');
const scoreList = document.querySelector('.score-list');
const initialsInput = document.getElementById('initials-input');
const startBtn = document.querySelector('.startBtn');
const hiddenEls = document.getElementsByClassName('hide');
const finalScore = document.querySelector('.final-score');
const timer = document.querySelector('.timer-text');
const submitScoreBtn = document.querySelector('.submit-score-button');

var timeLeft;
var qNum;
var score;

//Get any stored scores
const getScores = () => {
    return JSON.parse(localStorage.getItem("savedScores")) ?? [];
}

//vars and onLoad
var allScores = getScores();

//Display scores
const listScores = () => {
    scoreList.innerText = '';
    for (let i = 0; i < allScores.length; i++) {
        scoreList.innerText += allScores[i].score + ' | ' + allScores[i].name + '\n'
    }
}

listScores();

const clearStoredScores = () => {
    localStorage.clear();
    allScores = getScores();
    listScores();
}

//List of questions to ask the user. Display of these will be randomized.
const questions = [
    {
        Q: "Is Java different from JavaScript?",
        ans1: "Yes",
        ans2: "No",
        ans3: "They're the same thing",
        answer: "ans1"
    },
    {
        Q: "Which of the following is currently NOT a JavaScript framework?",
        ans1: "Angular",
        ans2: "React",
        ans3: "Koffi",
        answer: "ans3"
    },
    {
        Q: "Inside of which HTML element do we put the JavaScript?",
        ans1: "<scripting>",
        ans2: "<script>",
        ans3: "<javascript>",
        answer: "ans2"
    },
    {
        Q: "How do you alert Hello World to a page?",
        ans1: "alertBox('Hello World');",
        ans2: "alert('Hello World');",
        ans3: "msgbox('Hello World');",
        answer: "ans2"
    },
    {
        Q: "How do you call a function named 'myFunction'?",
        ans1: "call function myFunction()",
        ans2: "call myFunction",
        ans3: "myFunction()",
        answer: "ans3"
    },
    {
        Q: "What is the correct syntax for an IF statement?",
        ans1: "if (i === 5)",
        ans2: "if i === 5 then",
        ans3: "if i === 5",
        answer: "ans1"
    },
    {
        Q: "What's the correct syntax to start a FOR loop?",
        ans1: "for (i < 5; i++)",
        ans2: "for let i = 1 to 5; i++",
        ans3: "for (let i = 0; i < 5; i++)",
        answer: "ans3"
    },
    {
        Q: "How do you add a comment in JavaScript?",
        ans1: "//Comment",
        ans2: "<!--Comment-->",
        ans3: "*Comment",
        answer: "ans1"
    },
    {
        Q: "How do you add a multi-line comment in JavaScript?",
        ans1: "<!--Comment-->",
        ans2: "/* Comment */",
        ans3: "//Comment //",
        answer: "ans2"
    },
    {
        Q: "How do you declare a variable as an array?",
        ans1: "let array = array",
        ans2: "let array = array, length = 5",
        ans3: "let array = []",
        answer: "ans3"
    }
];

const startCountdown = () => {
    let time = 2;
    startBtn.children[0].innerText = 3;
    let countdown = setInterval(() => {
                startBtn.children[0].innerText = time;
                console.log(time);
                time--;
                if (time < 0) {
                    clearInterval(countdown);
                    startBtn.children[0].innerText = 'Go!';
                    for (let i = 0; i < hiddenEls.length; i++) {
                        hiddenEls[i].style.display = 'initial';
                    }
                    startGame();
                }
            }, 1000)
    }

const newQuestion = (shuffledQuestions, qNum) => {
    questionEl.textContent = shuffledQuestions[qNum].Q;
    answerButtons[0].value = shuffledQuestions[qNum].ans1;
    answerButtons[1].value = shuffledQuestions[qNum].ans2;
    answerButtons[2].value = shuffledQuestions[qNum].ans3;
}

//Handle new scores. Limits to 3 initials then sorts from high-low, and re-saves as a json string to localstorage.
const newScore = () => {
    let name = initialsInput.value.toUpperCase().slice(0, 3);
    const scoreEntry = {
        name, 
        score
    }
    allScores.push(scoreEntry);
    allScores.sort((a, b) => b.score - a.score);
    localStorage.setItem("savedScores", JSON.stringify(allScores));
    listScores(allScores);
    submitScoreBtn.disabled = true;
    initialsInput.value = "";
    initialsInput.disabled = true;
}

const startGame = () => {
    const shuffledQuestions = questions.map(value => ({ value, sort: Math.random() })).sort((a, b) => a.sort - b.sort).map(({ value }) => value);
    timeLeft = 30;
    qNum = 0;
    score = 0;
    if (finalScoreContainer.style.display != "none") {
        finalScoreContainer.style.display = "none";
    }
    for (let i = 0; i < answerButtons.length; i++) {
        answerButtons[i].disabled = false;
    }
    newQuestion(shuffledQuestions, qNum);
    const runTimer = setInterval(() => {
        timeLeft--;
        timer.textContent = "TIME REMAINING: " + timeLeft;
        if (timeLeft === 0 || qNum > 10) {
            clearInterval(runTimer);
            endGame();
        }
    }, 1000);

    answerContainer.addEventListener("click", (event) => {
        console.log(event.target)
        const isButton = event.target.nodeName === 'INPUT';
        if (!isButton) {
          return;
        }
        if (shuffledQuestions[qNum].answer === event.target.dataset.answer) {
            score += 10;
            scoreEl.textContent = "Score: " + score;
            qNum++;
            if (qNum === shuffledQuestions.length) {
                    endGame();
                } else {
                newQuestion(shuffledQuestions, qNum);
                }   
        } else {
            if (timeLeft > 5) {
                timeLeft -= 5;
                qNum++;
            } else {
                timeLeft = 0;
                timer.textContent = "TIME REMAINING: 0";
                clearInterval(runTimer);
                endGame();
            }   
        }     
        })
}

const endGame = () => {
    for (let i = 0; i < answerButtons.length; i++) {
        answerButtons[i].disabled = true;
    }
    for (let i = 0; i < hiddenEls.length; i++) {
        hiddenEls[i].style.display = "none";
    }
    finalScore.textContent = "Final Score: " + score + "\n";
    finalScoreContainer.style.display = "initial";
    submitScoreBtn.disabled = false;
    initialsInput.disabled = false;
    startBtn.children[0].innerText = "Play again?";
}