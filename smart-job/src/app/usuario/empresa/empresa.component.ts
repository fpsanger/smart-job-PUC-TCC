import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IUsuario } from 'src/app/interfaces/usuario.interface';
import { IVaga } from 'src/app/interfaces/vaga.interface';
import { UsuarioService } from 'src/app/services/usuario.service';
import { VagaService } from 'src/app/services/vaga.service';

@Component({
  selector: 'app-empresa',
  templateUrl: './empresa.component.html',
  styleUrls: ['./empresa.component.css'],
})
export class EmpresaComponent implements OnInit {
  vagas: IVaga[] = [];
  usuario: IUsuario;

  constructor(
    private _vagaService: VagaService,
    private _router: Router,
    private _usuario: UsuarioService
  ) {}

  ngOnInit(): void {
    this._vagaService.getVagasEmpresa(8).subscribe((x) => {
      this.vagas = x;
    });

    const userDocNumber = localStorage.getItem('user');

    this._usuario.getEmpresa(userDocNumber).subscribe((x) => {
      this.usuario = x;
    });
  }

  navigateToAdicionarVaga() {
    this._router.navigate(['cadastro-vaga']);
  }
}
