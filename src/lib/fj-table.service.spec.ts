import { TestBed } from '@angular/core/testing';

import { FjTableService } from './fj-table.service';

describe('FjTableService', () => {
  let service: FjTableService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FjTableService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
