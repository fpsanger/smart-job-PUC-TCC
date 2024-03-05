import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { CadastroComponent } from './cadastro/cadastro.component';
import { TrabalhadorComponent } from './trabalhador/trabalhador.component';
import { LoginComponent } from './login/login.component';
import { VagaComponent } from './vaga/vaga.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'cadastro', component: CadastroComponent },
  { path: 'login', component: LoginComponent },
  { path: 'trabalhador/inicial', component: TrabalhadorComponent },
  { path: 'vaga/:id', component: VagaComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
