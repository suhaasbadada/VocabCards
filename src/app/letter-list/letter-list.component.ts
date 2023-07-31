import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { FlashcardService } from '../flashcard.service';
import { flashcardDTO } from '../models/flashcard.model';
import { NoWordsComponent } from '../utils/no-words/no-words.component';
import { HttpClient } from '@angular/common/http';
const localStorageKey='learntWords';

@Component({
  selector: 'app-letter-list',
  templateUrl: './letter-list.component.html',
  styleUrls: ['./letter-list.component.css']
})

export class LetterListComponent implements OnInit {
  constructor(private flashcardService:FlashcardService,private dialogRef:MatDialog,private http:HttpClient) { }
  letters=['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z'];
  materialIcons = ['face', 'favorite', 'home', 'local_cafe', 'trending_up'];
  percentage!:number;
  total!:number;
  totalLearnt!:number;
  totalLearntLoaded!:boolean;
  model!:flashcardDTO[];
  opened=false;
  loaded=false;
  map=new Map();
  hasLoaded=new Map();
  totalLearntLBM!:number;
  modelLBM!:flashcardDTO[];
  allWordsLearnt: flashcardDTO[] = [];

  ngOnInit(): void {
    const learntWordsIds = JSON.parse(localStorage.getItem(localStorageKey) || '{}');
    this.totalLearntLBM=Object.keys(learntWordsIds).length
    const keysWithTrueValue: number[] = Object.keys(learntWordsIds).filter(key => learntWordsIds[key] === true).map(Number);

    for(var letter of this.letters){
      let l=letter;
      this.hasLoaded.set(l,false);
      this.totalLearntLoaded=false;
      this.flashcardService.getByLetter(letter.toLowerCase()).subscribe ((response:flashcardDTO[])=>{ // get from local browser memory
        this.model=response;
        this.totalLearnt= keysWithTrueValue.filter(id => response.some(obj => obj.id === id)).length;
        this.total=response.length;
        this.percentage=((this.totalLearnt/this.total)*100);
        this.map.set(l,this.percentage);
        this.hasLoaded.set(l,true);
      })
      this.loaded=true;
    }
  }

  openDialog(){
    this.dialogRef.open(NoWordsComponent,{closeOnNavigation: true,panelClass:'popup'});
  }

}
