import { UtilityService } from "../services/utility.service";
import { Rover } from "./rover"

export class Plateau {
    upperRightXCoord: number;
    upperRightYCoord: number;
    cells: Cell[][] = [];

    constructor(upperRightXCoord: number, upperRightYCoord: number) {
        this.upperRightXCoord = +upperRightXCoord;
        this.upperRightYCoord = +upperRightYCoord;
    }

    buildPlateau() {
        this.cells = [];
    
        if (this.upperRightXCoord > 0 && this.upperRightYCoord > 0 ) {
            // 0,0 bottom left. y rows & x cols
            for (let x = 0; x < this.upperRightXCoord + 1; x++) {
                this.cells[x] = [];
                for (let y = 0; y < this.upperRightYCoord + 1; y++) {
                    this.cells[x][y] = {
                        xCoord: x,
                        yCoord: y,
                        rovers: []
                    };
                }
            }
        }
        return this.cells;
    }

    /**
     * Verify if input is a prime number.
     * @param num input integer.
     * @returns true or false.
     */
    isCellCoordPrime(): boolean {
      return UtilityService.isPrimeNumber(this.upperRightXCoord + this.upperRightYCoord);
    }
}

export class Cell {
    xCoord: number
    yCoord: number
    rovers: Rover[]
}