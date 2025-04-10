import { TestBed } from '@angular/core/testing';

import { IgnAppServiceService } from './ign-app-service.service';

describe('IgnAppServiceService', () => {
  let service: IgnAppServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(IgnAppServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
