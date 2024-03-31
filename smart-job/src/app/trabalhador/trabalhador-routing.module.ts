import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../auth.guard';
import { TrabalhadorComponent } from './trabalhador-inicial/trabalhador.component';
import { VagaListComponent } from './vaga-list/vaga-list.component';

const routes: Routes = [
  {
    path: 'inicial',
    component: TrabalhadorComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'suas-vagas',
    component: VagaListComponent,
    canActivate: [AuthGuard],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TrabalhadorRoutingModule {}
