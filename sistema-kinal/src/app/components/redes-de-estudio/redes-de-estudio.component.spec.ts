import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RedesDeEstudioComponent } from './redes-de-estudio.component';

describe('RedesDeEstudioComponent', () => {
  let component: RedesDeEstudioComponent;
  let fixture: ComponentFixture<RedesDeEstudioComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RedesDeEstudioComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RedesDeEstudioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
