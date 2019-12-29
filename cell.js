class Cell{
  constructor(x, y, i, j, size, hasmine, isRevealed, nearbymines, density_factor){
    this.x = x;
    this.y = y;
    this.i = i;
    this.j = j;
    this.size = size;
    this.hasmine = random(1) < density_factor;
    this.isRevealed = false;
    this.isMarked = false;
    this.isFocused = false;
    this.nearbymines = -1;
  }

  show(){
    strokeWeight(1);
    stroke(color(BLACK));
    if ((this.i + this.j) % 2 == 0){
      fill(color(BLUE));
    }
    else{
      fill(color(BLUELIGHT));
    }

    // mouseover
    if (this.isFocused){
      fill(color(AQUA));
    }

    rect(this.x, this.y, this.size, this.size);
    if (this.isMarked){
      fill(color(RED));
      let s = this.size;
      triangle(this.x + s/8, this.y + s/8, this.x + s/8, this.y + s/2, this.x + s*0.75, this.y + s/4);
      line(this.x + s/8, this.y + s/8, this.x + s/8, this.y + s*7/8);
    }
    if (this.isRevealed){
      if (this.hasmine){
        fill(color(RED));
        ellipse(this.x + this.size / 2, this.y + this.size / 2, this.size / 2, this.size / 2);
      }
      else{
        fill(color(WHITE));
        rect(this.x, this.y, this.size, this.size);
        if (this.nearbymines > 0){
          this.showNearByMines();
        }  
      }
    }
  }

  showNearByMines(){
    textAlign(CENTER);
    textSize(this.size);
    textStyle(NORMAL);
    noStroke();
    fill(color(BLACK));
    text(this.nearbymines, this.x + this.size / 2, this.y + this.size);
  }

  setNearByMines(nearbymines){
    this.nearbymines = nearbymines;
  }

  contains(x, y){
    return x > this.x && x <= this.x + this.size && y > this.y && y <= this.y + this.size;
  }

  markUnmark(){
    if (this.isMarked){
      this.isMarked = false;
    }
    else{
      this.isMarked = true;
    }
    this.show();
  }

  reveal(){
    this.isRevealed = true;
    this.show();
  }

  setFocused(value){
    this.isFocused = value;
  }
}
