import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CadastroVagaComponent } from './cadastro-vaga.component';
import { HttpClient, HttpHandler } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { MessageService } from 'primeng/api';
import { VagaService } from 'src/app/services/vaga.service';
import { AuthService } from 'src/app/services/auth/auth.service';
import { of } from 'rxjs';
import { IVaga } from 'src/app/interfaces/vaga.interface';

describe('CadastroVagaComponent', () => {
  let component: CadastroVagaComponent;
  let fixture: ComponentFixture<CadastroVagaComponent>;

  let authService: jasmine.SpyObj<AuthService>;
  let vagaService: jasmine.SpyObj<VagaService>;
  let messageService: jasmine.SpyObj<MessageService>;

  beforeEach(async () => {
    const authServiceSpy = jasmine.createSpyObj('AuthService', [
      'getTokenData',
    ]);
    const vagaServiceSpy = jasmine.createSpyObj('VagaService', [
      'adicionarVaga',
      'editarVaga',
    ]);
    const messageServiceSpy = jasmine.createSpyObj('MessageService', ['add']);

    await TestBed.configureTestingModule({
      providers: [
        { provide: HttpClient },
        { provide: HttpHandler },
        { provide: VagaService },
        { provide: FormBuilder },
        { provide: DatePipe },
        { provide: VagaService, useValue: vagaServiceSpy },
        { provide: MessageService, useValue: messageServiceSpy },
        { provide: AuthService, useValue: authServiceSpy },
      ],
      declarations: [CadastroVagaComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CadastroVagaComponent);
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

  it('should create form', () => {
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

    component.ngOnInit();
    fixture.detectChanges();

    expect(component.form.contains('nomeVaga')).toBeTruthy();
    expect(component.form.contains('descricao')).toBeTruthy();
    expect(component.form.contains('remuneracao')).toBeTruthy();
    expect(component.form.contains('endereco')).toBeTruthy();
    expect(component.form.contains('estado')).toBeTruthy();
    expect(component.form.contains('cidade')).toBeTruthy();
    expect(component.form.contains('tipoVaga')).toBeTruthy();
    expect(component.form.contains('dataExpiracao')).toBeTruthy();
    expect(component.form.contains('limiteTrabalhadores')).toBeTruthy();
  });

  it('should validate form fields', () => {
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

    component.ngOnInit();
    fixture.detectChanges();

    let nomeVaga = component.form.get('nomeVaga');
    nomeVaga.setValue('');
    expect(nomeVaga.valid).toBeFalsy();

    let descricao = component.form.get('descricao');
    descricao.setValue('');
    expect(descricao.valid).toBeFalsy();

    let remuneracao = component.form.get('remuneracao');
    remuneracao.setValue('');
    expect(remuneracao.valid).toBeFalsy();

    let endereco = component.form.get('endereco');
    endereco.setValue('');
    expect(endereco.valid).toBeFalsy();

    let estado = component.form.get('estado');
    estado.setValue('');
    expect(estado.valid).toBeFalsy();

    let cidade = component.form.get('cidade');
    cidade.setValue('');
    expect(cidade.valid).toBeFalsy();

    let tipoVaga = component.form.get('tipoVaga');
    tipoVaga.setValue('');
    expect(tipoVaga.valid).toBeFalsy();

    let dataExpiracao = component.form.get('dataExpiracao');
    dataExpiracao.setValue('');
    expect(dataExpiracao.valid).toBeFalsy();

    let limiteTrabalhadores = component.form.get('limiteTrabalhadores');
    nomeVaga.setValue('');
    expect(limiteTrabalhadores.valid).toBeFalsy();
  });

  it('should adicionarVaga', () => {
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

    component.ngOnInit();
    fixture.detectChanges();

    component.form.setValue({
      nomeVaga: 'Desenvolvedor',
      descricao: 'Descrição da vaga',
      cidade: 'Cidade',
      endereco: 'Endereço',
      estado: 'Estado',
      remuneracao: 5000,
      tipoVaga: 'CLT',
      dataExpiracao: new Date(),
      limiteTrabalhadores: 1,
    });

    component.vaga = { Id: null } as IVaga;
    vagaService.adicionarVaga.and.returnValue(of(null));

    component.salvarVaga();

    expect(vagaService.adicionarVaga).toHaveBeenCalled();
    expect(messageService.add).toHaveBeenCalledWith({
      severity: 'success',
      summary: 'Sucesso',
      detail: 'Vaga adicionada com sucesso',
    });
  });

  it('should editarVaga', () => {
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

    component.ngOnInit();
    fixture.detectChanges();

    component.form.setValue({
      nomeVaga: 'Desenvolvedor',
      descricao: 'Descrição da vaga',
      cidade: 'Cidade',
      endereco: 'Endereço',
      estado: 'Estado',
      remuneracao: 5000,
      tipoVaga: 'CLT',
      dataExpiracao: new Date(),
      limiteTrabalhadores: 1,
    });

    component.vaga = { Id: 1 } as IVaga;
    vagaService.editarVaga.and.returnValue(of(null));

    component.salvarVaga();

    expect(vagaService.editarVaga).toHaveBeenCalled();
    expect(messageService.add).toHaveBeenCalledWith({
      severity: 'success',
      summary: 'Sucesso',
      detail: 'Vaga editada com sucesso',
    });
  });
});
