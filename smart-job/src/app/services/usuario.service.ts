import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UsuarioService {
  constructor(private _httpClient: HttpClient) {}

  getTrabalhador(idTrabalhador: number): Observable<any> {
    return this._httpClient.get(
      `http://localhost:3000/usuario/trabalhador/${idTrabalhador}`
    );
  }

  getEmpresa(idEmpresa: number): Observable<any> {
    return this._httpClient.get(
      `http://localhost:3000/usuario/empresa/${idEmpresa}`
    );
  }
}
