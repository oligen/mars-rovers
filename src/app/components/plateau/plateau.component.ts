import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { UtilityService } from 'src/app/shared/services/utility.service';
import { Cell, Plateau } from '../../shared/models/plateau';
import { Rover } from '../../shared/models/rover';

@Component({
  selector: 'app-plateau',
  templateUrl: './plateau.component.html',
  styleUrls: ['./plateau.component.scss']
})
export class PlateauComponent implements OnInit, OnChanges {

  // Upper right coordinates (x,y).
  @Input() upperRightCoordinates;
  @Input() roverListDeployed: Rover[];

  plateau: Plateau;
  upperRightXY = [];
  cells: Cell[][] = [];
  reverseCells: Cell[][] = []; // Todo rename.
  xCols = [];
  yRows = [];

  roverList: Rover[] = [];

  constructor() { }

  ngOnChanges(changes: SimpleChanges): void {
    this.generatePlateau();
  }

  ngOnInit(): void {
  }

  /**
   * Generate the plateau based on the upper right coordinates.
   * @param coordinates upper right coordinates (x,y).
   */
  generatePlateau() {
    this.upperRightXY = this.upperRightCoordinates.split(",");

    if (this.upperRightXY.length === 2) {
      this.plateau = new Plateau(this.upperRightXY[0], this.upperRightXY[1]);
      this.cells = this.plateau.buildPlateau();
      this.displayPlateau();
    }
  }
  
  /**
   * Display plateau  y revesring the array of cells.
   */
  displayPlateau() {
    this.reverseCells = [];
    this.xCols = [];
    this.yRows = [];

    if (this.cells) {
      let reverseXCells = this.cells; //.reverse();
      for (let x = 0; x < reverseXCells.length; x++) {  
        this.reverseCells[x] = [];
        this.yRows = [];
        let reverseYCells = this.cells[x]; //.reverse();
        if (reverseYCells.length > 0) {
          for (let y = reverseYCells.length - 1; y >= 0; y--) {
            this.yRows.push(y);
            this.reverseCells[x][y] = {
              xCoord: x,
              yCoord: y,
              rovers: []
            };
          }
        }
        this.xCols.push(x);
      }
    }
  }

  getRovers(x: number, y: number): Rover[] {
    let rovers: Rover[] = [];

    this.roverListDeployed.forEach((rover: Rover) => {
      if (+rover.xCoord === x && +rover.yCoord === y) {
        rovers.push(rover);
      }
    });

    return rovers;
  }

  isCellCoordPrime(num: number) {
    return UtilityService.isPrimeNumber(num);
  }
}



