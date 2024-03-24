import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VagaListEmpresaComponent } from './vaga-list-empresa.component';
import { HttpClient, HttpHandler } from '@angular/common/http';
import { MessageService } from 'primeng/api';
import { AuthService } from 'src/app/services/auth/auth.service';

describe('VagaListEmpresaComponent', () => {
  let component: VagaListEmpresaComponent;
  let fixture: ComponentFixture<VagaListEmpresaComponent>;

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
        { provide: MessageService },
        { provide: AuthService, useValue: mockAuthService },
      ],
      declarations: [VagaListEmpresaComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(VagaListEmpresaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
