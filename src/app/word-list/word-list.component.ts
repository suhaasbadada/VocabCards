import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FlashcardService } from '../flashcard.service';
import { flashcardDTO } from '../models/flashcard.model';
import { MatDialog } from '@angular/material/dialog';
import { NoWordsComponent } from '../utils/no-words/no-words.component';

@Component({
  selector: 'app-word-list',
  templateUrl: './word-list.component.html',
  styleUrls: ['./word-list.component.css']
})
export class WordListComponent implements OnInit {
  model:flashcardDTO[]=[];
  noWords=true;
  loaded=false;
  totalLearnt!:number;
  constructor(private activatedRoute:ActivatedRoute,private flashcardService:FlashcardService,private router:Router,private dialogRef:MatDialog) { }

  ngOnInit(): void {
    this.loadData();
  }

  loadData(){
    this.activatedRoute.params.subscribe(params=>{
      this.flashcardService.getByLetter(params['c'].toLowerCase()).subscribe(flashcards=>{
        this.model=flashcards;
        this.loaded=true;
        this.totalLearnt=this.model.filter(x=>x.learnt==="true").length;
      })
    })
    
  }
  toggle(element:flashcardDTO,$event: { checked: boolean; }){
    element.learnt=String($event.checked);
    if(element.learnt=="false"){
      this.totalLearnt--;
    }else{
      this.totalLearnt++;
    }
    this.flashcardService.edit(element.id,element).subscribe(()=>{});
  }

  openDialog(){
    this.dialogRef.open(NoWordsComponent);
  }

}
