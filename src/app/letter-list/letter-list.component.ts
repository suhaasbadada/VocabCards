import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { FlashcardService } from '../flashcard.service';
import { flashcardDTO } from '../models/flashcard.model';
import { NoWordsComponent } from '../utils/no-words/no-words.component';
import { HttpClient } from '@angular/common/http';
import { FormControl } from '@angular/forms';
import { Observable, map, startWith, switchMap } from 'rxjs';
import { SyncComponent } from '../utils/sync/sync.component';
import { environment } from 'src/environments/environment';
@Component({
  selector: 'app-letter-list',
  templateUrl: './letter-list.component.html',
  styleUrls: ['./letter-list.component.css'],
})

export class LetterListComponent implements OnInit {
  searchControl = new FormControl();
  filteredWords!: Observable<string[]>;
  
  constructor(private flashcardService: FlashcardService,private dialogRef:MatDialog,private http:HttpClient) {
    this.filteredWords = this.searchControl.valueChanges.pipe(
      startWith(''),
      switchMap(value => this._filter(value))
    );
  }

  private _filter(value: string): Observable<string[]> {
    const filterValue = value.toLowerCase();
    return this.flashcardService.getAll().pipe(
      map(wordDtos => wordDtos.filter(dto => dto.word.toLowerCase().includes(filterValue)).map(dto => dto.word))
    );
  }

  displayFn(word: string): string {
    return word;
  }


  letters=['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z'];
  materialIcons = ['face', 'favorite', 'home', 'local_cafe', 'trending_up'];
  percentage!:number;
  total!:number;
  totalLearnt!:number;
  totalLearntLoaded!:boolean;
  model!:flashcardDTO[];
  opened=false;
  loaded=false;
  map=new Map();
  hasLoaded=new Map();
  totalLearntLBM!:number;
  modelLBM!:flashcardDTO[];
  allWordsLearnt: flashcardDTO[] = [];
  showSearch: boolean = false;

  wordList: string[] = [];
  userInput: string = '';
  suggestions: string[] = [];
  filterSuggestions() {
    this.suggestions = this.wordList.filter((word) =>
      word.toLowerCase().includes(this.userInput.toLowerCase())
    );
  }

  ngOnInit(): void {
    const learntWordsIds = JSON.parse(localStorage.getItem(environment.localStorageKey) || '{}');
    const keysWithTrueValue: number[] = Object.keys(learntWordsIds).filter(key => learntWordsIds[key] === true).map(Number);
    this.totalLearntLBM=keysWithTrueValue.length;

    for(var letter of this.letters){
      let l=letter;
      this.hasLoaded.set(l,false);
      this.totalLearntLoaded=false;
      this.flashcardService.getByLetter(letter.toLowerCase()).subscribe ((response:flashcardDTO[])=>{ // get from local browser memory
        this.model=response;
        this.totalLearnt= keysWithTrueValue.filter(id => response.some(obj => obj.id === id)).length;
        this.total=response.length;
        this.percentage=((this.totalLearnt/this.total)*100);
        this.map.set(l,this.percentage);
        this.hasLoaded.set(l,true);
      })
    }

    this.flashcardService.getAll().subscribe((response:flashcardDTO[])=>{
      this.wordList=response.map(dict => dict.word).filter(Boolean);
      this.loaded=true;
    })
  }

  openDialog(){
    this.dialogRef.open(NoWordsComponent,{closeOnNavigation: true,panelClass:'popup'});
  }

  openSyncDialog(){
    this.dialogRef.open(SyncComponent,{closeOnNavigation: true,panelClass:'popup'});
  }

  toggleSearch() {
    this.showSearch = !this.showSearch;
    if (!this.showSearch) {
      this.userInput = ''; // Clear the user input when closing the search box
      this.suggestions = []; // Clear suggestions when closing the search box
    }
  }

}
