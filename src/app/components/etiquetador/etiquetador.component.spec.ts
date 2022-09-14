import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EtiquetadorComponent } from './etiquetador.component';

describe('EtiquetadorComponent', () => {
  let component: EtiquetadorComponent;
  let fixture: ComponentFixture<EtiquetadorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EtiquetadorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EtiquetadorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
