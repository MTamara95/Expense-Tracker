import { TestBed } from '@angular/core/testing';

import { AssetResolver } from './asset.resolver';

describe('AssetResolver', () => {
  let resolver: AssetResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(AssetResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
