import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JornadaSeccionComponent } from './jornada-seccion.component';

describe('JornadaSeccionComponent', () => {
  let component: JornadaSeccionComponent;
  let fixture: ComponentFixture<JornadaSeccionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JornadaSeccionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JornadaSeccionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
