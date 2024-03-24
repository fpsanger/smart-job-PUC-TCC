import { Component, OnInit } from '@angular/core';
import { VagaService } from '../services/vaga.service';
import { IVaga } from '../interfaces/vaga.interface';
import { IUsuario } from '../interfaces/usuario.interface';
import { UsuarioService } from 'src/app/services/usuario.service';
import { AuthService } from '../services/auth/auth.service';

@Component({
  selector: 'app-trabalhador',
  templateUrl: './trabalhador.component.html',
  styleUrls: ['./trabalhador.component.css'],
})
export class TrabalhadorComponent implements OnInit {
  vagas: IVaga[] = [];
  usuario: IUsuario;

  idTrabalhador: number;

  constructor(
    private _vagaService: VagaService,
    private _authService: AuthService
  ) {}

  ngOnInit(): void {
    const tokenData = this._authService.getTokenData();
    this.usuario = tokenData;

    this._vagaService.getVagasAtivas().subscribe((x) => {
      this.vagas = x;
    });
  }
}
