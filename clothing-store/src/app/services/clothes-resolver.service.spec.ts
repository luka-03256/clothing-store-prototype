import { TestBed } from '@angular/core/testing';

import { ClothesResolverService } from './clothes-resolver.service';

describe('ClothesResolverService', () => {
  let service: ClothesResolverService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ClothesResolverService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
