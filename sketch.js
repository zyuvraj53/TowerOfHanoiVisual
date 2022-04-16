

var NumOfDiscsSelection;
let n;
let discs = [];
var pillars = [];
var moves = [];
let run = false;
let showPillars = false;
let discHeight = 30;
let totalMovesP;
let totalMoves = 0;


function TowerOfHanoi(NumOfDiscs, source, aux, target) {
  if (NumOfDiscs != 0) {
    TowerOfHanoi(NumOfDiscs - 1, source, target, aux);
    moves.push([source, target]);
    TowerOfHanoi(NumOfDiscs - 1, aux, source, target);

  }
}


function runMoves() {
 
  let move = moves[0]
  let source = move[0];
  let target = move[1];
  let sDisc = source.discs[source.discs.length - 1]; // the last disc in the source
  sDisc.x = target.x; // set source disc x value = target pillar's x value
  let targetHeight = height - (target.discs.length * discHeight) - discHeight; // set y value for source disc to the top of the target pillar's stack
  sDisc.y = targetHeight;
  let tempDisc = source.discs.pop();
  target.discs.push(tempDisc);
  console.log('Move from', source.letter, 'to ', target.letter)
  background(220)

  for (let p of pillars) {
    strokeWeight(16);
    stroke(0)
    p.show();
    for (let d of p.discs) {
      d.show();
    }
  }
  moves.shift();
  totalMoves++;
}



function setup() {
  frameRate(10)
  createCanvas(1000, 600);
  background(220);
  strokeWeight(16);
  stroke(0)
  totalMovesP = createP();
  NumOfDiscsSelection = createSelect();
  pillars.push(new Pillar(floor(width / 6), 'a', []));
  pillars.push(new Pillar(floor(width / 2), 'b', []));
  pillars.push(new Pillar(floor(5 * width / 6), 'c', []));


  for (let i = 1; i < 100; i++) {
    NumOfDiscsSelection.option(i);
  }
  for (let pillar of pillars) {
    pillar.show();
  }
}

function draw() {
  background(220);
  n = parseInt(NumOfDiscsSelection.value());
  totalMovesP.html("Total Moves: " + totalMoves);

  if (showPillars) {

    for (let i = 0; i < n; i++) {
      let newW = map(i + 1, 1, n + 1, 200, 30);
      pillars[0].discs.push(new Disc(1, i + 1, newW, discHeight));
    }
    showPillars = false;
  }

  for (let p of pillars) {
    strokeWeight(16);
    stroke(0)
    p.show();
    for (let d of p.discs) {
      d.show();
    }
  }

  if (run) {
    TowerOfHanoi(n, pillars[0], pillars[1], pillars[2]);
    if (frameCount % 5 == 0) {
      runMoves();
    }
  }
  if (pillars[2].discs.length == n) {
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