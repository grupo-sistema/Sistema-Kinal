import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UnidadesacademicasComponent } from './unidadesacademicas.component';

describe('UnidadesacademicasComponent', () => {
  let component: UnidadesacademicasComponent;
  let fixture: ComponentFixture<UnidadesacademicasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UnidadesacademicasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UnidadesacademicasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
