import { TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { Rover } from './rover';

describe('Rover', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [FormsModule]
    });
  });

  it('should create an instance', () => {
    expect(new Rover(3, 5, 'N', "M, M, M, M, M, M")).toBeTruthy();
  });

  it('should create rover', () => {
    let rover = new Rover(3, 5, 'N', "R, R, M");
    expect(rover.xCoord).toEqual(3);
    expect(rover.yCoord).toEqual(5);
  });

  it('should move to next cell', () => {
    let rover: Rover;
    rover = new Rover(3, 5, 'N', "R, M, R, M");
    rover.moveRover(10, 10);
    expect(rover.yCoord).toEqual(6);

    rover = new Rover(3, 5, 'E', "R, M, L, M");
    rover.moveRover(10, 10);
    expect(rover.yCoord).toEqual(5);

    rover = new Rover(4, 5, 'S', "R, M, L, M");
    rover.moveRover(10, 10);
    expect(rover.yCoord).toEqual(5);

    rover = new Rover(4, 5, 'W', "R, M, L, M");
    rover.moveRover(10, 10);
    expect(rover.yCoord).toEqual(5);

    rover = new Rover(4, 5, 'A', "R, M, L, M");
    rover.moveRover(10, 10);
    expect(rover.yCoord).toEqual(5);
  });

  it('should change orientation', () => {
    let rover: Rover; 
    
    rover = new Rover(3, 5, 'N', "L, R, M");
    rover.changeOrientation();
    expect(rover.orientation).toEqual('S');
    rover.changeOrientation();
    expect(rover.orientation).toEqual('N');

    rover = new Rover(3, 5, 'S', "L, R, M");
    rover.changeOrientation();
    expect(rover.orientation).toEqual('N');
    rover.changeOrientation();
    expect(rover.orientation).toEqual('S');

    rover = new Rover(3, 5, 'W', "L, R, M");
    rover.changeOrientation();
    expect(rover.orientation).toEqual('E');
    rover.changeOrientation();
    expect(rover.orientation).toEqual('W');

    rover = new Rover(3, 5, 'E', "L, R, M");
    rover.changeOrientation();
    expect(rover.orientation).toEqual('W');
    rover.changeOrientation();
    expect(rover.orientation).toEqual('E');
    
    // Unknown direction, no change in orientation.
    rover.changeOrientation();
    expect(rover.orientation).toEqual(rover.orientation);
  })

  it('should not move if sum of x and y is a prime number', () => {
    let rover: Rover = new Rover(3, 5, 'W', "M, R, M");
    spyOn(rover, 'canRoverMoveTo').and.stub();
    rover.moveRover(10, 10);
    expect(rover.canRoverMoveTo).toHaveBeenCalled();
    expect(rover.xCoord).toEqual(3);
    expect(rover.yCoord).toEqual(5);
  });

  it('should return rover current position and heading', () => {
    let rover: Rover = new Rover(3, 5, 'N', "L, R, M");
    expect(rover.getRoverPosition()).toEqual('3 5 N');
  });
});
