import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TabelaVagasComponent } from './tabela-vagas.component';

describe('TabelaVagasComponent', () => {
  let component: TabelaVagasComponent;
  let fixture: ComponentFixture<TabelaVagasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TabelaVagasComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TabelaVagasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
