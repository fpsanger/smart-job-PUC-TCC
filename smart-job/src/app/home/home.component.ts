import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  constructor(private _router: Router) {}

  ngOnInit(): void {}

  navigateCadastro() {
    this._router.navigate(['cadastro']);
  }

  navigateLogin() {
    this._router.navigate(['login']);
  }
}
