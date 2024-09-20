

var kit;

var playButton;

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

  playButton = createButton('Play');
  playButton.position(550, 300);
  playButton.mouseClicked(togglePlay);
}

function draw() {
  background(200);
  // kit.player("hho").start();
}

function togglePlay() {
  kit.player("hho").start();
}

function keyPressed() {
}