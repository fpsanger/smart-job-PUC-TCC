import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VagaListEmpresaComponent } from './vaga-list-empresa.component';
import { HttpClient, HttpHandler } from '@angular/common/http';
import { MessageService } from 'primeng/api';

describe('VagaListEmpresaComponent', () => {
  let component: VagaListEmpresaComponent;
  let fixture: ComponentFixture<VagaListEmpresaComponent>;

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
        { provide: MessageService },
      ],
      declarations: [VagaListEmpresaComponent],
    }).compileComponents();

    spyOn(localStorage, 'getItem').and.callFake(mockLocalStorage.getItem);
    spyOn(localStorage, 'setItem').and.callFake(mockLocalStorage.setItem);
    spyOn(localStorage, 'removeItem').and.callFake(mockLocalStorage.removeItem);

    fixture = TestBed.createComponent(VagaListEmpresaComponent);
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
