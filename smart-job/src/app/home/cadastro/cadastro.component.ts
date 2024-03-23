import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  UntypedFormBuilder,
  Validators,
} from '@angular/forms';
import { NumeroDocumentoValidator } from '../../validators/numero-documento.validator';
import { CadastroService } from '../../services/cadastro.service';
import { MessageService } from 'primeng/api';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.css'],
})
export class CadastroComponent implements OnInit {
  form: FormGroup;

  tipoUsuario: string = null;

  constructor(
    private _formBuilder: UntypedFormBuilder,
    private _cadastroService: CadastroService,
    private _messageService: MessageService,
    private _router: Router
  ) {}

  ngOnInit(): void {
    this.form = this._formBuilder.group({
      nome: [null, [Validators.required]],
      email: [null, [Validators.required]],
      cpf: [
        '',
        [
          Validators.required,
          Validators.minLength(11),
          NumeroDocumentoValidator(),
        ],
      ],
      cnpj: [
        '',
        [
          Validators.required,
          Validators.minLength(14),
          NumeroDocumentoValidator(),
        ],
      ],
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
      error: (err) => {
        this._messageService.add({
          severity: 'error',
          summary: 'Erro',
          detail: err.error.mensagem,
        });
      },
    });
  }

  setValidators() {
    if (this.tipoUsuario == 'cpf') {
      this.form.get('cnpj').removeValidators([Validators.required]);
      this.form.get('cnpj').setValue('');
    } else {
      this.form.get('cpf').removeValidators([Validators.required]);
      this.form.get('cpf').setValue('');
    }
    this.form.get('cpf').updateValueAndValidity();
    this.form.get('cnpj').updateValueAndValidity();
  }

  navigateToLogin() {
    this._router.navigate(['login']);
  }
}
