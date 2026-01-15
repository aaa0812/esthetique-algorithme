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
 * - personne pour confirmer + HATED
 * OU
 * - même endroit que la victime avant le meurtre ET - mobile (relation = hated)
 * OU
 * - même endroit PENDANT le meurtre + relation = did not know
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
let suspects = [];
let stickyNotes = [];

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
    let posX = [
        (width / 1.3),
        (width / 6),
        (width / 6),
        (width/1.3)
    ];

    let posY = [
        (height/4),
        (height / 4),
        (height / 1.5),
        (height/1.5)
    ]

    pickVictim();
    pickKiller();
    generateSuspects();
    suspects.splice(getRandomIndex(suspects.length+1), 0, killer); //ajoute le tueur à la liste de suspects, de manière aléatoire pour éviter qu'il soit toujours sur le même post-it
    //suspects.forEach((e)=> console.log(e))

    victimStickyNote = new StickyNote(stickyNoteImg, (width /2 - snWidth/2), 32, snWidth, snWidth, `Victim : ${victim.name}`);
    victimStickyNote.setText(`Time of crime : ${victim.timeOfCrime}\nPlace : ${victim.crimeScene}`);

    //création d'un post-it par suspect
    suspects.forEach((suspect, i) => {
        let text = generateSentence(suspect.name, suspect.place, suspect.time, suspect.relationToVictim);
        let susStickyNote = new StickyNote(stickyNoteImg, posX[i], posY[i], snWidth, snWidth, suspect.name);
        susStickyNote.setText(text);
        if(suspect.verifiedAlibi) {
            let name;
            do {
                name = names[getRandomIndex(names.length)];
            } while(name === suspect.name)
                susStickyNote.setAlibi(`${name} confirmed.`);
        }

        stickyNotes.push(susStickyNote);
    })

    console.log(`*****${victim.name} is dead.*****`);

}

function draw() {
    image(board, 0, 0, width, height);
    victimStickyNote.draw();
    stickyNotes.forEach((note) => {
        note.draw()
    })
}

function generateSentence(name, place, time, relation) {
    return `${name} ${relation} the victim. \n${name} was at ${place} at ${time}`;
}

function pickVictim() {
    const i = getRandomIndex(5);
    victim = new Victim(names[i], places[getRandomIndex(4)], times[getRandomIndex(5)]);
    names.splice(i, 1);
}

function pickKiller() {
    const i = getRandomIndex(4);
    killer = new Killer(names[i]);
    names.splice(i, 1);
}

function generateSuspects() {
    names.forEach((name) => {
        let sus = new Suspect(name);
        suspects.push(sus);
    })
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

class Killer {
    name;
    place;
    time;
    relationToVictim;
    verifiedAlibi;
    constructor(name) {
        this.name = name;

        this.verifiedAlibi = getRandomIndex(2) === 0 ? true : false; //une chance sur 2 que le tueur aie un alibi
        if (!this.verifiedAlibi) {
            this.relationToVictim = 'HATED'; //si le tueur n'a personne pour confirmer son alibi, on marque qu'il détestait la victime
            this.time = victim.timeOfCrime;
            do {
                this.place = places[getRandomIndex(4)];
            } while (this.place === victim.crimeScene) //on veut que le tueur dise qu'il n'était pas sur les lieux du crime
        } else {
            do {
                this.relationToVictim = relation[getRandomIndex(3)];
            } while (this.relationToVictim === "LOVED");
            if (this.relationToVictim === "HATED") {
                this.place = victim.crimeScene;
                this.time = times[getRandomIndex(5)];
            } else {
                this.place = victim.crimeScene;
                this.time = victim.timeOfCrime;
            }
        }
    }

}

class Suspect {
    name;
    place;
    time;
    relationToVictim;
    verifiedAlibi;
    constructor(name) {
        this.name = name;
        this.time = times[getRandomIndex(times.length)];
        this.relationToVictim = relation[getRandomIndex(relation.length)]
        this.verifiedAlibi = getRandomIndex(2) === 0 ? true : false;
        if (this.verifiedAlibi) {
            do {
                this.place = places[getRandomIndex(places.length)];
            } while (this.place === victim.crimeScene && this.time === victim.timeOfCrime)
        } else {
            this.place = places[getRandomIndex(places.length)];
        }
    }
}

class StickyNote {
    title;
    text = '';
    verifiedAlibi = '';
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
    setAlibi(alibi) {
        this.verifiedAlibi = alibi;
    }

    draw() {
        this.btn.draw();
    }

    write() {
        console.log(this.title);
        console.log(this.text);
        if(this.verifiedAlibi !== '') {
            console.log(this.verifiedAlibi);
        }
    }
}