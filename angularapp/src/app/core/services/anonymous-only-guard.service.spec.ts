import { TestBed } from '@angular/core/testing';

import { AnonymousOnlyGuardService } from './anonymous-only-guard.service';

describe('AnonymousOnlyGuardService', () => {
  let service: AnonymousOnlyGuardService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AnonymousOnlyGuardService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
