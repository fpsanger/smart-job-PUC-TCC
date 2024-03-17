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

  getVagasAtivas(): Observable<IVaga[]> {
    return this._httpClient.get<IVaga[]>('http://localhost:3000/vagas/ativo');
  }

  getVagasTrabalhador(idTrabalhador: number): Observable<IVaga[]> {
    return this._httpClient.get<IVaga[]>(
      `http://localhost:3000/vagas/trabalhador/${idTrabalhador}`
    );
  }

  getVagasEmpresa(idEmpresa: number): Observable<IVaga[]> {
    return this._httpClient.get<IVaga[]>(
      `http://localhost:3000/vagas/empresa/${idEmpresa}`
    );
  }

  getVagasEmpresaTrabalhador(idEmpresa: number): Observable<any[]> {
    return this._httpClient.get<IVaga[]>(
      `http://localhost:3000/vagas/empresa/trabalhador/${idEmpresa}`
    );
  }

  getVaga(id: number): Observable<IVaga> {
    return this._httpClient.get<IVaga>(`http://localhost:3000/vagas/${id}`);
  }

  adicionarVaga(data: IVaga): Observable<IVaga> {
    return this._httpClient.post<IVaga>('http://localhost:3000/vagas', data);
  }

  editarVaga(data: IVaga): Observable<IVaga> {
    return this._httpClient.put<IVaga>(
      `http://localhost:3000/vagas/editar/${data.Id}`,
      data
    );
  }

  apagarVaga(idVaga: number): Observable<IVaga> {
    return this._httpClient.put<IVaga>(
      `http://localhost:3000/vagas/${idVaga}`,
      idVaga
    );
  }

  atribuirVaga(data: ITrabalhadorVaga): Observable<ITrabalhadorVaga> {
    return this._httpClient.post<ITrabalhadorVaga>(
      'http://localhost:3000/vagas/atribuirVaga',
      data
    );
  }

  sairVaga(
    idTrabalhador: number,
    idVaga: number
  ): Observable<ITrabalhadorVaga> {
    return this._httpClient.delete<ITrabalhadorVaga>(
      `http://localhost:3000/vagas/${idTrabalhador}/${idVaga}`
    );
  }
}
