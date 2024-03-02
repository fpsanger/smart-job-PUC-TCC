import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  UntypedFormBuilder,
  Validators,
} from '@angular/forms';
import { NumeroDocumentoValidator } from '../validators/numero-documento.validator';
import { CadastroService } from '../services/cadastro.service';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.css'],
})
export class CadastroComponent implements OnInit {
  form: FormGroup;

  constructor(
    private _formBuilder: UntypedFormBuilder,
    private _cadastroService: CadastroService
  ) {}

  ngOnInit(): void {
    this.form = this._formBuilder.group({
      nome: [null, [Validators.required]],
      email: [null, [Validators.required]],
      cpf: ['', [NumeroDocumentoValidator()]],
      cnpj: ['', [NumeroDocumentoValidator()]],
      telefone: [null, [Validators.required]],
      senha: [null, [Validators.required]],
    });
  }

  submitForm() {
    console.log(this.form.value);
    const data = { ...this.form.value, ativo: true };
    this._cadastroService.postUsuario(data).subscribe((x) => {
      console.log(x);
    });
  }
}
