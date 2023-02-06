import { Component } from '@angular/core';
import questions from './questions.json';

let atcq = "";
let cq = "";
let cat = "";

let popRandomQuestion = function()
{
	let randomQuestion = questions.questions[Math.floor(Math.random() * questions.questions.length)];
	console.log(randomQuestion);
	atcq = randomQuestion.answer;
	cq = randomQuestion.question;
	cat = randomQuestion.category;
	console.log(atcq);
};

let assembleBlankString = function()
{
    let resultString = '';
    for (let char of atcq)
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
popRandomQuestion();

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
    title = 'English';
	currentQuestion = cq;
	answerToCurrentQuestion = atcq;
	category = cat;
	isPreviousWrongQuestion = false;
    numberGuesses = 0;
    numberRight = 0;
	json:any = questions;
    showAnswer = false;
    guess = '';
    blankString = assembleBlankString();
    
	onClickSubmit()
	{
        this.numberGuesses++;
        console.log(this.guess);
		if(this.answerToCurrentQuestion.toUpperCase() === this.guess.toUpperCase())
		{
			popRandomQuestion();
            this.blankString = assembleBlankString();
			this.currentQuestion = cq;
			this.answerToCurrentQuestion = atcq;
			this.category = cat;
			this.isPreviousWrongQuestion = false;
            this.numberRight++;
            this.showAnswer = false;
		}
	}

    letterGrade()
    {
        if(0 === this.numberGuesses)
        {
            return "A";
        }
        let ratio = this.numberRight/this.numberGuesses;
        if(ratio > .9)
        {
            return "A";
        }
        else if(ratio > .8)
        {
            return "B";
        }
        else if(ratio > .7)
        {
            return "C";
        }
        else if(ratio > .6)
        {
            return "D";
        }
        return "F";
    }
}
