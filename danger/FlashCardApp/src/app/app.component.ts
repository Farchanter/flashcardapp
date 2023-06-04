import { Component } from '@angular/core';
import {Title} from "@angular/platform-browser";
import questions from './questions.json';
import config from './configuration.json';
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
	previousWrongAnswers = config.useCookies ? this.getPreviousWrongAnswerArray() : [];
	gotQuestionWrong = false;
	showShowAnswerButton = config.showShowAnswerButton;
	acceptedCookies = false;

	constructor(public cookieService: CookieService, public titleService:Title)
	{
		this.popRandomQuestion();
		this.blankString = this.assembleBlankString();
		this.titleService.setTitle(config.appTitle);
	}
    
	onClickSubmit()
	{
		this.numberGuesses++;
		console.log(this.guess);
		if(this.answerToCurrentQuestion.toUpperCase() === this.guess.toUpperCase())
		{
			if(this.isPreviousWrongQuestion && config.useCookies)
			{
				let index = this.previousWrongAnswers.indexOf(this.questionArrayIndex+'');
				this.previousWrongAnswers.splice(index, 1);
				this.cookieService.set('englishIncorrectQuestions', this.previousWrongAnswers.join('|'));
			}
			this.isPreviousWrongQuestion = false;
			this.gotQuestionWrong = false;
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
			if(!this.isPreviousWrongQuestion && !this.gotQuestionWrong && config.useCookies)
			{
				this.gotQuestionWrong = true;
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
		let questionIndex = Math.floor(Math.random() * this.questions.questions.length);
		this.isPreviousWrongQuestion = this.previousWrongAnswers.includes(questionIndex+'');
		return questionIndex;
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
