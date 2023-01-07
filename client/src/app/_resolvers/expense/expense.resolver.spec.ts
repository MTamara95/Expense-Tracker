import { TestBed } from '@angular/core/testing';

import { ExpenseResolver } from './expense.resolver';

describe('ExpenseResolver', () => {
  let resolver: ExpenseResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(ExpenseResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
