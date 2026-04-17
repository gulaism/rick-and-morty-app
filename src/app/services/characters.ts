import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
// import { error } from 'console';
import { BehaviorSubject, catchError, map, Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CharactersService {
  private apiUrl = 'https://rickandmortyapi.com/api/character';
  private charactersSubject = new BehaviorSubject<any>(null);
  characters$ = this.charactersSubject.asObservable();
  currentSearchTerm: string = '';
  currentStatusFilter: string = '';


  constructor(private http: HttpClient) { }


  getCharacters(urlOrName?: string, page?: number) {
    let url: string;

    if(urlOrName?.startsWith('http')) {
      url = urlOrName;
    } else {
      const params: string[] = [];
      if(this.currentSearchTerm) params.push(`name=${this.currentSearchTerm}`);
      if(this.currentStatusFilter) params.push(`status=${this.currentStatusFilter}`);
      if(page) params.push(`page=${page}`);
      url = params.length ? `${this.apiUrl}?${params.join('&')}` : this.apiUrl;
    }


    return this.http.get<any>(url).pipe(
      map((res) => {
        const formatted = {
          total: res.info.count,
          characters: res.results,
          info: res.info,
        };
        this.charactersSubject.next(formatted);

        return formatted;
      }),
      catchError((error) => {
        if(error.status === 400 || error.status === 404) {
          const emptyResult = {
            total: 0,
            characters: [],
            info: {count: 0, pages: 0},
          };
          this.charactersSubject.next(emptyResult);
          return of(emptyResult);
        }
        throw error;
      })

    );
  }

  getCharactersByName(characterName: string) {
    this.currentSearchTerm = characterName;
    return this.getCharacters(undefined, 1);
  }

  getCharactersByStatus(status: string) {
    console.log('Filtering by status: ', status);
    this.currentStatusFilter = status;
    return this.getCharacters(undefined, 1);
  }



}
