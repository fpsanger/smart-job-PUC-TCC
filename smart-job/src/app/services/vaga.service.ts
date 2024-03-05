import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IVaga } from '../interfaces/vaga.interface';
import { Observable } from 'rxjs';
import { ITrabalhadorVaga } from '../interfaces/trabalhador-vaga';

@Injectable({
  providedIn: 'root',
})
export class VagaService {
  constructor(private _httpClient: HttpClient) {}

  getVagas(): Observable<IVaga[]> {
    return this._httpClient.get<IVaga[]>('http://localhost:3000/vagas');
  }

  getVaga(id: number): Observable<IVaga> {
    return this._httpClient.get<IVaga>(`http://localhost:3000/vagas/${id}`);
  }

  atribuirVaga(data: ITrabalhadorVaga): Observable<ITrabalhadorVaga> {
    return this._httpClient.post<ITrabalhadorVaga>(
      'http://localhost:3000/vagas/atribuirVaga',
      data
    );
  }
}
