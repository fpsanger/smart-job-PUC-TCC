import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { JwtService } from '../jwt.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'http://localhost:3000';

  private isAuthenticatedSubject: BehaviorSubject<boolean> =
    new BehaviorSubject<boolean>(false);
  public isAuthenticated$: Observable<boolean> =
    this.isAuthenticatedSubject.asObservable();

  constructor(
    private http: HttpClient,
    private router: Router,
    private _jwtService: JwtService
  ) {}

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

  getTokenData() {
    let decodedToken;

    const token = this.getToken();
    if (token) {
      decodedToken = this._jwtService.decodeToken(token);
    }

    return decodedToken;
  }

  isAuthenticated(): boolean {
    return !!this.getToken();
  }

  setAuthenticated(value: boolean) {
    this.isAuthenticatedSubject.next(value);
  }

  hasPermission(route: string): boolean {
    const tokenData = this.getTokenData();
    console.log(tokenData);

    // const user = localStorage.getItem('user');
    // const userRole = JSON.parse(user).permissao;

    if (tokenData.permissao === 'trabalhador' && route.includes('empresa')) {
      this.router.navigate(['/error']);
      return false;
    } else if (
      tokenData.permissao === 'empresa' &&
      route.includes('trabalhador')
    ) {
      this.router.navigate(['/error']);
      return false;
    }

    return true;
  }
}
