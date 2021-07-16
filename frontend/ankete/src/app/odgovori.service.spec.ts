import { TestBed } from '@angular/core/testing';

import { OdgovoriService } from './odgovori.service';

describe('OdgovoriService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: OdgovoriService = TestBed.get(OdgovoriService);
    expect(service).toBeTruthy();
  });
});
