import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { FlashcardService } from '../flashcard.service';
import { flashcardDTO } from '../models/flashcard.model';
import { NoWordsComponent } from '../utils/no-words/no-words.component';

@Component({
  selector: 'app-letter-list',
  templateUrl: './letter-list.component.html',
  styleUrls: ['./letter-list.component.css']
})
export class LetterListComponent implements OnInit {

  constructor(private flashcardService:FlashcardService,private dialogRef:MatDialog) { }
  letters=['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z'];
  materialIcons = ['face', 'favorite', 'home', 'local_cafe', 'trending_up'];
  percentage!:number;
  total!:number;
  totalLearnt!:number;
  model!:flashcardDTO[];
  opened=false;

  map=new Map();
  hasLoaded=new Map();
  

  ngOnInit(): void {
    for(var letter of this.letters){
      let l=letter;
      this.hasLoaded.set(l,false);
      this.flashcardService.getByLetter(letter.toLowerCase()).subscribe ((response:flashcardDTO[])=>{
        this.model=response;
        this.totalLearnt=this.model.filter(x=>x.learnt==="true").length;
        this.total=response.length;
        this.percentage=((this.totalLearnt/this.total)*100);
        this.map.set(l,this.percentage);
        this.hasLoaded.set(l,true);
      })
    }
  }

  openDialog(){
    this.dialogRef.open(NoWordsComponent,{closeOnNavigation: true,panelClass:'popup'});
  }

}
