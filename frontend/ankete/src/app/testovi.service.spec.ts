import { TestBed } from '@angular/core/testing';

import { TestoviService } from './testovi.service';

describe('TestoviService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TestoviService = TestBed.get(TestoviService);
    expect(service).toBeTruthy();
  });
});
