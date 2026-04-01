import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CharactersService {
  private apiUrl = 'https://rickandmortyapi.com/api/character';

  constructor(private http: HttpClient) { }


  getCharacters(pageIndex: number) {
    return this.http.get<any>(`${this.apiUrl}?page=${pageIndex}`).pipe(
      map(res => ({
        total: res.info.count,
        characters: res.results.slice(0, 6)
      }))
    );
  }
}
