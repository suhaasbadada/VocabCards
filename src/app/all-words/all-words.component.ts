import { Component, OnInit } from '@angular/core';
import { FlashcardService } from '../flashcard.service';
import { flashcardDTO } from '../models/flashcard.model';

@Component({
  selector: 'app-all-words',
  templateUrl: './all-words.component.html',
  styleUrls: ['./all-words.component.css']
})
export class AllWordsComponent implements OnInit {
  model!:flashcardDTO[];
  loaded=false;
  constructor(private flashcardService:FlashcardService) { }

  ngOnInit(): void {
    this.loadData();
  }
  loadData(){

    this.flashcardService.getAll().subscribe((response:flashcardDTO[])=>{
      this.model=response;
      this.loaded=true;
    })
  }

}
