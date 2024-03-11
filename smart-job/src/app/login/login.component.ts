import { Component, OnInit } from '@angular/core';
import { FormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { AuthService } from '../services/auth/auth.service';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  form: UntypedFormGroup;
  isAuthenticated: boolean;

  constructor(
    private _formBuilder: FormBuilder,
    private _authService: AuthService,
    private _router: Router,
    private _messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.form = this._formBuilder.group({
      email: ['', [Validators.required]],
      senha: ['', [Validators.required]],
    });
  }

  login() {
    this._authService
      .login(this.form.get('email').value, this.form.get('senha').value)
      .subscribe({
        next: (value) => {
          localStorage.setItem('user', JSON.stringify(value.user));
          this._messageService.add({
            severity: 'success',
            summary: 'Sucesso',
            detail: 'Login feito com sucesso',
          });
          console.log(value);

          if (value.user.numeroDoc.length === 11) {
            this._router.navigate(['trabalhador/inicial']);
          } else {
            this._router.navigate(['empresa/inicial']);
          }
        },
        error: (err) => {
          console.log(err);
          this._messageService.add({
            severity: 'error',
            summary: 'Erro',
            detail: err.error.message,
          });
        },
      });
  }

  navigateToRedefinirSenha() {
    this._router.navigate(['redefinir-senha']);
  }

  navigateToCadastro() {
    this._router.navigate(['cadastro']);
  }
}
