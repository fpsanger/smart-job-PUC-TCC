import { ChangeDetectorRef, Component, DoCheck, OnInit } from '@angular/core';
import { AuthService } from '../services/auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  isAuthenticated: boolean = false;
  isTrabalhador: boolean;
  routePage: string = '';

  constructor(private _authService: AuthService, private _router: Router) {}

  ngOnInit(): void {
    this._authService.isAuthenticated$.subscribe(() => {
      const tokenData = this._authService.getTokenData();
      this.isTrabalhador = tokenData?.isTrabalhador;
      this.isAuthenticated = this._authService.isAuthenticated();

      if (this.isTrabalhador) {
        this.routePage = 'trabalhador';
      } else {
        this.routePage = 'empresa';
      }
    });
  }

  logout() {
    this._authService.logout();
    this._authService.isAuthenticated$.subscribe(() => {
      this.isAuthenticated = this._authService.isAuthenticated();
    });

    this._router.navigate(['/login']);
  }
}
