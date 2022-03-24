

var NumOfDiscsSelection;
let n;
let discs = [];
var pillars = [];
let run = false;
let showPillars = false;
let discHeight = 30;

function move(source, target) {
  let maxHeight = floor((height / 2) - 200);
  let v = 1;

  console.log('Move from', source.letter, 'to ', target.letter)


  // move the disc UP
  console.log(source)

  while (source.discs[0].y >= maxHeight) {
    source.discs[0].y -= v;
  }

  // move the disc left or right

  // if the target letter is lower than the source letter, we're moving left so v needs to be negative
  if (source.letter.charCodeAt(0) > target.letter.charCodeAt(0)) {
    v *= -1;
  }
  if (v < 0) {
    while (source.discs[0].x >= target.x) {
      source.discs[0].x -= v;
    }
  } else {
    while (source.discs[0].x <= target.x) {
      source.discs[0].x += v;
    }
  }


  // move disc down
  // each disc has the same height so it doesn't matter which we use
  let targetHeight = height - (target.discs.length * discHeight) - discHeight;
  while (source.discs[0].y <= targetHeight) {
    source.discs[0].y += abs(v) // just so we don't have to multiply again
  }
  // now that the disc should be "moved" we just have to change which pillar object it's stored in
  // console.log("Move from " + source + " to " + target)
  temp = source.discs[0]
  source.discs.shift();
  target.discs.splice(0, 0, temp);


}

function TowerOfHanoi(NumOfDiscs, source, aux, target) {
  if (NumOfDiscs != 0) {
    TowerOfHanoi(NumOfDiscs - 1, source, target, aux)
    move(source, target)
    TowerOfHanoi(NumOfDiscs - 1, aux, source, target)
  }
}



function setup() {
  frameRate(2)
  createCanvas(1000, 600);
  background(220);
  strokeWeight(16);
  stroke(0)
  NumOfDiscsSelection = createSelect();
  pillars.push(new Pillar(floor(width / 6), 'a', []));
  pillars.push(new Pillar(floor(width / 2), 'b', []));
  pillars.push(new Pillar(floor(5 * width / 6), 'c', []));


  // pillars[0].discs.push(new Disc(1, 1, 50));
  for (let i = 1; i < 100; i++) {
    NumOfDiscsSelection.option(i);
  }
  for (let pillar of pillars) {
    pillar.show();
  }
}

function draw() {
  n = parseInt(NumOfDiscsSelection.value());

  if (showPillars) {
    for (let i = 0; i < n; i++) {
      let newW = map(i + 1, 1, n + 1, 200, 30);
      pillars[0].discs.push(new Disc(1, i + 1, newW, discHeight));
      for (let d of pillars[0].discs) {
        d.show();
      }
    }
    showPillars = false;
  }


  if (run) {
    TowerOfHanoi(n, pillars[0], pillars[1], pillars[2])
  }
  if (pillars[2].discs.length == n * 2) {
    noLoop();
  }
}
function keyPressed() {
  if (key == ' ') {
    run = true;
  }
  if (keyCode == RETURN) {
    showPillars = true;
  }
}