import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { VagaService } from '../../services/vaga.service';
import { IVaga } from '../../interfaces/vaga.interface';
import { TrabalhadorVagaStatus } from '../../enum/trabalhador-vaga-status.enum';
import { ConfirmationService, MenuItem, MessageService } from 'primeng/api';
import { VagaStatus } from 'src/app/enum/vaga-status.enum';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-vaga-list',
  templateUrl: './vaga-list.component.html',
  styleUrls: ['./vaga-list.component.scss'],
})
export class VagaListComponent implements OnInit {
  vagas: IVaga[] = [];

  idTrabalhador: number;
  totalRemuneracao: number;

  status: typeof TrabalhadorVagaStatus = TrabalhadorVagaStatus;

  responsiveOptions;

  items: MenuItem[];
  home: MenuItem;

  constructor(
    private _vagaService: VagaService,
    private _confirmationService: ConfirmationService,
    private _messageService: MessageService,
    private _authService: AuthService,
    private _cdRef: ChangeDetectorRef
  ) {}

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

    this.items = [{ label: 'Suas vagas' }];
    this.home = { icon: 'pi pi-home', routerLink: '/trabalhador/inicial' };

    const tokenData = this._authService.getTokenData();
    this.idTrabalhador = tokenData.id;

    this.setData();
  }

  sairVaga(idVaga: number) {
    this._confirmationService.confirm({
      message: 'Tem certeza que quer sair dessa vaga?',
      accept: async () => {
        await this._vagaService.sairVaga(this.idTrabalhador, idVaga).subscribe({
          next: () =>
            this._messageService.add({
              severity: 'success',
              summary: 'Sucesso',
              detail: 'Vaga apagada com sucesso',
            }),
          error: (err) =>
            this._messageService.add({
              severity: 'error',
              summary: 'Erro',
              detail: err,
            }),
        });
        this.setData();
      },
    });
  }

  setData() {
    this._vagaService.getVagasTrabalhador(this.idTrabalhador).subscribe((x) => {
      this.vagas = x;
      this._cdRef.detectChanges();
      this.totalRemuneracao = this.vagas
        .filter((y) => y.Status === VagaStatus.Finalizado)
        .map((y) => y.Remuneracao)
        .reduce((acumulador, valorAtual) => acumulador + valorAtual, 0);
    });
  }
}
