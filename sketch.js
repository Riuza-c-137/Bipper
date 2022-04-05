// Daniel Shiffman
// https://thecodingtrain.com/CodingChallenges/074-clock.html

// edit : Adrien Duqué

let width, height;
let start_time;

let sc = 0;
let mn = 0;
let button_text = "Start";

var ding;
function preload() {
  ding = loadSound("ding.mp3");
}

function setup() {
  width = windowWidth;
  height = windowHeight;
  start_time = millis();
  createCanvas(width, height);
  angleMode(DEGREES);

  button = createButton(button_text);
  button.position(width / 2 - 55, height / 2 + 200);
  button.style("background-color", "#0000c8");
  button.style("color", "#FFFFFF");
  button.style("font-size", "50px");
  button.style("border", "#FFFFFF");
  button.mousePressed(reset_timer);
}

let pause = true;
let current_time = 2;

function draw() {
  background(0);
  translate(width / 2, height / 2);

  push();
  rotate(-90);
  if (!pause) {
    current_time = floor((millis() - start_time) / 1000);
    truc_a_print = convertSeconds(current_time);
  } else {
    truc_a_print = "Pause";
  }

  strokeWeight(8);
  stroke(255);
  noFill();
  let secondAngle = map(sc, 0, 60, 0, 360);
  arc(0, 0, 300, 300, 0, secondAngle);

  stroke(0, 0, 200);
  let minuteAngle = map(mn, 0, 60, 0, 360);
  arc(0, 0, 280, 280, 0, minuteAngle);
  pop();

  if (current_time % 15 == 0) {
    if (!ding.isPlaying()) {
      ding.play();
    }
  }
  //   push();
  //   rotate(secondAngle);
  //   stroke(255, 100, 150);
  //   line(0, 0, 100, 0);
  //   pop();

  //   push();
  //   rotate(minuteAngle);
  //   stroke(150, 100, 255);
  //   line(0, 0, 75, 0);
  //   pop();

  //   push();
  //   rotate(hourAngle);
  //   stroke(150, 255, 100);
  //   line(0, 0, 50, 0);
  //   pop();

  //   stroke(255);
  //   point(0, 0);

  fill(255);
  noStroke();
  textAlign(CENTER);
  textSize(50);
  text(truc_a_print, 0, 20);
}

function convertSeconds(s) {
  mn = floor(s / 60);
  sc = s % 60;

  return nf(mn, 2) + ":" + nf(sc, 2);
}

function reset_timer() {
  pause = false;
  start_time = millis();
  button_text = "Restart"; // on peut pas faire ça il est draw que dans le setup, on le réactualise pas
}
