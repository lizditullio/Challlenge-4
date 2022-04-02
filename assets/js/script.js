var timeRemaining = document.getElementById("time-remaining"); 
var highScore = document.getElementById("high-score");
var startQuiz = document.getElementById("start-btn");
var buttonNext = document.getElementById("btn-next");
var submitButton = document.getElementById("submit");
var answerValidation = document.getElementById("answer-validation")
var correctOrNot = document.getElementById("correct-or-not");
var highestScore = JSON.parse(localStorage.getItem("highscore"));
var displayedScore = document.createElement("p");

var myQuestions = [
	{
		question: "Commonly used data types DO Not Include",
		answers: [
			{ text: "strings", correct: 0},
			{ text: "booleans", correct: 1 },
			{ text: "alerts", correct: 0 },
			{ text: "numbers", correct: 0 } 
		]
	},
	{
		question: "The condition in an if / else statement is enclosed with _________",
		answers: [
			{ text: "quotes", correct: 0},
			{ text: "curly brackets", correct: 1 },
			{ text: "parenthesis", correct: 0 },
			{ text: "square brackets", correct: 0 } 
		]
	},
	{
		question: "Arrays in JavaScript can be used to store _________.",
		answers: [
			{ text: "numbers and strings", correct: 0},
			{ text: "other arrays", correct: 0 },
			{ text: "booleans", correct: 0 },
			{ text: "all of the above", correct: 1 } 
		]
	},
	{
		question: "String values must be enclosed within _____ when being assigned to variables.",
		answers: [
			{ text: "commas", correct: 0},
			{ text: "curly brackets", correct: 0 },
			{ text: "quotes", correct: 1 },
			{ text: "parenthesis", correct: 0 } 
		]
	},
	{
		question: "A very useful tool used tool used during development and debugging for printing content to the debugger is:",
		answers: [
			{ text: "JavaScript", correct: 0},
			{ text: "terminal/bash", correct: 0 },
			{ text: "for loops", correct: 0 },
			{ text: "console log", correct: 1} 
		]
	}
];

var highScoreArr = [
	{user: ""},
	{score: ""}
];

var secondsLeft = 75;
var beginQuiz = function() {
    function startTimer() {
        document.getElementById("results").innerHTML = "";
        nextQuestion();
        var interval = setInterval(function () { 
            if (secondsLeft <= 11) {
				timeRemaining.classList.add("red");
			};
			if(secondsLeft > 0) {
            secondsLeft--;
            return timeRemaining.textContent = secondsLeft;
            };
            if(secondsLeft == 0) {
                clearInterval(interval);
				if (questionNumber !== myQuestions.length-1) {
					endQuiz();
				};
            };
            clearInterval(interval);
        }, 1000);
    };
	checkHighScore();
	startTimer();
};


startQuiz.addEventListener("click", beginQuiz)

var questionNumber = 0;
console.log(questionNumber);
var nextQuestion = function() {
	if (questionNumber == myQuestions.length-1) {
		console.log("quiz is over");
		endQuiz();
	} else {
		showQuestions(myQuestions[questionNumber]);
	};
};

var showQuestions = function(question) {
	console.log(question)
	document.querySelector(".start-page").classList.add("hide");
	var questionMesssage = document.createElement("h1");
	questionMesssage.textContent = question.question;
	document.getElementById("quiz-question").appendChild(questionMesssage);
	var questionChoices = document.createElement("div");

	for (var i = 0; i < question.answers.length; i++) {
		var questionAnswers = document.createElement("button")
		questionAnswers.textContent = question.answers[i].text;
		questionAnswers.classList.add("answers-style")
		questionAnswers.setAttribute("answer", question.answers[i].correct);
		document.getElementById("quiz-question").appendChild(questionAnswers);
		questionAnswers.classList.add("used")
		questionAnswers.addEventListener("click", function(event) {
			var answerCorrect = JSON.parse(event.target.getAttribute("answer"));
			if (!answerCorrect) {
				correctOrNot.classList.add("validation")
				correctOrNot.textContent = "Wrong!";
				answerValidation.appendChild(correctOrNot);
				secondsLeft = secondsLeft - 5;
				nextQuestion();
			}; 
			if (answerCorrect) {
				correctOrNot.classList.add("validation")
				correctOrNot.textContent = "Correct!";
				answerValidation.appendChild(correctOrNot);
			};
			document.getElementById("quiz-question").innerHTML = "";
			questionNumber++;
			nextQuestion();
		})
	}
};


var endQuiz = function() {
	document.getElementById("nav").classList.add("hide");
	var highScore = secondsLeft;
	console.log(highScore);
	//clear the screen 
	document.getElementById("quiz-question").innerHTML = "";
	document.getElementById("answer-validation").innerHTML = "";
	
	// allow user to save their high score 
	if (secondsLeft > 0) {
		var endPage = document.createElement("h1");
		endPage.textContent = ("Congrats! You finshed the quiz with a score of " + secondsLeft + ".");
		document.getElementById("results").appendChild(endPage);
	
		var saveScorePrompt = document.createElement("h2");
		saveScorePrompt.textContent = ("Please enter your initials to save your score.");
		document.getElementById("results").appendChild(saveScorePrompt);
	
	
		var initialsPrompt = document.createElement("input");
		initialsPrompt.textContent = "enter your initials to save your high score";
		document.getElementById("results").appendChild(initialsPrompt);
	
		var saveHighScore = document.createElement("button");
		saveHighScore.textContent = "save your high score";
		document.getElementById("results").appendChild(saveHighScore);

		saveHighScore.addEventListener("click", function(){
			var initials = document.querySelector("input").value;
			highScoreArr = [initials, highScore];
			console.log(highScoreArr);
			saveScore();
		});

	} else {
		var outOfTime = document.createElement("h1");
		outOfTime.textContent = ("Sorry! You ran out of time. Try again?");
		document.getElementById("results").appendChild(outOfTime);
	};


	// allow user to play again 
	var playAgianConfirm = document.createElement("button");
	playAgianConfirm.textContent = "play again.";
	document.getElementById("results").appendChild(playAgianConfirm);
	playAgianConfirm.addEventListener("click", reset);
};

var reset = function () {
	secondsLeft = 75; 
	questionNumber = 0;
	beginQuiz();
};

var saveScore = function() {
	localStorage.setItem("highscore", JSON.stringify(highScoreArr));
  };


var checkHighScore = function() {
	console.log("the highest score is " + highestScore);
	if (!highestScore) {
		displayedScore.textContent = "No Scores Yet!";
		document.getElementById("nav").appendChild(displayedScore);
	} else {
		displayHighScore();
	};
};

var displayHighScore = function() {
	if (highScore > highestScore.score) {
		highestScore = highScoreArr;
		displayedScore.textContent = "";
	};
	displayedScore.textContent = (highestScore[0] + " Score: " + highestScore[1]);
	document.getElementById("nav").appendChild(displayedScore);
	localStorage.setItem("highscore", JSON.stringify(highestScore));
};