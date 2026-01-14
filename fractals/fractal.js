let angle;

function setup() {
    createCanvas(640, 640);
    colorMode(HSB);
    angleMode(DEGREES);
    slider = createSlider(1, 14);
    slider.size(width);
    slider.position(6, height);
}

function draw() {
    background(0);

    angle = 30;

    // on se place au milieu de la fenêtre
    translate(width / 2, height / 2);

    // Draw a line 120 pixels
    strokeWeight(8);
    stroke(0, 255, 255);
    line(0, 0, 0, -42);

    branch(-42, 0);
    // Move to the end of that line
    translate(0, -42);
    // Start the recursive branching
    branch(42, 0);
}

function branch(h, level) {

    strokeWeight(8 / level);

    // limite à n récursions
    if (level < slider.value()) {
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
    }
}