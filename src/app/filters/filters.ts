import { Component } from '@angular/core';
import { CharactersService } from '../services/characters';

@Component({
  selector: 'app-filters',
  imports: [],
  templateUrl: './filters.html',
  styleUrl: './filters.scss',
})
export class Filters {
  isFiltersOpen: boolean = false;
  activeFilter!: string;
  activeStatus!: string;

  constructor(private charactersService: CharactersService) {}

  toggleFilters() {
    this.isFiltersOpen = !this.isFiltersOpen;
    if(!this.isFiltersOpen) this.activeFilter = '';
  }

  setActiveFilter(filter: string) {
    this.activeFilter = filter;
  }

  filterByStatus(status: string) {
    this.activeStatus = status.toLowerCase();
    console.log('Active status: ', this.activeStatus);

    if(!this.activeStatus.trim()) {
      this.charactersService.currentStatusFilter = '';
      this.charactersService.getCharacters(undefined, 1);
      return;
    }

    this.charactersService.getCharactersByStatus(this.activeStatus).subscribe({
      error: (err) => {
        console.error('Error occurred while filtering by status: ', err);
      }
    });
  }

}
