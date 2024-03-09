import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { CadastroComponent } from './cadastro/cadastro.component';
import { TrabalhadorComponent } from './usuario/trabalhador/trabalhador.component';
import { LoginComponent } from './login/login.component';
import { VagaComponent } from './vaga/vaga.component';
import { VagaListComponent } from './vaga-list/vaga-list.component';
import { CadastroVagaComponent } from './cadastro-vaga/cadastro-vaga.component';
import { AuthGuard } from './auth.guard';
import { RedefinirSenhaComponent } from './redefinir-senha/redefinir-senha.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { EmpresaComponent } from './usuario/empresa/empresa.component';
import { VagaListEmpresaComponent } from './vaga-list-empresa/vaga-list-empresa.component';

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
