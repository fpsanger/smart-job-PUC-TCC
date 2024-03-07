import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-page-not-found',
  templateUrl: './page-not-found.component.html',
  styleUrls: ['./page-not-found.component.css'],
})
export class PageNotFoundComponent implements OnInit {
  constructor(private _authService: AuthService, private _router: Router) {}

  ngOnInit(): void {}

  navigateToHome() {
    if (this._authService.isAuthenticated()) {
      this._router.navigate(['trabalhador/inicial']);
    } else {
      this._router.navigate(['/']);
    }
  }
}
