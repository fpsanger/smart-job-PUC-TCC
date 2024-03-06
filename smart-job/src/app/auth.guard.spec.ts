import { TestBed } from '@angular/core/testing';

import { AuthGuard } from './auth.guard';
import { HttpClient, HttpHandler } from '@angular/common/http';

describe('AuthGuard', () => {
  let guard: AuthGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [{ provide: HttpClient }, { provide: HttpHandler }],
    });
    guard = TestBed.inject(AuthGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
