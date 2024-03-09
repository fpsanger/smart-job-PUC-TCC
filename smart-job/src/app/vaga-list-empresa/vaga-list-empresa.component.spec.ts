import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VagaListEmpresaComponent } from './vaga-list-empresa.component';

describe('VagaListEmpresaComponent', () => {
  let component: VagaListEmpresaComponent;
  let fixture: ComponentFixture<VagaListEmpresaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VagaListEmpresaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VagaListEmpresaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
