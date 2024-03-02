import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IUsuario } from '../interfaces/usuario.interface';

@Injectable({
  providedIn: 'root',
})
export class CadastroService {
  constructor(private _httpClient: HttpClient) {}

  postUsuario(data: IUsuario): Observable<any> {
    console.log(data);
    return this._httpClient.post('http://localhost:3000/usuario', data);
  }
}
