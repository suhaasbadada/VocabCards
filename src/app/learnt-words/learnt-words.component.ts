import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FlashcardService } from '../flashcard.service';
import { MatDialog } from '@angular/material/dialog';
import { flashcardDTO } from '../models/flashcard.model';
import { environment } from 'src/environments/environment';
import { forkJoin, Observable } from 'rxjs';

@Component({
  selector: 'app-learnt-words',
  templateUrl: './learnt-words.component.html',
  styleUrls: ['./learnt-words.component.css']
})
export class LearntWordsComponent implements OnInit {
  hasLoaded = false;
  responseLBM: flashcardDTO[] = [];
  paginatedResponse: flashcardDTO[] = [];
  itemsPerPage = 48;
  currentPage = 1;
  colorMap: { [id: number]: string } = {};
  showDefinition: { [id: number]: boolean } = {};

  constructor(
    private route: ActivatedRoute,
    private flashcardService: FlashcardService,
    private router: Router,
    private dialogRef: MatDialog
  ) {}

  ngOnInit(): void {
    const learntWordsIds = JSON.parse(localStorage.getItem(environment.localStorageKey) || '{}');
    const keysWithTrueValue: number[] = Object.keys(learntWordsIds)
      .filter(key => learntWordsIds[key] === true)
      .map(Number);

    const observables: Observable<flashcardDTO>[] = keysWithTrueValue.map(id =>
      this.flashcardService.getById(id)
    );

    forkJoin(observables).subscribe((responses: flashcardDTO[]) => {
      this.responseLBM = responses;
      this.hasLoaded = true;
      this.initializeColorMapAndDefinition();
      this.paginateItems();
    });

    this.route.queryParams.subscribe((params) => {
      this.currentPage = +params['page'] || 1;
      this.paginateItems();
    });
  }

  onPageChange(event: any): void {
    this.currentPage = event.pageIndex + 1;
    this.itemsPerPage = event.pageSize;
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: { page: this.currentPage },
      queryParamsHandling: 'merge',
    });
    this.paginateItems();
  }

  private paginateItems(): void {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    this.paginatedResponse = this.responseLBM.slice(startIndex, endIndex);
  }

  private initializeColorMapAndDefinition(): void {
    for (const obj of this.responseLBM) {
      this.colorMap[obj.id] = 'green';
      this.showDefinition[obj.id] = false;
    }
  }

  toggleDefinition(id: number): void {
    this.showDefinition[id] = !this.showDefinition[id];
  }

  getColor(id: number): string {
    return this.colorMap[id] || 'green';
  }

  toggleColor(id: number): void {
    this.colorMap[id] = this.colorMap[id] === 'red' ? 'green' : 'red';
  }
}
