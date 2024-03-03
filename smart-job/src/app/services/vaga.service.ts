import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IVaga } from '../interfaces/vaga.interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class VagaService {
  constructor(private _httpClient: HttpClient) {}

  getVagas(): Observable<IVaga[]> {
    return this._httpClient.get<IVaga[]>('http://localhost:3000/vagas');
  }
}
