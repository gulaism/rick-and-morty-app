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
    this.charactersService.getCharacters(1).subscribe(response => {
      console.log(response);
      this.data = response;
    })
  }
}
