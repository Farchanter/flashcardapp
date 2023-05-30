import { TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { Any } from './any';
import { CookieService } from 'ngx-cookie-service';

describe('AppComponent', () => {
  let fixture;
  let app: AppComponent;
  let cookieServiceSpy: CookieService;

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
    cookieServiceSpy = TestBed.inject(CookieService);
    fixture = TestBed.createComponent(AppComponent);
    app = fixture.componentInstance;
    app.questions = mockJSON;
    app.popRandomQuestion();
    spyOn(cookieServiceSpy, 'get').and.returnValue('');
  });

  it('should produce blank string when popping new question', () =>
  {
    app.blankString = app.assembleBlankString();
    expect(app.blankString).toEqual('__________');
  });

  it('should produce blank string with a space if the answer contains a space', () =>
  {
    app.answerToCurrentQuestion = "Abraham Lincoln"
    app.blankString = app.assembleBlankString();
    expect(app.blankString).toEqual('_______ _______');
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

  it('should increment the number of guesses when a guess is submitted', () => {
    app.numberGuesses = 0;
    app.onClickSubmit();
    expect(app.numberGuesses).toEqual(1);
  });
});
