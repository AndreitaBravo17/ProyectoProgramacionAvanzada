import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecienNacidosComponent } from './recien-nacidos.component';

describe('RecienNacidosComponent', () => {
  let component: RecienNacidosComponent;
  let fixture: ComponentFixture<RecienNacidosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RecienNacidosComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RecienNacidosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
