import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmpresaComponent } from './empresa.component';
import { HttpClient, HttpHandler } from '@angular/common/http';
import { AuthService } from '../../services/auth/auth.service';
import { VagaService } from '../../services/vaga.service';
import { of } from 'rxjs';
import { IUsuario } from '../../interfaces/usuario.interface';
import { Router } from '@angular/router';
import { IVaga } from 'src/app/interfaces/vaga.interface';

describe('EmpresaComponent', () => {
  let component: EmpresaComponent;
  let fixture: ComponentFixture<EmpresaComponent>;

  let authService: jasmine.SpyObj<AuthService>;
  let vagaService: jasmine.SpyObj<VagaService>;
  let router: jasmine.SpyObj<Router>;

  beforeEach(async () => {
    const authServiceSpy = jasmine.createSpyObj('AuthService', [
      'getTokenData',
    ]);
    const vagaServiceSpy = jasmine.createSpyObj('VagaService', [
      'getVagasEmpresa',
    ]);
    const routerSpy = jasmine.createSpyObj('Router', ['navigate']);

    await TestBed.configureTestingModule({
      providers: [
        { provide: HttpClient },
        { provide: HttpHandler },
        { provide: AuthService, useValue: authServiceSpy },
        { provide: VagaService, useValue: vagaServiceSpy },
        { provide: Router, useValue: routerSpy },
      ],
      declarations: [EmpresaComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(EmpresaComponent);
    component = fixture.componentInstance;

    authService = TestBed.inject(AuthService) as jasmine.SpyObj<AuthService>;
    vagaService = TestBed.inject(VagaService) as jasmine.SpyObj<VagaService>;
    router = TestBed.inject(Router) as jasmine.SpyObj<Router>;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should get user data from token data and return vagas empresa', () => {
    const tokenData = {
      id: 1,
      nome: 'Nome',
      Email: 'teste@teste.com',
      Telefone: '123456789',
      Cpf: '12345678900',
      Cnpj: '12345678000100',
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
    ] as IVaga[];
    vagaService.getVagasEmpresa.and.returnValue(of(vagas));

    component.ngOnInit();
    fixture.detectChanges();

    expect(authService.getTokenData).toHaveBeenCalled();
    expect(vagaService.getVagasEmpresa).toHaveBeenCalled();

    expect(component.usuario).toEqual(tokenData as IUsuario);
    expect(component.vagas).toEqual(vagas);
  });

  it('should navigate to cadastro-vaga', () => {
    component.navigateToAdicionarVaga();

    expect(router.navigate).toHaveBeenCalledWith(['vaga/cadastro-vaga']);
  });
});
