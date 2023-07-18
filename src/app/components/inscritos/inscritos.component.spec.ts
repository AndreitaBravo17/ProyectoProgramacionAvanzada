import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InscritosComponent } from './inscritos.component';

describe('InscritosComponent', () => {
  let component: InscritosComponent;
  let fixture: ComponentFixture<InscritosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InscritosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InscritosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
