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

  constructor(
    private _vagaService: VagaService,
    private _usuario: UsuarioService
  ) {}

  //! Criar chamada para pegar o user de acordo com o CPF/CNPJ

  ngOnInit(): void {
    this._vagaService.getVagasAtivas().subscribe((x) => {
      this.vagas = x;
    });

    const userDocNumber = localStorage.getItem('user');

    this._usuario.getTrabalhador(userDocNumber).subscribe((x) => {
      this.usuario = x;
    });
  }
}
