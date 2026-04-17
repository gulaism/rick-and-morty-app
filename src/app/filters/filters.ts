import { Component } from '@angular/core';

@Component({
  selector: 'app-filters',
  imports: [],
  templateUrl: './filters.html',
  styleUrl: './filters.scss',
})
export class Filters {
  isFiltersOpen: boolean = false;
  activeFilter!: string;

  toggleFilters() {
    this.isFiltersOpen = !this.isFiltersOpen;
    if(!this.isFiltersOpen) this.activeFilter = '';
  }

  setActiveFilter(filter: string) {
    this.activeFilter = filter;
  }

}
