// auth.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'http://localhost:3000'; // URL da sua API

  constructor(private http: HttpClient) {}

  login(username: string, password: string): Observable<any> {
    return this.http
      .post<any>(`${this.apiUrl}/usuario/login`, { username, password })
      .pipe(
        tap((response) => {
          localStorage.setItem('token', response.token); // Armazena o token JWT no localStorage
        })
      );
  }

  logout(): void {
    localStorage.removeItem('token'); // Remove o token JWT do localStorage
  }

  getToken(): string | null {
    return localStorage.getItem('token'); // Obtém o token JWT do localStorage
  }

  isAuthenticated(): boolean {
    return !!this.getToken(); // Verifica se o usuário está autenticado com base na presença do token JWT
  }
}
