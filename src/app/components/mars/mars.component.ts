import { Component, OnInit } from '@angular/core';
import { Rover } from 'src/app/shared/models/rover';
import { inputData } from 'src/assets/data/input';

@Component({
  selector: 'app-mars',
  templateUrl: './mars.component.html',
  styleUrls: ['./mars.component.scss']
})
export class MarsComponent implements OnInit {
  // Plateau default upper right coordinates
  upperRight: string = '0,0';
  inputUpperRightXCoord: number = 0;
  inputUpperRightYCoord: number = 0;
  maxXCoord = 0;
  maxYCoord = 0;

  // Rovers list to be deployed.
  roverList: Rover[] = [];
  roverListDeployed: Rover[] = [];

  // Mission data file.
  missionDataFile: any;

  // Flag to start mission.
  missionStarted = false;
  missionCompleted = false;
  missionWarningMessage = '';

  // Mission log, to display rover movement and mission info.
  missionLog = [];

  // View plateau and rover
  showPlateau = false;

  constructor() { }

  ngOnInit(): void {
    this.missionDataFile = inputData;
    this.getMissionData();
  }

  /**
   * Update upper right X coordinate.
   * @param coordinate is the x coordinate of the upper right plateau.
   */
  upperRightXCoordChange(coordinate: number) {
    this.inputUpperRightXCoord = coordinate;
    this.updateUpperRightCoord();
  }

  /**
   * Update upper right Y coordinate.
   * @param coordinate is the y coordinate of the upper right plateau.
   */
  upperRightYCoordChange(coordinate: number) {
    this.inputUpperRightYCoord = coordinate;
    this.updateUpperRightCoord();
  }

  /**
   * Update upper right coordinate.
   */
  updateUpperRightCoord() {
    this.upperRight = `${this.inputUpperRightXCoord},${this.inputUpperRightYCoord}`;
    this.maxXCoord = this.inputUpperRightXCoord;
    this.maxYCoord = this.inputUpperRightYCoord;
  }

  /**
   * Returns true if plateau upper right coordinate are set and
   * at there is at least one rover.
   * @returns true or false.
   */
  validateForm(): boolean {
    // Plateau coordinates valid?
    if (this.inputUpperRightXCoord <= 0 || this.inputUpperRightYCoord <= 0) {
      this.missionWarningMessage = "Please enter plateau's upper right coordinates.";
      return false;
    }

    // Rover ready?
    if (!this.roverList || (this.roverList && this.roverList.length === 0)) {
      this.missionWarningMessage = "No rover found. Please add at least one rover.";
      return false;
    }

    return true;
  }

  /**
   * Retrun true if upperRight coordinate initialized.
   * @returns true or false;
   */
  getUpperRightCoordinates(): boolean {
    let upperRightCoordinate = this.upperRight.split(",");
    this.addLog(`Initializing plateau. Set upper right coordinates to: ${upperRightCoordinate}`);

    if (upperRightCoordinate.length === 2) {
      this.upperRightXCoordChange(+upperRightCoordinate[0]);
      this.upperRightYCoordChange(+upperRightCoordinate[1]);

      this.addLog(`Plateau initialized with upper right coordinates: ${this.inputUpperRightXCoord}, ${this.inputUpperRightYCoord}`);
      return true;
    } else {
      return false;
    }
  }

  /**
   * Get mission information form input file.
   */
  getMissionData() {
    const data = this.missionDataFile;

    if (data && data.plateau && data.rover && data.rover.length > 0) {
      this.addLog('Loading mission information from data file.');
      this.upperRight = data.plateau.upperRightCoordinate;
      // Get plateau upper right coordinates.
      if (this.getUpperRightCoordinates()) {
        // Get rovers.
        this.getRovers(data.rover);
      }
    } else {
      this.addLog("Warning: cannot read data file or data missing.");
    }
  }

  /**
   * Get rover information from input data file.
   * @param roverData Rover information.
   */
  getRovers(roverData: any[]) {
    if (roverData && roverData.length > 0) {
      roverData.forEach(data => {
        let position = data.position.split(" ");
        if (position && position.length === 3) {
          this.addRover({
            roverXCoord: position[0],
            roverYCoord: position[1],
            roverOrientation: position[2],
            roverInstructions: data.instructions
          });
        } else {
          this.addLog("Warning: Cannot read position or missing position data.");
        }
      });
    }
  }

  /**
   * Add rover data to rover list.
   * @param data rover data enter on form.
   */
  addRover(data) {
    if (data && data.roverXCoord >= 0 && 
        data.roverYCoord >= 0 && 
        data.roverOrientation && 
        data.roverInstructions &&
        this.isRoverWithinPlateau(data)) 
    {
        this.roverList.push(
          new Rover(data.roverXCoord, data.roverYCoord, data.roverOrientation.trim().toUpperCase(), data.roverInstructions.trim())
        );  
        this.addLog(`Added rover at position: ${data.roverXCoord}, ${data.roverYCoord} and heading ${data.roverOrientation}`);
    } else {
      this.addLog(`Error: cannot add rover. ${data}.`);
    }
  }

  /**
   * Return true if rover is positioned within the plateau else false.
   * @param data rover's information.
   * @returns true or false.
   */
  isRoverWithinPlateau(data: any) {
    if (data.roverXCoord <= this.maxXCoord && data.roverYCoord <= this.maxYCoord) {
      return true;
    } else {
      this.addLog(`Rover coordinates(${data.roverXCoord}, ${data.roverYCoord}) are outside the plateau. Plateau max coordinates are (${this.maxXCoord}, ${this.maxYCoord})`);
      return false;
    }
  }

  /**
   * Mission control method.
   */
  startMission() {
    if (this.validateForm()) {
      this.addLog('Starting mission...');
      this.missionStarted = true;
  
      this.roverListDeployed = this.roverList;
      this.addLog('Rovers have landed.');
  
      this.startRoverMission();
    }
  }

  /**
   * Start rover mission by executing rover's instructions.
   * M = move
   * L = rotate 180 degree left
   * R = rotate 180 degree right
   */
  startRoverMission() {
    this.clearLog();

    // Start rover instructions.
    if (this.roverListDeployed && this.roverListDeployed.length > 0) {
      this.addLog('Rover mission started.');
      
      for(let i = 0; i < this.roverListDeployed.length; i++) {
        this.addLog(`Rover ${i+1}: initial position and heading: (${this.roverListDeployed[i].xCoord} ${this.roverListDeployed[i].yCoord} ${this.roverListDeployed[i].orientation}).`);
        
        this.roverListDeployed[i].moveRover(this.maxXCoord, this.maxYCoord);

        this.addLog(`Rover ${i+1}: final position and heading: (${this.roverListDeployed[i].xCoord} ${this.roverListDeployed[i].yCoord} ${this.roverListDeployed[i].orientation})`);
      }

      this.addLog('Rover mission completed.');
      this.missionStarted = false;
      this.missionCompleted = true;
    } else {
      this.addLog("Warning: cannot read rover details or missing rover data.");
    }
  }

  /**
   * Cancel mission by reseting rover list and log.
   */
  cancelMission() {
    this.upperRight = '0,0';
    this.inputUpperRightXCoord = 0;
    this.inputUpperRightYCoord = 0;
    this.maxXCoord = 0;
    this.maxYCoord = 0;
    this.roverList = [];
    this.roverListDeployed = [];
    this.missionStarted = false;
    this.missionCompleted = false;
    this.missionWarningMessage = '';
    this.clearLog();
    this.getMissionData();
  }

  /**
   * Add message to log.
   * @param msg message to keep in log.
   */
  addLog(msg: string) {
    this.missionLog.push({
      message: msg
    });
  }

  /**
   * Clear log.
   */
  clearLog() {
    this.missionLog = [];
  }
}
