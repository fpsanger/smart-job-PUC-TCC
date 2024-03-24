import { Component, OnInit } from '@angular/core';
import { MenuItem, MessageService } from 'primeng/api';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmationService } from 'primeng/api';
import { ITrabalhadorVaga } from 'src/app/interfaces/trabalhador-vaga';
import { IVaga } from 'src/app/interfaces/vaga.interface';
import { VagaService } from 'src/app/services/vaga.service';
import { filter } from 'rxjs';
import { VagaStatus } from 'src/app/enum/vaga-status.enum';

@Component({
  selector: 'app-detalhe-vaga',
  templateUrl: './detalhe-vaga.component.html',
  styleUrls: ['./detalhe-vaga.component.css'],
})
export class VagaComponent implements OnInit {
  vaga: IVaga;

  idVaga: number;
  idUsuario: number;

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
    private _confirmationService: ConfirmationService
  ) {}

  ngOnInit(): void {
    this.idVaga = this._activatedRoute.snapshot.params['id'];

    const item = localStorage.getItem('user');
    this.idUsuario = JSON.parse(item)?.idUsuario;
    this.isTrabalhador = JSON.parse(item)?.isTrabalhador;

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
      error: (err) =>
        this._messageService.add({
          severity: 'error',
          summary: 'Erro',
          detail: 'Você já está atrubído a essa vaga!',
        }),
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
