import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PlateauComponent } from 'src/app/components/plateau/plateau.component';
import { Plateau } from './plateau';

describe('Plateau', () => {

  it('should create an instance', () => {
    expect(new Plateau(10,10)).toBeTruthy();
  });

  it('should build plateau', () => {
    let plateau = new Plateau(10,10);
    plateau.buildPlateau();
    expect(plateau.cells.length).toBeGreaterThan(0);
  });

  it('should validate prime numbers', () => {
    let plateau;
    plateau = new Plateau(10,10);
    expect(plateau.isCellCoordPrime()).toBeFalsy();
    
    plateau = new Plateau(1,2);
    expect(plateau.isCellCoordPrime()).toBeTruthy();
  });
});
