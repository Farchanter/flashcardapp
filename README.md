# Flash Card Framework!

This project is a free, open-source web framework to allow you to create "flash card" style quizzes for yourself to aid in memorization.

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 13.2.5. Running this project locally, including to add new questions or change any fonts or colors, will require both the Angular CLI and [Node, especially the Node Package Manager](https://nodejs.org/en/download).

## Examples

English vocab: https://www.justindilks.com/english
Icelandic: https://www.justindilks.com/icelandic
Lenape: https://www.justindilks.com/lenape
Austrian German: https://www.justindilks.com/austrian-german
Pennsylvania German: https://www.justindilks.com/pennsylvania-german

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. The built artifacts will include any new questions you create.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Adding new questions (Creating your own quiz set!)

Under src/assets/questions.json, delete, change, or add any of the questions as you see fit. To add new text questions, each JSON entity should include the properties "category", "question", and "answer". To add new image questions, each JSON entity should include the properties "category", "question", "isPicture" (which must be true), and "src" (representing the name of the image in the src/assets/images folder).

## Changing colors

To change the background color, change the value for background-color in src/index.html as well as the style for background-color in src/app/app.component.css with the CSS selector ".correctBackground". These values should be consistent.

To change the header color for Android devices using Chromium browsers, change the value for the meta tag with the name "theme-color" in src/index.html.

All other colors can be found in src/app/app.component.css.

## Settings

You can change certain properties of the aplications in src/app/configuration.json. These include "appTitle" (the name of your app, including its name in a web browser tab), "shouldShowAnswerButton" (which allows for users to display the answer at any time), "useCookies" (whether or not to use cookies to show users questions they previously made mistakes on), and "showCookieDisclaimer" (a text message at the bottom of the app for privacy purposes stating that cookies are used, if you do use cookies).