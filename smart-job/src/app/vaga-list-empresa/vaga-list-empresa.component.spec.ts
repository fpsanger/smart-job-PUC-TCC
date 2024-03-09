import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VagaListEmpresaComponent } from './vaga-list-empresa.component';
import { HttpClient, HttpHandler } from '@angular/common/http';

describe('VagaListEmpresaComponent', () => {
  let component: VagaListEmpresaComponent;
  let fixture: ComponentFixture<VagaListEmpresaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [{ provide: HttpClient }, { provide: HttpHandler }],
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
