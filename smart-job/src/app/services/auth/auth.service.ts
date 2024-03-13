import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'http://localhost:3000';

  constructor(private http: HttpClient, private router: Router) {}

  login(email: string, senha: string): Observable<any> {
    return this.http
      .post<any>(`${this.apiUrl}/autenticacao/login`, { email, senha })
      .pipe(
        tap((response) => {
          localStorage.setItem('token', response.token);
        })
      );
  }

  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  isAuthenticated(): boolean {
    return !!this.getToken();
  }

  hasPermission(route: string): boolean {
    const user = localStorage.getItem('user');

    const userRole = JSON.parse(user).permissao;

    if (userRole === 'trabalhador' && route.includes('empresa')) {
      this.router.navigate(['/error']);
      return false;
    } else if (userRole === 'empresa' && route.includes('trabalhador')) {
      this.router.navigate(['/error']);
      return false;
    }

    return true;
  }
}
