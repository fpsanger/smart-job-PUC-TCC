import { Component, OnInit } from '@angular/core';
import { MenuItem, MessageService } from 'primeng/api';
import { VagaStatus } from 'src/app/enum/vaga-status.enum';
import { IVaga } from 'src/app/interfaces/vaga.interface';
import { VagaService } from 'src/app/services/vaga.service';

@Component({
  selector: 'app-vaga-list-empresa',
  templateUrl: './vaga-list-empresa.component.html',
  styleUrls: ['./vaga-list-empresa.component.css'],
})
export class VagaListEmpresaComponent implements OnInit {
  vagas: IVaga[] = [];

  status: typeof VagaStatus = VagaStatus;

  idEmpresa: number;
  idVaga: number;
  mostrarModal: boolean = false;

  responsiveOptions;

  items: MenuItem[];
  home: MenuItem;

  statusOptions: any[];

  valorStatus: number;

  statuses = Object.entries(VagaStatus);

  constructor(
    private _vagaService: VagaService,
    private _messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.statusOptions = this.statuses
      .map(([label, value]) => ({
        label: label,
        value: value,
      }))
      .slice(3, 6);

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

    this.items = [{ label: 'Situação das vagas' }];

    this.home = { icon: 'pi pi-home', routerLink: '/empresa/inicial' };

    const item = localStorage.getItem('user');
    this.idEmpresa = JSON.parse(item).idUsuario;

    this._vagaService.getVagasEmpresa(this.idEmpresa).subscribe((x) => {
      this.vagas = x;
    });

    this._vagaService
      .getVagasEmpresaTrabalhador(this.idEmpresa)
      .subscribe((x) => {
        console.log(x);
        this.vagas = this.vagas.map((vaga) => ({
          ...vaga,
          totalParticipantes: x.find((y) => y.Id === vaga.Id)
            .ContagemTrabalhadores,
          remuneracaoTotal: x.find((y) => y.Id === vaga.Id).RemuneracaoTotal,
        }));
      });
  }

  showAlterarStatusDialog(idVaga: number) {
    this.mostrarModal = !this.mostrarModal;
    this.idVaga = idVaga;
  }

  alterarStatus() {
    const data = { Status: this.valorStatus } as IVaga;

    this._vagaService.alterarStatusVaga(this.idVaga, data).subscribe({
      next: () =>
        this._messageService.add({
          severity: 'success',
          summary: 'Sucesso',
          detail: 'Status alterado com sucesso',
        }),
      error: (err) =>
        this._messageService.add({
          severity: 'error',
          summary: 'Erro',
          detail: err,
        }),
    });
  }

  refresh() {
    this._vagaService.getVagasEmpresa(this.idEmpresa).subscribe((x) => {
      this.vagas = x;
    });
  }
}
