import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { CadastroComponent } from './cadastro/cadastro.component';
import { TrabalhadorComponent } from './trabalhador/trabalhador.component';

const routes: Routes = [
  { path: '', component: TrabalhadorComponent },
  { path: 'cadastro', component: CadastroComponent },
  { path: 'trabalhador/inicial', component: TrabalhadorComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
