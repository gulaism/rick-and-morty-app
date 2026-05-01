import { Component, signal } from '@angular/core';
import { CharactersService } from '../../../services/characters';

@Component({
  selector: 'app-search',
  imports: [],
  templateUrl: './search.html',
  styleUrl: './search.scss',
})
export class Search {
  searchedItem = signal<string>('');
  data = signal<any>;

  constructor(private charactersService: CharactersService) {}

  onSearchCharacter(event: any) {
    setTimeout(() => {
      this.searchedItem.set(event.target.value);
      console.log('Searched item: ', this.searchedItem());

      if (!this.searchedItem().trim()) {
        this.charactersService.currentSearchTerm.set('');
        this.charactersService.getCharacters(undefined, 1).subscribe();
        return;
      }

      this.charactersService.getCharactersByName(this.searchedItem()).subscribe({
        error: (err) => {
          console.error('Error occurred while searching:', err);
        },
      });
    });
  }
}
