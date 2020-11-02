import { TestBed } from '@angular/core/testing';

import { DiscussionResolverService } from './discussion-resolver.service';

describe('DiscussionResolverService', () => {
  let service: DiscussionResolverService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DiscussionResolverService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
