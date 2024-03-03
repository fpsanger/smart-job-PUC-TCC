import { TestBed } from '@angular/core/testing';

import { CadastroService } from './cadastro.service';
import { HttpClient } from '@angular/common/http';

describe('CadastroService', () => {
  let service: CadastroService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [{ provide: HttpClient }],
    });
    service = TestBed.inject(CadastroService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
