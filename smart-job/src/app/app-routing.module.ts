import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { CadastroComponent } from './home/cadastro/cadastro.component';
import { TrabalhadorComponent } from './trabalhador/pagina-inicial-trabalhador/trabalhador.component';
import { LoginComponent } from './home/login/login.component';
import { VagaListComponent } from './trabalhador/vaga-list/vaga-list.component';
import { AuthGuard } from './auth.guard';
import { RedefinirSenhaComponent } from './home/redefinir-senha/redefinir-senha.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { EmpresaComponent } from './empresa/pagina-inicial-empresa/empresa.component';
import { VagaListEmpresaComponent } from './empresa/vaga-list-empresa/vaga-list-empresa.component';
import { CadastroVagaComponent } from './vaga/cadastro-vaga/cadastro-vaga.component';
import { VagaComponent } from './vaga/detalhe-vagas/vaga.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'cadastro', component: CadastroComponent },
  { path: 'login', component: LoginComponent },
  { path: 'redefinir-senha', component: RedefinirSenhaComponent },
  {
    path: 'trabalhador/inicial',
    component: TrabalhadorComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'empresa/inicial',
    component: EmpresaComponent,
    canActivate: [AuthGuard],
  },
  { path: 'vaga/:id', component: VagaComponent, canActivate: [AuthGuard] },
  {
    path: 'trabalhador/suas-vagas',
    component: VagaListComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'empresa/suas-vagas',
    component: VagaListEmpresaComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'cadastro-vaga',
    component: CadastroVagaComponent,
    canActivate: [AuthGuard],
  },
  { path: '**', component: PageNotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
