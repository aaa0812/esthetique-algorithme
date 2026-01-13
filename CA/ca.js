let cellSize = 10;
let nbCols;
let nbRows;
let currentCells = [];
let nextCells = [];
let previousCells = [];
let damping = 1;

function setup() {
    frameRate(16);
    createCanvas(640, 640);
    // Calculate columns and rows
    nbCols = floor(width / cellSize);
    nbRows = floor(height / cellSize);

    // initialisation des tableaux
    previousCells = makeArray(nbCols, nbRows);
    currentCells = makeArray(nbCols, nbRows);

    noLoop();
}

function draw() {
    background(255)
    for (let column = 0; column < nbCols; column++) {
        for (let row = 0; row < nbRows; row++) {
            // Get cell value (0 or 1)
            let cell = currentCells[column][row];
            fill(50+ noise(cell * 250), cell * 30, 150+ cell * 250);
            stroke(50+ noise(cell * 250), cell * 30, 150+cell * 250);
            rect(column * cellSize, row * cellSize, cellSize, cellSize);
        }
    }
    nextCells = makeArray(nbCols, nbRows);
    for (let i = 1; i < nbCols - 1; i++) {
        for (let j = 1; j < nbRows - 1; j++) {
            nextCells[i][j] =
                (2 * currentCells[i][j] - previousCells[i][j]) +
                damping *
                ((currentCells[i - 1][j] + currentCells[i + 1][j] + currentCells[i][j - 1] + currentCells[i][j + 1]) / 4 - currentCells[i][j]);
        }
    }

    previousCells = currentCells;
    currentCells = nextCells;
}

function mouseClicked() {
    coordX = floor(mouseX / cellSize);
    coordY = floor(mouseY / cellSize);
    currentCells[coordX][coordY] = 1;
    loop();
}

function makeArray(cols, rows) {
    let arr = new Array(cols);
    for (let i = 0; i < cols; i++) {
        arr[i] = new Array(rows).fill(0);
    }
    return arr;
}
