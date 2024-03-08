import { Component, OnInit } from '@angular/core';
import { VagaService } from '../services/vaga.service';
import { FormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { IVaga } from '../interfaces/vaga.interface';
import { DatePipe } from '@angular/common';

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

  constructor(
    private _vagaService: VagaService,
    private _formBuilder: FormBuilder,
    private _datePipe: DatePipe
  ) {}

  ngOnInit(): void {
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
      ...this.form.value,
      Ativo: true,
      DataAtualizacao: this._datePipe.transform(new Date()),
      DataExpiracao: this._datePipe.transform(
        this.form.get('dataExpiracao').value
      ),
      IdEmpresa: 8,
    } as IVaga;
    this._vagaService.adicionarVaga(data).subscribe();
  }
}
