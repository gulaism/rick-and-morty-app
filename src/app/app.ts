import { Component, Input, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { PageHeader } from './pages/mainPage/page-header/page-header';
import { Characters } from './pages/mainPage/characters/characters';
import { Search } from './pages/mainPage/search/search';
import { Filters } from './pages/mainPage/filters/filters';
import { Header } from "./components/header/header";
import { Footer } from "./components/footer/footer";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, PageHeader, Characters, Search, Filters, Header, Footer],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  protected readonly title = signal('rick-and-morty-app');
  @Input() data: any;
}
