import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../auth.guard';
import { VagaComponent } from './detalhe-vaga/detalhe-vaga.component';
import { CadastroVagaComponent } from './cadastro-vaga/cadastro-vaga.component';

const routes: Routes = [
  {
    path: 'cadastro-vaga',
    component: CadastroVagaComponent,
    canActivate: [AuthGuard],
  },
  {
    path: ':id',
    component: VagaComponent,
    canActivate: [AuthGuard],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VagaRoutingModule {}
