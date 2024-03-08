import { Component, OnInit } from '@angular/core';
import { VagaService } from '../../services/vaga.service';
import { IVaga } from '../../interfaces/vaga.interface';
import { DatePipe } from '@angular/common';
import { LoginService } from '../../services/login.service';
import { IUsuario } from '../../interfaces/usuario.interface';

@Component({
  selector: 'app-trabalhador',
  templateUrl: './trabalhador.component.html',
  styleUrls: ['./trabalhador.component.css'],
})
export class TrabalhadorComponent implements OnInit {
  vagas: IVaga[] = [];
  usuario: IUsuario;

  constructor(
    private _vagaService: VagaService,
    private _loginService: LoginService
  ) {}

  ngOnInit(): void {
    this._vagaService.getVagasTrabalhador(1).subscribe((x) => {
      this.vagas = x;
    });

    const userDocNumber = localStorage.getItem('user');
    console.log(userDocNumber);
  }
}
