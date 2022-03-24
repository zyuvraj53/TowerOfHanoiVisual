

var NumOfDiscsSelection;
let n;
let discs = [];
var pillars = {};


function move(source, target) {
  let maxHeight = (height / 2) - 200;
  let v = 5;
  // console.log(source.discs[0].x)

  // move the disc UP
  while (source.discs[0].y > maxHeight){
    source.discs[0].y -= v;
  }

  // move the disc left or right
  while (source.discs[0].x != target.x){
    source.discs[0].y -= v;
  } 



  // console.log("Move from " + source + " to " + target)


}

function TowerOfHanoi(NumOfDiscs, source, aux, target) {
  if (NumOfDiscs != 0) {
    TowerOfHanoi(NumOfDiscs - 1, source, target, aux)
    move(source, target)
    TowerOfHanoi(NumOfDiscs - 1, aux, source, target)
  }
}



function setup() {
  createCanvas(1000, 600);
  background(220);
  NumOfDiscsSelection = createSelect();
  pillars['a'] = new Pillar(floor(width / 6), 'a', []);
  pillars['b'] = new Pillar(floor(width / 2), 'b', []);
  pillars['c'] = new Pillar(floor(5 * width / 6), 'c',[]);
  for (let i = 1; i < 100; i++) {
    NumOfDiscsSelection.option(i);
  }
}

function draw() {
  n = NumOfDiscsSelection.value();
  strokeWeight(16);
  stroke(0)
  for ([letter, pillar] of Object.entries(pillars)){
    pillar.show();
    // for (let d of pillar.discs){
    //   console.log(d)
    //   d.show();
    // }
  }
 




}

function keyPressed() {
  if (key == ' ') {
    n = parseInt(n);
    for (let i = 0; i < n; i++){
      let newW = map(i + 1, 1, n + 1, 200, 30);
      pillars['a'].discs.push(new Disc(1, i + 1, newW));
    }
    for (let d of pillars['a'].discs){
      console.log(d)
      d.show();
    }
    TowerOfHanoi(n, pillars['a'], pillars['b'], pillars['c'])
  }



}