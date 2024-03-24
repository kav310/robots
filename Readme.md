# Martian Robots

This is a TypeScript program for simulating robots moving on the surface of Mars within a rectangular grid. The program determines each sequence of robot positions and reports the final position of each robot.

## Running the Program

To run the program, you can use the following command:

``npx ts-node main.ts``


This command will execute the `main.ts` file using `ts-node`, which compiles TypeScript code on-the-fly and runs it.

## Grid Configuration

You can adjust the size of the grid by modifying the `gridWidth` and `gridHeight` variables in the code:

```typescript
const gridWidth = 5;
const gridHeight = 3;

// Create a new grid
const grid = new Grid(gridWidth, gridHeight);
```

## Adding More Robots

To add more robots to the simulation, you can modify the `robotsData` array in the `main.ts` file. Each element of the array represents a robot and includes its initial position, orientation, and instructions. You can add more objects to the array following the same format.

For example:

```typescript
const robotsData = [
    { x: 1, y: 1, orientation: 'E', instructions: 'RFRFRFRF' },
    { x: 3, y: 2, orientation: 'N', instructions: 'FRRFLLFFRRFLL' },
    { x: 0, y: 3, orientation: 'W', instructions: 'LLFFFLFLFL' },
    // Add more robots as needed
];
```

## Program Explanation

### Grid and Robot Classes

The program includes two classes:

#### Grid Class

- The Grid class represents the rectangular grid on the surface of Mars.
- It contains attributes for the width and height of the grid, as well as a set to store positions of lost robots.
- The constructor initializes the grid with the given width and height, and initializes the set for storing lost robots.
- The isLost method checks if a specific position is marked as lost.
- The markAsLost method marks a position as lost.
- The isWithinBounds method checks if a position is within the bounds of the grid.

#### Robot Class

- The Robot class represents an individual robot moving on the grid.
- It contains attributes for the current x-coordinate, y-coordinate, and orientation of the robot.
- The constructor initializes the robot with the given position and orientation.
- The turnLeft method turns the robot left by updating its orientation.
- The turnRight method turns the robot right by updating its orientation.


### Executing Instructions
The program includes a function called executeInstructions to execute instructions for each robot on the grid. This function iterates through the instructions for each robot and updates their positions and orientations accordingly. It also handles cases where robots move off the grid and get lost, marking their last known position as lost.

### Output
The final positions and orientations of each robot are stored in a map called finalPositions. The program outputs the final positions and orientations of all robots at the end of execution. This output includes information about whether a robot got lost during its movement on the grid.

