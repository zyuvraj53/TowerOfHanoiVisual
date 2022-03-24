


class Pillar {
    constructor(x, letter, discs){
        this.x = x;
        this.letter = letter;
        this.discs = discs;
    }

    show() {
        line(this.x, height / 2, this.x, height);
    }


}