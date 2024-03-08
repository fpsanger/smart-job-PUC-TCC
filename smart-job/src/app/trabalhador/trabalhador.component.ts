import { Component, OnInit } from '@angular/core';
import { VagaService } from '../services/vaga.service';
import { IVaga } from '../interfaces/vaga.interface';
import { DatePipe } from '@angular/common';
import { Router } from '@angular/router';
import { LoginService } from '../services/login.service';
import { IUsuario } from '../interfaces/usuario.interface';

@Component({
  selector: 'app-trabalhador',
  templateUrl: './trabalhador.component.html',
  styleUrls: ['./trabalhador.component.css'],
})
export class TrabalhadorComponent implements OnInit {
  vagas: IVaga[] = [];
  usuario: IUsuario;

  eventoOptions: string[] = [];
  localizacaoOptions: string[] = [];
  dataExpiracaoOptions: Date[] = [];
  valorOptions: string[] = [];

  constructor(
    private _vagaService: VagaService,
    private _datePipe: DatePipe,
    private _router: Router,
    private _loginService: LoginService
  ) {}

  ngOnInit(): void {
    this._vagaService.getVagas().subscribe((x) => {
      this.vagas = x;

      this.eventoOptions = [...new Set(this.vagas.map((x) => x.Nome))];
      this.localizacaoOptions = [...new Set(this.vagas.map((x) => x.Cidade))];
      this.valorOptions = [...new Set(this.vagas.map((x) => x.Remuneracao))];
      this.dataExpiracaoOptions = [
        ...new Set(this.vagas.map((x) => x.DataExpiracao)),
      ];
    });

    const userDocNumber = localStorage.getItem('user');
    console.log(userDocNumber);
    if (userDocNumber.length == 11) {
      this._loginService.getTrabalhadores().subscribe((data) => {
        this.usuario = data.find((x) => x.CPF === userDocNumber);
      });
    } else {
      this._loginService.getEmpresas().subscribe((data) => {
        this.usuario = data.find((x) => x.CNPJ === userDocNumber);
        console.log(this.usuario);
      });
    }
  }

  navigateToDetalhesVaga(vagaId: number) {
    this._router.navigate(['/vaga', vagaId]);
  }
}
