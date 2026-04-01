import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Header } from "./header/header";
import { Characters } from "./characters/characters";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Header, Characters],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('rick-and-morty-app');
}
