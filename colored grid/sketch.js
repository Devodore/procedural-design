let s;
let webImage;

function preload() {
    webImages = [];
    webImages.push(loadImage("https://images.unsplash.com/photo-1500462918059-b1a0cb512f1d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=634&q=80"));
    webImages.push(loadImage("https://images.unsplash.com/photo-1575111100086-59332d3e47bd?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=634&q=80"));
}

function setup() {
    createCanvas(600, 600);
    s = {}
    s.bgColor = '#222222';
    s.rowCount = 50;
    s.columnCount = 15;
    s.rectWidth = 8;
    s.oscAmplitude = 20;
    s.oscFrequency = 0.1;
    s.activeImageIndex = 0;
    background(s.bgColor);
    initColors();
    let gui= new dat.GUI();
    let columnController = gui.add(s, 'columnCount', 1 ,200).name('nombre de colonnes');
    let rowController = gui.add(s, 'rowCount', 1 ,200).name('nombre de lignes');
    let activeImageIndexController = gui.add(s, 'activeImageIndex', [...webImages.keys()]).name('Image numéro');

    activeImageIndexController.onChange(value => {
        s.activeImageIndex = value;
        initColors();
    })
    columnController.onChange(value => {
        s.columnCount = floor(value);
        initColors();
    });
    rowController.onChange(value => {
        s.rowCount = floor(value);
        initColors();
    });
    gui.add(s, 'rectWidth', 0, 100).name('largeur rectange');
    gui.add(s, 'oscFrequency',0, 1).name('Fréquence mouvement');
    gui.add(s, 'oscAmplitude',0, 100).name('Amplitude de mouvement');
    //gui.add(s, 'rowCount',0, 100).name('nombre de lignes');
    //gui.add(s, 'columnCount',0, 100).name('nombre de colonnes');
    //gui.add(this, 'initColors');
    gui.add(s, 'bgColor').name('Couleur de fond');
}

function initColors(){
    s.rectColors = [];
    let webImage = webImages[s.activeImageIndex];
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
            shift+= s.oscAmplitude * sin(frameCount * (s.oscFrequency +j / s.columnCount * s.oscFrequency));
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