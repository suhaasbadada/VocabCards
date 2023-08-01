import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FlashcardService } from '../flashcard.service';
import { MatDialog } from '@angular/material/dialog';
import { flashcardDTO } from '../models/flashcard.model';
import { environment } from 'src/environments/environment';
import { forkJoin } from 'rxjs';
@Component({
  selector: 'app-learnt-words',
  templateUrl: './learnt-words.component.html',
  styleUrls: ['./learnt-words.component.css']
})
export class LearntWordsComponent implements OnInit {
  hasLoaded=false;
  response!:Array<flashcardDTO>;
  responseLBM:Array<flashcardDTO>=[];
  paginatedResponse: any[] = [];
  itemsPerPage = 54;  
  currentPage=1;
  colorMap: { [id: number]: string } = {};
  showDefinition: { [id: number]: boolean } = {};
  constructor(private activatedRoute:ActivatedRoute,private flashcardService:FlashcardService,private router:Router,private dialogRef:MatDialog) { }

  ngOnInit(): void {
    const learntWordsIds = JSON.parse(localStorage.getItem(environment.localStorageKey) || '{}');
    const keysWithTrueValue: number[] = Object.keys(learntWordsIds).filter(key => learntWordsIds[key] === true).map(Number);

    const observableArray = keysWithTrueValue.map(id => this.flashcardService.getById(id));

    forkJoin(observableArray).subscribe((responses: flashcardDTO[]) => {
      this.responseLBM = responses;
      this.paginateItems();

      this.responseLBM.forEach(obj => {
        this.colorMap[obj.id] = 'green';
        this.showDefinition[obj.id] = false;
      });
      
      this.hasLoaded = true;
    });
  }

  ngAfterViewInit(): void{
   
  }

  onPageChange(event: any): void {
    this.currentPage = event.pageIndex + 1;
    this.itemsPerPage = event.pageSize;
    this.paginateItems();
  }

  private paginateItems(): void {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    this.paginatedResponse = this.responseLBM.slice(startIndex, endIndex);
  }

  toggleDefinition(wordObj: any): void {
    wordObj.showDefinition = !wordObj.showDefinition;
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
}
