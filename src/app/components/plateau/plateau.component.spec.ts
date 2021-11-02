import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Rover } from 'src/app/shared/models/rover';

import { PlateauComponent } from './plateau.component';

describe('PlateauComponent', () => {
  let component: PlateauComponent;
  let fixture: ComponentFixture<PlateauComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PlateauComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PlateauComponent);
    component = fixture.componentInstance;
    // fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  /* it('should detect change after adding new rover', () => {

    let rover: Rover = new Rover(3, 4, 'N', ["M", "M", "M", "M", "M", "M"]);
    component.roverListDeployed = [];
    component.roverListDeployed.push(rover);
    component.upperRightCoordinates = "1,1"

    spyOn(component, 'generatePlateau').and.callThrough();
    
    fixture.detectChanges();
    
    // expect(component.roverListDeployed.length).toBeGreaterThan(0);
    expect(component.generatePlateau).toHaveBeenCalled();
  }); */
});
