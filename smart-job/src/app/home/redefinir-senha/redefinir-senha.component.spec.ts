import {
  ComponentFixture,
  TestBed,
  fakeAsync,
  tick,
} from '@angular/core/testing';

import { RedefinirSenhaComponent } from './redefinir-senha.component';
import { HttpClient, HttpHandler } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { LoginService } from 'src/app/services/login.service';
import { Router } from '@angular/router';
import { of } from 'rxjs';

describe('RedefinirSenhaComponent', () => {
  let component: RedefinirSenhaComponent;
  let fixture: ComponentFixture<RedefinirSenhaComponent>;
  let formBuilder: FormBuilder;
  let loginService: jasmine.SpyObj<LoginService>;
  let router: jasmine.SpyObj<Router>;

  beforeEach(async () => {
    const loginServiceSpy = jasmine.createSpyObj('LoginService', [
      'redefinirSenha',
    ]);
    const routerSpy = jasmine.createSpyObj('Router', ['navigate']);

    await TestBed.configureTestingModule({
      providers: [
        { provide: HttpClient },
        { provide: HttpHandler },
        { provide: FormBuilder },
        { provide: LoginService, useValue: loginServiceSpy },
        { provide: Router, useValue: routerSpy },
      ],
      declarations: [RedefinirSenhaComponent],
    }).compileComponents();

    formBuilder = TestBed.inject(FormBuilder);
    loginService = TestBed.inject(LoginService) as jasmine.SpyObj<LoginService>;
    router = TestBed.inject(Router) as jasmine.SpyObj<Router>;

    fixture = TestBed.createComponent(RedefinirSenhaComponent);
    component = fixture.componentInstance;
    component.ngOnInit();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should create form', () => {
    expect(component.form).toBeDefined();
    expect(component.form.get('email')).toBeTruthy();
    expect(component.form.get('novaSenha')).toBeTruthy();
  });

  it('should validate fields', () => {
    const emailControl = component.form.get('email');
    const novaSenhaControl = component.form.get('novaSenha');

    emailControl.setValue('');
    novaSenhaControl.setValue('');

    expect(emailControl.hasError('required')).toBe(true);
    expect(novaSenhaControl.hasError('required')).toBe(true);

    emailControl.setValue('teste@teste.com');
    novaSenhaControl.setValue('123');

    expect(emailControl.hasError('required')).toBe(false);
    expect(novaSenhaControl.hasError('required')).toBe(false);
  });

  it('should reset password and navigate to login page', fakeAsync(() => {
    const formData = {
      email: 'teste@teste.com',
      novaSenha: '123',
    };

    loginService.redefinirSenha.and.returnValue(of(true));

    component.form.setValue(formData);

    component.redefinirSenha();
    tick();

    expect(loginService.redefinirSenha).toHaveBeenCalledWith(
      formData.email,
      formData.novaSenha
    );

    expect(router.navigate).toHaveBeenCalledWith(['login']);
  }));
});
