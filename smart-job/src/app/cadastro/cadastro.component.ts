import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  UntypedFormBuilder,
  Validators,
} from '@angular/forms';
import { NumeroDocumentoValidator } from '../validators/numero-documento.validator';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.css'],
})
export class CadastroComponent implements OnInit {
  form: FormGroup;

  constructor(private _formBuilder: UntypedFormBuilder) {}

  ngOnInit(): void {
    this.form = this._formBuilder.group({
      nome: [null, [Validators.required]],
      email: [null, [Validators.required]],
      cpf: ['', [Validators.required, NumeroDocumentoValidator()]],
      cnpj: ['', [Validators.required, NumeroDocumentoValidator()]],
      telefone: [null, [Validators.required]],
      senha: [null, [Validators.required]],
    });
  }

  submitForm() {}
}
