import { TestBed } from '@angular/core/testing';

import { VagaService } from './vaga.service';
import { HttpClient, HttpHandler } from '@angular/common/http';

describe('VagaService', () => {
  let service: VagaService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [{ provide: HttpClient }, { provide: HttpHandler }],
    });
    service = TestBed.inject(VagaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
