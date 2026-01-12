const HEIGHT = 400;
const WIDTH = 400;

function setup() {
  createCanvas(HEIGHT, WIDTH);
}

function draw() {
  background(500);
  const A = HEIGHT/2;
  const B = WIDTH/2;
  for(let i = 1; i<2; i++) {
    let r = HEIGHT*0.7;
    for(let w = PI/4; w < 3.6; w+= 0.05) {
      let X = r*cos(w);
      let Y = r*sin(w);
      line(A+X, B-Y, A-Y, B-X);
      line(A-Y, B-X, A-X, B+X);
      line(A-X, B+Y, A+X, B-Y);
      line(A-X, B+Y, A+Y, B+X);
      line(A+Y, B+X, A+X, B-Y);
      r=r*0.94;
    }
  }
}
