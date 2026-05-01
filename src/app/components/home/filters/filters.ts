import { Component, inject, signal } from '@angular/core';
import { CharactersService } from '../../../services/characters';

@Component({
  selector: 'app-filters',
  imports: [],
  templateUrl: './filters.html',
  styleUrl: './filters.scss',
})
export class Filters {
  private charactersService = inject(CharactersService);
  isFiltersOpen = signal(false);
  activeFilter = signal<string>('');

  activeStatus = signal<string>('');
  activeGender = signal<string>('');


  toggleFilters() {
    this.isFiltersOpen.set(!this.isFiltersOpen());
    if (!this.isFiltersOpen()) this.activeFilter.set('');
  }

  setActiveFilter(filter: string) {
    this.activeFilter.set(filter);
  }

  filterByStatus(status: string) {
    this.activeStatus.set(status.toLowerCase());
    console.log('Active status: ', this.activeStatus());

    if (!this.activeStatus().trim()) {
      this.charactersService.currentStatusFilter.set('');
      this.charactersService.getCharacters(undefined, 1);
      return;
    }

    this.charactersService.getCharactersByStatus(this.activeStatus()).subscribe({
      error: (err) => {
        console.error('Error occurred while filtering by status: ', err);
      },
    });
  }

  filterByGender(gender: string) {
    this.activeGender.set(gender.toLowerCase());
    console.log(this.activeGender(), ' is the active gender');

    if (!this.activeGender().trim()) {
      this.charactersService.currentGenderFilter.set('');
      this.charactersService.getCharacters(undefined, 1).subscribe();
      return;
    }

    this.charactersService.getCharactersByGender(this.activeGender()).subscribe({
      error: (err) => {
        console.error('Error occurred while filtering by gender: ', err);
      },
    });
  }
}
