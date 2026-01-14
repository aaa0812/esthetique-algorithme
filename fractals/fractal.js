let angle;
let color = 150; // variable to store color
let i = 255; //
let bgColor = 0;
let sound;

function preload() {
    soundFormats('mp3', 'ogg');
    sound = loadSound('hearthbeat.mp3');
}

function setup() {
    createCanvas(640, 640);
    colorMode(HSB);
    angleMode(DEGREES);
    angle = 30;
    background(0);
    frameRate(60);
}

function draw() {
    //si le background n'est pas noir, on diminue sa valeur grâce à la variable i
    if(bgColor > 0) {
        bgColor -= i*10;
    }
    background(bgColor);
    i++;
    
    // on se place au milieu de la fenêtre
    translate(width / 2, height / 2);
    
    //fill with color
    stroke(0, 250, color);
    strokeWeight(8);
    // on dessine une ligne de 42 pixels vers le haut
    line(0, 0, 0, -42);

    //première récursion pour commencer les branches vers le bas
    branch(-42, 0);

    // On se décale à la fin de la ligne
    translate(0, -42);
    //récursion pour faire les branches vers le haut
    branch(42, 0);
}

function branch(h, level) {

    stroke(0, 250, (color-level*10));
    strokeWeight(8 / level);

    // limite à n récursions, en fonction de la valeur du slider
    if (level < 12) {
        // Draw the right branch
        // Save the current coordinate system
        push();
        //rotation
        rotate(angle);
        //on dessine la ligne / branche
        line(0, 0, 0, -h);
        //on se place à la fin de la branche
        translate(0, -h);
        // on rappelle branch de manière récursive
        branch(h, level + 1);
        // Restore the saved coordinate system
        pop();

        // La même chose, pour la branche de gauche
        push();
        rotate(-angle);
        line(0, 0, 0, -h);
        translate(0, -h);
        branch(h, level + 1);
        pop();
    } else {
        //noLoop();
    }
}

function mousePressed() {
    //loop();
    bgColor = 255;
    i = 0;
    sound.play();
}