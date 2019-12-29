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
	//loop();
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

function gameover(){
	grid.revealAllCells();
	isGameover = true;
	noLoop();
}

function mouseClicked(){
	return false;
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
		else if (mouseButton == CENTER){
			mouseSide = 'center';
			console.log('mouse center');
		}
	}

	for (let i = 0; i < grid.rows; i++) {
		for (let j = 0; j < grid.cols; j++) {
			if (grid.at(i, j).contains(mouseX, mouseY)){
				if (mouseSide == 'left'){
					if (grid.at(i, j).hasmine){
						gameover();
						grid.init();
						return;
					}
					grid.at(i, j).reveal();
					grid.revealSafeZone(i, j);
				}
				else if (mouseSide == 'right'){
					grid.markUnmark(i, j);
				}
				else if (mouseSide == 'center'){
				}
			}
		}
	}
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
