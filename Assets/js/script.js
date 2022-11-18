//Score Tracker
const score = 0;
const scoreList = document.querySelector('.score-list');
//Get any stored scores
const getScores = () => {
    return JSON.parse(localStorage.getItem("savedScores")) ?? [];
}

const allScores = getScores();

//Display scores
const listScores = (allScores) => {
    scoreList.innerText = '';
    for (let i = 0; i < allScores.length; i++) {
        scoreList.innerText += allScores[i].score + ' | ' + allScores[i].name + '\n'
    }
}

listScores(allScores);

//Handle new scores. Limits to 3 initials like old arcade games, then sorts from high-low, and re-saves as a json string to localstorage.
const newScore = (score, allScores) => {
    let name = prompt('Well done! Please enter your initials (Limit 3 chars)').toUpperCase().slice(0, 3);
    while (name.length < 3) {
        name += 'X';
    }
    const scoreEntry = {
        name, 
        score
    }
    allScores.push(scoreEntry);
    allScores.sort((a, b) => b.score - a.score);
    localStorage.setItem("savedScores", JSON.stringify(allScores));
    listScores(allScores);
}

//List of questions to ask the user. Display of these will be randomized.
const questions = [
    {
        Q: "Is Java different from JavaScript?",
        1: "Yes",
        2: "No",
        3: "They're the same thing",
        answer: 1
    },
    {
        Q: "Which of the following is currently NOT a JavaScript framework?",
        1: "Angular",
        2: "React",
        3: "Koffi",
        answer: 3
    },
    {
        Q: "Inside of which HTML element do we put the JavaScript?",
        1: "<scripting>",
        2: "<script>",
        3: "<javascript>",
        answer: 2
    },
    {
        Q: "How do you alert Hello World to a page?",
        1: "alertBox('Hello World');",
        2: "alert('Hello World');",
        3: "msgbox('Hello World');",
        answer: 2
    },
    {
        Q: "How do you call a function named 'myFunction'?",
        1: "call function myFunction()",
        2: "call myFunction",
        3: "myFunction()",
        answer: 3
    },
    {
        Q: "What is the correct syntax for an IF statement?",
        1: "if (i === 5)",
        2: "if i === 5 then",
        3: "if i === 5",
        answer: 1
    },
    {
        Q: "What's the correct syntax to start a FOR loop?",
        1: "for (i < 5; i++)",
        2: "for let i = 1 to 5; i++",
        3: "for (let i = 0; i < 5; i++)",
        answer: 3
    },
    {
        Q: "How do you add a comment in JavaScript?",
        1: "//Comment",
        2: "<!--Comment-->",
        3: "*Comment",
        answer: 1
    },
    {
        Q: "How do you add a multi-line comment in JavaScript?",
        1: "<!--Comment-->",
        2: "/* Comment */",
        3: "//Comment //",
        answer: 2
    },
    {
        Q: "How do you declare a variable as an array?",
        1: "let array = array",
        2: "let array = 'array[5]'",
        3: "let array = []",
        answer: 3
    }
]