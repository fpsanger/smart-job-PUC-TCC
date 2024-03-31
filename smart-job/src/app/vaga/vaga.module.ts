import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { VagaRoutingModule } from './vaga-routing.module';
import { CadastroVagaComponent } from './cadastro-vaga/cadastro-vaga.component';
import { VagaComponent } from './detalhe-vaga/detalhe-vaga.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [VagaComponent, CadastroVagaComponent],
  imports: [CommonModule, VagaRoutingModule, SharedModule],
})
export class VagaModule {}
