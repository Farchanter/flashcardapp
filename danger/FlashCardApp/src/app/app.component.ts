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
	
	onClickSubmit(data:any)
	{
        this.numberGuesses++;
		if(this.answerToCurrentQuestion.toUpperCase() === data.text.toUpperCase())
		{
			popRandomQuestion();
			this.currentQuestion = cq;
			this.answerToCurrentQuestion = atcq;
			this.category = cat;
			this.isPreviousWrongQuestion = false;
            this.numberRight++;
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
