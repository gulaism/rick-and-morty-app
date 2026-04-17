import { Component, Input, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Header } from "./header/header";
import { Characters } from "./characters/characters";
import { Search } from "./search/search";
import { Filters } from "./filters/filters";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Header, Characters, Search, Filters],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('rick-and-morty-app');
  @Input() data: any;
}
