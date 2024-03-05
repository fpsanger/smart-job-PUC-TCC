import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VagaComponent } from './vaga.component';
import { ActivatedRoute } from '@angular/router';
import { Router } from 'express';
import { MessageService } from 'primeng/api';
import { VagaService } from '../services/vaga.service';

describe('VagaComponent', () => {
  let component: VagaComponent;
  let fixture: ComponentFixture<VagaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [
        { provide: VagaService },
        { provide: MessageService },
        { provide: Router },
        { provide: ActivatedRoute },
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
