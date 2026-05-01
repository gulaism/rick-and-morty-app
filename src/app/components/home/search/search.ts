import { Component, inject, signal } from '@angular/core';
import { CharactersService } from '../../../services/characters';

@Component({
  selector: 'app-search',
  imports: [],
  templateUrl: './search.html',
  styleUrl: './search.scss',
})
export class Search {
  private charactersService = inject(CharactersService);
  searchedItem = signal<string>('');
  data = signal<any>;


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
