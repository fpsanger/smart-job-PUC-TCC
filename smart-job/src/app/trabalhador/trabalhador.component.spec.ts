import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrabalhadorComponent } from './trabalhador.component';

describe('TrabalhadorComponent', () => {
  let component: TrabalhadorComponent;
  let fixture: ComponentFixture<TrabalhadorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TrabalhadorComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TrabalhadorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
