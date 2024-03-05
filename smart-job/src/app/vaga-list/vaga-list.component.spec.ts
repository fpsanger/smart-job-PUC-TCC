import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VagaListComponent } from './vaga-list.component';
import { VagaService } from '../services/vaga.service';
import { HttpClient, HttpHandler } from '@angular/common/http';

describe('VagaListComponent', () => {
  let component: VagaListComponent;
  let fixture: ComponentFixture<VagaListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [
        { provide: VagaService },
        { provide: HttpClient },
        { provide: HttpHandler },
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
