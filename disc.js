

class Disc {

    constructor(tower, DiscNum, w, h) {
        this.tower = tower;
        this.DiscNum = DiscNum;
        this.w = w;
        this.h = h; 
        let towerX;

        switch (this.tower) {
            case 1:
                towerX = width / 6;
                break;
            case 2:
                towerX = width / 2;
                break;
            case 3:
                towerX = 5 * width / 6;
                break;
        }
        this.x = floor(towerX);
        this.y = height - (this.DiscNum * this.h);
    }

    show() {

        rectMode(CENTER)
        strokeWeight(2);
        let discColor = floor(map(this.w, 0, width / 2 - width / 3, 0, 255));
        fill(discColor);
        rect(this.x, this.y, this.w, this.h);
    }

    move(source, target) {

    }
}