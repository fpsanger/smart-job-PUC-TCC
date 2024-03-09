import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  constructor(private _httpClient: HttpClient) {}

  redefinirSenha(email: string, novaSenha: string): Observable<any> {
    return this._httpClient.post(
      'http://localhost:3000/usuario/redefinir-senha',
      {
        Email: email,
        Senha: novaSenha,
      }
    );
  }
}
