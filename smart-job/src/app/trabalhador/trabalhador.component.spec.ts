import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrabalhadorComponent } from './trabalhador.component';
import { HttpClient, HttpHandler } from '@angular/common/http';
import { DatePipe } from '@angular/common';

describe('TrabalhadorComponent', () => {
  let component: TrabalhadorComponent;
  let fixture: ComponentFixture<TrabalhadorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TrabalhadorComponent],
      providers: [
        { provide: HttpClient },
        { provide: HttpHandler },
        { provide: DatePipe },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(TrabalhadorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
