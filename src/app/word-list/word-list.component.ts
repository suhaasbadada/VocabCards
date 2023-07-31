import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FlashcardService } from '../flashcard.service';
import { flashcardDTO } from '../models/flashcard.model';
import { MatDialog } from '@angular/material/dialog';
import { NoWordsComponent } from '../utils/no-words/no-words.component';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-word-list',
  templateUrl: './word-list.component.html',
  styleUrls: ['./word-list.component.css']
})
export class WordListComponent implements OnInit {
  // model, totalLearnt to update from local browser memory
  model:flashcardDTO[]=[];
  noWords=true;
  loaded=false;
  totalLearnt!:number;
  constructor(private activatedRoute:ActivatedRoute,private flashcardService:FlashcardService,private router:Router,private dialogRef:MatDialog,private http:HttpClient) { }
  private apiURL=environment.apiURL;
  ngOnInit(): void {
    this.loadData();
  }

  loadData(){
    this.activatedRoute.params.subscribe(params=>{
      this.flashcardService.getByLetter(params['c'].toLowerCase()).subscribe(flashcards=>{
        this.model=flashcards;
        this.loaded=true;
        this.totalLearnt=this.model.filter(x=>x.learnt==="true").length; // get from local browser memory ( for each letter )
      })
    })
  }
  toggle(element:flashcardDTO,$event: { checked: boolean; }){ // implement totalLearnt counter in the following functions ( for each letter )
    element.learnt=String($event.checked);
    if(element.learnt=="false"){
      this.totalLearnt--;
    }else{
      this.totalLearnt++;
    }
    this.flashcardService.edit(element.id,element).subscribe(()=>{});
  }

  onCheckboxChange(wordId: number, isChecked: boolean) {
    const learntWords = JSON.parse(localStorage.getItem(environment.localStorageKey) || '{}');
    learntWords[wordId] = isChecked;
    localStorage.setItem(environment.localStorageKey, JSON.stringify(learntWords));

    this.sendLocalStorageDataToBackend(learntWords);
  }

  sendLocalStorageDataToBackend(data: any) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'LocalStorageData': JSON.stringify(data)
      })
    };
  
    this.http.get<any>(this.apiURL+'/words/local-storage', httpOptions).subscribe(
      (response) => {
        // console.log("Response:",response);
        // console.log('Local storage data sent to backend successfully.');
      },
      (error) => {
        console.error('Error sending local storage data to backend:', error);
      }
    );
  }


  getCheckboxStatus(wordId: number): boolean{
    const learntWords=JSON.parse(localStorage.getItem(environment.localStorageKey) || '{}');
    return learntWords[wordId] || false;
  }

  openDialog(){
    this.dialogRef.open(NoWordsComponent);
  }

}
