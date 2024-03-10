import { Component, OnInit } from '@angular/core';
import { VagaService } from '../services/vaga.service';
import { FormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { IVaga } from '../interfaces/vaga.interface';
import { DatePipe } from '@angular/common';
import { UsuarioService } from '../services/usuario.service';

@Component({
  selector: 'app-cadastro-vaga',
  templateUrl: './cadastro-vaga.component.html',
  styleUrls: ['./cadastro-vaga.component.css'],
})
export class CadastroVagaComponent implements OnInit {
  tipoVagas = [
    { name: 'Temporário', value: 1 },
    { name: 'Curta duração', value: 2 },
    { name: 'Sazonal', value: 3 },
  ];

  form: UntypedFormGroup;

  idEmpresa: any;

  constructor(
    private _vagaService: VagaService,
    private _formBuilder: FormBuilder,
    private _datePipe: DatePipe,
    private _usuario: UsuarioService
  ) {}

  ngOnInit(): void {
    const item = localStorage.getItem('user');
    this.idEmpresa = JSON.parse(item).idUsuario;

    this.form = this._formBuilder.group({
      nomeVaga: [null, [Validators.required]],
      descricao: [null, [Validators.required]],
      remuneracao: [null, [Validators.required]],
      endereco: [null, [Validators.required]],
      estado: [null, [Validators.required]],
      cidade: [null, [Validators.required]],
      tipoVaga: [null, [Validators.required]],
      dataExpiracao: [null, [Validators.required]],
    });
  }

  adicionarVaga() {
    const data = {
      Nome: this.form.get('nomeVaga').value as string,
      Descricao: this.form.get('descricao').value as string,
      Cidade: this.form.get('cidade').value as string,
      Endereco: this.form.get('endereco').value as string,
      Estado: this.form.get('estado').value as string,
      Remuneracao: this.form.get('remuneracao').value as string,
      TipoVaga: this.form.get('tipoVaga').value as string,
      Ativo: true,
      DataAtualizacao: this._datePipe.transform(new Date()),
      DataExpiracao: this._datePipe.transform(
        this.form.get('dataExpiracao').value
      ),
      IdEmpresa: this.idEmpresa,
    } as IVaga;
    this._vagaService.adicionarVaga(data).subscribe();
  }
}
