import { TestBed } from '@angular/core/testing';

import { MintAngularCloudService } from './mint-angular-cloud.service';

describe('MintAngularCloudService', () => {
  let service: MintAngularCloudService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MintAngularCloudService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
