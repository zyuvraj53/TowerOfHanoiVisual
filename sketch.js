

var NumOfDiscsSelection;
let n;
let discs = [];
var pillars = [];
var moves = [];
let run = false;
let showPillars = false;
let discHeight = 30;

function move(source, target) {
  let maxHeight = floor((height / 2) - 200);
  let v = 1;
  if (source.discs.length > 0) {

    // move the disc UP
    // console.log('Move from', source.letter, 'to ', target.letter)
    let targetHeight = height - (target.discs.length * discHeight) - discHeight;
    // source.discs[0].x = target.x;
    // source.discs[0].y = targetHeight;
    source.discs[source.discs.length].x = target.x;
    source.discs[source.discs.length].y = targetHeight;

    temp = source.discs[0];
    source.discs.shift();
    target.discs.splice(0, 0, temp);
    // for (let p of pillars) {
    //   for (let d of p.discs) {
    //     d.show();
    //   }
    // }



  }
  // while (source.discs[0].y >= maxHeight) {
  //   source.discs[0].y -= v;
  // }

  // // move the disc left or right

  // // if the target letter is lower than the source letter, we're moving left so v needs to be negative
  // if (source.letter.charCodeAt(0) > target.letter.charCodeAt(0)) {
  //   v *= -1;
  // }
  // if (v < 0) {
  //   while (source.discs[0].x >= target.x) {
  //     source.discs[0].x -= v;
  //   }
  // } else {
  //   while (source.discs[0].x <= target.x) {
  //     source.discs[0].x += v;
  //   }
  // }


  // // move disc down
  // // each disc has the same height so it doesn't matter which we use
  // let targetHeight = height - (target.discs.length * discHeight) - discHeight;
  // while (source.discs[0].y <= targetHeight) {
  //   source.discs[0].y += abs(v) // just so we don't have to multiply again
  // }
  // // now that the disc should be "moved" we just have to change which pillar object it's stored in
  // // console.log("Move from " + source + " to " + target)
  // temp = source.discs[0]
  // source.discs.shift();
  // target.discs.splice(0, 0, temp);


}

function TowerOfHanoi(NumOfDiscs, source, aux, target) {
  if (NumOfDiscs != 0) {
    // for (let p of pillars) {
    //   background(220)
    //   strokeWeight(16);
    //   stroke(0)
    //   p.show();
    //   for (let d of p.discs) {
    //     d.show();
    //   }
    // }

    TowerOfHanoi(NumOfDiscs - 1, source, target, aux);
    moves.push([source, target]);
    // console.log('Move from', source.letter, 'to ', target.letter);
    // move(source, target)
    TowerOfHanoi(NumOfDiscs - 1, aux, source, target);
    // for (let p of pillars) {
    //   // background(220)
    //   strokeWeight(16);
    //   stroke(0)
    //   p.show();
    //   for (let d of p.discs) {
    //     d.show();
    //   }
    // }

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
}



function setup() {
  frameRate(10)
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
  background(220);
  // for (let p of pillars) {
  //   strokeWeight(16);
  //   stroke(0)
  //   p.show();
  //   for (let d of p.discs) {
  //     d.show();
  //   }
  // }
  n = parseInt(NumOfDiscsSelection.value());

  if (showPillars) {

    for (let i = 0; i < n; i++) {
      let newW = map(i + 1, 1, n + 1, 200, 30);
      pillars[0].discs.push(new Disc(1, i + 1, newW, discHeight));
      // for (let d of pillars[0].discs) {
      // d.show();
      // }
    }
    showPillars = false;
    // console.log(pillars)
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