var grid;
var isGameover = false;
var levelNum = 0;
var levelSelector;

/* Cancel mouse right click menu */
document.oncontextmenu = function() {
    return false;
}


function setup() {
	createCanvas(SCREEN_WIDTH, SCREEN_HEIGHT);
	background(color(GRAY1));
	frameRate(FPS);
	setGrid();
	setLevelSelect();
	grid.show();
	noLoop();
}

function draw() {
	background(color(GRAY1));
	grid.show();
}

function updateGrid(){
	setGrid();
	background(color(GRAY1));
	grid.show();
}

function setGrid(){
	grid = new Grid(GRID_POS_X, GRID_POS_Y, levelNum);
}

function setLevelSelect(){
	levelSelector = createSelect();
	levelSelector.position(SCREEN_WIDTH - 100, 50);
	for (let levelName of LEVELS){
		levelSelector.option(levelName);
	}
	levelSelector.changed(selectEvent);
}

function selectEvent(){
	levelName = levelSelector.value();
	levelNum = LEVEL_NUMBERS[levelName];
	updateGrid();
}

function showMessage(msg, pos, fontSize, foreColor){
	textSize(fontSize);
	textStyle(NORMAL);
	noStroke();
	fill(foreColor);
	text(msg, pos.x, pos.y);
}

function gameOver(){
	console.log('Game over');
	grid.revealAllCells();
	isGameover = true;
	showMessage('Game Over', createVector(width / 2, height * 0.9), 24, RED);
}

function gameFinished(){
	console.log('Game finished');
	showMessage('Game Finished', createVector(width / 2, height * 0.9), 24, GREEN);
}

function mouseMoved(){
	for (let i = 0; i < grid.rows; i++) {
		for (let j = 0; j < grid.cols; j++) {
			if (grid.at(i, j).contains(mouseX, mouseY)){
				grid.at(i, j).setFocused(true);
			}
			else{
				grid.at(i, j).setFocused(false);
			}
		}
	}
}

function mousePressed(){
	if (isGameover){
		isGameover = false;
		//grid.init();
		grid.show();
		return;
	}

	var mouseSide = null;
	if (mouseIsPressed) {
		if (mouseButton === LEFT) {
			mouseSide = 'left';
			console.log('mouse left');
		}
		else if (mouseButton === RIGHT) {
			mouseSide = 'right';
			console.log('mouse right');
		}
	}

	for (let i = 0; i < grid.rows; i++) {
		for (let j = 0; j < grid.cols; j++) {
			let cell = grid.at(i, j)
			if (cell.contains(mouseX, mouseY)){
				if (mouseSide == 'left'){
					if (cell.hasMine()){
						gameOver();
						return;
					}
					cell.reveal();
					grid.revealSafeZone(i, j);
					if (grid.countCellsToBeRevealed() == 0){
						gameFinished();
					}
				}
				else if (mouseSide == 'right'){
					grid.markUnmark(i, j);
				}
			}
		}
	}
	console.log('Total cells: ' + (grid.rows * grid.cols));
	console.log('Mines: ' + grid.countMines());
	console.log('Revealed cells: ' + grid.countRevealedCells());
	console.log('Cells to be revealed: ' + grid.countCellsToBeRevealed());
}

function keyPressed(){
	if (key == 'R'){
		grid.revealAllCells();
		console.log('Reveal all cells');
	}
	if (key == 'I'){
		grid.init();
		grid.show();
		console.log('Init grid');
	}
}

function mouseReleased(){
	for (let i = 0; i < grid.rows; i++) {
		for (let j = 0; j < grid.cols; j++) {
			grid.at(i, j).setFocused(false);
		}
	}
}
