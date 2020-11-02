import { TestBed } from '@angular/core/testing';

import { OfferResolverService } from './offer-resolver.service';

describe('OfferResolverService', () => {
  let service: OfferResolverService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OfferResolverService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
