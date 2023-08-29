import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LetterListComponent } from './letter-list/letter-list.component';
import { HueChartComponent } from './utils/hue-chart/hue-chart.component';
import { WordListComponent } from './word-list/word-list.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { LearntWordsComponent } from './learnt-words/learnt-words.component';
import { RandomwordComponent } from './randomword/randomword.component';
import { QuizComponent } from './quiz/quiz.component';
import { SupportComponent } from './support/support.component';
import { HomepageComponent } from './homepage/homepage.component';

const routes: Routes = [
  // {path:'',component:HomepageComponent},
  {path:'',component:LetterListComponent},
  {path:'flashcards/letter/:c',component:WordListComponent},
  {path:'huechart',component:HueChartComponent},
  {path:'login',component:LoginPageComponent},
  {path:'quickreview',component:LearntWordsComponent},
  {path:'random',component:RandomwordComponent},
  {path:'quiz',component:QuizComponent},
  {path:'support',component:SupportComponent},
  {path:'**',redirectTo:''},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
