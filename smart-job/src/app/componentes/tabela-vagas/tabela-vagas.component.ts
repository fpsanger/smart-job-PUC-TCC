import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';
import { IUsuario } from 'src/app/interfaces/usuario.interface';
import { IVaga } from 'src/app/interfaces/vaga.interface';

@Component({
  selector: 'app-tabela-vagas',
  templateUrl: './tabela-vagas.component.html',
  styleUrls: ['./tabela-vagas.component.css'],
})
export class TabelaVagasComponent implements OnChanges {
  @Input() vagas: IVaga[];

  usuario: IUsuario;

  eventoOptions: string[] = [];
  localizacaoOptions: string[] = [];
  dataExpiracaoOptions: string[] = [];
  valorOptions: string[] = [];

  constructor(private _router: Router) {}

  ngOnChanges(changes: SimpleChanges) {
    if (changes['vagas'].currentValue?.length > 0) {
      this.eventoOptions = [...new Set(this.vagas.map((x) => x.Nome))];
      this.localizacaoOptions = [...new Set(this.vagas.map((x) => x.Cidade))];
      this.valorOptions = [
        ...new Set(this.vagas.map((x) => x.Remuneracao.toString())),
      ];
      this.dataExpiracaoOptions = [
        ...new Set(this.vagas.map((x) => x.DataExpiracao)),
      ];
    }
  }

  navigateToDetalhesVaga(vagaId: number) {
    this._router.navigate(['/vaga', vagaId]);
  }
}
