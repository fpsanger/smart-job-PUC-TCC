import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmpresaComponent } from './empresa.component';
import { HttpClient, HttpHandler } from '@angular/common/http';

describe('EmpresaComponent', () => {
  let component: EmpresaComponent;
  let fixture: ComponentFixture<EmpresaComponent>;

  const mockLocalStorage = {
    getItem: (key: string): string => {
      return {
        user: '{"idUsuario": "123"}',
      }[key];
    },
    setItem: (key: string, value: string) => {},
    removeItem: (key: string) => {},
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [{ provide: HttpClient }, { provide: HttpHandler }],
      declarations: [EmpresaComponent],
    }).compileComponents();

    spyOn(localStorage, 'getItem').and.callFake(mockLocalStorage.getItem);
    spyOn(localStorage, 'setItem').and.callFake(mockLocalStorage.setItem);
    spyOn(localStorage, 'removeItem').and.callFake(mockLocalStorage.removeItem);

    fixture = TestBed.createComponent(EmpresaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('deve obter e analisar o objeto do localStorage', () => {
    // Seu teste aqui
    const item = localStorage.getItem('user');
    const idUsuario = JSON.parse(item).idUsuario;
    expect(idUsuario).toEqual('123');
  });
});
