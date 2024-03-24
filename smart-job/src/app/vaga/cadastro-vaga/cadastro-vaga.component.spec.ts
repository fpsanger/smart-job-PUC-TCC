import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CadastroVagaComponent } from './cadastro-vaga.component';
import { HttpClient, HttpHandler } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { MessageService } from 'primeng/api';
import { VagaService } from 'src/app/services/vaga.service';
import { AuthService } from 'src/app/services/auth/auth.service';

describe('CadastroVagaComponent', () => {
  let component: CadastroVagaComponent;
  let fixture: ComponentFixture<CadastroVagaComponent>;

  const mockAuthService = {
    getTokenData() {
      return { id: 1 };
    },
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [
        { provide: HttpClient },
        { provide: HttpHandler },
        { provide: VagaService },
        { provide: FormBuilder },
        { provide: DatePipe },
        { provide: MessageService },
        { provide: AuthService, useValue: mockAuthService },
      ],
      declarations: [CadastroVagaComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CadastroVagaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
