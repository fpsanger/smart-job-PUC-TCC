import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VagaListComponent } from './vaga-list.component';
import { VagaService } from '../../services/vaga.service';
import { HttpClient, HttpHandler } from '@angular/common/http';
import { ConfirmationService, MessageService } from 'primeng/api';
import { AuthService } from 'src/app/services/auth/auth.service';

describe('VagaListComponent', () => {
  let component: VagaListComponent;
  let fixture: ComponentFixture<VagaListComponent>;

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
        { provide: ConfirmationService },
        { provide: MessageService },
        { provide: AuthService, useValue: mockAuthService },
      ],
      declarations: [VagaListComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(VagaListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
