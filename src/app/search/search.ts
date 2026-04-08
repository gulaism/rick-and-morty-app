import { Component } from '@angular/core';
import { CharactersService } from '../services/characters';
import { error } from 'console';

@Component({
  selector: 'app-search',
  imports: [],
  templateUrl: './search.html',
  styleUrl: './search.scss',
})
export class Search {
  searchedItem: string = '';
  data: any;

  constructor(private charactersService: CharactersService) {}

  onSearchCharacter(event: any) {
    setTimeout(() => {
      this.searchedItem = event.target.value;
      console.log('Searched item: ', this.searchedItem);
      this.charactersService.getCharactersByName(this.searchedItem).subscribe({
        next: (response) => {
          this.data = response;
          console.log(
            'Search response: ',
            this.data.foundCharactersByName || 'No characters found',
          );
          
        },
        error: (err) => {
          console.error('Error occurred while searching:', err);
        },
      });
    });
  }
}
