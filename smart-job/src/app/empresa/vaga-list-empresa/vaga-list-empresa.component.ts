import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { MenuItem, MessageService } from 'primeng/api';
import { forkJoin } from 'rxjs';
import { VagaStatus } from 'src/app/enum/vaga-status.enum';
import { IVaga } from 'src/app/interfaces/vaga.interface';
import { AuthService } from 'src/app/services/auth/auth.service';
import { VagaService } from 'src/app/services/vaga.service';

@Component({
  selector: 'app-vaga-list-empresa',
  templateUrl: './vaga-list-empresa.component.html',
  styleUrls: ['./vaga-list-empresa.component.scss'],
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
    private _messageService: MessageService,
    private _authService: AuthService,
    private _cdRef: ChangeDetectorRef
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

    const tokenData = this._authService.getTokenData();
    this.idEmpresa = tokenData.id;

    this.setData();
  }

  showAlterarStatusDialog(idVaga: number) {
    this.mostrarModal = !this.mostrarModal;
    this.idVaga = idVaga;
  }

  async alterarStatus() {
    const data = { Status: this.valorStatus } as IVaga;

    await this._vagaService.alterarStatusVaga(this.idVaga, data).subscribe({
      next: () => {
        this._messageService.add({
          severity: 'success',
          summary: 'Sucesso',
          detail: 'Status alterado com sucesso',
        });
        this.mostrarModal = !this.mostrarModal;
      },
      error: (err) =>
        this._messageService.add({
          severity: 'error',
          summary: 'Erro',
          detail: err,
        }),
    });

    this.setData();
  }

  setData() {
    forkJoin([
      this._vagaService.getVagasEmpresa(this.idEmpresa),
      this._vagaService.getVagasEmpresaTrabalhador(this.idEmpresa),
    ]).subscribe(([vagasEmpresa, vagasEmpresaTrabalhador]) => {
      this.vagas = vagasEmpresa.map((vaga) => {
        const vagaTrabalhador = vagasEmpresaTrabalhador.find(
          (y) => y.Id === vaga.Id
        );
        return {
          ...vaga,
          totalParticipantes: vagaTrabalhador
            ? vagaTrabalhador.ContagemTrabalhadores
            : 0,
          remuneracaoTotal: vagaTrabalhador
            ? vagaTrabalhador.RemuneracaoTotal
            : 0,
        };
      });
      this._cdRef.detectChanges();
    });
  }
}
