import { Component, OnInit } from '@angular/core';
import { IVaga } from '../interfaces/vaga.interface';
import { VagaService } from '../services/vaga.service';

@Component({
  selector: 'app-vaga-list-empresa',
  templateUrl: './vaga-list-empresa.component.html',
  styleUrls: ['./vaga-list-empresa.component.css'],
})
export class VagaListEmpresaComponent implements OnInit {
  vagas: IVaga[] = [];

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

    this._vagaService.getVagasEmpresa(8).subscribe((x) => {
      this.vagas = x;
    });
  }
}
