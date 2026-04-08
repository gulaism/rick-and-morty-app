import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { CharactersService } from '../characters';
import { response } from 'express';

@Component({
  selector: 'app-characters',
  templateUrl: './characters.html',
  styleUrl: './characters.scss',
})
export class Characters implements OnInit {
  data: any;
  isLoading = true;
  pageArray: number[] = [];
  currentPage = 1;
  visiblePages: number[] = [1, 2, 3, 4, 5, 6, 7];

  constructor(
    private charactersService: CharactersService,
    private cdr: ChangeDetectorRef,
  ) {}

  ngOnInit() {
    this.isLoading = true;
    this.charactersService.getCharacters(undefined, this.currentPage).subscribe((response) => {
      this.data = response;
      console.log(response || 'No response');
      this.pageArray = Array.from({ length: response.info.pages }, (_, i) => i + 1);
      this.isLoading = false;
      this.cdr.detectChanges();
      this.updateVisiblePages();
    });
  }

  onClickPreviousPage() {
    const previousPageUrl: string = this.data.info.prev;
    // console.log(previousPageUrl);
    if (!previousPageUrl) return;
    this.currentPage = this.currentPage - 1;

    this.updateVisiblePages();

    this.charactersService.getCharacters(previousPageUrl).subscribe((response) => {
      this.data = response;
      // console.log(this.data);
      this.isLoading = false;
      this.cdr.markForCheck();
    });
  }

  onClickNextPage() {
    const nextPageUrl: string = this.data.info.next;
    if (!nextPageUrl) return;
    this.currentPage = this.currentPage + 1;

    this.updateVisiblePages();

    this.charactersService.getCharacters(nextPageUrl).subscribe((response) => {
      this.data = response;
      // console.log(this.data);
      this.isLoading = false;
      this.cdr.markForCheck();
    });
  }

  // updateVisiblePages() {
  //   this.visiblePages = [
  //     ...Array.from({ length: 6 }, (_, i) => this.currentPage - i - 1).reverse(),
  //     ...Array.from({ length: 6 }, (_, i) => this.currentPage + i),
  //   ]
  //     .slice(3, 10)
  //     .filter((page) => page > 0 && page <= this.data.info.pages);
  // }
  updateVisiblePages() {
    const totalPages = this.data.info.pages;
    const maxVisible = 7;

    let start = this.currentPage - Math.floor(maxVisible / 2);
    let end = this.currentPage + Math.floor(maxVisible / 2);

    if (start < 1) {
      start = 1;
      end = Math.min(maxVisible, totalPages);
    }

    if (end > totalPages) {
      end = totalPages;
      start = Math.max(1, totalPages - maxVisible + 1);
    }

    this.visiblePages = Array.from({ length: end - start + 1 }, (_, i) => start + i);
  }

  onPageSelected(page: number) {
    // console.log('Selected page:', page)
    this.currentPage = page;
    this.updateVisiblePages();
    this.charactersService.getCharacters(undefined, page).subscribe((response) => {
      this.data = response;
      this.isLoading = false;
      this.cdr.markForCheck();
    });
  }
}
