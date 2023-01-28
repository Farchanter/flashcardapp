var deitschController = angular.module('deitschController', ['ngCookies', 'ngAnimate']);

deitschController.controller('MainController', ['Question', '$scope', '$routeParams', '$window', '$cookies', '$animate', function(Question, $scope, $routeParams, $window, $cookies, $animate)
{
	var thetta = this;
	thetta.questionCollection = [];
	thetta.currentQuestionAggregate = {};
	thetta.currentCategory = '';
	thetta.currentQuestion = '';
	thetta.answerToCurrentQuestion = '';
	thetta.currentUserAnswer = '';
	thetta.attempts = 0;
	thetta.correct = 0;
	thetta.displayCorrect = true;
	thetta.shouldShowAnswer = false;
	thetta.blankString = "";
	thetta.isPreviousWrongQuestion = false;
	thetta.questionArrayIndex = 0;
	thetta.fade = false;

	Question.success(function(data)
	{
		thetta.questionCollection = data.questions;
		thetta.popRandomQuestion();
	});
	
	getPreviousWrongAnswerArray = function()
	{
			let cookie = $cookies.get('englishIncorrectQuestions');
			
			return (undefined === cookie || "" === cookie) ? [] : cookie.split("|");
	};
	
	thetta.previousWrongAnswers = getPreviousWrongAnswerArray();

	thetta.popRandomQuestion = function()
	{
		var categoryFilter = '';

		if(thetta.categoryAttached())
		{
			categoryFilter = thetta.getCategory();
		}
		if(0 === thetta.previousWrongAnswers.length)
		{
			thetta.questionArrayIndex = Math.floor(Math.random() * thetta.questionCollection.length);
			thetta.isPreviousWrongQuestion = false;
		}
		else
		{
			if(thetta.previousWrongAnswers.length > 0 && Math.random() < .1)
			{
				thetta.questionArrayIndex = parseInt(thetta.previousWrongAnswers[Math.floor(Math.random() * thetta.previousWrongAnswers.length)]);
				thetta.isPreviousWrongQuestion = true;
			}
			else
			{
				thetta.questionArrayIndex = Math.floor(Math.random() * thetta.questionCollection.length);
				thetta.isPreviousWrongQuestion = false;
			}
		}
		thetta.currentQuestionAggregate = thetta.questionCollection[thetta.questionArrayIndex];
		thetta.currentCategory = thetta.currentQuestionAggregate.category;
		thetta.currentQuestion = thetta.currentQuestionAggregate.question;
		thetta.isPicture = thetta.currentQuestionAggregate.isPicture;
		thetta.src = thetta.currentQuestionAggregate.src;
		thetta.answerToCurrentQuestion = thetta.currentQuestionAggregate.answer;
		
		thetta.blankString = "";

		for(let j = 0; j < thetta.answerToCurrentQuestion.length; j++)
		{
			if(thetta.answerToCurrentQuestion[j] === " ")
			{
				thetta.blankString = thetta.blankString + " ";
			}
			thetta.blankString = thetta.blankString + "_";
		}

		var query = $window.location.search;
		var queryVal = query.substring(query.indexOf('=')+1);

		if(thetta.currentCategory.toUpperCase().indexOf(queryVal.toUpperCase()) === -1 && queryVal !== '')
		{
			thetta.popRandomQuestion();
		}
	};

	thetta.submitAnswer = function()
	{
		if(thetta.answerToCurrentQuestion.toUpperCase() === thetta.currentUserAnswer.toUpperCase())
		{
			thetta.correct++;
			thetta.fade = true;
			thetta.displayCorrect = true;
			thetta.shouldShowAnswer = false;
			if(thetta.isPreviousWrongQuestion)
			{
				thetta.previousWrongAnswers = thetta.previousWrongAnswers.filter(answer => answer != thetta.questionArrayIndex+"");
				if(thetta.previousWrongAnswers === "")
				{
					thetta.previousWrongAnswers = [];
				}
				$cookies.put('englishIncorrectQuestions', thetta.previousWrongAnswers.join("|"));
			}
			thetta.popRandomQuestion();
		}
		else
		{
			thetta.displayCorrect = false;
			let hasReplacedLetter = false;
			let count = 0;
			if(!thetta.isPreviousWrongQuestion)
			{
				thetta.previousWrongAnswers.push(thetta.questionArrayIndex);
				$cookies.put('englishIncorrectQuestions', thetta.previousWrongAnswers.join("|"));
			}
			if(thetta.currentUserAnswer !== "")
			{
				for(let i = 0; i < thetta.currentUserAnswer.length; i++)
				{
					let charFromAnswer = thetta.currentUserAnswer[i];
					if(replaceLetter(charFromAnswer))
					{
						hasReplacedLetter = true;
					}
				}
				if(!hasReplacedLetter)
				{
					while(!hasReplacedLetter)
					{
						let randomCharFromAnswer = thetta.answerToCurrentQuestion[Math.floor(Math.random() * thetta.answerToCurrentQuestion.length)];
						hasReplacedLetter = replaceLetter(randomCharFromAnswer);
						count++;
						if(count >= 100)
						{
							hasReplacedLetter = true;
						}
					}
				}
			}
			else
			{
				while(!hasReplacedLetter)
				{
					let randomCharFromAnswer = thetta.answerToCurrentQuestion[Math.floor(Math.random() * thetta.answerToCurrentQuestion.length)];
					hasReplacedLetter = replaceLetter(randomCharFromAnswer);
					count++;
					if(count >= 100)
					{
						hasReplacedLetter = true;
					}
				}
			}
		}
		
		thetta.attempts++;
	};
	
	function replaceLetter(char)
	{
		let hasReplacedLetter = false;
		if(!thetta.blankString.includes(char))
		{
			hasReplacedLetter = true;
			for(let i = 0; i < thetta.answerToCurrentQuestion.length; i++)
			{
				if(thetta.answerToCurrentQuestion[i].toUpperCase() === char.toUpperCase())
				{
					thetta.blankString = setCharAt(thetta.blankString, i, char.toUpperCase());
				}
			}
		}
		
		return hasReplacedLetter;
	}
	
	function setCharAt(string, index, char)
	{
		return string.substring(0,index) + char + string.substring(index+1);
	}
	
	thetta.showAnswer = function()
	{
		thetta.shouldShowAnswer = true;
	};

	thetta.categoryAttached = function()
	{
		if($routeParams.category && $routeParams.category !== '')
		{
			return true;
		}

		return false;
	};

	thetta.getCategory = function()
	{
		return $routeParams.category;
	}

	thetta.correctRatio = function()
	{
		return thetta.correct + '/' + thetta.attempts;
	};

	thetta.grade = function()
	{
		if(thetta.attempts === 0)
		{
			return '';
		}

		var numberGrade = thetta.correct/thetta.attempts;

		if(numberGrade >= .90)
		{
			return 'A';
		}
		else if(numberGrade >= .80)
		{
			return 'B';
		}
		else if(numberGrade >= .70)
		{
			return 'C';
		}
		else if(numberGrade >= .60)
		{
			return 'D';
		}
		else
		{
			return 'F';
		}
	};
}])
.animation('.fade', [function()
{
	return
	{
		enter: function(element, doneFn)
		{
			jQuery(element).fadeOut(500, doneFn);
		},
		leave: function(element, doneFn)
		{
			jQuery(element).fadeIn(500, doneFn);
		}
	}
}]);

