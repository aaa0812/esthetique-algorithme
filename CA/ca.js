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
            // Get cell value
            let cell = currentCells[column][row];
            fill(50 + cell * 12, 20 + cell * 30, 127 + cell * 127);
            stroke(50 + cell * 12, 20 + cell * 30, 127 + cell * 127);
            rect(column * cellSize, row * cellSize, cellSize, cellSize);
        }
    }
    nextCells = makeArray(nbCols, nbRows);
    for (let j = 1; j < nbCols - 1; j++) {
        for (let i = 1; i < nbRows - 1; i++) {
            nextCells[j][i] =
                (2 * currentCells[j][i] - previousCells[j][i]) +
                damping *
                ((currentCells[j - 1][i] + currentCells[j + 1][i] + currentCells[j][i - 1] + currentCells[j][i + 1]) / 4 - currentCells[j][i]);
        }
    }

    for (let j = 0; j < nbCols; j++) {
        for (let i = 0; i < nbRows; i++) {
            if(currentCells[j][i]*0.99 > 0.8) {
                previousCells[j][i] = currentCells[j][i]*0.99;
            } else {
                previousCells[j][i] = currentCells[j][i];
            }
        };
    };
    currentCells = nextCells;
}

function makeArray(cols, rows) {
    let arr = new Array(cols);
    for (let i = 0; i < cols; i++) {
        arr[i] = new Array(rows).fill(0);
    }
    return arr;
}

function mouseClicked() {
    coordX = floor(mouseX / cellSize);
    coordY = floor(mouseY / cellSize);
    if(coordX < width/cellSize && coordY < height/cellSize && coordY >= 0 && coordX >= 0) {
        currentCells[coordX][coordY] = 1;
    }
    loop();
}

function mouseDragged() {
    coordX = floor(mouseX / cellSize);
    coordY = floor(mouseY / cellSize);
    if(coordX < width/cellSize && coordY < height/cellSize && coordY >= 0 && coordX >= 0) {
        currentCells[coordX][coordY] = 0.1;
    }
    loop();
}
