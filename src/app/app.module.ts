import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FlashcardComponent } from './utils/flashcard/flashcard.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material/material.module';
import { WordListComponent } from './word-list/word-list.component';
import { HttpClientModule } from '@angular/common/http';
import { FlexLayoutModule } from '@angular/flex-layout';
import { LetterListComponent } from './letter-list/letter-list.component';
import { NoWordsComponent } from './utils/no-words/no-words.component';
import { ProgressBarComponent } from './utils/progress-bar/progress-bar.component';
import { LetterComponent } from './utils/letter/letter.component';
import { HueChartComponent } from './utils/hue-chart/hue-chart.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { LearntWordsComponent } from './learnt-words/learnt-words.component';
import { RandomwordComponent } from './randomword/randomword.component';
import { QuizComponent } from './quiz/quiz.component';
import { SupportComponent } from './support/support.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HomepageComponent } from './homepage/homepage.component';
import { SyncComponent } from './utils/sync/sync.component';
import { FormsModule } from '@angular/forms';
import { AllWordsComponent } from './all-words/all-words.component';
@NgModule({
  declarations: [
    AppComponent,
    FlashcardComponent,
    WordListComponent,
    LetterListComponent,
    NoWordsComponent,
    ProgressBarComponent,
    LetterComponent,
    HueChartComponent,
    LoginPageComponent,
    LearntWordsComponent,
    RandomwordComponent,
    QuizComponent,
    SupportComponent,
    HomepageComponent,
    SyncComponent,
    AllWordsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    HttpClientModule,
    FlexLayoutModule,
    ReactiveFormsModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
