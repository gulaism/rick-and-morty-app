import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, map, Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CharactersService {
  private apiUrl = 'https://rickandmortyapi.com/api/character';
  private charactersSubject = new BehaviorSubject<any>(null);
  characters$ = this.charactersSubject.asObservable();

  constructor(private http: HttpClient) { }


  getCharacters(changedUrl?: string, page: number = 1) {
    const url = changedUrl ? changedUrl : page ? `${this.apiUrl}?page=${page}` : this.apiUrl;
    
    return this.http.get<any>(`${url}`).pipe(
      map((res) => {
        const formatted = {
          total: res.info.count,
          characters: res.results,
          info: res.info,
        };
        this.charactersSubject.next(formatted);

        return formatted;
      })
    );
  }


  getCharactersByName(characterName?: string) {
      const url = `${this.apiUrl}?name=${characterName}`;
      return this.http.get<any>(`${url}`).pipe(
        map(res => {
          const formatted = {
            total: res.info.count,
            characters: res.results,
            info: res.info,
          };
          this.charactersSubject.next(formatted);

          return formatted;
        }),

        catchError((error) => {
          if(error.status === 404) {
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
}
