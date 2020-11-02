import { TestBed } from '@angular/core/testing';

import { AnnonceResolverService } from './annonce-resolver.service';

describe('AnnonceResolverService', () => {
  let service: AnnonceResolverService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AnnonceResolverService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
