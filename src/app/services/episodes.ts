import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

export interface Episodes {
  info: {
    count: number;
  };
}

@Injectable({
  providedIn: 'root',
})
export class EpisodesService {
  private apiUrl = 'https://rickandmortyapi.com/api/episode';
  private http = inject(HttpClient);

  getAllEpisodes() {
    return this.http.get<Episodes>(this.apiUrl);
  }
}
