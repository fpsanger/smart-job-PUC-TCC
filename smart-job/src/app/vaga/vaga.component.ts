import { Component, OnInit } from '@angular/core';
import { VagaService } from '../services/vaga.service';
import { IVaga } from '../interfaces/vaga.interface';
import { MessageService } from 'primeng/api';
import { ITrabalhadorVaga } from '../interfaces/trabalhador-vaga';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-vaga',
  templateUrl: './vaga.component.html',
  styleUrls: ['./vaga.component.css'],
})
export class VagaComponent implements OnInit {
  vaga: IVaga;

  idVaga: number;
  idUsuario: number;

  isEmpresa: boolean;

  constructor(
    private _vagaService: VagaService,
    private _messageService: MessageService,
    private _router: Router,
    private _activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.idVaga = this._activatedRoute.snapshot.params['id'];

    const item = localStorage.getItem('user');
    this.idUsuario = JSON.parse(item).idUsuario;

    console.log(JSON.parse(item));

    if (JSON.parse(item).numeroDoc.length > 11) {
      this.isEmpresa = true;
    } else {
      this.isEmpresa = false;
    }

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
          detail: err,
        }),
    });
  }
}
