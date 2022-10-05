var timerEl = document.getElementById("countdown");
var mainEl = document.getElementById("main"); 
var timer;
var timeLeft = 0;
var currentQuestionIndex = 0;
var questionsAndAnswers = [
    {
        question: "Which one of the following is not a Java feature?",
        answers: ["Object-oriented", "Use of pointers", "Portable"],
        correctAnswerIndex: 1
    },
    {
        question: "Which of these cannot be used for a variable name in Java?",
        answers: ["Identifier & keyword", "Identifier", "Keyword"],
        correctAnswerIndex: 2
    },
    {
        question: "What is the extension of java code files?",
        answers: [".js", ".txt", ".java"],
        correctAnswerIndex: 2
    },
    {
        question: "What is the extension of compiled java classes?",
        answers: [".txt", ".class", ".js"],
        correctAnswerIndex: 1
    },
    {
        question: "Which of these are selection statements in Java?",
        answers: ["break", "if()", "for()"],
        correctAnswerIndex: 1
    }
]

function showHighScores() {
    var highScores = getHighScores();
    mainEl.innerHTML = "";
    var title = document.createElement("h4");
    title.textContent = "Highscores";
    mainEl.appendChild(title);
    title.setAttribute("class", "font-weight-bold");
    var ol = document.createElement("ol");
    ol.setAttribute("class", "row-justify-content-center custom-highscores");
    highScores.forEach(function(score, index) {
        var li = document.createElement("li");
        li.textContent = score.initials + " - " + score.score;
        ol.appendChild(li);
    })
    mainEl.appendChild(ol);
    var back = document.createElement("button");
    back.textContent = "Back";
    mainEl.appendChild(back);
    back.setAttribute("class", "custom-button");
    back.addEventListener("click", function(){
        showWelcome();
    });
    var clear = document.createElement("button");
    clear.textContent = "Clear Highscores";
    mainEl.appendChild(clear);
    clear.setAttribute("class", "custom-button");
    clear.addEventListener("click", function(){
        localStorage.clear();
        showHighScores();
    });
}

function setupViewHighscores(){
    var highscores = document.getElementById("highscores");
    highscores.addEventListener("click", function(){
        showHighScores();
    });
}

// Diplay question function

function showWelcome(){
    mainEl.innerHTML = "";
    var directions = document.createElement("h5");
    directions.textContent = "Try to answer the following code-related questions within the time limit. Keep in mind that incorrect answers will penalize your score/time by ten seconds!"
    mainEl.appendChild(directions);
    var start = document.createElement("button");
    start.textContent = "Start Quiz"
    start.setAttribute("class", "custom-button");
    mainEl.appendChild(start);
    start.addEventListener("click", function() {
        showNextQuestion();
    });
}

function showQuestion(qAndA) {
    mainEl.innerHTML = "";
    var question = document.createElement("h4");
    question.textContent = qAndA.question;
    mainEl.appendChild(question);

    // display answer buttons + add listener
    qAndA.answers.forEach(function(answer, index) {
        var button = document.createElement("button");
        button.setAttribute("class", "custom-button");
        button.textContent = answer;
        button.addEventListener("click", function() {
            answerWasClicked(index, qAndA.correctAnswerIndex);
        });
        mainEl.appendChild(button);
    })   
}

function answerWasClicked(answerClickedIndex, correctAnswerIndex) {
    var feedback = document.createElement("h5");

    if (answerClickedIndex === correctAnswerIndex) {
        feedback.textContent = "Correct!";
    } else {
        feedback.textContent = "Wrong!";
        timeLeft-=10;
    }
    mainEl.appendChild(feedback);
    setTimeout(() => {  showNextQuestion(); }, 2000);
}

function showNextQuestion() {
if (currentQuestionIndex < questionsAndAnswers.length){
    showQuestion(questionsAndAnswers[currentQuestionIndex++])
}
else {
    clearInterval(timer);
    showCollectInitials(timeLeft);
}
}

function showCollectInitials(playerScore) {
    mainEl.innerHTML = "";
    var title = document.createElement("h4");
    title.textContent = "All done!";
    var score = document.createElement("h5");
    score.textContent = "Your final score is " + playerScore + ".";
    mainEl.appendChild(title);
    mainEl.appendChild(score);
    var initials = document.createElement("h5");
    initials.textContent = "Enter initials:";
    mainEl.appendChild(initials);
    var initialsInput = document.createElement("INPUT");
    initialsInput.setAttribute("type", "text");
    mainEl.appendChild(initialsInput);
    var submit = document.createElement("button");
    submit.setAttribute("class", "custom-button");
    submit.textContent = "Submit";
    mainEl.appendChild(submit);
    submit.addEventListener("click", function(){
        console.log("player score =" + playerScore)
        var highScores = getHighScores();
        storeScore(highScores, initialsInput.value, playerScore);
        getHighScores();
    });
}

function getHighScores() {
    var highScores = localStorage.getItem("highScores");
    var parsedHighScores = JSON.parse(highScores);
    if (parsedHighScores === null) {
        parsedHighScores = [];
    }

    console.log(parsedHighScores);

    return parsedHighScores;
}

function storeScore(highScores, initials, score) {
    var playerScore = {
        initials: initials, 
        score: score
    };

    highScores.push(playerScore);
    var json=JSON.stringify(highScores);
    localStorage.setItem("highScores", json);
}

function createTimer() {
    timeLeft = 75;

    // Use the `setInterval()` method to call a function to be executed every 1000 milliseconds
    var timeInterval = setInterval(function () {
        // As long as the `timeLeft` is greater than 1
        if (timeLeft > 1) {
            // Set the `textContent` of `timerEl` to show the remaining seconds
            timerEl.textContent = timeLeft + ' seconds remaining';
            // Decrement `timeLeft` by 1
            timeLeft--;
        } else if (timeLeft === 1) {
            // When `timeLeft` is equal to 1, rename to 'second' instead of 'seconds'
            timerEl.textContent = timeLeft + ' second remaining';
            timeLeft--;
        } else {
            // Use `clearInterval()` to stop the timer
            clearInterval(timeInterval);
        }
    }, 1000);
    return timeInterval;
}

// currentQuestionIndex = 4;
timer=createTimer();
// showNextQuestion();
// showHighScores();
setupViewHighscores();
showWelcome();