import { Component, Input, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { PageHeader } from './components/home/page-header/page-header';
import { Characters } from './components/home/characters/characters';
import { Search } from './components/home/search/search';
import { Filters } from './components/home/filters/filters';
import { Header } from './components/layout/header/header';
import { Footer } from './components/layout/footer/footer';
import { HomePage } from "./pages/home-page/home-page";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Header, Footer],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  protected readonly title = signal('rick-and-morty-app');
  @Input() data: any;
}
