import { TestBed } from '@angular/core/testing';

import { SistemaGuard } from './sistema.guard';

describe('SistemaGuard', () => {
  let guard: SistemaGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(SistemaGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
