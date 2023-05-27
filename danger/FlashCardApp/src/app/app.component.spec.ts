import { TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { Any } from './any';

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ FormsModule ],
      declarations: [
        AppComponent
      ],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'English'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('English');
  });

  it('should have a default grade of "A"', () => {
      const fixture = TestBed.createComponent(AppComponent);
      const app = fixture.componentInstance;
      app.numberGuesses = 0;
      expect(app.letterGrade()).toEqual('A');
  });

  it('should give a grade of "A" for any mark above a 90', () => {
      const fixture = TestBed.createComponent(AppComponent);
      const app = fixture.componentInstance;
      app.numberGuesses = 100;
      app.numberRight = Any.numberBetween(90, 100);
      expect(app.letterGrade()).toEqual('A');
  });

  it('should give a grade of "A" for a 90', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    app.numberGuesses = 100;
    app.numberRight = 90;
    expect(app.letterGrade()).toEqual('A');
  });

  it('should give a grade of "B" for any mark between 80 and 90', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    app.numberGuesses = 100;
    app.numberRight = Any.numberBetween(80, 90);
    expect(app.letterGrade()).toEqual('B');
  });

  it('should give a grade of "B" for an 80', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    app.numberGuesses = 100;
    app.numberRight = 80;
    expect(app.letterGrade()).toEqual('B');
  });

  it('should give a grade of "C" for any mark between 70 and 80', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    app.numberGuesses = 100;
    app.numberRight = Any.numberBetween(70, 80);
    expect(app.letterGrade()).toEqual('C');
  });

  it('should give a grade of "C" for a 70', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    app.numberGuesses = 100;
    app.numberRight = 70;
    expect(app.letterGrade()).toEqual('C');
  });

  it('should give a grade of "D" for any mark between 60 and 70', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    app.numberGuesses = 100;
    app.numberRight = Any.numberBetween(60, 70);
    expect(app.letterGrade()).toEqual('D');
  });

  it('should give a grade of "D" for an 60', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    app.numberGuesses = 100;
    app.numberRight = 60;
    expect(app.letterGrade()).toEqual('D');
  });

  it('should give a grade of "F" for any mark less than 60', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    app.numberGuesses = 100;
    app.numberRight = Any.numberBetween(0, 60);
    expect(app.letterGrade()).toEqual('F');
  });
});
