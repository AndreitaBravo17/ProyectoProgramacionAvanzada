import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PartosComponent } from './partos.component';

describe('PartosComponent', () => {
  let component: PartosComponent;
  let fixture: ComponentFixture<PartosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PartosComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PartosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
