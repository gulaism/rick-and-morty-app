import { ChangeDetectorRef, Component, DestroyRef, inject, OnInit, signal } from '@angular/core';
import { CharactersService } from '../../../services/characters';
import { response } from 'express';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-characters',
  templateUrl: './characters.html',
  styleUrl: './characters.scss',
  imports: [RouterLink],
})
export class Characters implements OnInit {
  private charactersService = inject(CharactersService);
  private destroyRef = inject(DestroyRef);
  data = signal<any>(null);
  isLoading = signal(true);
  pageArray = signal<number[]>([]);
  currentPage = signal(1);
  visiblePages = signal<number[]>([1, 2, 3, 4, 5, 6, 7]);

  ngOnInit() {
    this.isLoading.set(true);

    this.charactersService.characters$
    .pipe(takeUntilDestroyed(this.destroyRef))
    .subscribe((response) => {
      if (!response) return;
      this.data.set(response);
      this.isLoading.set(false);

      console.log(response || 'No response');

      if (response.info?.pages) {
        this.pageArray.set(Array.from({ length: response.info.pages }, (_, i) => i + 1));
        this.updateVisiblePages();
      }
    });

    this.charactersService.getCharacters(undefined, this.currentPage())
    .pipe(takeUntilDestroyed(this.destroyRef))
    .subscribe();
  }

  onClickPreviousPage() {
    const previousPageUrl: string = this.data().info.prev;
    // console.log(previousPageUrl);
    if (!previousPageUrl) return;
    this.currentPage.set(this.currentPage() - 1);

    this.updateVisiblePages();

    this.charactersService.getCharacters(previousPageUrl).subscribe();
  }

  onClickNextPage() {
    const nextPageUrl: string = this.data().info.next;
    if (!nextPageUrl) return;
    this.currentPage.set(this.currentPage() + 1);

    this.updateVisiblePages();

    this.charactersService.getCharacters(nextPageUrl).subscribe();
  }
  updateVisiblePages() {
    const totalPages = this.data().info.pages;
    const maxVisible = 7;

    let start = this.currentPage() - Math.floor(maxVisible / 2);
    let end = this.currentPage() + Math.floor(maxVisible / 2);

    if (start < 1) {
      start = 1;
      end = Math.min(maxVisible, totalPages);
    }

    if (end > totalPages) {
      end = totalPages;
      start = Math.max(1, totalPages - maxVisible + 1);
    }

    this.visiblePages.set(Array.from({ length: end - start + 1 }, (_, i) => start + i));
  }

  onPageSelected(page: number) {
    // console.log('Selected page:', page)
    this.currentPage.set(page);
    this.updateVisiblePages();
    this.charactersService.getCharacters(undefined, page).subscribe();
  }

  onClickCharacterDetails(characterId: number) {
    console.log('Character clicked: ', characterId);
  }
}
