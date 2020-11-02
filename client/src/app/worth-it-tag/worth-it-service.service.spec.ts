import { TestBed } from '@angular/core/testing';

import { WorthItService } from './worth-it-service.service';

describe('WorthItServiceService', () => {
  let service: WorthItService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WorthItService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
