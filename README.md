# Mars Rovers

Case study `Mars Rover problem`.


## Installation
1. Download or copy the project on your local machine.
2. To install the dependencies, open a terminal and navigate to the project folder and run:
   ```
   npm install
   ```

## Running the application

1. Start the application. Open a terminal and navigate to the project folder and run
   ```
   npm start
   ```
2. Open a browser and go to http://localhost:4200

## Input

There are two ways to input data for the mission to be successful:
1. Update the file "input.ts" found in ".\src\assets\data".

    `Sample data`:
    ```
    {
        plateau: {
            upperRightCoordinate: "5,8"
        },
        rover: [
            {
                position: "0 0 N",
                instructions: "M, M, M, M, M, M"
            },
            {
                position: "1 0 S",
                instructions: "M, L, M, R, M, M"
            }
        ]
    }
    ```
2. Input the data on the form provided.

## Output

Given the Mars' plateau upper right coordinates and a list of rovers the app will execute the mission and output the position and heading of each rover.

`Example`:
```
[0] 0, 0, N

[1] 1, 0, S
```

## How to start the mission (move the rovers on the plateau)
Follow these steps to run the application:
1. Choose between the two methods mentioned above, in `Input`.
2. Open a browser and go to http://localhost:4200
3. Click on the `Start Mission` button
4. The result will be displayed in the `Rovers final coordinates and heading` section.
5. There is also a mission log under `Mission log` section.


## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

Run `npm run text-coverage` to execute the unit tests with code coverage.

### Last code coverage result:
1. Statements   : 80.92% ( 157/194 )
2. Branches     : 77.41% ( 72/93 )
3. Functions    : 80.55% ( 29/36 )
4. Lines        : 80.66% ( 146/181 )

