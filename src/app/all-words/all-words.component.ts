import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FlashcardService } from '../flashcard.service';
import { flashcardDTO } from '../models/flashcard.model';
import { catchError } from 'rxjs/operators';
import { forkJoin, of } from 'rxjs';

@Component({
  selector: 'app-all-words',
  templateUrl: './all-words.component.html',
  styleUrls: ['./all-words.component.css'],
})
export class AllWordsComponent implements OnInit {
  model!: flashcardDTO[];
  loaded = false;
  paginatedResponse: any[] = [];
  itemsPerPage = 15;
  currentPage = 1;

  constructor(
    private flashcardService: FlashcardService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadData();
  }

  loadData() {
    this.route.queryParams.subscribe((params) => {
      const page = +params['page'] || 1; // Get the page number from the URL or default to 1
      const pageSize = this.itemsPerPage;

      forkJoin([this.flashcardService.getAll()])
        .pipe(
          catchError(() => of([]))
        )
        .subscribe(([response]) => {
          this.model = response;
          this.loaded = true;
          this.currentPage = page; // Set the current page based on URL parameter
          this.paginateItems();
        });
    });
  }

  onPageChange(event: any): void {
    this.currentPage = event.pageIndex + 1;

    // Update the 'page' query parameter in the URL
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: { page: this.currentPage },
      queryParamsHandling: 'merge',
    });

    // Update the displayed page on the client-side
    this.paginateItems();
  }

  private paginateItems(): void {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    this.paginatedResponse = this.model.slice(startIndex, endIndex);
  }
}
