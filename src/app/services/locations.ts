import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

export interface Locations {
  info: {
    count: number;
  };
}

@Injectable({
  providedIn: 'root',
})
export class LocationsService {
  private apiUrl = 'https://rickandmortyapi.com/api/location';
  private http = inject(HttpClient);

  getAllLocations() {
    return this.http.get<Locations>(this.apiUrl);
  }
}
