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
  numeroDoc: string;
  routePage: string = '';

  constructor(private _authService: AuthService, private _router: Router) {}

  ngOnInit(): void {
    const item = localStorage.getItem('user');
    this.numeroDoc = JSON.parse(item).numeroDoc;
  }

  ngDoCheck(): void {
    this.isAuthenticated = this._authService.isAuthenticated();

    if (this.numeroDoc.length > 11) {
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
