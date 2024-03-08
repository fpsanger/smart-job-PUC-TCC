import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CadastroVagaComponent } from './cadastro-vaga.component';
import { HttpClient, HttpHandler } from '@angular/common/http';
import { VagaService } from '../services/vaga.service';
import { FormBuilder } from '@angular/forms';
import { DatePipe } from '@angular/common';

describe('CadastroVagaComponent', () => {
  let component: CadastroVagaComponent;
  let fixture: ComponentFixture<CadastroVagaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [
        { provide: HttpClient },
        { provide: HttpHandler },
        { provide: VagaService },
        { provide: FormBuilder },
        { provide: DatePipe },
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
