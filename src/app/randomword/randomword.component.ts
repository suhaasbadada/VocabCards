import { Component, OnInit } from '@angular/core';
import { FlashcardService } from '../flashcard.service';
import { flashcardDTO } from '../models/flashcard.model';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-randomword',
  templateUrl: './randomword.component.html',
  styleUrls: ['./randomword.component.css']
})
export class RandomwordComponent implements OnInit {

  constructor(private flashcardService:FlashcardService,private router:Router,private http:HttpClient) { }
  loaded=false;
  response!:flashcardDTO;
  private apiURL=environment.apiURL;

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


  reloadPage(): void {
    this.ngOnInit();
  }
  // reportedId(){
  //   console.log(this.response.id);
  // }
}
