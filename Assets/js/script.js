//Score Tracker
let scores = [];

//Get any stored scores
const getScores = () => {
    //localstorage doesn't support arrays. Stackoverflow suggested json.stringify and json.parse for storage
    scores = JSON.parse(localStorage.getItem("savedScores"));
    return scores
}

//Handle new scores
const newScore = (x, y) => {
    const scoreEntry = {
        id: getScores().length,
        initials: x,
        score: y
    }
    scores.push(scoreEntry);
    localStorage.setItem("savedScores", JSON.stringify(scores));
}

//Display scores

const listScores = () => {
    const allScores = getScores();
    
}