// Class representing the grid
class Grid {
    width: number; // Width of the grid
    height: number; // Height of the grid
    lostRobots: Set<string>; // Set to store positions of lost robots

    // Constructor to initialize the grid with given width and height
    constructor(width: number, height: number) {
        this.width = width;
        this.height = height;
        this.lostRobots = new Set();
    }

    // Method to check if a specific position is marked as lost
    isLost(x: number, y: number): boolean {
        return this.lostRobots.has(`${x},${y}`);
    }

    // Method to mark a position as lost
    markAsLost(x: number, y: number): void {
        this.lostRobots.add(`${x},${y}`);
    }

    // Method to check if a position is within the bounds of the grid
    isWithinBounds(x: number, y: number): boolean {
        return x >= 0 && x <= this.width && y >= 0 && y <= this.height;
    }
}

// Class representing a robot
class Robot {
    x: number; // Current x-coordinate
    y: number; // Current y-coordinate
    orientation: string; // Current orientation

    // Constructor to initialize the robot with given position and orientation
    constructor(x: number, y: number, orientation: string) {
        this.x = x;
        this.y = y;
        this.orientation = orientation;
    }

    // Method to turn the robot left
    turnLeft(): void {
        switch (this.orientation) {
            case 'N':
                this.orientation = 'W';
                break;
            case 'W':
                this.orientation = 'S';
                break;
            case 'S':
                this.orientation = 'E';
                break;
            case 'E':
                this.orientation = 'N';
                break;
        }
    }

    // Method to turn the robot right
    turnRight(): void {
        switch (this.orientation) {
            case 'N':
                this.orientation = 'E';
                break;
            case 'E':
                this.orientation = 'S';
                break;
            case 'S':
                this.orientation = 'W';
                break;
            case 'W':
                this.orientation = 'N';
                break;
        }
    }
}

// Function to execute instructions for a robot on the grid
function executeInstructions(grid: Grid, robot: Robot, instructions: string): void {
    for (const instruction of instructions) {
        if (instruction === 'L') {
            robot.turnLeft();
        } else if (instruction === 'R') {
            robot.turnRight();
        } else if (instruction === 'F') {
            let newX = robot.x;
            let newY = robot.y;
            if (robot.orientation === 'N') {
                newY += 1;
            } else if (robot.orientation === 'E') {
                newX += 1;
            } else if (robot.orientation === 'S') {
                newY -= 1;
            } else if (robot.orientation === 'W') {
                newX -= 1;
            }
            if (grid.isWithinBounds(newX, newY)) {
                robot.x = newX;
                robot.y = newY;
            } else {
                const position = `${robot.x} ${robot.y}`;
                if (!grid.isLost(robot.x, robot.y)) {
                    grid.markAsLost(robot.x, robot.y);
                    return; // Stop further execution if the robot gets lost
                }
            }
        }
    }
}

// Main function to execute the simulation
function main(): void {
    // Initialize grid dimensions
    const gridWidth = 5;
    const gridHeight = 3;

    // Create a new grid
    const grid = new Grid(gridWidth, gridHeight);

    // Robot data including initial position, orientation, and instructions
    const robotsData = [
        { x: 1, y: 1, orientation: 'E', instructions: 'RFRFRFRF' },
        { x: 3, y: 2, orientation: 'N', instructions: 'FRRFLLFFRRFLL' },
        { x: 0, y: 3, orientation: 'W', instructions: 'LLFFFLFLFL' }
        // Add more robots as needed
    ];

    // Map to store final positions and orientations
    const finalPositions = new Map<string, string>();

    // Iterate through each robot's data
    for (const robotData of robotsData) {
        const { x, y, orientation, instructions } = robotData;
        // Create a new robot
        const robot = new Robot(x, y, orientation);
        // Execute instructions for the robot
        executeInstructions(grid, robot, instructions);

        // Construct the key for the final position and orientation
        const key = `${robot.x} ${robot.y} ${robot.orientation}`;

        // Check if the robot is lost and adjust the output accordingly
        const output = grid.isLost(robot.x, robot.y) ? `${key} LOST` : key;

        // Store the output in the finalPositions map
        finalPositions.set(key, `Final position and orientation: ${output}`);
    }

    // Output the final positions and orientations
    for (const value of finalPositions.values()) {
        console.log(value);
    }
}

// Call the main function to execute the simulation
main();
