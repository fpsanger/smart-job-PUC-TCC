import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrabalhadorComponent } from './trabalhador.component';
import { HttpClient, HttpHandler } from '@angular/common/http';
import { DatePipe } from '@angular/common';
import { AuthService } from '../services/auth/auth.service';
import { VagaService } from '../services/vaga.service';
import { IUsuario } from '../interfaces/usuario.interface';
import { of } from 'rxjs';
import { IVaga } from '../interfaces/vaga.interface';

describe('TrabalhadorComponent', () => {
  let component: TrabalhadorComponent;
  let fixture: ComponentFixture<TrabalhadorComponent>;

  let authService: jasmine.SpyObj<AuthService>;
  let vagaService: jasmine.SpyObj<VagaService>;

  beforeEach(() => {
    const authServiceSpy = jasmine.createSpyObj('AuthService', [
      'getTokenData',
    ]);
    const vagaServiceSpy = jasmine.createSpyObj('VagaService', [
      'getVagasAtivas',
    ]);

    TestBed.configureTestingModule({
      providers: [
        TrabalhadorComponent,
        { provide: AuthService, useValue: authServiceSpy },
        { provide: VagaService, useValue: vagaServiceSpy },
      ],
    });

    fixture = TestBed.createComponent(TrabalhadorComponent);
    component = fixture.componentInstance;

    authService = TestBed.inject(AuthService) as jasmine.SpyObj<AuthService>;
    vagaService = TestBed.inject(VagaService) as jasmine.SpyObj<VagaService>;
  });

  it('should get user data from token data and return vagas ativas', () => {
    const tokenData = {
      nome: 'Nome',
      Email: 'teste@teste.com',
      Telefone: '123456789',
      CPF: '12345678900',
      CNPJ: '12345678000100',
      Senha: '123',
      Ativo: true,
    };

    authService.getTokenData.and.returnValue(tokenData);

    const vagas = [
      {
        Nome: 'Nome',
        Descricao: 'Descrição',
        Remuneracao: 100,
        Endereco: 'Endereço',
        Estado: 'Estado',
        Cidade: 'Cidade',
        Ativo: true,
        TipoVaga: 'Tipo',
        DataAtualizacao: '2024-03-25',
        DataExpiracao: '2024-04-25',
        Status: 1,
        LimiteTrabalhadores: 5,
      },
    ];
    vagaService.getVagasAtivas.and.returnValue(of(vagas));

    component.ngOnInit();
    fixture.detectChanges();

    expect(authService.getTokenData).toHaveBeenCalled();
    expect(vagaService.getVagasAtivas).toHaveBeenCalled();

    expect(component.usuario).toEqual(tokenData as IUsuario);
    expect(component.vagas).toEqual(vagas);
  });
});
