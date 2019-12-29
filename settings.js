const SCREEN_WIDTH = 800;
const SCREEN_HEIGHT = 640;
const FPS = 20;

/* GRID */
const GRID_ROWS = 20;
const GRID_COLS = 20;
const GRID_POS_X = 50;
const GRID_POS_Y = 50;
const DENSITY_FACTOR = 0.2;


/* COLORS */
const BLACK = [0, 0, 0];
const GRAY1 = [100, 100, 100];
const WHITE = [255, 255, 255];
const RED = [250, 0, 0];
const ORANGE = [255, 150, 50];
const PINK = [250, 0, 150];
const YELLOW = [255, 255, 0];
const GREEN = [0, 250, 0];
const AQUA = [100, 255, 255];
const BLUE = [0, 50, 250];
const BLUELIGHT = [0, 100, 250];
const PURPLE = [200, 0, 250];

/* MINES NUMBER BY LEVEL: EASY, MEDIUM, HARD */
const LEVELS = ['EASY', 'MEDIUM', 'HARD']
const LEVEL_NUMBERS = {
    'EASY': 0,
    'MEDIUM': 1, 
    'HARD': 2
}
const DIMENSIONS_ARRAY = [[10, 10], [15, 15], [25, 25]]
const MINES_DENSITY = [0.1, 0.15, 0.2];
const MINES_ARRAY = [10, 20, 30];
const TILESIZE_ARRAY = [40, 30, 20];
