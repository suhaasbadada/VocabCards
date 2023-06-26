import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LetterListComponent } from './letter-list/letter-list.component';
import { HueChartComponent } from './utils/hue-chart/hue-chart.component';
import { WordListComponent } from './word-list/word-list.component';

const routes: Routes = [
  {path:'',component:LetterListComponent},
  {path:'flashcards/letter/:c',component:WordListComponent},
  {path:'huechart',component:HueChartComponent},
  {path:'**',redirectTo:''}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
