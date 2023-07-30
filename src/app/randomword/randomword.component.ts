import { Component, OnInit } from '@angular/core';
import { FlashcardService } from '../flashcard.service';
import { flashcardDTO } from '../models/flashcard.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-randomword',
  templateUrl: './randomword.component.html',
  styleUrls: ['./randomword.component.css']
})
export class RandomwordComponent implements OnInit {

  constructor(private flashcardService:FlashcardService,private router:Router) { }
  loaded=false;
  response!:flashcardDTO;

  ngOnInit(): void {
    this.flashcardService.getRandom().subscribe(response=>{
      this.response=response;
      this.loaded=true;
    })
  }

  toggle(element:flashcardDTO,$event: { checked: boolean; }){
    element.learnt=String($event.checked);
    this.flashcardService.edit(element.id,element).subscribe(()=>{});
  }

  reloadPage(): void {
    this.ngOnInit();
  }
  reportedId(){
    console.log(this.response.id);
  }
}
