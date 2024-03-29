import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VagaComponent } from './detalhe-vaga.component';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { HttpClient, HttpHandler } from '@angular/common/http';
import { VagaService } from 'src/app/services/vaga.service';
import { AuthService } from 'src/app/services/auth/auth.service';
import { of } from 'rxjs';
import { ITrabalhadorVaga } from 'src/app/interfaces/trabalhador-vaga';
import { IVaga } from 'src/app/interfaces/vaga.interface';

describe('DetalheVagaComponent', () => {
  let component: VagaComponent;
  let fixture: ComponentFixture<VagaComponent>;

  let authService: jasmine.SpyObj<AuthService>;
  let vagaService: jasmine.SpyObj<VagaService>;
  let confirmationService: jasmine.SpyObj<ConfirmationService>;
  let messageService: jasmine.SpyObj<MessageService>;
  let routerMock: jasmine.SpyObj<Router>;

  beforeEach(async () => {
    const authServiceSpy = jasmine.createSpyObj('AuthService', [
      'getTokenData',
    ]);
    const vagaServiceSpy = jasmine.createSpyObj('VagaService', [
      'atribuirVaga',
      'apagarVaga',
      'getVaga',
    ]);

    const confirmationServiceSpy = jasmine.createSpyObj('ConfirmationService', [
      'confirm',
    ]);

    const messageServiceSpy = jasmine.createSpyObj('MessageService', ['add']);

    const routerMockSpy = jasmine.createSpyObj('Router', ['navigate']);

    await TestBed.configureTestingModule({
      providers: [
        { provide: VagaService, useValue: vagaServiceSpy },
        { provide: AuthService, useValue: authServiceSpy },
        { provide: HttpClient },
        { provide: HttpHandler },
        { provide: MessageService, useValue: messageServiceSpy },
        { provide: ConfirmationService, useValue: confirmationServiceSpy },
        { provide: Router, useValue: routerMockSpy },
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              params: {
                id: 1,
              },
            },
          },
        },
      ],
      declarations: [VagaComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(VagaComponent);
    component = fixture.componentInstance;

    authService = TestBed.inject(AuthService) as jasmine.SpyObj<AuthService>;
    vagaService = TestBed.inject(VagaService) as jasmine.SpyObj<VagaService>;
    messageService = TestBed.inject(
      MessageService
    ) as jasmine.SpyObj<MessageService>;
    confirmationService = TestBed.inject(
      ConfirmationService
    ) as jasmine.SpyObj<ConfirmationService>;
    routerMock = TestBed.inject(Router) as jasmine.SpyObj<Router>;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the "trabalhador" user ', () => {
    const tokenData = {
      id: 1,
      nome: 'Nome',
      Email: 'teste@teste.com',
      Telefone: '123456789',
      CPF: '12345678900',
      CNPJ: '12345678000100',
      Senha: '123',
      Ativo: true,
      isTrabalhador: true,
    };
    authService.getTokenData.and.returnValue(tokenData);
    vagaService.getVaga.and.returnValue(of());

    component.ngOnInit();
    fixture.detectChanges();

    expect(authService.getTokenData).toHaveBeenCalled();
    expect(component.idUsuario).toEqual(1);
    expect(component.isTrabalhador).toBeTrue();
    expect(vagaService.getVaga).toHaveBeenCalledWith(1);
    expect(component.route).toEqual('trabalhador/inicial');
  });

  it('should initialize the "empresa" user ', () => {
    const tokenData = {
      id: 1,
      nome: 'Nome',
      Email: 'teste@teste.com',
      Telefone: '123456789',
      CPF: '12345678900',
      CNPJ: '12345678000100',
      Senha: '123',
      Ativo: true,
      isTrabalhador: false,
    };
    authService.getTokenData.and.returnValue(tokenData);
    vagaService.getVaga.and.returnValue(of());

    component.ngOnInit();
    fixture.detectChanges();

    expect(authService.getTokenData).toHaveBeenCalled();
    expect(component.idUsuario).toEqual(1);
    expect(component.isTrabalhador).toBeFalse();
    expect(vagaService.getVaga).toHaveBeenCalledWith(1);
    expect(component.route).toEqual('empresa/inicial');
  });

  it('should registrarVaga', () => {
    const tokenData = {
      id: 1,
      nome: 'Nome',
      Email: 'teste@teste.com',
      Telefone: '123456789',
      CPF: '12345678900',
      CNPJ: '12345678000100',
      Senha: '123',
      Ativo: true,
      isTrabalhador: false,
    };
    authService.getTokenData.and.returnValue(tokenData);
    vagaService.getVaga.and.returnValue(of());

    component.ngOnInit();
    fixture.detectChanges();

    const data = {
      idVaga: 1,
      idTrabalhador: 1,
      dataAceite: new Date(),
    } as ITrabalhadorVaga;
    vagaService.atribuirVaga.and.returnValue(of(null));

    component.registrarVaga();

    expect(vagaService.atribuirVaga).toHaveBeenCalledWith(data);
    expect(messageService.add).toHaveBeenCalledWith({
      severity: 'success',
      summary: 'Sucesso',
      detail: 'Vaga atribuída com sucesso',
    });
  });

  it('should apagarVaga', () => {
    const tokenData = {
      id: 1,
      nome: 'Nome',
      Email: 'teste@teste.com',
      Telefone: '123456789',
      CPF: '12345678900',
      CNPJ: '12345678000100',
      Senha: '123',
      Ativo: true,
      isTrabalhador: false,
    };
    authService.getTokenData.and.returnValue(tokenData);
    vagaService.getVaga.and.returnValue(of());

    component.ngOnInit();
    fixture.detectChanges();

    component.apagarVaga();
    vagaService.apagarVaga.and.returnValue(of(null));

    confirmationService.confirm.calls.first().args[0].accept();
    routerMock.navigate.and.returnValue(Promise.resolve(true));

    expect(vagaService.apagarVaga).toHaveBeenCalled();
    expect(messageService.add).toHaveBeenCalledWith({
      severity: 'success',
      summary: 'Sucesso',
      detail: 'Vaga apagada com sucesso',
    });
    expect(routerMock.navigate).toHaveBeenCalledWith(['/empresa/inicial']);
  });

  it('should refresh', () => {
    const tokenData = {
      id: 1,
      nome: 'Nome',
      Email: 'teste@teste.com',
      Telefone: '123456789',
      CPF: '12345678900',
      CNPJ: '12345678000100',
      Senha: '123',
      Ativo: true,
      isTrabalhador: false,
    };
    authService.getTokenData.and.returnValue(tokenData);
    vagaService.getVaga.and.returnValue(of());

    component.ngOnInit();
    fixture.detectChanges();

    component.refresh();

    expect(component.mostrarModal).toBeTrue();
    expect(vagaService.getVaga).toHaveBeenCalledWith(component.idVaga);
  });
});
