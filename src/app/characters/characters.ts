import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { CharactersService } from '../characters';

@Component({
  selector: 'app-characters',
  templateUrl: './characters.html',
  styleUrl: './characters.scss',
})
export class Characters implements OnInit {
  data: any;
  isLoading = true;

  constructor(
    private charactersService: CharactersService,
    private cdr: ChangeDetectorRef,
  ) {}

  ngOnInit() {
    this.isLoading = true;
    this.charactersService.getCharacters().subscribe((response) => {
      this.data = response;
      console.log(response || 'No response');
      this.isLoading = false;
    });
  }

  onClickPreviousPage() {
    const previousPageUrl: string = this.data.info.prev;
    console.log(previousPageUrl);

    if(!previousPageUrl) return;

    this.charactersService.getCharacters(previousPageUrl).subscribe((response) => {
      this.data = response;
      console.log(this.data);
      this.isLoading = false;
      this.cdr.markForCheck();
    })
  }

  onClickNextPage() {
    const nextPageUrl: string = this.data.info.next;

    if (!nextPageUrl) return;

    this.charactersService.getCharacters(nextPageUrl).subscribe((response) => {
      this.data = response;
      console.log(this.data);
      this.isLoading = false;
      this.cdr.markForCheck();
    });
  }
}
