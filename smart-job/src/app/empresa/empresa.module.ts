import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmpresaRoutingModule } from './empresa-routing.module';
import { SharedModule } from '../shared/shared.module';
import { EmpresaComponent } from './empresa-inicial/empresa.component';
import { VagaListEmpresaComponent } from './vaga-list-empresa/vaga-list-empresa.component';

@NgModule({
  declarations: [EmpresaComponent, VagaListEmpresaComponent],
  imports: [CommonModule, EmpresaRoutingModule, SharedModule],
})
export class EmpresaModule {}
