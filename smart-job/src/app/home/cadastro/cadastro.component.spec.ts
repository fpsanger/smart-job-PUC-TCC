import {
  ComponentFixture,
  TestBed,
  fakeAsync,
  tick,
} from '@angular/core/testing';

import { CadastroComponent } from './cadastro.component';
import {
  FormBuilder,
  FormControl,
  UntypedFormBuilder,
  Validators,
} from '@angular/forms';
import { HttpClient, HttpHandler } from '@angular/common/http';
import { MessageService } from 'primeng/api';
import { NumeroDocumentoValidator } from 'src/app/validators/numero-documento.validator';
import { CadastroService } from 'src/app/services/cadastro.service';
import { of } from 'rxjs';
import { IUsuario } from 'src/app/interfaces/usuario.interface';

describe('CadastroComponent', () => {
  let component: CadastroComponent;
  let fixture: ComponentFixture<CadastroComponent>;
  let formBuilder: UntypedFormBuilder;

  let cadastroService: jasmine.SpyObj<CadastroService>;
  let messageService: jasmine.SpyObj<MessageService>;

  beforeEach(async () => {
    const cadastroServiceSpy = jasmine.createSpyObj('CadastroService', [
      'postUsuario',
    ]);
    const messageServiceSpy = jasmine.createSpyObj('MessageService', ['add']);

    await TestBed.configureTestingModule({
      declarations: [CadastroComponent],
      providers: [
        { provide: UntypedFormBuilder },
        { provide: HttpClient },
        { provide: HttpHandler },
        { provide: CadastroService, useValue: cadastroServiceSpy },
        { provide: MessageService, useValue: messageServiceSpy },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(CadastroComponent);
    component = fixture.componentInstance;

    cadastroService = TestBed.inject(
      CadastroService
    ) as jasmine.SpyObj<CadastroService>;
    messageService = TestBed.inject(
      MessageService
    ) as jasmine.SpyObj<MessageService>;
    formBuilder = TestBed.inject(UntypedFormBuilder);

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the form controls with default values', () => {
    expect(component.form.controls['nome'].value).toEqual(null);
    expect(component.form.controls['email'].value).toEqual(null);
    expect(component.form.controls['cpf'].value).toEqual('');
    expect(component.form.controls['cnpj'].value).toEqual('');
    expect(component.form.controls['telefone'].value).toEqual(null);
    expect(component.form.controls['senha'].value).toEqual(null);
  });

  it('should return null if doc number is valid', () => {
    const validCpf = '12345678909';
    const control = new FormControl(validCpf);
    const result = NumeroDocumentoValidator()(control);

    expect(result).toBeNull();
  });

  it('should remove validators and change value when change user type', () => {
    component.form = formBuilder.group({
      cpf: ['12345678909', [Validators.required]],
      cnpj: ['', [Validators.required]],
    });

    component.tipoUsuario = 'cnpj';
    component.setValidators();

    expect(component.form.get('cpf').hasError('required')).toBe(false);
    expect(component.form.get('cpf').value).toBe('');

    expect(component.form.get('cnpj').hasError('required')).toBe(true);
    expect(component.form.get('cnpj').value).toBe('');
  });

  it('submit form and post user', fakeAsync(() => {
    const formData = {
      nome: 'Teste',
      email: 'teste@teste.com',
      cpf: '123456789',
      cnpj: '',
      telefone: '11999999',
      senha: 'senha',
    };

    cadastroService.postUsuario.and.returnValue(of(true));

    component.form.setValue(formData);
    component.submitForm();
    tick();

    expect(cadastroService.postUsuario).toHaveBeenCalled();

    expect(messageService.add).toHaveBeenCalledWith({
      severity: 'success',
      summary: 'Sucesso',
      detail: 'Usuário adicionado com sucesso',
    });
  }));
});
