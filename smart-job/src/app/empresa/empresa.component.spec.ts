import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmpresaComponent } from './empresa.component';
import { HttpClient, HttpHandler } from '@angular/common/http';
import { AuthService } from '../services/auth/auth.service';

describe('EmpresaComponent', () => {
  let component: EmpresaComponent;
  let fixture: ComponentFixture<EmpresaComponent>;

  const mockAuthService = {
    getTokenData() {
      return { id: 1 };
    },
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [
        { provide: HttpClient },
        { provide: HttpHandler },
        { provide: AuthService, useValue: mockAuthService },
      ],
      declarations: [EmpresaComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(EmpresaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
