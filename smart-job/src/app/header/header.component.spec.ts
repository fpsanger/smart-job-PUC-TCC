import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderComponent } from './header.component';
import { HttpClient, HttpHandler } from '@angular/common/http';
import { AuthService } from '../services/auth/auth.service';
import { of } from 'rxjs';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;

  const mockAuthService = {
    getTokenData() {
      return { id: 1 };
    },
    isAuthenticated$: of(true),
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [
        { provide: AuthService },
        { provide: HttpClient },
        { provide: HttpHandler },
        { provide: AuthService, useValue: mockAuthService },
      ],
      declarations: [HeaderComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
