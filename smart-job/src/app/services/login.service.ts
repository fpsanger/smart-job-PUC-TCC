import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IUsuario } from '../interfaces/usuario.interface';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  constructor(private _httpClient: HttpClient) {}

  login(data: IUsuario): Observable<any> {
    console.log(data);
    return this._httpClient.post('http://localhost:3000/usuario/login', {
      Email: data.email,
      Senha: data.senha,
    });
  }
}
