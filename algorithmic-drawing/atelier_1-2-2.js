const HEIGHT = 400;
const WIDTH = 400;
function setup() {
  createCanvas(WIDTH, HEIGHT);
}

// position des points
let offset = 0;
//espace entre les points
let gap = 16;

//variables pour mieux différencier les points au moment de la génération
let xScale = 0.015;
let yScale = 0.02;

function draw() {
  background(255);
  noStroke();
  //variables pour changer la couleur des points en fonction de la position de la souris
  let x = map(mouseX, 0, WIDTH, 0, 255);
  let y = map(mouseY, 0, WIDTH, 0, 255);
  fill(x, 10, y);

  //récupération de la position de la souris
  offset = mouseX;

  //on parcourt toute la fenêtre pour y placer les points
  for (let x = gap / 2; x < WIDTH; x += gap) {
    for (let y = gap / 2; y < HEIGHT; y += gap) {
      //calcul de la taille des points en fonction de l'offset et de la taille
      let noiseValue = noise((x + offset) * xScale, (y + offset) * yScale);

      //multiplication par le gap pour avoir un diamètre entre 0 et le gap
      let diameter = noiseValue * gap;
      circle(x, y, diameter);
    }
  }
}
