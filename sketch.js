

var playButton;

// beats per minute
var bpm = 120;

// current millisecond and previous millisecond
var cms,pms;

var currentStep = 0;
var nSteps = 16;
var nTracks = 4;

var started = false;

let hho, hh, snare, kick;

let cellWidth, cellHeight;

var cells = [];



function preload() {
  soundFormats('mp3');
  hho = loadSound('assets/samples/hho.mp3');
  hh = loadSound('assets/samples/hh.mp3');
  snare = loadSound('assets/samples/snare.mp3');
  kick = loadSound('assets/samples/kick.mp3');
}



function setup() {
  createCanvas(600, 300);

  playButton = createButton('Play');
  playButton.position(550, 300);
  playButton.mouseClicked(toggle);

  textAlign(LEFT, CENTER);
  textSize(10);
  textFont('Courier New');
  pms = 0;

  cellWidth = width/nSteps;
  cellHeight = height/nTracks;

  for (var track = 0; track<nTracks; track++) {
    cells[track] = [];
    for(var step=0; step<nSteps; step++){
      cells[track][step] = -1;
    }
  }
}



function draw() {
  cms = millis();
  
  background(200);
  print('draw');
  // kit.player("hho").start();

  if (started) {
    runLoop();
  };

  drawGrid();
  
  text(currentStep, 5, 60, 90);
}



function runLoop() {
  if (cms - pms >= (60000 / bpm)) {
    if (currentStep > nSteps-1) {
      currentStep = 1;
    } else {
      currentStep++;
    }
    pms = cms;
  }
  noStroke();
  fill(100, 100, 100, 40);
  rect((currentStep-1)*cellWidth, 0, cellWidth, height);
}

function drawGrid() {
  // vertical lines
  stroke(50);
  strokeWeight(1);
  for(var i=0; i<nSteps; i++) {
    line(i*cellWidth,0,i*cellWidth,height);
  }
}

function toggle() {
  currentStep = 0;
  if (started == false) {
    started = true;
    playButton.html('Stop');
  } else {
    started = false;
    playButton.html('Play');
  }
}

function mousePressed() {
  if (0<mouseX && mouseX<width &&
      0<mouseY && mouseY<height) {
    
        var i = floor(mouseX/cellWidth);
        var j = floor(mouseY/cellHeight);

        cells[j][i] = -cells[j][i];
  }
}