import { UtilityService } from "../services/utility.service";
import { Log } from "./log";

export class Rover {
    xCoord: number;
    yCoord: number;
    orientation: string; // N, E, S, W
    instructions: string; // L, R, M

    constructor(xCoord: number, yCoord: number, orientation: string, instructions: string) {
        this.xCoord = xCoord;
        this.yCoord = yCoord;
        this.orientation = orientation;
        this.instructions = instructions;
    }

    /**
     * Method change the orientation of the rover based on it's 
     * initial orientation and rotating it by 180 degree.
     * Example: rover is heading if North
     *  if direction is L
     *      rover rotates to South
     */
     changeOrientation() {
        switch(this.orientation.toUpperCase()) {
            case 'N':
                this.orientation = 'S';
                break;
            case 'E':
                this.orientation = 'W';
                break;
            case 'S':
                this.orientation = 'N';
                break;
            case 'W':
                this.orientation = 'E';
                break;
            default:
                break;
          }
    }

    /**
     * Move rover to final location by executing the instructions.
     * @param maxXCoord maximum x coordinate.
     * @param maxYCoord maximum y coordinate.
     */
    moveRover(maxXCoord: number, maxYCoord: number) {
        if (this.instructions && this.instructions.length > 0) {
            let instructionList = this.instructions.split(",");

            for(let i = 0; i < this.instructions.length; i++) {
                switch(this.instructions[i].toUpperCase()) {
                    case 'M':
                        this.moveForward(maxXCoord, maxYCoord);
                        break;
                    case 'L':
                        this.changeOrientation();
                        break;
                    case 'R':
                        this.changeOrientation();
                        break;
                }
            }
        }       
    }

    /**
     * Method moves rover forward by one cell in the orientation/direction it is heading.
     * @param maxXCoord maximum x coordinate.
     * @param maxYCoord maximum y coordinate.
     */
    moveForward(maxXCoord: number, maxYCoord: number) {
        switch(this.orientation.toUpperCase()) {
            case 'N':
                if (this.yCoord + 1 <= maxYCoord && this.canRoverMoveTo(this.xCoord, this.yCoord + 1)) {
                    this.yCoord = +this.yCoord + 1;
                }
                break;
            case 'S':
                if (this.yCoord - 1 >= 0 && this.canRoverMoveTo(this.xCoord, this.yCoord - 1)) {
                    this.yCoord = +this.yCoord - 1;
                }
                break;
            case 'W':
                if (this.xCoord - 1 >= 0 && this.canRoverMoveTo(this.xCoord - 1, this.yCoord)) {
                    this.xCoord = +this.xCoord - 1;
                }
                break;
            case 'E':
                if (this.xCoord + 1 <= maxXCoord && this.canRoverMoveTo(this.xCoord + 1, this.yCoord)) {
                    this.xCoord = +this.xCoord + 1;
                }
                break;
        }
    }

    /**
     * Rover has a bug it cannot move to a position where
     * x + y = prime number.
     * Method return true if x + y !== prime number.
     * @param x X coordinate.
     * @param y Y  coordinate.
     * @returns true or false.
     */
    canRoverMoveTo(x: number, y: number) {
        return !UtilityService.isPrimeNumber(x+y);
    }

    /**
     * Returns the current position of the rover.
     * @returns xCoord, yCoord, orientation
     */
    getRoverPosition() {
        return `${this.xCoord} ${this.yCoord} ${this.orientation}`;
    }
}
