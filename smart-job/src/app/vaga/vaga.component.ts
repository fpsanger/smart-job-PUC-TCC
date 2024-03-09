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

  vagaId: number;

  descricao: string;

  constructor(
    private _vagaService: VagaService,
    private _messageService: MessageService,
    private _router: Router,
    private _activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    //! adicionar responsividade
    this.vagaId = this._activatedRoute.snapshot.params['id'];

    this._vagaService.getVaga(11).subscribe((x) => {
      console.log(x);
      this.vaga = x;
      this.descricao = this.vaga.Remuneracao;
    });
  }

  registrarVaga() {
    const data = {
      idVaga: this.vagaId,
      idTrabalhador: 1, // usar cookies ou sessão para pegar o id
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
