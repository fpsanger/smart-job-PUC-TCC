import { Component, OnInit } from '@angular/core';
import { FormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { AuthService } from '../services/auth/auth.service';
import { Router } from '@angular/router';

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
    private _router: Router
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
      .subscribe((x) => {
        this._router.navigate(['trabalhador/inicial']);
      });
  }

  navigateRedefinirSenha() {
    this._router.navigate(['redefinir-senha']);
  }
}
