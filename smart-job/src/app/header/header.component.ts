import { Component, DoCheck, OnInit } from '@angular/core';
import { AuthService } from '../services/auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit, DoCheck {
  isAuthenticated: boolean = false;
  isTrabalhador: boolean;
  routePage: string = '';

  constructor(private _authService: AuthService, private _router: Router) {}

  ngOnInit(): void {}

  ngDoCheck(): void {
    const item = localStorage.getItem('user') ?? null;

    this.isTrabalhador = JSON.parse(item)?.isTrabalhador;
    this.isAuthenticated = this._authService.isAuthenticated();

    if (this.isTrabalhador) {
      this.routePage = 'trabalhador';
    } else {
      this.routePage = 'empresa';
    }
  }

  logout() {
    this._authService.logout();
    this._router.navigate(['/login']);
  }
}
