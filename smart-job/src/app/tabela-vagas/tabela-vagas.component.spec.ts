import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TabelaVagasComponent } from './tabela-vagas.component';
import { IVaga } from '../interfaces/vaga.interface';

describe('TabelaVagasComponent', () => {
  let component: TabelaVagasComponent;
  let fixture: ComponentFixture<TabelaVagasComponent>;

  let vagas = [
    {
      Nome: 'Nome',
    },
  ] as IVaga[];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TabelaVagasComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TabelaVagasComponent);
    component = fixture.componentInstance;
    component.vagas = vagas;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
