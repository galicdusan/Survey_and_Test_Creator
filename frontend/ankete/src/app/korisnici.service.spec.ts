import { TestBed } from '@angular/core/testing';

import { KorisniciService } from './korisnici.service';

describe('KorisniciService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: KorisniciService = TestBed.get(KorisniciService);
    expect(service).toBeTruthy();
  });
});
