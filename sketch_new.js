// derived from : Daniel Shiffman, original code:
// https://thecodingtrain.com/CodingChallenges/074-clock.html

// edit : Adrien Duqué
// (quick and dirty code, just don't look at it)

let width, height;

class Clock {
  constructor(bipSound) {
    //state variables
    this.isPaused = true;
    this.millisTime = 0;
    this.startTime = 0;
    this.pauseTime = 0;
    this.alreadyPlaying = false;

    this.button1 = createButton("Start");

    this.button2 = createButton("Reset");
    this.placeCenterFromCenterOfScreenLolThisFunctionNameIsTooLongIHaveNotSleptHelp(
      this.button2,
      -5,
      180
    );
    this.button2.mousePressed(() => this.reset());

    // Display variables
    this.bipSound = bipSound;
    this.minutes = 0;
    this.seconds = 0;
    this.displayTimeString = "00:00";

    //initialization
    this.reset();
  }

  placeCenterFromCenterOfScreenLolThisFunctionNameIsTooLongIHaveNotSleptHelp(
    element,
    x,
    y
  ) {
    let centerOffset = [floor(element.width / 2), floor(element.height / 2)];
    element.position(
      width / 2 - centerOffset[0] + x,
      height / 2 - centerOffset[1] + y
    );
  }
  run() {
    // paused mode
    if (this.isPaused) {
      this.show();
      return;
    }
    // normal mode
    if (this.seconds % 15 == 0) {
      if (!this.alreadyPlaying) {
        bip.play();
        this.alreadyPlaying = true;
      }
    } else {
      this.alreadyPlaying = false;
      // while seconds is %15 do not replay the sound
    }

    this.updateTime();
    this.show();
  }

  pause() {
    this.isPaused = true;
    this.button1.html("Start");
    this.placeCenterFromCenterOfScreenLolThisFunctionNameIsTooLongIHaveNotSleptHelp(
      this.button1,
      -5,
      100
    );
    this.button1.mousePressed(() => this.start());
    this.pauseTime = new Date().getTime();
    this.button2.show();
  }

  start() {
    this.isPaused = false;
    this.button1.html("Pause");
    this.placeCenterFromCenterOfScreenLolThisFunctionNameIsTooLongIHaveNotSleptHelp(
      this.button1,
      -20,
      100
    );
    this.button1.mousePressed(() => this.pause());
    this.startTime += new Date().getTime() - this.pauseTime; // offset to not account for paused time in this.updateTime()
    this.button2.hide();
  }

  reset() {
    this.startTime = new Date().getTime();
    this.minutes = 0;
    this.seconds = 0;
    this.displayTimeString = "00:00";
    this.pause();
  }

  updateTime() {
    this.millisTime = new Date().getTime();
    let elapsedTime = floor((this.millisTime - this.startTime) / 1000);
    this.minutes = floor(elapsedTime / 60);
    this.seconds = elapsedTime % 60;
    this.displayTimeString = nf(this.minutes, 2) + ":" + nf(this.seconds, 2); // sûrement pour avoir 00:00 au lieu de 0:0
  }

  showNeedles() {
    push();
    rotate(-90);
    // l'arc des secondes
    strokeWeight(8);
    stroke(255);
    noFill();
    let secondAngle = map(this.seconds, 0, 60, 0, 360);
    let bigRadius = 500; // 300
    arc(0, 0, bigRadius, bigRadius, 0, secondAngle);
    // l'arc des minutes
    stroke(0, 0, 200);
    let minuteAngle = map(this.minutes, 0, 60, 0, 360);
    let littleRadius = 480; // 280
    arc(0, 0, littleRadius, littleRadius, 0, minuteAngle);
    pop();
  }

  showStateString() {
    fill(255);
    noStroke();
    textAlign(CENTER);
    textSize(100); // 50
    text(this.displayTimeString, 0, 35);
  }
  show() {
    translate(width / 2, height / 2);
    this.showNeedles();
    this.showStateString();
  }
}

var bip;
var clock;
function preload() {
  bip = loadSound("bip.mp3");
}

function setup() {
  width = windowWidth;
  height = windowHeight;
  createCanvas(width, height);
  angleMode(DEGREES);
  clock = new Clock(bip);
}

function draw() {
  background(0);
  clock.run();
}
