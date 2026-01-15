const sals1 = [
    "CHER",
    "TRES CHER",
    "MON"
   ];

const sals2 = [
    "RESEAU", 
    "MEMBRE",
    "ABONNE"
    ];


const adjs = [
    "FORT", 
    "TRES FORT",
    "INCOMMENSURABLE", 
    "PROFOND"
];

const nouns = [
    "INTERET",
    "ENTREPRISE"
];

const advs = [
    "VRAIMENT",
    "REELLEMENT",
    "PROFONDEMENT",
    "PARTICULIEREMENT",
];

const verbs = [
    "SUSCITE",
    "ENGENDRE",
    "ATTIRE"
];

function rel(array) {
    return array[Math.floor(Math.random() * array.length)];
} 

function generateLetterContent() {
    const SHORT = 1;
    const LONG = 2;
    let last = null;

    let ll = `     ${rel(sals1)} ${rel(sals2)},\n     `;

    for (let i = 0; i < 5; i++) {
        if (Math.random() < 0.5) {
            // LONG
            let optadj1 = (Math.random() < 0.5) ? '' : rel(adjs);
            let noun1 = rel(nouns);
            let optadv = (Math.random() < 0.5) ? '' : rel(advs);
            let verb = rel(verbs);
            let optadj2 = (Math.random() < 0.5) ? '' : rel(adjs);
            let noun2 = rel(nouns);

            let concat = (last !== null || last === LONG) ? ". " : "";

            ll += `${concat}VOTRE ${optadj1} ${noun1} ${verb} ${optadv}  MON ${optadj2} ${noun2}`;
            last = LONG;

        } else {
            // SHORT
            let adj = rel(adjs);
            let noun = rel(nouns);
            let concat = (last === SHORT) ? ", " : (last === LONG) ? ". VOUS ETES" : "VOUS ETES ";

            ll += `${concat} MON ${adj} ${noun}`;
            last = SHORT;
        }
    }

    let adv = rel(advs);
    ll += `.\n     ${adv} VOTRE\n `;

    ll = ll.replace(/ /g, ' ');
    ll = ll.replace(/\n/g, "<br><br>")
    console.log(ll);
    return ll;
}

function generate() {
    var letterDiv = document.getElementById('letter');
    letterDiv.innerHTML = generateLetterContent();
}

function getVocab(){
    generate();  
    
    var colsals1 = sals1.join("\n").replace(/ /g, '&nbsp;').replace(/\n/g, "<br>");
    var colsals2 = sals2.join("\n").replace(/ /g, '&nbsp;').replace(/\n/g, "<br>")
    var coladjs = adjs.join("\n").replace(/ /g, '&nbsp;').replace(/\n/g, "<br>")
    var colnouns = nouns.join("\n").replace(/ /g, '&nbsp;').replace(/\n/g, "<br>")
    var colverbs = verbs.join("\n").replace(/ /g, '&nbsp;').replace(/\n/g, "<br>")
    var coladvs = advs.join("\n").replace(/ /g, '&nbsp;').replace(/\n/g, "<br>")

    document.getElementById('sals1').innerHTML = colsals1;
    document.getElementById('sals2').innerHTML = colsals2;
    document.getElementById('adjs').innerHTML = coladjs;
    document.getElementById('nouns').innerHTML = colnouns;
    document.getElementById('verbs').innerHTML = colverbs;
    document.getElementById('advs').innerHTML = coladvs;
}