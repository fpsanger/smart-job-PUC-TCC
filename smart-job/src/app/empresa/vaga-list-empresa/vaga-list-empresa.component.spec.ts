import { ComponentFixture, TestBed } from '@angular/core/testing';
import { VagaListEmpresaComponent } from './vaga-list-empresa.component';
import { HttpClient, HttpHandler } from '@angular/common/http';
import { MessageService } from 'primeng/api';
import { AuthService } from 'src/app/services/auth/auth.service';
import { VagaService } from 'src/app/services/vaga.service';
import { VagaStatus } from 'src/app/enum/vaga-status.enum';
import { IVaga } from 'src/app/interfaces/vaga.interface';
import { of } from 'rxjs';

describe('VagaListEmpresaComponent', () => {
  let component: VagaListEmpresaComponent;
  let fixture: ComponentFixture<VagaListEmpresaComponent>;

  let authService: jasmine.SpyObj<AuthService>;
  let vagaService: jasmine.SpyObj<VagaService>;
  let messageService: jasmine.SpyObj<MessageService>;

  beforeEach(async () => {
    const authServiceSpy = jasmine.createSpyObj('AuthService', [
      'getTokenData',
    ]);
    const vagaServiceSpy = jasmine.createSpyObj('VagaService', [
      'getVagasEmpresa',
      'getVagasEmpresaTrabalhador',
      'alterarStatusVaga',
    ]);

    const messageServiceSpy = jasmine.createSpyObj('MessageService', ['add']);

    await TestBed.configureTestingModule({
      providers: [
        { provide: HttpClient },
        { provide: HttpHandler },
        { provide: MessageService, useValue: messageServiceSpy },
        { provide: AuthService, useValue: authServiceSpy },
        { provide: VagaService, useValue: vagaServiceSpy },
      ],
      declarations: [VagaListEmpresaComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(VagaListEmpresaComponent);
    component = fixture.componentInstance;

    authService = TestBed.inject(AuthService) as jasmine.SpyObj<AuthService>;
    vagaService = TestBed.inject(VagaService) as jasmine.SpyObj<VagaService>;
    messageService = TestBed.inject(
      MessageService
    ) as jasmine.SpyObj<MessageService>;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should init data component', () => {
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

    vagaService.getVagasEmpresa.and.returnValue(of(vagas));
    vagaService.getVagasEmpresaTrabalhador.and.returnValue(of());

    component.ngOnInit();
    fixture.detectChanges();

    expect(vagaService.getVagasEmpresa).toHaveBeenCalledWith(
      component.idEmpresa
    );
    expect(vagaService.getVagasEmpresaTrabalhador).toHaveBeenCalledWith(
      component.idEmpresa
    );
    expect(component.vagas).toEqual(vagas);
  });

  it('should alterarStatus', () => {
    spyOn(component, 'refresh');

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

    vagaService.getVagasEmpresa.and.returnValue(of(vagas));
    vagaService.getVagasEmpresaTrabalhador.and.returnValue(of());
    vagaService.alterarStatusVaga.and.returnValue(of(null));

    component.valorStatus = 1;
    component.idVaga = 1;
    const data = { Status: component.valorStatus } as IVaga;
    component.alterarStatus();

    component.ngOnInit();
    fixture.detectChanges();

    expect(vagaService.alterarStatusVaga).toHaveBeenCalledWith(
      component.idVaga,
      data
    );

    expect(messageService.add).toHaveBeenCalledWith(
      jasmine.objectContaining({
        severity: 'success',
        summary: 'Sucesso',
        detail: 'Status alterado com sucesso',
      })
    );

    expect(component.refresh).toHaveBeenCalled();
  });
});
