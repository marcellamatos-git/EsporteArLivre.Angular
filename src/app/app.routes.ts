import { Routes } from '@angular/router';
import { AtletaComponent } from './component/atleta-component/atleta-component';
import { CorridaComponent } from './component/corrida-component/corrida-component';

export const routes: Routes = [
  { path: '', redirectTo: '/cadastroAtleta', pathMatch: 'full' },
  { path: 'cadastroAtleta', component: AtletaComponent },
  { path: 'cadastroCorrida', component: CorridaComponent }
];