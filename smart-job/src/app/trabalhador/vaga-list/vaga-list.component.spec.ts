import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { VagaListComponent } from './vaga-list.component';
import { VagaService } from '../../services/vaga.service';
import { HttpClient, HttpHandler } from '@angular/common/http';
import { ConfirmationService, MessageService } from 'primeng/api';
import { AuthService } from 'src/app/services/auth/auth.service';
import { VagaStatus } from 'src/app/enum/vaga-status.enum';
import { of } from 'rxjs';
import { IVaga } from 'src/app/interfaces/vaga.interface';

describe('VagaListComponent', () => {
  let component: VagaListComponent;
  let fixture: ComponentFixture<VagaListComponent>;

  let authService: jasmine.SpyObj<AuthService>;
  let vagaService: jasmine.SpyObj<VagaService>;
  let confirmationService: jasmine.SpyObj<ConfirmationService>;
  let messageService: jasmine.SpyObj<MessageService>;

  beforeEach(async () => {
    const authServiceSpy = jasmine.createSpyObj('AuthService', [
      'getTokenData',
    ]);
    const vagaServiceSpy = jasmine.createSpyObj('VagaService', [
      'getVagasTrabalhador',
      'sairVaga',
    ]);
    const confirmationServiceSpy = jasmine.createSpyObj('ConfirmationService', [
      'confirm',
    ]);
    const messageServiceSpy = jasmine.createSpyObj('MessageService', ['add']);

    await TestBed.configureTestingModule({
      providers: [
        { provide: VagaService, useValue: vagaServiceSpy },
        { provide: HttpClient },
        { provide: HttpHandler },
        { provide: ConfirmationService, useValue: confirmationServiceSpy },
        { provide: MessageService, useValue: messageServiceSpy },
        { provide: AuthService, useValue: authServiceSpy },
      ],
      declarations: [VagaListComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(VagaListComponent);
    component = fixture.componentInstance;
    authService = TestBed.inject(AuthService) as jasmine.SpyObj<AuthService>;
    vagaService = TestBed.inject(VagaService) as jasmine.SpyObj<VagaService>;
    confirmationService = TestBed.inject(
      ConfirmationService
    ) as jasmine.SpyObj<ConfirmationService>;
    messageService = TestBed.inject(
      MessageService
    ) as jasmine.SpyObj<MessageService>;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should calculate remuneracao with "Finalizado" status ', () => {
    const tokenData = {
      id: 1,
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
        Status: VagaStatus.Finalizado,
        LimiteTrabalhadores: 5,
      },
    ] as IVaga[];

    vagaService.getVagasTrabalhador.and.returnValue(of(vagas));

    component.ngOnInit();
    fixture.detectChanges();

    expect(vagaService.getVagasTrabalhador).toHaveBeenCalledWith(
      component.idTrabalhador
    );

    expect(component.vagas).toEqual(vagas);
    expect(component.totalRemuneracao).toEqual(
      vagas
        .map((y) => y.Remuneracao)
        .reduce((acumulador, valorAtual) => acumulador + valorAtual, 0)
    );
  });

  it('should remuneracao be equal to 0 when status is different from "Finalizado" ', () => {
    const tokenData = {
      id: 1,
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
        Status: VagaStatus.Aberto,
        LimiteTrabalhadores: 5,
      },
    ] as IVaga[];

    vagaService.getVagasTrabalhador.and.returnValue(of(vagas));

    component.ngOnInit();
    fixture.detectChanges();

    expect(vagaService.getVagasTrabalhador).toHaveBeenCalledWith(
      component.idTrabalhador
    );
    expect(component.vagas).toEqual(vagas);
    expect(component.totalRemuneracao).toEqual(0);
  });

  it('deve sair da vaga corretamente e mostrar mensagem de sucesso', () => {
    const idVaga = 1;

    const tokenData = {
      id: 1,
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
        Status: VagaStatus.Aberto,
        LimiteTrabalhadores: 5,
      },
    ] as IVaga[];

    vagaService.getVagasTrabalhador.and.returnValue(of(vagas));

    vagaService.sairVaga.and.returnValue(of(null));

    component.sairVaga(idVaga);

    component.ngOnInit();
    fixture.detectChanges();

    confirmationService.confirm.calls.first().args[0].accept();

    expect(vagaService.sairVaga).toHaveBeenCalledWith(
      component.idTrabalhador,
      idVaga
    );
    expect(messageService.add).toHaveBeenCalledWith({
      severity: 'success',
      summary: 'Sucesso',
      detail: 'Vaga apagada com sucesso',
    });
  });
});
