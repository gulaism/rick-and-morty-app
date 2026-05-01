import { Component, DestroyRef, inject, signal } from '@angular/core';
import { CharactersService } from '../../../services/characters';
import { LocationsService } from '../../../services/locations';
import { EpisodesService } from '../../../services/episodes';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-footer',
  imports: [],
  templateUrl: './footer.html',
  styleUrl: './footer.scss',
})
export class Footer {
  charsNum = signal(0);
  locNum = signal(0);
  epNum = signal(0);
  private destroyRef = inject(DestroyRef);


  constructor(
    private charactersService: CharactersService,
    private locationsService: LocationsService,
    private episodesService: EpisodesService,
  ) {}

  ngOnInit() {
    this.charactersService.characters$
    .pipe(takeUntilDestroyed(this.destroyRef))
    .subscribe((response) => {
      this.charsNum.set(response?.total);
    });
    this.locationsService.getAllLocations().subscribe((response) => {
      this.locNum.set(response?.info?.count);
    });
    this.episodesService.getAllEpisodes().subscribe((response) => {
      this.epNum.set(response?.info?.count);
    });
  }
}
