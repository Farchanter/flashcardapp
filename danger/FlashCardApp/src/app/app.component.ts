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
	json:any = questions;
	
	onClickSubmit(data:any)
	{
		if(this.answerToCurrentQuestion.toUpperCase() === data.text.toUpperCase())
		{
			popRandomQuestion();
			this.currentQuestion = cq;
			this.answerToCurrentQuestion = atcq;
			this.category = cat;
			this.isPreviousWrongQuestion = false;
		}
	}
}
