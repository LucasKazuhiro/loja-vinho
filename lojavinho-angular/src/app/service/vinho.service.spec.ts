import { TestBed } from '@angular/core/testing';

import { VinhoService } from './vinho.service';

describe('VinhoService', () => {
  let service: VinhoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VinhoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
