import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
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
  model:flashcardDTO[]=[];
  noWords=true;
  loaded=false;
  totalLearnt!:number;
  totalLearntLBM!:number;
  @ViewChild('allLearntDiv', { static: false })
  allLearntDiv!: ElementRef;
  searchTerm='';
  filteredModel:flashcardDTO[]=[];

  constructor(private activatedRoute:ActivatedRoute,private flashcardService:FlashcardService,private router:Router,private dialogRef:MatDialog,private http:HttpClient) { }
  private apiURL=environment.apiURL;
  showDefinition=false;
  showDetails=false;
  learntFilter=false;
  allChecked=true;
  showSearch=false;


  ngOnInit(): void {
    this.loadData();
  }

  loadData(){
    const learntWordsIds = JSON.parse(localStorage.getItem(environment.localStorageKey) || '{}');
    const keysWithTrueValue: number[] = Object.keys(learntWordsIds).filter(key => learntWordsIds[key] === true).map(Number);

    this.activatedRoute.params.subscribe(params=>{
      this.flashcardService.getByLetter(params['c'].toLowerCase()).subscribe(flashcards=>{
        this.model=flashcards;
        this.totalLearnt= keysWithTrueValue.filter(id => flashcards.some(obj => obj.id === id)).length;
        this.filteredModel = this.model;
        this.loaded=true;
      })
    })
  }

  loadLearnt(){
    const learntWordsIds = JSON.parse(localStorage.getItem(environment.localStorageKey) || '{}');
    const keysWithTrueValue: number[] = Object.keys(learntWordsIds).filter(key => learntWordsIds[key] === true).map(Number);

    this.activatedRoute.params.subscribe(params=>{
      this.flashcardService.getByLetter(params['c'].toLowerCase()).subscribe(flashcards=>{
        const filteredItems: flashcardDTO[] = flashcards.filter(f => keysWithTrueValue.includes(f.id));
        this.model=filteredItems;
        this.filteredModel=this.model;
        this.loaded=true;
        this.totalLearnt= keysWithTrueValue.filter(id => flashcards.some(obj => obj.id === id)).length;
      })
    })
  }

  loadNotLearnt(){
    const learntWordsIds = JSON.parse(localStorage.getItem(environment.localStorageKey) || '{}');
    const keysWithTrueValue: number[] = Object.keys(learntWordsIds).filter(key => learntWordsIds[key] === true).map(Number);

    this.activatedRoute.params.subscribe(params=>{
      this.flashcardService.getByLetter(params['c'].toLowerCase()).subscribe(flashcards=>{
        const filteredItems: flashcardDTO[] = flashcards.filter(f => !keysWithTrueValue.includes(f.id));
        this.model=filteredItems;
        this.filteredModel=this.model;
        this.loaded=true;
        this.totalLearnt= 0;
      })
    })
  }

  onCheckboxChange(wordId: number, isChecked: boolean) {
    const learntWords = JSON.parse(localStorage.getItem(environment.localStorageKey) || '{}');
    console.log(typeof learntWords);
    learntWords[wordId] = isChecked;
    if(learntWords[wordId]==false){
      this.totalLearnt--;
    }else{
      this.totalLearnt++;
    }
    
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

  toggleShowDefinition(){
    this.showDefinition = !this.showDefinition;
    this.showDetails = !this.showDetails;
  }
  
  showLearnt(po:boolean){
    this.loaded=false;
    if(!po){
      this.learntFilter = !this.learntFilter;
    }
    
    this.allChecked = false;
    if(this.learntFilter==true){
      this.loaded=true;
      this.loadLearnt();
    }else{
      this.loaded=true;
      this.loadNotLearnt();
    }
  }

  showAll(){
    this.allChecked = !this.allChecked;
    if(this.allChecked){
      this.loadData();
    }else{
      this.showLearnt(true);
    }
    
  }

  toggleSearch() {
    this.showSearch = !this.showSearch;
    if (!this.showSearch) {
      this.searchTerm = ''; // Clear the user input when closing the search box
    }
    this.loadData();
  }

  filterCards() {
    // Trim the search term to remove leading and trailing whitespace
    const trimmedSearchTerm = this.searchTerm.trim().toLowerCase();
    if (trimmedSearchTerm === '') {
      // If the search term is empty, show all items from the original model
      this.filteredModel = this.model;
    } else {
      // Filter the model based on the trimmed search term
      this.filteredModel = this.model.filter((element) =>
        element.word.toLowerCase().includes(trimmedSearchTerm)
      );
    }
  }
  

}
