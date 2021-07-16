import { TestBed } from '@angular/core/testing';

import { PitanjaService } from './pitanja.service';

describe('PitanjaService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PitanjaService = TestBed.get(PitanjaService);
    expect(service).toBeTruthy();
  });
});
