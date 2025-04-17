import { TestBed } from '@angular/core/testing';

import { ApiCadastreParcelleService } from './api-cadastre-parcelle.service';

describe('ApiCadastreParcelleService', () => {
  let service: ApiCadastreParcelleService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApiCadastreParcelleService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
