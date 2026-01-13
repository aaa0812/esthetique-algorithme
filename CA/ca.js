let cellSize = 10;
let nbCols;
let nbRows;
let currentCells = [];
let nextCells = [];
let previousCells = [];
let damping = 1; //utilisé pour réduire la puissance de la vague

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

/**
 * Parcourt toutes les cases du tableau currentCells pour attribuer la bonne couleur
 * Parcourt aussi le tableau nextCells pour calculer la prochaine génération en fonction d'une équation
 */
function draw() {
    background(255)
    for (let column = 0; column < nbCols; column++) {
        for (let row = 0; row < nbRows; row++) {
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

    //change la puissance des cases du tableau précédent pour changer les couleurs
    for (let j = 0; j < nbCols; j++) {
        for (let i = 0; i < nbRows; i++) {
            if(currentCells[j][i]*0.99 > 0.2) {
                previousCells[j][i] = currentCells[j][i]*0.99;
            } else {
                previousCells[j][i] = currentCells[j][i];
            }
        };
    };
    currentCells = nextCells;
}

/**
 * Rempli un tableau avec des 0 en le parcourant grâce aux paramètres
 * @param {*} cols nombre de colonnes
 * @param {*} rows nombres de lignes
 * @returns le tableau rempli de 0
 */
function makeArray(cols, rows) {
    let arr = new Array(cols);
    for (let i = 0; i < cols; i++) {
        arr[i] = new Array(rows).fill(0);
    }
    return arr;
}

/**
 * Attribue la valeur 1 à la case cliquée
 * Les vagues partent de ce point
 * Appelle checkBounds pour éviter des erreurs
 */
function mouseClicked() {
    coordX = floor(mouseX / cellSize);
    coordY = floor(mouseY / cellSize);
    if(checkBounds(coordX, coordY)) {
        currentCells[coordX][coordY] = 1;
    }
    loop();
}

/**
 * Attribue la valeur 0.1 aux case surlesquelles le curseur passe
 * Appelle checkBounds pour éviter des erreurs
 */
function mouseDragged() {
    coordX = floor(mouseX / cellSize);
    coordY = floor(mouseY / cellSize);
    if(checkBounds(coordX, coordY)) {
        currentCells[coordX][coordY] = 0.2;
    }
    loop();
}

/**
 * Vérifie que les paramètres ne dépassent pas les dimensions du tableau
 * @param {*} coordA paramètre à vérifier
 * @param {*} coordB paramètre à vérifier
 * @returns vrai ou faux, si la condition est vérfiée ou non
 */
function checkBounds(coordA, coordB) {
    if(coordA < width/cellSize && coordB < height/cellSize && coordB >= 0 && coordA >= 0) {
        return true;
    } else {
        return false
    }
}