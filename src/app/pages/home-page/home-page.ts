import { Component } from '@angular/core';
import { PageHeader } from "../../components/home/page-header/page-header";
import { Search } from "../../components/home/search/search";
import { Filters } from "../../components/home/filters/filters";
import { Characters } from "../../components/home/characters/characters";

@Component({
  selector: 'app-home-page',
  imports: [PageHeader, Search, Filters, Characters],
  templateUrl: './home-page.html',
  styleUrl: './home-page.scss',
})
export class HomePage {}
