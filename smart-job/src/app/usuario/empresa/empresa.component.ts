import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IUsuario } from 'src/app/interfaces/usuario.interface';
import { IVaga } from 'src/app/interfaces/vaga.interface';
import { VagaService } from 'src/app/services/vaga.service';

@Component({
  selector: 'app-empresa',
  templateUrl: './empresa.component.html',
  styleUrls: ['./empresa.component.css'],
})
export class EmpresaComponent implements OnInit {
  vagas: IVaga[] = [];
  usuario: IUsuario;

  constructor(private _vagaService: VagaService, private _router: Router) {}

  ngOnInit(): void {
    this._vagaService.getVagasEmpresa(1).subscribe((x) => {
      this.vagas = x;
      console.log(this.vagas);
    });

    const userDocNumber = localStorage.getItem('user');
    console.log(userDocNumber);
  }

  navigateToAdicionarVaga() {
    this._router.navigate(['cadastro-vaga']);
  }
}
