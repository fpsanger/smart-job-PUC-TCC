import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginComponent } from './login.component';
import { HttpClient, HttpHandler } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { AuthService } from 'src/app/services/auth/auth.service';
import { Router } from '@angular/router';
import { of, throwError } from 'rxjs';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  let authService: jasmine.SpyObj<AuthService>;
  let router: jasmine.SpyObj<Router>;
  let messageService: jasmine.SpyObj<MessageService>;

  beforeEach(async () => {
    const authServiceSpy = jasmine.createSpyObj('AuthService', [
      'login',
      'getTokenData',
      'setAuthenticated',
    ]);
    const routerSpy = jasmine.createSpyObj('Router', ['navigate']);
    const messageServiceSpy = jasmine.createSpyObj('MessageService', ['add']);

    await TestBed.configureTestingModule({
      declarations: [LoginComponent],
      providers: [
        { provide: AuthService, useValue: authServiceSpy },
        { provide: Router, useValue: routerSpy },
        { provide: MessageService, useValue: messageServiceSpy },
        { provide: HttpClient },
        { provide: HttpHandler },
        { provide: FormBuilder },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    component.ngOnInit();

    authService = TestBed.inject(AuthService) as jasmine.SpyObj<AuthService>;
    router = TestBed.inject(Router) as jasmine.SpyObj<Router>;
    messageService = TestBed.inject(
      MessageService
    ) as jasmine.SpyObj<MessageService>;

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should create form', () => {
    expect(component.form).toBeDefined();
    expect(component.form.get('email')).toBeTruthy();
    expect(component.form.get('senha')).toBeTruthy();
  });

  it('should login successfully and navigate to appropriate page', () => {
    authService.login.and.returnValue(of(true));

    const mockTokenData = { isTrabalhador: true };
    authService.getTokenData.and.returnValue(mockTokenData);

    const email = 'teste@teste.com';
    const senha = '123456789';

    component.form.setValue({ email: email, senha: senha });
    component.login();

    expect(authService.login).toHaveBeenCalledWith(email, senha);
    expect(authService.getTokenData).toHaveBeenCalled();
    expect(authService.setAuthenticated).toHaveBeenCalledWith(true);
    expect(router.navigate).toHaveBeenCalledWith(['trabalhador/inicial']);
  });

  it('should handle login error', () => {
    const error = { error: { message: 'Erro de login' } };
    authService.login.and.returnValue(throwError(error));

    const email = 'teste@teste.com';
    const senha = '123456789';

    component.form.setValue({ email: email, senha: senha });
    component.login();

    expect(messageService.add).toHaveBeenCalledWith({
      severity: 'error',
      summary: 'Erro',
      detail: 'Erro de login',
    });
  });

  it('should navigate to redefinir-senha', () => {
    component.navigateToRedefinirSenha();

    expect(router.navigate).toHaveBeenCalledWith(['redefinir-senha']);
  });

  it('should navigate to cadastro', () => {
    component.navigateToCadastro();

    expect(router.navigate).toHaveBeenCalledWith(['cadastro']);
  });
});
