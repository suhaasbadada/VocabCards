import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FlashcardService } from '../flashcard.service';
import { MatDialog } from '@angular/material/dialog';
import { flashcardDTO } from '../models/flashcard.model';

@Component({
  selector: 'app-learnt-words',
  templateUrl: './learnt-words.component.html',
  styleUrls: ['./learnt-words.component.css']
})
export class LearntWordsComponent implements OnInit {
  hasLoaded=false;
  response!:Array<flashcardDTO>;
  colorMap: { [id: number]: string } = {};
  showDefinition: { [id: number]: boolean } = {};

  constructor(private activatedRoute:ActivatedRoute,private flashcardService:FlashcardService,private router:Router,private dialogRef:MatDialog) { }

  ngOnInit(): void {
    this.flashcardService.getAllLearnt().subscribe((response:flashcardDTO[])=>{
      this.hasLoaded=true;
      this.response=response;
      response.forEach(obj=>{
        this.colorMap[obj.id]='green';
        this.showDefinition[obj.id]=false;
      })
    })
  }

  getColor(id: number): string {
    return this.colorMap[id] || 'green';
  }

  toggleColor(id:number):void{
    if(this.colorMap[id]==='red'){
      this.colorMap[id]='green';
    }else{
      this.colorMap[id]='red';
    }
  }
  toggleDefinition(wordObj: any): void {
    wordObj.showDefinition = !wordObj.showDefinition;
  }
}
