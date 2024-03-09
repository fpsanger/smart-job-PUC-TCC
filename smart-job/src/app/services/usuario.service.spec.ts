import { TestBed } from '@angular/core/testing';

import { UsuarioService } from './usuario.service';
import { HttpClient, HttpHandler } from '@angular/common/http';

describe('UsuarioService', () => {
  let service: UsuarioService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [{ provide: HttpClient }, { provide: HttpHandler }],
    });
    service = TestBed.inject(UsuarioService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
