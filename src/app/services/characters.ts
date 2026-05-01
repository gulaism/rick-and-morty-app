import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { BehaviorSubject, catchError, map, Observable, of } from 'rxjs';

export interface Character {
  "id": number,
  "name": string,
  "status": string,
  "species": string,
  "type": string,
  "gender": string,
  "origin": {
    "name": string,
  },
  "location": {
    "name": string,
  },
  "image": string,
  "episode": string[],
}

export interface CharactersResponse {
  "total": number,
  "characters": Character[],
  "info": {
    "count": number,
    "pages": number,
    "next": string,
    "prev": string,
  },
}

@Injectable({
  providedIn: 'root',
})
export class CharactersService {
  private http = inject(HttpClient);
  private apiUrl = 'https://rickandmortyapi.com/api/character';
  private charactersSubject = new BehaviorSubject<CharactersResponse | null>(null);
  characters$ = this.charactersSubject.asObservable();
  currentSearchTerm = signal<string>('');
  currentStatusFilter = signal<string>('');
  currentGenderFilter = signal<string>('');


  getCharacters(urlOrName?: string, page?: number) {
    let url: string;

    if(urlOrName?.startsWith('http')) {
      url = urlOrName;
    } else {
      const params: string[] = [];
      if(this.currentSearchTerm()) params.push(`name=${this.currentSearchTerm()}`);
      if(this.currentStatusFilter()) params.push(`status=${this.currentStatusFilter()}`);
      if(this.currentGenderFilter()) params.push(`gender=${this.currentGenderFilter()}`);
      if(page) params.push(`page=${page}`);
      url = params.length ? `${this.apiUrl}?${params.join('&')}` : this.apiUrl;
    }


    return this.http.get<any>(url).pipe(
      map((res): CharactersResponse => {
        const formatted: CharactersResponse = {
          total: res.info.count,
          characters: res.results,
          info: res.info,
        };
        this.charactersSubject.next(formatted);

        return formatted;
      }),
      catchError((error) => {
        if(error.status === 400 || error.status === 404) {
          const emptyResult: CharactersResponse = {
            total: 0,
            characters: [],
            info: {count: 0, pages: 0, next: '', prev: ''},
          };
          this.charactersSubject.next(emptyResult);
          return of(emptyResult);
        }
        throw error;
      })

    );
  }

  getCharactersByName(characterName: string) {
    this.currentSearchTerm.set(characterName);
    return this.getCharacters(undefined, 1);
  }

  getCharactersByStatus(status: string) {
    console.log('Filtering by status: ', status);
    this.currentStatusFilter.set(status);
    return this.getCharacters(undefined, 1);
  }

  getCharactersByGender(gender: string) {
    console.log('active gender is: ', gender);
    this.currentGenderFilter.set(gender);
    return this.getCharacters(undefined, 1);
  }

  getOneCharacter(characterId: number) {
    return this.http.get<Character>(`${this.apiUrl}/${characterId}`);
  }

}
