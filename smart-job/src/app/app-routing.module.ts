import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { CadastroComponent } from './home/cadastro/cadastro.component';
import { LoginComponent } from './home/login/login.component';
import { RedefinirSenhaComponent } from './home/redefinir-senha/redefinir-senha.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

const routes: Routes = [
  {
    path: 'trabalhador',
    loadChildren: () =>
      import('./trabalhador/trabalhador.module').then(
        (m) => m.TrabalhadorModule
      ),
  },
  {
    path: 'vaga',
    loadChildren: () => import('./vaga/vaga.module').then((m) => m.VagaModule),
  },
  {
    path: 'empresa',
    loadChildren: () =>
      import('./empresa/empresa.module').then((m) => m.EmpresaModule),
  },
  { path: '', component: HomeComponent },
  { path: 'cadastro', component: CadastroComponent },
  { path: 'login', component: LoginComponent },
  { path: 'redefinir-senha', component: RedefinirSenhaComponent },
  { path: '**', component: PageNotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
