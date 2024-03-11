import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VagaListComponent } from './vaga-list.component';
import { VagaService } from '../../services/vaga.service';
import { HttpClient, HttpHandler } from '@angular/common/http';

describe('VagaListComponent', () => {
  let component: VagaListComponent;
  let fixture: ComponentFixture<VagaListComponent>;

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
        { provide: VagaService },
        { provide: HttpClient },
        { provide: HttpHandler },
      ],
      declarations: [VagaListComponent],
    }).compileComponents();

    spyOn(localStorage, 'getItem').and.callFake(mockLocalStorage.getItem);
    spyOn(localStorage, 'setItem').and.callFake(mockLocalStorage.setItem);
    spyOn(localStorage, 'removeItem').and.callFake(mockLocalStorage.removeItem);

    fixture = TestBed.createComponent(VagaListComponent);
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
