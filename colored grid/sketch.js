let s;
let webImage;

function preload() {
    webImage = loadImage("https://images.unsplash.com/photo-1500462918059-b1a0cb512f1d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=634&q=80");
}

function setup() {
    createCanvas(600, 600);
    s = {}
    s.bgColor = color(33);
    s.rowCount = 50;
    s.columnCount = 15;
    initColors();
    s.rectWidth = 8;
    s.oscAmplitude = 20;
    s.oscFrequency = 0.10;
    let gui= new dat.GUI();
    gui.add(s, 'rectWidth',0, 100);
    gui.add(s, 'oscFrequency',0, 1);
    gui.add(s, 'oscAmplitude',0, 100);
    gui.add(s, 'rowCount',0, 100);
    gui.add(s, 'columnCount',0, 100);
}

function initColors(){
    s.rectColors = [];
    s.seed = floor(random(1000));
    for (let i = 0; i < s.rowCount * s.columnCount; i++){
        let x = random(0, webImage.width)
        let y = random(0, webImage.height)
        let c = webImage.get(x, y);
        s.rectColors.push(c);
    }
    background(s.bgColor);
}

function draw() {
    background(s.bgColor);
    randomSeed(s.seed);
    drawGrid(500, 500);
}

function drawGrid(w, h) {
    let cellWidth = w / s.columnCount;
    let cellHeight = h / s.rowCount;
    push();
    translate((width -w)/2, (height - h)/2);
    let k = 0;
    for (let i = 0; i < s.columnCount; i++){
        for (let j = 0; j < s.rowCount; j++){
            let c = s.rectColors[k];
            noStroke();
            fill(c);
            push();
            let shift = s.oscAmplitude * sin(frameCount * s.oscFrequency+j);
            shift+= s.oscAmplitude * sin(frameCount * (s.oscFrequency +j / s.rowCount * s.oscFrequency));
            translate((cellWidth - s.rectWidth) / 2 + shift, 0);
            rect(i * cellWidth, j* cellHeight, s.rectWidth, cellHeight);
            pop();
            k++;
        }
    }
    pop()
}

function keyTyped() {
    if (key === 'n') {
        initColors();
    }
}