const HEIGHT = 400;
const WIDTH = 400;

function setup() {
  createCanvas(HEIGHT, WIDTH);
}

function draw() {
  background(500);
  const A = HEIGHT/2;
  const B = WIDTH/2;
  let r = HEIGHT*0.7;
  //initialisation d'un compteur couleur pour changer la couleur des lignes dans la boucle
  let colorCount = 250;
  for(let w = PI/4; w < 3.6; w+= 0.05) {
      let X = r*cos(w);
      let Y = r*sin(w);
      
      stroke(colorCount /2, colorCount / 3, colorCount);
      line(A+X, B-Y, A-Y, B-X);
      line(A-Y, B-X, A-X, B+X);
      line(A-X, B+Y, A+X, B-Y);
      line(A-X, B+Y, A+Y, B+X);
      line(A+Y, B+X, A+X, B-Y);
      //décrémentation du compteur couleur pour changer la couleur à la prochaine itération
      colorCount -=20;
      
      r=r*0.94;
  }
}
