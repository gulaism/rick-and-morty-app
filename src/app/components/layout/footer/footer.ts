import { Component, DestroyRef, inject, signal } from '@angular/core';
import { CharactersResponse, CharactersService } from '../../../services/characters';
import { LocationsService } from '../../../services/locations';
import { EpisodesService } from '../../../services/episodes';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.html',
  styleUrl: './footer.scss',
})
export class Footer {
  private charactersService = inject(CharactersService);
  private locationsService = inject(LocationsService);
  private episodesService = inject(EpisodesService);
  charsNum = signal(0);
  locNum = signal(0);
  epNum = signal(0);
  private destroyRef = inject(DestroyRef);


  ngOnInit(): void {
    this.charactersService.characters$
    .pipe(takeUntilDestroyed(this.destroyRef))
    .subscribe((response: CharactersResponse | null) => {
      this.charsNum.set(response?.total ?? 0);
    });
    this.locationsService.getAllLocations().subscribe((response) => {
      this.locNum.set(response?.info?.count);
    });
    this.episodesService.getAllEpisodes().subscribe((response) => {
      this.epNum.set(response?.info?.count);
    });
  }
}
