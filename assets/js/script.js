var timeRemaining = document.getElementById("time-remaining"); 
var highScore = document.getElementById("high-score");
var startQuiz = document.getElementById("start-btn");
var buttonNext = document.getElementById("btn-next");
var submitButton = document.getElementById("submit");

var myQuestions = [
	{
		question: "Commonly used data types DO Not Include",
		answers: [
			{ text: "strings", correct: false},
			{ text: "booleans", correct: true },
			{ text: "alerts", correct: false },
			{ text: "numbers", correct: false } 
		]
	},
	{
		question: "The condition in an if / else statement is enclosed with _________",
		answers: [
			{ text: "quotes", correct: false},
			{ text: "curly brackets", correct: true },
			{ text: "parenthesis", correct: false },
			{ text: "square brackets", correct: false } 
		]
	},
	{
		question: "Arrays in JavaScript can be used to store _________.",
		answers: [
			{ text: "numbers and strings", correct: false},
			{ text: "other arrays", correct: false },
			{ text: "booleans", correct: false },
			{ text: "all of the above", correct: true } 
		]
	},
	{
		question: "String values must be enclosed within _____ when being assigned to variables.",
		answers: [
			{ text: "commas", correct: false},
			{ text: "curly brackets", correct: false },
			{ text: "quotess", correct: true },
			{ text: "parenthesis", correct: false } 
		]
	},
	{
		question: "A very useful tool used tool used during development and debugging for printing content to the debugger is:",
		answers: [
			{ text: "JavaScript", correct: false},
			{ text: "terminal/bash", correct: false },
			{ text: "for loops", correct: false },
			{ text: "console log", correct: true} 
		]
	}
];

console.log(startQuiz);

startQuiz.addEventListener("click", function() {
	
	function startTimer() {
		var secondsLeft = 75;
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

buttonNext.addEventListener("click", function() {
	nextQuestion();
});

var nextQuestion = function() {
	var shuffleQuestion = myQuestions.sort(()=>Math.random()-.5)
	showQuestions(shuffleQuestion[0]);
};

var showQuestions = function() {

};

// If a user gets the correct answer, add 15 points to the score board
// If the timer gets to 0, end the Quiz.
// When a user ends the quiz, it brings the user to a ending page where they can enter their name
// In the ending page, there should be two buttons to either save their highscore or to play again.