import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../auth.guard';
import { EmpresaComponent } from './empresa-inicial/empresa.component';
import { VagaListEmpresaComponent } from './vaga-list-empresa/vaga-list-empresa.component';

const routes: Routes = [
  {
    path: 'inicial',
    component: EmpresaComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'suas-vagas',
    component: VagaListEmpresaComponent,
    canActivate: [AuthGuard],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EmpresaRoutingModule {}
