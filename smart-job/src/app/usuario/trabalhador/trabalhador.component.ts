import { Component, OnInit } from '@angular/core';
import { VagaService } from '../../services/vaga.service';
import { IVaga } from '../../interfaces/vaga.interface';
import { IUsuario } from '../../interfaces/usuario.interface';
import { UsuarioService } from 'src/app/services/usuario.service';

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
    private _usuario: UsuarioService
  ) {}

  ngOnInit(): void {
    const item = localStorage.getItem('user');
    this.idTrabalhador = JSON.parse(item).idUsuario;

    this._vagaService.getVagasAtivas().subscribe((x) => {
      this.vagas = x;
    });

    this._usuario.getTrabalhador(this.idTrabalhador).subscribe((x) => {
      this.usuario = x;
    });
  }
}
