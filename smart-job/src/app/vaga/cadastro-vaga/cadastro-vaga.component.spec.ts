import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CadastroVagaComponent } from './cadastro-vaga.component';
import { HttpClient, HttpHandler } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { MessageService } from 'primeng/api';
import { VagaService } from 'src/app/services/vaga.service';

describe('CadastroVagaComponent', () => {
  let component: CadastroVagaComponent;
  let fixture: ComponentFixture<CadastroVagaComponent>;

  const mockLocalStorage = {
    getItem: (key: string): string => {
      return {
        user: '{"idUsuario": "1"}',
      }[key];
    },
    setItem: (key: string, value: string) => {},
    removeItem: (key: string) => {},
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [
        { provide: HttpClient },
        { provide: HttpHandler },
        { provide: VagaService },
        { provide: FormBuilder },
        { provide: DatePipe },
        { provide: MessageService },
      ],
      declarations: [CadastroVagaComponent],
    }).compileComponents();

    spyOn(localStorage, 'getItem').and.callFake(mockLocalStorage.getItem);
    spyOn(localStorage, 'setItem').and.callFake(mockLocalStorage.setItem);
    spyOn(localStorage, 'removeItem').and.callFake(mockLocalStorage.removeItem);

    fixture = TestBed.createComponent(CadastroVagaComponent);
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
