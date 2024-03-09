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

  totalParticipantes: number;

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

    this._vagaService.getVagasTrabalhador(10).subscribe((x) => {
      this.vagas = x;
    });
  }
}
