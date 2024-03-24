import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrabalhadorComponent } from './trabalhador.component';
import { HttpClient, HttpHandler } from '@angular/common/http';
import { DatePipe } from '@angular/common';
import { AuthService } from '../services/auth/auth.service';

describe('TrabalhadorComponent', () => {
  let component: TrabalhadorComponent;
  let fixture: ComponentFixture<TrabalhadorComponent>;

  const mockAuthService = {
    getTokenData() {
      return { id: 1 };
    },
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TrabalhadorComponent],
      providers: [
        { provide: HttpClient },
        { provide: HttpHandler },
        { provide: DatePipe },
        { provide: AuthService, useValue: mockAuthService },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(TrabalhadorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
