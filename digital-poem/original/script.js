function preload() {
    board = loadImage('assets/board.jpg');
    stickyNoteImg = loadImage('assets/sticky-note.png');
}

function setup() {
    createCanvas(1000, 740);
    frameRate(30);
    background(220);
    imageMode(CORNER);
    let snWidth = width / 6;

    stickyNote1 = new ImageButton(stickyNoteImg, 32, 32, snWidth, snWidth, 'banane');
    stickyNote2 = new ImageButton(stickyNoteImg, width / 1.2, 52, snWidth, snWidth);
    stickyNote3 = new ImageButton(stickyNoteImg, width / 2.5, height / 3, snWidth, snWidth);
    stickyNote4 = new ImageButton(stickyNoteImg, width / 6, height / 2, snWidth, snWidth);
    stickyNote5 = new ImageButton(stickyNoteImg, width / 1.3, height / 1.5, snWidth, snWidth);
}

function draw() {
    image(board, 0, 0, width, height);
    stickyNote1.draw();
    stickyNote2.draw();
    stickyNote3.draw();
    stickyNote4.draw();
    stickyNote5.draw();
}

class ImageButton {
    text;
    constructor(img, coordx, coordy, w, h, textToDisplay = '') {
        this.text = textToDisplay;

        this.btn = new Clickable();     //Create button
        this.btn.locate(coordx, coordy);
        
        this.btn.onHover = () => {
            document.body.style.cursor = "pointer";
        }
        
        this.btn.onOutside = () => {
            document.body.style.cursor = "default";
        }

        this.btn.onPress = () => {
            this.write();
        }
        this.btn.image = img;
        this.btn.imageScale = 1.2;
        this.btn.width = w;
        this.btn.height = h;
        this.btn.fitImage = true;
        this.btn.text = "";
        this.btn.color = "#00000000";
        this.btn.strokeWeight = 0;
    }

    draw() {
        this.btn.draw();
    }

    write() {
        console.log(this.text);
    }
}