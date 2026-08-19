import { Routes } from '@angular/router';

import { AtletaComponent } from './component/atleta-component/atleta-component';
import { CorridaComponent } from './component/corrida-component/corrida-component';
import { HomeComponent } from './component/home-component/home-component';
import { AtletaListComponent } from './component/atleta-list-component/atleta-list-component';

export const routes: Routes = [

  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full'
  },

  {
    path: 'home',
    component: HomeComponent
  },

  {
    path: 'cadastroAtleta',
    component: AtletaComponent
  },

  {
    path: 'cadastroAtleta/:id',
    component: AtletaComponent
  },

  {
    path: 'listaAtleta',
    component: AtletaListComponent
  },

  {
    path: 'cadastroCorrida',
    component: CorridaComponent
  }

];