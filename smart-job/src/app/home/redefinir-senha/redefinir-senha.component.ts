import { Component, OnInit } from '@angular/core';
import { FormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from '../../services/login.service';

@Component({
  selector: 'app-redefinir-senha',
  templateUrl: './redefinir-senha.component.html',
  styleUrls: ['./redefinir-senha.component.css'],
})
export class RedefinirSenhaComponent implements OnInit {
  form: UntypedFormGroup;

  constructor(
    private _formBuilder: FormBuilder,
    private _loginService: LoginService,
    private _router: Router
  ) {}

  ngOnInit(): void {
    this.form = this._formBuilder.group({
      email: ['', [Validators.required]],
      novaSenha: ['', [Validators.required]],
    });
  }

  redefinirSenha() {
    this._loginService
      .redefinirSenha(
        this.form.get('email').value,
        this.form.get('novaSenha').value
      )
      .subscribe((x) => {
        this._router.navigate(['login']);
      });
  }
}
