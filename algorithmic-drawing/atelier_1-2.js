const HEIGHT = 400;
const WIDTH = 400;
function setup() {
  createCanvas(WIDTH, HEIGHT);
  // suppression du remplissage des courbes pour ne pas avoir d'applât
  noFill();
}

//coordonnées du premier point d'ancrage
let x1;
let x2;
//coordonnées de la prémière "poignée" de la courbe, là où la courbe sera tirée
let x3;
let x4;
//cordonnées de la deuxième "poignée" de la courbe
let y1;
let y2;

//variable permettant de changer les cordonnées à chaque itération
let offset = 0;

function draw() {
  strokeWeight(0.1);
  //placement du premier point de la courbe au milieu de la fenêtre
  x1 = WIDTH/2;
  x2 = HEIGHT/2;
  //génération aléatoire de la postion des poignées
  x3 = noise(offset + 15) * WIDTH;
  x4 = noise(offset + 20) * WIDTH;
  y1 = noise(offset + 25) * HEIGHT;
  y2 = noise(offset + 30) * HEIGHT;
  //incrémention de l'offset pour avoir des valeurs aléatoires différentes
  offset += 0.1;

  //définition de la couleur de la courbe en fonction de la position du curseur
  stroke(mouseY, mouseY/mouseX, mouseX);
  //dessin de la courbe en fonction de la position du curseur
  bezier(x1, x2, x3, x4, y1, y2, mouseX, mouseY);
}
