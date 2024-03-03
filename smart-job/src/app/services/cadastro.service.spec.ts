import { TestBed } from '@angular/core/testing';

import { CadastroService } from './cadastro.service';
import { HttpClient, HttpHandler } from '@angular/common/http';

describe('CadastroService', () => {
  let service: CadastroService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [{ provide: HttpClient }, { provide: HttpHandler }],
    });
    service = TestBed.inject(CadastroService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
