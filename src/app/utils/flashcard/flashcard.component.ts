
import { Component, Input, OnInit } from '@angular/core';
import { FlashcardService } from '../../flashcard.service';
import { flashcardDTO } from '../../models/flashcard.model';

@Component({
  selector: 'app-flashcard',
  templateUrl: './flashcard.component.html',
  styleUrls: ['./flashcard.component.css']
})
export class FlashcardComponent implements OnInit {

  constructor(private flashcardService:FlashcardService) { }
  @Input() element!:flashcardDTO;


  ngOnInit(): void {

  }
  
  toggle(element:flashcardDTO,$event: { checked: boolean; }){
    this.element.learnt=String($event.checked);
    this.flashcardService.edit(this.element.id,element).subscribe(()=>{});
  }
}
