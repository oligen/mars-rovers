import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { inputData } from 'src/assets/data/input';

import { MarsComponent } from './mars.component';

describe('MarsComponent', () => {
  let component: MarsComponent;
  let fixture: ComponentFixture<MarsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MarsComponent ],
      imports: [FormsModule]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MarsComponent);
    component = fixture.componentInstance;
    // fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  //inputUpperRightXCoord
  
  it('should update plateau upper right X coordinate', () => {
    component.upperRightXCoordChange(5);
    expect(component.maxXCoord).toEqual(5);
  });

  it('should update plateau upper right Y coordinate', () => {
    component.upperRightYCoordChange(10);
    expect(component.maxYCoord).toEqual(10);
  });
  
  it('should start mission and move rovers', () => {
    component.missionDataFile = inputData;

    fixture.detectChanges();

    component.startMission();
    
    expect(component.roverListDeployed.length).toBeGreaterThan(0);
    expect(component.missionCompleted).toBeTruthy();
  });
  
  it('should not start mission if no data available', () => {
    component.missionDataFile = {};

    component.startMission();
    
    expect(component.roverListDeployed.length).toEqual(0);
    expect(component.missionCompleted).toBeFalsy();
  });
  
  it('should cancel mission', () => {
    component.inputUpperRightXCoord = 4;
    fixture.detectChanges();

    component.startMission();
    component.cancelMission();
    expect(component.roverListDeployed.length).toEqual(0);
  });
});
