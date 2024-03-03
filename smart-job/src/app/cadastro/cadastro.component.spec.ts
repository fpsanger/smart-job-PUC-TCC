import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CadastroComponent } from './cadastro.component';
import { UntypedFormBuilder } from '@angular/forms';
import { HttpClient, HttpHandler } from '@angular/common/http';
import { MessageService } from 'primeng/api';

describe('CadastroComponent', () => {
  let component: CadastroComponent;
  let fixture: ComponentFixture<CadastroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CadastroComponent],
      providers: [
        { provide: UntypedFormBuilder },
        { provide: HttpClient },
        { provide: HttpHandler },
        { provide: MessageService, useValue: {} },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(CadastroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
