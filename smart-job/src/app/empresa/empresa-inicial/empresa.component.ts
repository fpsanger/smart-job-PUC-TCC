import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IUsuario } from 'src/app/interfaces/usuario.interface';
import { IVaga } from 'src/app/interfaces/vaga.interface';
import { VagaService } from 'src/app/services/vaga.service';
import { AuthService } from '../../services/auth/auth.service';

@Component({
  selector: 'app-empresa',
  templateUrl: './empresa.component.html',
  styleUrls: ['./empresa.component.css'],
})
export class EmpresaComponent implements OnInit {
  vagas: IVaga[] = [];
  usuario: IUsuario;
  idEmpresa: number;

  constructor(
    private _vagaService: VagaService,
    private _router: Router,
    private _authService: AuthService
  ) {}

  ngOnInit(): void {
    const tokenData = this._authService.getTokenData();
    this.usuario = tokenData;

    this._vagaService.getVagasEmpresa(tokenData.id).subscribe((x) => {
      this.vagas = x;
    });
  }

  navigateToAdicionarVaga() {
    this._router.navigate(['vaga/cadastro-vaga']);
  }
}
