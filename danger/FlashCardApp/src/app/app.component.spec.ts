import { TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { Any } from './any';
import { CookieService } from 'ngx-cookie-service';

describe('AppComponent', () => {
  let fixture;
  let app: AppComponent;
  let fakeCookieService: CookieService = new CookieService(new Document(), null);
  fakeCookieService.get = function(name: string)
  {
    return '';
  };
  let wrongAnswers = '';
  fakeCookieService.set = function(name: string, value: string)
  {
    wrongAnswers = value;
  };

  let mockJSON =
  {
      "questions":
      [
        {
          "category": "Noun",
          "question": "A denial; a renunciation; denial of desire or self-interest",
          "answer": "Abnegation"
        }
      ]
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ FormsModule ],
      declarations: [
        AppComponent
      ]
    }).compileComponents();
    fixture = TestBed.createComponent(AppComponent);
    app = fixture.componentInstance;
    app.questions = mockJSON;
    app.popRandomQuestion();
    app.isPreviousWrongQuestion = false;
    wrongAnswers = '';
    app.cookieService = fakeCookieService;
    app.previousWrongAnswers = app.getPreviousWrongAnswerArray();
    app.blankString = app.assembleBlankString();
  });

  it('should pick a random letter to display in the answer if none is present in a guess', () => {
    app.answerToCurrentQuestion = "AAAAA";
    app.blankString = app.assembleBlankString();
    app.guess = "B";
    app.onClickSubmit();
    expect(app.blankString).toEqual('AAAAA');
  });

  it('should populate the letters from an incorrect guess which appear in the correct answer', () => {
    app.answerToCurrentQuestion = "Abraham Lincoln";
    app.blankString = app.assembleBlankString();
    app.guess = "Eastern America";
    app.onClickSubmit();
    expect(app.blankString).toEqual('A_RA_AM _INC__N');
  });

  it('should show the "wrong answer" styles if the answer is incorrect', () => {
    app.answerToCurrentQuestion = "Abraham Lincoln";
    app.guess = "Eastern America";
    app.showCorrect = true;
    app.onClickSubmit();
    expect(app.showCorrect).toEqual(false);
  });

  it('should send the wrong answer index to the cookie service', () => {
    app.answerToCurrentQuestion = "Abraham Lincoln";
    app.guess = "Eastern America";
    app.questionArrayIndex = 16;
    wrongAnswers = '';
    app.onClickSubmit();
    expect(wrongAnswers).toEqual('16');
  });

  it('should add the wrong answer index to the cookie service if one is already present', () => {
    app.answerToCurrentQuestion = "Abraham Lincoln";
    app.guess = "Eastern America";
    app.questionArrayIndex = 16;
    app.previousWrongAnswers = ['42'];
    app.onClickSubmit();
    expect(wrongAnswers).toEqual('42|16');
  });

  it('Do not submit question index to cookie service if it is a previously wrong question already', () => {
    app.answerToCurrentQuestion = "Abraham Lincoln";
    app.guess = "Eastern America";
    app.isPreviousWrongQuestion = true;
    app.questionArrayIndex = 16;
    app.onClickSubmit();
    expect(wrongAnswers).toEqual('');
  });

  it('should remove a previously wrong question if answered correctly', () => {
    app.answerToCurrentQuestion = "Abraham Lincoln";
    app.guess = "Abraham Lincoln";
    app.questionArrayIndex = 16;
    app.isPreviousWrongQuestion = true;
    app.previousWrongAnswers = ['16', '42'];
    app.onClickSubmit();
    expect(wrongAnswers).toEqual('42');
  });

  it('should increment the number of guesses when a guess is submitted', () => {
    app.numberGuesses = 0;
    app.onClickSubmit();
    expect(app.numberGuesses).toEqual(1);
  });

  it('should produce blank string when popping new question', () =>
  {
    app.blankString = app.assembleBlankString();
    expect(app.blankString).toEqual('__________');
  });

  it('should produce blank string with a space if the answer contains a space', () =>
  {
    app.answerToCurrentQuestion = "Abraham Lincoln";
    app.blankString = app.assembleBlankString();
    expect(app.blankString).toEqual('_______ _______');
  });

  it('should pop a new question if the answer is correct', () =>
  {
    app.answerToCurrentQuestion = "Abraham Lincoln";
    app.guess = "Abraham Lincoln";
    app.onClickSubmit();
    expect(app.answerToCurrentQuestion).toEqual('Abnegation');
  });

  it('should produce a new blank string if the answer is correct', () =>
  {
    app.answerToCurrentQuestion = "Abraham Lincoln";
    app.guess = "Abraham Lincoln";
    app.blankString = app.assembleBlankString();
    app.onClickSubmit();
    expect(app.blankString).toEqual('__________');
  });

  it('should remove "previous wrong answer" flag if answer is correct', () =>
  {
    app.answerToCurrentQuestion = "Abraham Lincoln";
    app.guess = "Abraham Lincoln";
    app.isPreviousWrongQuestion = true;
    app.onClickSubmit();
    expect(app.isPreviousWrongQuestion).toEqual(false);
  });

  it('should increment the number of correct answers if answer is correct', () =>
  {
    app.answerToCurrentQuestion = "Abraham Lincoln";
    app.guess = "Abraham Lincoln";
    app.numberRight = 0;
    app.onClickSubmit();
    expect(app.numberRight).toEqual(1);
  });

  it('should hide the answer of the next question if guess is correct', () =>
  {
    app.answerToCurrentQuestion = "Abraham Lincoln";
    app.guess = "Abraham Lincoln";
    app.showAnswer = true;
    app.onClickSubmit();
    expect(app.showAnswer).toEqual(false);
  });

  it('should show the "right answer" styles if the answer is correct', () =>
  {
    app.answerToCurrentQuestion = "Abraham Lincoln";
    app.guess = "Abraham Lincoln";
    app.showCorrect = false;
    app.onClickSubmit();
    expect(app.showCorrect).toEqual(true);
  });

  it('should create the app', () => {
    expect(app).toBeTruthy();
  });

  it(`should have as title 'English'`, () => {
    expect(app.title).toEqual('English');
  });

  it('should have a default grade of "A"', () => {
    app.numberGuesses = 0;
    expect(app.letterGrade()).toEqual('A');
  });

  it('should give a grade of "A" for any mark above a 90', () => {
    app.numberGuesses = 100;
    app.numberRight = Any.numberBetween(90, 100);
    expect(app.letterGrade()).toEqual('A');
  });

  it('should give a grade of "A" for a 90', () => {
    app.numberGuesses = 100;
    app.numberRight = 90;
    expect(app.letterGrade()).toEqual('A');
  });

  it('should give a grade of "B" for any mark between 80 and 90', () => {
    app.numberGuesses = 100;
    app.numberRight = Any.numberBetween(80, 90);
    expect(app.letterGrade()).toEqual('B');
  });

  it('should give a grade of "B" for an 80', () => {
    app.numberGuesses = 100;
    app.numberRight = 80;
    expect(app.letterGrade()).toEqual('B');
  });

  it('should give a grade of "C" for any mark between 70 and 80', () => {
    app.numberGuesses = 100;
    app.numberRight = Any.numberBetween(70, 80);
    expect(app.letterGrade()).toEqual('C');
  });

  it('should give a grade of "C" for a 70', () => {
    app.numberGuesses = 100;
    app.numberRight = 70;
    expect(app.letterGrade()).toEqual('C');
  });

  it('should give a grade of "D" for any mark between 60 and 70', () => {
    app.numberGuesses = 100;
    app.numberRight = Any.numberBetween(60, 70);
    expect(app.letterGrade()).toEqual('D');
  });

  it('should give a grade of "D" for an 60', () => {
    app.numberGuesses = 100;
    app.numberRight = 60;
    expect(app.letterGrade()).toEqual('D');
  });

  it('should give a grade of "F" for any mark less than 60', () => {
    app.numberGuesses = 100;
    app.numberRight = Any.numberBetween(0, 60);
    expect(app.letterGrade()).toEqual('F');
  });
});
