import { Component, OnInit } from '@angular/core';
import { VagaService } from '../services/vaga.service';
import { IVaga } from '../interfaces/vaga.interface';
import { ValidatorFn } from '@angular/forms';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-trabalhador',
  templateUrl: './trabalhador.component.html',
  styleUrls: ['./trabalhador.component.css'],
})
export class TrabalhadorComponent implements OnInit {
  vagas: IVaga[] = [];

  eventoOptions: string[] = [];
  localizacaoOptions: string[] = [];
  dataExpiracaoOptions: string[] = [];
  valorOptions: string[] = [];

  constructor(private _vagaService: VagaService, private _datePipe: DatePipe) {}

  ngOnInit(): void {
    this._vagaService.getVagas().subscribe((x) => {
      this.vagas = x;

      this.eventoOptions = [...new Set(this.vagas.map((x) => x.Nome))];
      this.localizacaoOptions = [...new Set(this.vagas.map((x) => x.Cidade))];
      this.valorOptions = [...new Set(this.vagas.map((x) => x.Remuneracao))];
      this.dataExpiracaoOptions = [
        ...new Set(
          this.vagas.map((x) => this._datePipe.transform(x.DataExpiracao))
        ),
      ];
    });
  }
}
