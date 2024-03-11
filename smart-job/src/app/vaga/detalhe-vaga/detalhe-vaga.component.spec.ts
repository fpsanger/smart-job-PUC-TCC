import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VagaComponent } from './detalhe-vaga.component';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { HttpClient, HttpHandler } from '@angular/common/http';
import { VagaService } from 'src/app/services/vaga.service';

describe('VagaComponent', () => {
  let component: VagaComponent;
  let fixture: ComponentFixture<VagaComponent>;

  const mockLocalStorage = {
    getItem: (key: string): string => {
      return {
        user: '{"idUsuario": "1","numeroDoc": "12345678"}',
      }[key];
    },
    setItem: (key: string, value: string) => {},
    removeItem: (key: string) => {},
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [
        { provide: VagaService },
        { provide: HttpClient },
        { provide: HttpHandler },
        { provide: MessageService },
        { provide: ConfirmationService },
        { provide: Router, useValue: {} },
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              params: {
                id: '1',
              },
            },
          },
        },
      ],
      declarations: [VagaComponent],
    }).compileComponents();

    spyOn(localStorage, 'getItem').and.callFake(mockLocalStorage.getItem);
    spyOn(localStorage, 'setItem').and.callFake(mockLocalStorage.setItem);
    spyOn(localStorage, 'removeItem').and.callFake(mockLocalStorage.removeItem);

    fixture = TestBed.createComponent(VagaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('deve obter e analisar o objeto do localStorage', () => {
    const item = localStorage.getItem('user');
    const idUsuario = JSON.parse(item).idUsuario;
    expect(idUsuario).toEqual('1');
  });
});
