import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import {CookieService} from 'ngx-cookie-service';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
		FormsModule,
		BrowserAnimationsModule,
    MatButtonModule,
    MatCardModule
  ],
  providers: [CookieService],
  bootstrap: [AppComponent]
})
export class AppModule { }
