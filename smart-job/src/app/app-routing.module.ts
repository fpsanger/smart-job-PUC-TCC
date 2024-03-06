import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { CadastroComponent } from './cadastro/cadastro.component';
import { TrabalhadorComponent } from './trabalhador/trabalhador.component';
import { LoginComponent } from './login/login.component';
import { VagaComponent } from './vaga/vaga.component';
import { VagaListComponent } from './vaga-list/vaga-list.component';
import { CadastroVagaComponent } from './cadastro-vaga/cadastro-vaga.component';
import { AuthGuard } from './auth.guard';
import { RedefinirSenhaComponent } from './redefinir-senha/redefinir-senha.component';

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
  { path: 'vaga/:id', component: VagaComponent, canActivate: [AuthGuard] },
  {
    path: 'suas-vagas',
    component: VagaListComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'cadastro-vaga',
    component: CadastroVagaComponent,
    canActivate: [AuthGuard],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
