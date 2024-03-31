import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TrabalhadorRoutingModule } from './trabalhador-routing.module';
import { TrabalhadorComponent } from './trabalhador-inicial/trabalhador.component';
import { VagaListComponent } from './vaga-list/vaga-list.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [TrabalhadorComponent, VagaListComponent],
  imports: [CommonModule, TrabalhadorRoutingModule, SharedModule],
})
export class TrabalhadorModule {}
