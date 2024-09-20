

// # of steps, the number of potential notes in the loop
var nSteps = 8;
// # of tracks, the number of samples that can be used in the loop
var nTracks = 4;
// instantiating the array of samples
var kit;
// width & height of each box in the sequencer
var cellWidth, cellHeight;
// IDK YET IDK YET IDK YET
var beats = 0;
// array of the individual on/off states of the cells
var cells = [];
// decides which column of steps is being played
var currentStep = 0;
var playButton;

// IDK YET IDK YET IDK YET
var drumNames = ["hho", "hh", "snare", "kick"];

kit = new Tone.Players(
  {"hho" : "/assets/samples/hho.mp3",
   "hh" : "/assets/samples/hh.mp3",
   "snare" : "/assets/samples/snare.mp3",
   "kick" : "/assets/samples/kick.mp3"
  });

kit.toMaster();
Tone.Transport.bpm.value = 180;
Tone.Transport.scheduleRepeat(onBeat, "8n");

function setup() {
  createCanvas(600, 300);

  cellWidth = width/nSteps;
  cellHeight = height/nTracks;

  for(var track=0; track<nTracks; track++){
    cells[track] = [];
    for(var step=0; step<nSteps; step++){
      cells[track][step] = -1;
    }
  }

  playButton = createButton('Play');
  playButton.position(550, 300);
  playButton.mouseClicked(togglePlay);
}

function onBeat(time){
  for(var track=0; track<nTracks; track++){
    if(cells[track][currentStep] == 1){
      var drum = kit.get(drumNames[track]);
      drum.start(time);
    }
  }
  beats++;
  currentStep = (beats) % nSteps;

  console.log(beats, currentStep);
}

function draw() {
  background(255);
  stroke(0);

  // fills in cells that are on
  for(var track=0; track<nTracks; track++){
  	for(var step=0; step<nSteps; step++){
  		if(cells[track][step] == 1){
        fill(150 - track*30);
        rect(step*cellWidth,track*cellHeight,cellWidth, cellHeight);
      }
  	}
  }
  
  //vertical lines
  for(var i=0; i<nSteps; i++){
  	line(i*cellWidth,0,i*cellWidth,height);
  }
  
  //horizontal lines
  for(var j=0; j<nTracks; j++){
  	line(0,j*cellHeight,width,j*cellHeight);
  }
  
  // IDK YET IDK YET IDK YET
  highlight = (beats-1) % nSteps;
	fill(200, 60);
	noStroke();
	rect(highlight*cellWidth, 0, cellWidth, height);
  
}

function mousePressed() {
  if(0<mouseX && mouseX<width && 
    0<mouseY && mouseY<height){
   
   var i = floor(mouseX/cellWidth);
   var j = floor(mouseY/cellHeight);
   
   cells[j][i] = -cells[j][i];
 }
}

function togglePlay() {
  if(Tone.Transport.state == "started"){
  	Tone.Transport.stop();
    playButton.html('Play');
  } else {
  	Tone.Transport.start();
    playButton.html('Stop');
  }
}

function keyPressed() {
}