import { Routes } from '@angular/router';
import { HomePage } from './pages/home-page/home-page';
import { Details } from './pages/details/details';

export const routes: Routes = [
    {path: '', component: HomePage},
    {path: 'details/:id', component: Details},
];
