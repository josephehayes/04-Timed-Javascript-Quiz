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
        2: "No"
        3: "They're the same thing",
        answer: 0
    },
    {
        Q: "..."
    }
]