import { Pipe, PipeTransform } from '@angular/core';
import { VagaStatus } from '../enum/vaga-status.enum';
import { TrabalhadorVagaStatus } from '../enum/trabalhador-vaga-status.enum';

@Pipe({ name: 'trabalhadorStatus' })
export class TrabalhadorStatusPipe implements PipeTransform {
  constructor() {}

  transform(value: number): string {
    switch (value) {
      case TrabalhadorVagaStatus.Analise:
        return 'Em análise';
      case TrabalhadorVagaStatus.Pendente:
        return 'Pendente';
      case TrabalhadorVagaStatus.Aprovado:
        return 'Aprovado';
      default:
        return '';
    }
  }
}

@Pipe({ name: 'vagaStatus' })
export class StatusPipe implements PipeTransform {
  constructor() {}

  transform(value: number): string {
    switch (value) {
      case VagaStatus.Aberto:
        return 'Em aberto';
      case VagaStatus.Fechado:
        return 'Fechada';
      case VagaStatus.Finalizado:
        return 'Finalizada';
      default:
        return '';
    }
  }
}
