var timeRemaining = document.getElementById("time-remaining"); 
var highScore = document.getElementById("high-score");
var startQuiz = document.getElementById("start-btn");
var buttonNext = document.getElementById("btn-next");
var submitButton = document.getElementById("submit");

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

console.log(startQuiz);
var secondsLeft = 75;

startQuiz.addEventListener("click", function() {
	
	function startTimer() {
		nextQuestion();
		setInterval(function () { 
			if(secondsLeft > 0) {
			secondsLeft--;
			return timeRemaining.textContent = secondsLeft;
			}

		}, 1000);
		clearInterval(startTimer);
	};

	 startTimer();
});

var questionNumber = 0
var nextQuestion = function() {
	showQuestions(myQuestions[questionNumber]);
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
		questionAnswers.textContent = question.answers[i].text
		questionAnswers.setAttribute("answer", question.answers[i].correct);
		document.getElementById("quiz-question").appendChild(questionAnswers);
		questionAnswers.classList.add("used")
		questionAnswers.addEventListener("click", function(event) {
			var answerCorrect = JSON.parse(event.target.getAttribute("answer"));
			if (!answerCorrect) {
				secondsLeft = secondsLeft - 5;
			};
			document.getElementById("quiz-question").innerHTML = "";
			questionNumber++
			nextQuestion();
		})
	}
};



// If a user gets the correct answer, do something
// If the timer gets to 0, end the Quiz.
// When a user ends the quiz, it brings the user to a ending page where they can enter their name
// In the ending page, there should be two buttons to either save their highscore or to play again.
