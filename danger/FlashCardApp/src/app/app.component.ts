import { Component } from '@angular/core';
import questions from './questions.json';
import {CookieService} from 'ngx-cookie-service';

@Component
(
	{
		selector: 'app-root',
		templateUrl: './app.component.html',
		styleUrls: ['./app.component.css'],
		providers: [CookieService]
	}
)

export class AppComponent
{
	title = 'English';
	currentQuestion = '';
	answerToCurrentQuestion = '';
	category = '';
	isPreviousWrongQuestion = false;
	numberGuesses = 0;
	numberRight = 0;
	questions:any = questions;
	showCorrect = true;
	showAnswer = false;
	guess = '';
	blankString = '';
	questionArrayIndex = 0;
	previousWrongAnswers = this.getPreviousWrongAnswerArray();

	constructor(public cookieService: CookieService)
	{
		this.popRandomQuestion();
		this.blankString = this.assembleBlankString();
	}
    
	onClickSubmit()
	{
		this.numberGuesses++;
		console.log(this.guess);
		if(this.answerToCurrentQuestion.toUpperCase() === this.guess.toUpperCase())
		{
			if(this.isPreviousWrongQuestion)
			{
				let index = this.previousWrongAnswers.indexOf(this.questionArrayIndex+'');
				this.previousWrongAnswers.splice(index, 1);
				this.cookieService.set('englishIncorrectQuestions', this.previousWrongAnswers.join('|'));
			}
			this.isPreviousWrongQuestion = false;
			this.popRandomQuestion();
			this.blankString = this.assembleBlankString();
			this.numberRight++;
			this.showAnswer = false;
			this.showCorrect = true;
		}
		else
		{
			let hasReplacedLetter = false;
			this.showCorrect = false;
			let count = 0;
			if(!this.isPreviousWrongQuestion)
			{
				this.previousWrongAnswers.push(this.questionArrayIndex+'');
				this.cookieService.set('englishIncorrectQuestions', this.previousWrongAnswers.join('|'));
			}
			for(let i = 0; i < this.guess.length; i++)
			{
				let charFromAnswer = this.guess[i];
				if(this.replaceLetter(charFromAnswer))
				{
					hasReplacedLetter = true;
				}
			}
			if(!hasReplacedLetter)
			{
				while(!hasReplacedLetter)
				{
					let randomCharFromAnswer = this.answerToCurrentQuestion[Math.floor(Math.random() * this.answerToCurrentQuestion.length)];
					hasReplacedLetter = this.replaceLetter(randomCharFromAnswer);
					count++;
					if(count >= 1000)
					{
						hasReplacedLetter = true;
					}
				}
			}
    	}	
	}

  	replaceLetter(char:string)
	{
		let hasReplacedLetter = false;
		if((!this.blankString.includes(char)) && this.answerToCurrentQuestion.toUpperCase().includes(char.toUpperCase()))
		{
			for(let i = 0; i < this.answerToCurrentQuestion.length; i++)
			{
				if(this.answerToCurrentQuestion[i].toUpperCase() === char.toUpperCase())
				{
					if(this.blankString[i] === '_')
					{
						hasReplacedLetter = true;
					}
					this.blankString = this.setCharAt(this.blankString, i, char.toUpperCase());
				}
			}
		}
		
		return hasReplacedLetter;
	}
	
	setCharAt(string:string, index:number, char:string)
	{
		return string.substring(0,index) + char + string.substring(index+1);
	}

	letterGrade()
	{
		if(0 === this.numberGuesses)
		{
			return "A";
		}
		let ratio = this.numberRight/this.numberGuesses;
		if(ratio >= .9)
		{
			return "A";
		}
		else if(ratio >= .8)
		{
			return "B";
		}
		else if(ratio >= .7)
		{
			return "C";
		}
		else if(ratio >= .6)
		{
			return "D";
		}
		return "F";
	}

	getPreviousWrongAnswerArray()
	{
		let cookie = this.cookieService.get('englishIncorrectQuestions');
		console.log('Wrong answer cookie: ' + cookie)
		return (undefined === cookie || "" === cookie) ? [] : cookie.split("|");
	}

	popRandomQuestion()
	{
		this.questionArrayIndex = (0 === this.previousWrongAnswers.length) ? this.getAnyQuestionIndex() : (this.previousWrongAnswers.length > 0 && Math.random() < .1) ? this.getWrongQuestionIndex() : this.getAnyQuestionIndex();
		console.log(this.questionArrayIndex);
		let randomQuestion = this.questions.questions[this.questionArrayIndex];
		console.log(randomQuestion);
		this.answerToCurrentQuestion = randomQuestion.answer;
		this.currentQuestion = randomQuestion.question;
		this.category = randomQuestion.category;
		console.log(this.answerToCurrentQuestion);
	}
	
	getAnyQuestionIndex()
	{
		this.isPreviousWrongQuestion = false;
		return Math.floor(Math.random() * this.questions.questions.length);
	}
	
	getWrongQuestionIndex()
	{
		this.isPreviousWrongQuestion = true;
		console.log("Previous incorrect answer");
		return parseInt(this.previousWrongAnswers[Math.floor(Math.random() * this.previousWrongAnswers.length)]);
	}
	
	assembleBlankString()
	{
		let resultString = '';
		for (let char of this.answerToCurrentQuestion)
		{
			if(' ' === char)
			{
				resultString += ' ';
			}
			else
			{
				resultString += '_';
			}
		}

		return resultString;
	}
}
