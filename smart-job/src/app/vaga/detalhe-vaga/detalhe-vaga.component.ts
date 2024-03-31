import { Component, OnInit } from '@angular/core';
import { MenuItem, MessageService } from 'primeng/api';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmationService } from 'primeng/api';
import { ITrabalhadorVaga } from 'src/app/interfaces/trabalhador-vaga';
import { IVaga } from 'src/app/interfaces/vaga.interface';
import { VagaService } from 'src/app/services/vaga.service';
import { VagaStatus } from 'src/app/enum/vaga-status.enum';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-detalhe-vaga',
  templateUrl: './detalhe-vaga.component.html',
  styleUrls: ['./detalhe-vaga.component.css'],
})
export class VagaComponent implements OnInit {
  vaga: IVaga;

  idVaga: number;
  idUsuario: number;
  usuario: any;

  isEmpresa: boolean;
  isTrabalhador: boolean;
  mostrarModal: boolean;
  isTrabalhadorHasVaga: boolean = false;

  items: MenuItem[];
  home: MenuItem;

  route: string;

  status: typeof VagaStatus = VagaStatus;

  constructor(
    private _vagaService: VagaService,
    private _messageService: MessageService,
    private _router: Router,
    private _activatedRoute: ActivatedRoute,
    private _confirmationService: ConfirmationService,
    private _authService: AuthService
  ) {}

  ngOnInit(): void {
    const tokenData = this._authService.getTokenData();

    this.idVaga = this._activatedRoute.snapshot.params['id'];
    this.idUsuario = tokenData.id;
    this.usuario = tokenData;
    this.isTrabalhador = tokenData.isTrabalhador;

    if (!this.isTrabalhador) {
      this.isEmpresa = true;
      this.route = 'empresa/inicial';
    } else {
      this.isEmpresa = false;
      this.route = 'trabalhador/inicial';
    }

    this.items = [{ label: 'Detalhe da vaga' }];

    this.home = {
      icon: 'pi pi-home',
      url: this.route,
      target: '_self',
    };

    this._vagaService.getVaga(this.idVaga).subscribe((x) => {
      this.vaga = x;
    });
  }

  registrarVaga() {
    const data = {
      idVaga: +this.idVaga,
      idTrabalhador: this.idUsuario,
      dataAceite: new Date(),
    } as ITrabalhadorVaga;

    this._vagaService.atribuirVaga(data).subscribe({
      next: () =>
        this._messageService.add({
          severity: 'success',
          summary: 'Sucesso',
          detail: 'Vaga atribuída com sucesso',
        }),
      error: (err) => {
        if (!err.error.mensagem) {
          this._messageService.add({
            severity: 'error',
            summary: 'Erro',
            detail: `Você já está atríbuido a essa vaga!`,
          });
        } else {
          this._messageService.add({
            severity: 'error',
            summary: 'Erro',
            detail: `${err.error.mensagem}`,
          });
        }
      },
    });
  }

  apagarVaga() {
    this._confirmationService.confirm({
      message: 'Tem certeza que quer apagar essa vaga?',
      accept: () => {
        this._vagaService.apagarVaga(this.idVaga).subscribe({
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
          complete: () => this._router.navigate(['/empresa/inicial']),
        });
      },
    });
  }

  showEditarVagaDialog() {
    this.mostrarModal = !this.mostrarModal;
  }

  refresh() {
    this.mostrarModal = !this.mostrarModal;

    this._vagaService.getVaga(this.idVaga).subscribe((x) => {
      this.vaga = x;
    });
  }
}
