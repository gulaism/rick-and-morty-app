import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CharactersService {
  private apiUrl = 'https://rickandmortyapi.com/api/character';

  constructor(private http: HttpClient) { }


  getCharacters(changedUrl?: string) {
    const url = changedUrl || this.apiUrl;
    return this.http.get<any>(`${url}`).pipe(
      map(res => ({
        total: res.info.count,
        characters: res.results,
        info: res.info,
      }))
    );
  }
}
