import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  UntypedFormBuilder,
  Validators,
} from '@angular/forms';
import { NumeroDocumentoValidator } from '../validators/numero-documento.validator';
import { CadastroService } from '../services/cadastro.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.css'],
})
export class CadastroComponent implements OnInit {
  form: FormGroup;

  tipoUsuario: string;

  constructor(
    private _formBuilder: UntypedFormBuilder,
    private _cadastroService: CadastroService,
    private _messageService: MessageService
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
    const data = { ...this.form.value, ativo: true };
    this._cadastroService.postUsuario(data).subscribe({
      next: () =>
        this._messageService.add({
          severity: 'success',
          summary: 'Sucesso',
          detail: 'Usuário adicionado com sucesso',
        }),
      error: (err) =>
        this._messageService.add({
          severity: 'error',
          summary: 'Erro',
          detail: err,
        }),
    });
  }
}