import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { flashcardDTO } from './models/flashcard.model';

@Injectable({
  providedIn: 'root'
})
export class FlashcardService {

  constructor(private http:HttpClient) { }
  private apiURL=environment.apiURL+'/flashcards';
  private letter="/letter";
  private query="/";

  getByLetter(c:string):Observable<flashcardDTO[]>{
    console.log(`${this.apiURL}${this.letter}${this.query}${c}`);
    return this.http.get<flashcardDTO[]>(`${this.apiURL}${this.letter}${this.query}${c}`);
  }

  getById(id:number):Observable<flashcardDTO>{
    return this.http.get<flashcardDTO>(`${this.apiURL}/${id}`);
  }

  edit(id:number,flashcard:flashcardDTO){
    return this.http.put(`${this.apiURL}/${id}`,flashcard);
  }

  getTotalLearnt():Observable<number>{
    return this.http.get<number>(`${this.apiURL}/totallearnt`);
  }
}
