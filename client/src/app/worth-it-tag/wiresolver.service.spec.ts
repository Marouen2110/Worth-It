import { TestBed } from '@angular/core/testing';

import { WIResolverService } from './wiresolver.service';

describe('WIResolverService', () => {
  let service: WIResolverService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WIResolverService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
