

var NumOfDiscsSelection;
let n;
let discs = [];
let pillars = [];
let a = [];
let b = [];
let c = [];

function move(source, target) {
  let maxHeight = (height / 2) - 200;
  let v = 5;


  // move the disc UP
  while (source[0].y > maxHeight){
    source[0].y -= v;
  }

  while (source[0].x != target.x){
    source[0].y -= v;
  } 



  console.log("Move from " + source + " to " + target)


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
  NumOfDiscsSelection = createSelect();
  pillars.push(new Pillar(width / 6, 'a', 0));
  pillars.push(new Pillar(width / 2, 'b', 0));
  pillars.push(new Pillar(5 * width / 6, 'c', 0));
  for (let i = 1; i < 100; i++) {
    NumOfDiscsSelection.option(i);
  }



  // disc1 = new Disc(1, 1, 80);
  // disc2 = new Disc(1, 2, 60);

}

function draw() {
  background(220);
  n = NumOfDiscsSelection.value();
  strokeWeight(16);
  stroke(0)
  line(width/6, height/2, width/6, height)
  line(width/2, height/2, width/2, height)
  line(5 * width/6, height/2, 5 * width/6, height)
  for (let d of a){
    d.show();
  }
  for (let d of b){
    d.show();
  }
  for (let d of c){
    d.show();
  }




}

function keyPressed() {
  if (key == ' ') {
    n = parseInt(n);
    for (let i = 0; i < n; i++){
      let newW = map(i + 1, 1, n + 1, 200, 30);
      a.push(new Disc(1, i + 1, newW));
    }
    TowerOfHanoi(n, a, b, c)
  }



}