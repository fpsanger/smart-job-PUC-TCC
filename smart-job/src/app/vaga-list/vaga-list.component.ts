import { Component, OnInit } from '@angular/core';
import { VagaService } from '../services/vaga.service';
import { IVaga } from '../interfaces/vaga.interface';
import { TrabalhadorVagaStatus } from '../enum/trabalhador-vaga-status.enum';

@Component({
  selector: 'app-vaga-list',
  templateUrl: './vaga-list.component.html',
  styleUrls: ['./vaga-list.component.css'],
})
export class VagaListComponent implements OnInit {
  vagas: IVaga[] = [];

  idTrabalhador: number;

  status: typeof TrabalhadorVagaStatus = TrabalhadorVagaStatus;

  responsiveOptions;

  constructor(private _vagaService: VagaService) {}

  ngOnInit(): void {
    this.responsiveOptions = [
      {
        breakpoint: '1024px',
        numVisible: 3,
        numScroll: 3,
      },
      {
        breakpoint: '768px',
        numVisible: 2,
        numScroll: 2,
      },
      {
        breakpoint: '560px',
        numVisible: 1,
        numScroll: 1,
      },
    ];

    const item = localStorage.getItem('user');
    this.idTrabalhador = JSON.parse(item).idUsuario;

    this._vagaService.getVagasTrabalhador(this.idTrabalhador).subscribe((x) => {
      this.vagas = x;
    });
  }
}
