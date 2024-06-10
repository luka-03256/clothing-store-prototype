import { TestBed } from '@angular/core/testing';

import { ClothesDetailsResolverService } from './clothes-details-resolver.service';

describe('ClothesDetailsResolverService', () => {
  let service: ClothesDetailsResolverService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ClothesDetailsResolverService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
