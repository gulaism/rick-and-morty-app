import { Component, DestroyRef, effect, inject, input, Input, signal } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Character, CharactersService } from '../../services/characters';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-details',
  imports: [RouterLink],
  templateUrl: './details.html',
  styleUrl: './details.scss',
})
export class Details {
  private route = inject(ActivatedRoute);
  private charactersService = inject(CharactersService);
  private destroyRef = inject(DestroyRef);
  chosenCharacter = signal<Character | null>(null);
  id = signal<string>('');

  

  ngOnInit() {
    this.route.params
    .pipe(takeUntilDestroyed(this.destroyRef))
    .subscribe(params => {
      this.id.set(params['id']);
      console.log('Id from route: ', this.id());
      this.charactersService.getOneCharacter(Number(this.id())).subscribe((response) => {
        this.chosenCharacter.set(response);
        console.log('Chosen character: ', this.chosenCharacter());
      })
    })

  }


}
