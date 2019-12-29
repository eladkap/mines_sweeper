class Grid{
  constructor(x, y, level){
    this.x = x;
    this.y = y;
    this.rows = DIMENSIONS_ARRAY[level][0];
    this.cols = DIMENSIONS_ARRAY[level][1];
    this.level = level;
    this.densityFactor = MINES_DENSITY[level];
    this.tileSize = TILESIZE_ARRAY[level]
    this.init(this.densityFactor);
  }

  init(){
    this.mat = [];
    for (let i = 0; i < this.rows; i++) {
      let row = [];
      for (let j = 0; j < this.cols; j++) {
        row.push(new Cell(this.x + i * this.tileSize, this.y + j * this.tileSize, i, j, this.tileSize, false, false, 0, this.densityFactor));
      }
      this.mat.push(row);
    }

    // set nearby mines
    for (var r = 0; r < this.rows; r++) {
      for (var c = 0; c < this.cols; c++) {
        this.mat[r][c].setNearByMines(this.countNearByMines(r, c));
      }
    }
  }

  countNearByMines(r, c){
    let mines = 0;
    for (var i = r - 1; i <= r + 1; i++) {
      for (var j = c - 1; j <= c + 1; j++) {
        if (i >= 0 && i < this.rows && j >= 0 && j < this.cols){
          if (this.mat[i][j].hasmine){
            mines++;
          }
        }
      }
    }
    return mines;
  }

  at(row, col){
    return this.mat[row][col];
  }

  revealSafeZone(r, c){
    if (this.mat[r][c].nearbymines > 0){
      this.mat[r][c].reveal();
      return;
    }
    else{
      this.mat[r][c].reveal();
    }
    for (var i = r - 1; i <= r + 1; i++) {
      for (var j = c - 1; j <= c + 1; j++) {
        if (i >= 0 && i < this.rows && j >= 0 && j < this.cols && !this.mat[i][j].isRevealed){
          this.revealSafeZone(i, j);
        }
      }
    }
  }

  markUnmark(r, c){
    this.mat[r][c].markUnmark();
  }

  revealAllCells(){
    for (var i = 0; i < this.rows; i++) {
      for (var j = 0; j < this.cols; j++) {
        this.mat[i][j].reveal();
      }
    }
  }

  show(){
    for (var i = 0; i < this.rows; i++) {
      for (var j = 0; j < this.cols; j++) {
        this.mat[i][j].show();
      }
    }
  }
}
