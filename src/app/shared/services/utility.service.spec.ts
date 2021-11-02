import { TestBed } from '@angular/core/testing';

import { UtilityService } from './utility.service';

describe('UtilityService', () => {
  let service: UtilityService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UtilityService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('Should validate length of the string Truth Condition', () => {
    expect(UtilityService.isPrimeNumber(2)).toBeTruthy();
    expect(UtilityService.isPrimeNumber(3)).toBeTruthy();
    expect(UtilityService.isPrimeNumber(61)).toBeTruthy();
    expect(UtilityService.isPrimeNumber(257)).toBeTruthy();
    expect(UtilityService.isPrimeNumber(1)).toBeFalsy();
    expect(UtilityService.isPrimeNumber(18)).toBeFalsy();
    expect(UtilityService.isPrimeNumber(55)).toBeFalsy();
  });
});
