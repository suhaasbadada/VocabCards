import { Component, OnInit } from '@angular/core';
import { FlashcardService } from '../flashcard.service';

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.css']
})
export class QuizComponent implements OnInit {

  constructor(private flashcardService:FlashcardService) { }
  loaded=false;

  ngOnInit(): void {
    let words:any[];
    let definitions:any[];
    for(let i=0;i<5;i++){
      this.flashcardService.getRandom().subscribe(response=>{
        console.log(response);
        words.push(response.word);
        definitions.push(response.definition);
        console.log(words);
        console.log(definitions); 
      })
    }
    this.loaded=true;
    
  }
}
