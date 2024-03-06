import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  isAuthenticated: boolean = false;

  constructor(private _authService: AuthService, private _router: Router) {}

  ngOnInit(): void {
    this.isAuthenticated = this._authService.isAuthenticated();
  }

  logout() {
    this._authService.logout();
    this._router.navigate(['/login']);
  }
}
