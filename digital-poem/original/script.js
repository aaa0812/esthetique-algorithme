/**
 * Une victime est choisie aléatoirement
 * 
 * ------------- POST-IT :
 * Un post-it montre l'heure et le lieu du décès
 * Les 4 autres montrent chacun des informations sur les suspects
 * 
 * ------------- REGLES :
 * Le tueur est celui n'ayant pas d'alibi
 * Conditions :
 * - personne pour confirmer
 * OU
 * - même endroit que la victime ET - mobile (relation = hate)
 */

const names = [
    "Marie",
    "John",
    "Peter",
    "Victor",
    "Eve"
]

const times = [
    "01:00AM",
    "11:00AM",
    "12:00PM",
    "04:00PM",
    "08:00PM",
]

const places = [
    "PARC",
    "VICTIM HOME",
    "POOL",
    "PARKING"
]

const relation = [
    "HATED",
    "DID NOT KNOW",
    "LOVED"
]

let victim;
let killer;

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

    pickVictim();
    console.log(`*****${victim.name} is dead.*****`);

    stickyNote1 = new ImageButton(stickyNoteImg, 32, 32, snWidth, snWidth, `Victim : ${victim.name}`);
    stickyNote2 = new ImageButton(stickyNoteImg, width / 1.2, 52, snWidth, snWidth, ``);
    stickyNote3 = new ImageButton(stickyNoteImg, width / 2.5, height / 3, snWidth, snWidth);
    stickyNote4 = new ImageButton(stickyNoteImg, width / 6, height / 2, snWidth, snWidth);
    stickyNote5 = new ImageButton(stickyNoteImg, width / 1.3, height / 1.5, snWidth, snWidth);

    stickyNote1.setText(`Time of crime : ${victim.timeOfCrime}\nPlace : ${victim.crimeScene}`);

}

function draw() {
    image(board, 0, 0, width, height);
    stickyNote1.draw();
    stickyNote2.draw();
    stickyNote3.draw();
    stickyNote4.draw();
    stickyNote5.draw();
}

function generateSentence(name) {
    const time = getRandomIndex(5);
    const place = getRandomIndex(4);

    return `${name} was at ${place} at ${time}`;
}

function pickVictim() {
    const i = getRandomIndex(5);
    victim = new Victim(names[i], places[getRandomIndex(4)], times[getRandomIndex(5)]);
    names.splice(i, 1);
}

function pickKiller() {
    const i = getRandomIndex(4);
    killer = names[i];
}

function getRandomIndex(max) {
    return Math.floor(Math.random() * max);
}

class Victim {
    name;
    crimeScene;
    timeOfCrime;
    constructor(name, crimeScene, timeOfCrime) {
        this.name = name;
        this.crimeScene = crimeScene;
        this.timeOfCrime = timeOfCrime;
    }
}

class ImageButton {
    title;
    text = '';
    constructor(img, coordx, coordy, w, h, title) {
        this.title = title;

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

    setText(text) {
        this.text = text;
    }

    draw() {
        this.btn.draw();
    }

    write() {
        console.log(this.title);
        console.log(this.text);
    }
}