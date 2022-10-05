var currentQuestionIndex = 0;
var questionsAndAnswers = [
    {
        question: "This is the question?",
        answers: ["a", "b", "c"],
        correctAnswerIndex: 1
    },
    {
        question: "This is the question?",
        answers: ["a", "b", "c"],
        correctAnswerIndex: 0
    }
]
var currentScore = 0;
var timer; // use previous implementation

function startTimer() {
    // create timer
    // on timer completion, call showCollectInitials (or some other view)
}

function showWelcome() {
    // show welcome screen with button
    // listen for button clicks - call showNextQuestion
}

function showQuestion(questionAndAnswer) {
    // display question

    // display answer buttons + add listener
    for (var i = 0; i < questionAndAnswer.answers.length; i++) {
        var button = // create
        // show button
        button.addEventListener("click", answerWasClicked(i, questionAndAnswer.correctAnswerIndex))
    }
}

function answerWasClicked(answerClickedIndex, correctAnswerIndex) {
    // compare indices to check if answer is correct
    // if correct, call function to show next question
    // if incorrect, display wrong for x seconds, decrease timer, then call function to show next question
}

function showNextQuestion() {
    // checks if ++currentQuestionIndex < questionsArray.length
    // if true, calls displayQuestions
    // if false, calls display showCollectInitials
}

function showCollectInitials() {
    // shows collect initials screen with button
    // listen for button clicks
    // store score - get highScores then append new high score then store
    // var highScores = JSON.parse(localstorage.get("highScores")).append(JSON.stringify({initials: "DMP", score: 5}))
    // localstorage.put("highSocres", highScores)
    // call show high scores
}

function showHighScores() {
    // shows high scores array - JSON.parse(localstorage.get("highScores"))
}

// start the site by calling showWelcome()

