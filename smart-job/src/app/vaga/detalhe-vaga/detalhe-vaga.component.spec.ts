import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VagaComponent } from './detalhe-vaga.component';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { HttpClient, HttpHandler } from '@angular/common/http';
import { VagaService } from 'src/app/services/vaga.service';
import { AuthService } from 'src/app/services/auth/auth.service';

describe('DetalheVagaComponent', () => {
  let component: VagaComponent;
  let fixture: ComponentFixture<VagaComponent>;

  const mockAuthService = {
    getTokenData() {
      return { id: 1 };
    },
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [
        { provide: VagaService },
        { provide: HttpClient },
        { provide: HttpHandler },
        { provide: MessageService },
        { provide: ConfirmationService },
        { provide: Router, useValue: {} },
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              params: {
                id: '1',
              },
            },
          },
        },
        { provide: AuthService, useValue: mockAuthService },
      ],
      declarations: [VagaComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(VagaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
