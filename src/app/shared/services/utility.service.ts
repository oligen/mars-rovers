import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UtilityService {

  constructor() { }

  /**
   * Verify if input is a prime number.
   * @param num input integer.
   * @returns true or false.
   */
  static isPrimeNumber(num: number): boolean {
    for(let i = 2, s = Math.sqrt(num); i <= s; i++)
        if(num % i === 0) return false; 
    return num > 1;
  }
}
