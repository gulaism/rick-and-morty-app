import { Component, OnInit } from '@angular/core';
import { CharactersService } from '../characters';

@Component({
  selector: 'app-characters',
  templateUrl: './characters.html',
  styleUrl: './characters.scss',
})
export class Characters implements OnInit {
  data: any;

  constructor(private charactersService: CharactersService) { }

  ngOnInit() {
    this.charactersService.getCharacters().subscribe(response => {
      this.data = response;
      console.log(response || 'No response');
    })
  }

  onClickNextPage() {
      const nextPageUrl: string = this.data.info.next;

      if (!nextPageUrl) return;

      this.charactersService.getCharacters(nextPageUrl).subscribe(response => {
        this.data = response;
      });
  }

}
