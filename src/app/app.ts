import { Component, Input, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Header } from "./header/header";
import { Characters } from "./characters/characters";
import { Search } from "./search/search";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Header, Characters, Search],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('rick-and-morty-app');
  @Input() data: any;
}
