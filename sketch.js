// Global variables start
var state = "start";
var menuSong;
var gameSong;
var jumpSound;
var walkSound;
var customFont;
var lives;
var gameChar_x;
var gameChar_y;
var floorPos_y;
var canyons;
var trees_x;
var treePos_y;
var mountains_x;
var collectables;
var platforms;
var isLeft;
var isRight;
var isPlummeting;
var isFalling;
var isJumping;
var jumpVelocity = 0;
var cameraPosX = 0;
var gameScore;
// Global variables end

// Game setup logic and draw states start
function setup()
{
	createCanvas(1024, 576);
	floorPos_y = height * 3/4;
	lives = 3;
	startGame();
}

function draw()
{
	if(state === "start")
	{
		startScreen();
	}
	else if(state === "game")
	{
		gameScreen();
	}
	else if(state === "gameover")
	{
		gameOver();
	}
}
// Game setup logic and draw states stop

// Start screen & game over Logic Start
function preload()
{
	customFont = loadFont('assets/PlayfulTime-BLBB8.ttf');

	soundFormats('wav','mp3');
	menuSong = loadSound('assets/mixkit-game-level-music-689.wav');
	menuSong.setVolume(0.1);
	gameSong = loadSound('assets/battleThemeA.mp3');
	gameSong.setVolume(0.1);
	jumpSound = loadSound('assets/JumpSound.wav');
	jumpSound.setVolume(0.9);
	walkSound = loadSound('assets/step_cloth4.wav');
	walkSound.setVolume(1);

}

function startScreen() 
{
	background(200);
	textAlign(CENTER, CENTER);
	textFont(customFont);

	fill(0);
	textSize(32);
	text("The Adventures of", width / 2, height / 6);
	textSize(32);
	text("Rob & Marty", width / 2, height / 4);
	textSize(24);
	text("Press ENTER to start", width / 2, height / 2);
	textSize(16);
	text("A game by Crater Games", width / 2, height / 1.5);
	textSize(24);
	text("PRESS F TO GET FUNKY!", width / 2, height / 1.2);

	if(keyIsPressed && keyCode === ENTER) 
		{
			state = "game";
		}
}

function gameOver() 
{
	background(200);
	textAlign(CENTER, CENTER);
	textFont(customFont);

	fill(0);
	textSize(32);
	text("GAME OVER", width / 2, height / 6);
	textSize(32);
	text("Thanks for playing", width / 2, height / 4);
	textSize(24);
	text("Press CTR + R to return to Main Menu", width / 2, height / 2);
	textSize(16);
	text("A game by Crater Games", width / 2, height / 1.5);

}
// Start screen logic end
// Gamescreen start
function gameScreen()
{
	background(239, 239, 239);

	cameraPosX = gameChar_x - width / 2;
	// Ground start
	noStroke();
	fill(117,70,17);
	rect(0, floorPos_y, width, height - floorPos_y);
	fill(111,212,44);
	rect(0, floorPos_y, width, 35);
	translate(-cameraPosX, 0);
	// Ground stop
	// Draw objects start
	drawSun();
	drawMountains();
	drawTrees();
	updateCanyon();
	updateClouds();
	drawClouds();
	updateCollectables();
	// Draw objects end
	for(var i = 0; i < platforms.length; i++)
	{
		platforms[i].draw();
	}
	//Player lives start
	drawLives();
	push();
	fill(0, 0, 0);
	noStroke();
	textSize(20);
	textAlign(LEFT, TOP);
	text("Score: " + gameScore + " out of 5", cameraPosX + 10, 10);
	pop();
	// Player lives stop
	//Character Sprite Logic Start
	if(isLeft && isFalling)
	{
		stroke('black');
		fill(230,224,206);
		ellipse(gameChar_x, gameChar_y - 60, 10, 25);
		fill(239,239,239);
		ellipse(gameChar_x - 5, gameChar_y - 60, 4, 6); 
		fill(0,0,0);
		ellipse(gameChar_x - 6, gameChar_y - 60, 1, 1);
		fill(207,219,219);
		ellipse(gameChar_x - 5, gameChar_y - 65, 2, 1.5);
		fill(245, 245, 245);
		ellipse(gameChar_x, gameChar_y - 36, 7.5, 25);
		fill(112,89,45);
		rect(gameChar_x - 2, gameChar_y - 25, 4, 3);
		fill(112,89,45);
		rect(gameChar_x - 1 , gameChar_y - 22, 2.5, 10);
		fill(245, 245, 245);
		rect(gameChar_x - 1 , gameChar_y - 12, 2.5, 2.5);
		fill(48,48,50);
		rect(gameChar_x - 1 , gameChar_y - 10, 2.5, 2.5);
		fill(245, 245, 245);
		ellipse(gameChar_x, gameChar_y - 35, 2, 25); 
		fill(230,224,206);
		ellipse(gameChar_x, gameChar_y -22, 3, 3); 
		fill(227,228,238)
		ellipse(gameChar_x, gameChar_y, 10, 5);
	}
	else if(isRight && isFalling)
	{
		stroke('black');
		fill(230,224,206);
		ellipse(gameChar_x, gameChar_y - 60, 10, 25);
		fill(239,239,239);
		ellipse(gameChar_x + 5, gameChar_y - 60, 4, 6);
		fill(0,0,0);
		ellipse(gameChar_x + 6, gameChar_y - 60, 1, 1);
		fill(207,219,219);
		ellipse(gameChar_x + 5, gameChar_y - 65, 2, 1.5);
		fill(245, 245, 245);
		ellipse(gameChar_x, gameChar_y - 36, 7.5, 25);
		fill(112,89,45);
		rect(gameChar_x - 2, gameChar_y - 25, 4, 3);
		fill(112,89,45);
		rect(gameChar_x - 1 , gameChar_y - 22, 2.5, 10);
		fill(245, 245, 245);
		rect(gameChar_x - 1 , gameChar_y - 12, 2.5, 2.5);
		fill(48,48,50);
		rect(gameChar_x - 1 , gameChar_y - 10, 2.5, 2.5);
		fill(245, 245, 245);
		ellipse(gameChar_x, gameChar_y - 35, 2, 25);
		fill(230,224,206);
		ellipse(gameChar_x, gameChar_y -22, 3, 3);
		fill(227,228,238)
		ellipse(gameChar_x, gameChar_y, 10, 5);
	}
	else if(isLeft)
	{
		stroke('black');
		fill(230,224,206);
		ellipse(gameChar_x, gameChar_y - 60, 10, 25);
		fill(239,239,239);
		ellipse(gameChar_x - 5, gameChar_y - 60, 4, 6);
		fill(0,0,0);
		ellipse(gameChar_x - 6, gameChar_y - 60, 1, 1);
		fill(207,219,219);
		ellipse(gameChar_x - 5, gameChar_y - 65, 2, 1.5);
		fill(245, 245, 245);
		ellipse(gameChar_x, gameChar_y - 33, 7.5, 30);
		fill(112,89,45);
		rect(gameChar_x - 2, gameChar_y - 20, 4, 3);
		fill(112,89,45);
		rect(gameChar_x - 1 , gameChar_y - 17, 2.5, 15);
		fill(245, 245, 245);
		rect(gameChar_x - 1 , gameChar_y - 2.5, 2.5, 2.5);
		fill(48,48,50);
		rect(gameChar_x - 1 , gameChar_y, 2.5, 2.5);
		fill(245, 245, 245);
		ellipse(gameChar_x, gameChar_y -30, 2, 25);
		fill(230,224,206);
		ellipse(gameChar_x, gameChar_y -18, 3, 3);
	}
	else if(isRight)
	{
		stroke('black');
		fill(230,224,206);
		ellipse(gameChar_x, gameChar_y - 60, 10, 25);
		fill(239,239,239);
		ellipse(gameChar_x + 5, gameChar_y - 60, 4, 6);
		fill(0,0,0);
		ellipse(gameChar_x + 6, gameChar_y - 60, 1, 1);
		fill(207,219,219);
		ellipse(gameChar_x + 5, gameChar_y - 65, 2, 1.5);
		fill(245, 245, 245);
		ellipse(gameChar_x, gameChar_y - 33, 7.5, 30);
		fill(112,89,45);
		rect(gameChar_x - 2, gameChar_y - 20, 4, 3);
		fill(112,89,45);
		rect(gameChar_x - 1 , gameChar_y - 17, 2.5, 15);
		fill(245, 245, 245);
		rect(gameChar_x - 1 , gameChar_y - 2.5, 2.5, 2.5);
		fill(48,48,50);
		rect(gameChar_x - 1 , gameChar_y, 2.5, 2.5);
		fill(245, 245, 245);
		ellipse(gameChar_x, gameChar_y -30, 2, 25);
		fill(230,224,206);
		ellipse(gameChar_x, gameChar_y -18, 3, 3);
	}
	else if(isFalling || isPlummeting)
	{
		stroke('black');
		fill(230,224,206);
		ellipse(gameChar_x, gameChar_y - 60, 15, 25);
		fill(239,239,239);
		ellipse(gameChar_x - 3, gameChar_y - 60, 6, 6);
		ellipse(gameChar_x + 3, gameChar_y - 60, 6, 6);
		fill(0,0,0);
		ellipse(gameChar_x - 3, gameChar_y - 60, 1, 1);
		ellipse(gameChar_x + 3, gameChar_y - 60, 1, 1);
		fill(207,219,219);
		ellipse(gameChar_x, gameChar_y - 65, 10, 1.5);
		strokeWeight(0.5);
		line(gameChar_x - 3, gameChar_y - 55, gameChar_x + 3, gameChar_y - 55);
		fill(245, 245, 245);
		ellipse(gameChar_x, gameChar_y - 33, 10, 30);
		fill(159,222,213);
		ellipse(gameChar_x, gameChar_y - 33, 6, 25);
		fill(112,89,45);
		rect(gameChar_x - 4, gameChar_y - 25, 8.5, 8);
		rect(gameChar_x - 5, gameChar_y - 25, 2.5, 12); 
		rect(gameChar_x + 2.5, gameChar_y - 25, 2.5, 12); 
		fill(245,245,245);
		rect(gameChar_x - 5, gameChar_y - 13, 2.5, 2.5); 
		rect(gameChar_x + 2.5, gameChar_y - 13, 2.5, 2.5); 
		fill(48,48,50);
		rect(gameChar_x - 5, gameChar_y - 10.5, 2.5, 2.5); 
		rect(gameChar_x + 2.5, gameChar_y - 10.5, 2.5, 2.5); 
		fill(227,228,238)
		ellipse(gameChar_x, gameChar_y, 20, 5);
		fill(245, 245, 245);
		ellipse(gameChar_x - 6, gameChar_y - 45, 2, 25); 
		ellipse(gameChar_x + 6, gameChar_y - 45, 2, 25); 
		fill(230,224,206);
		ellipse(gameChar_x - 6, gameChar_y - 58, 3, 3); 
		ellipse(gameChar_x + 6, gameChar_y - 58, 3, 3); 
	}
	else
	{
		stroke('black');
		fill(230,224,206);
		ellipse(gameChar_x, gameChar_y - 60, 15, 25);
		fill(239,239,239);
		ellipse(gameChar_x - 3, gameChar_y - 60, 6, 6);
		ellipse(gameChar_x + 3, gameChar_y - 60, 6, 6);
		fill(0,0,0);
		ellipse(gameChar_x - 3, gameChar_y - 60, 1, 1);
		ellipse(gameChar_x + 3, gameChar_y - 60, 1, 1);
		fill(207,219,219);
		ellipse(gameChar_x, gameChar_y - 65, 10, 1.5);
		strokeWeight(0.5);
		line(gameChar_x - 3, gameChar_y - 55, gameChar_x + 3, gameChar_y - 55);
		fill(245, 245, 245);
		ellipse(gameChar_x, gameChar_y - 33, 10, 30);
		fill(159,222,213);
		ellipse(gameChar_x, gameChar_y - 33, 6, 25);
		fill(112,89,45);
		rect(gameChar_x - 4, gameChar_y - 20, 8.5, 3);
		rect(gameChar_x - 4, gameChar_y - 17, 2.5, 15);
		fill(245, 245, 245);
		rect(gameChar_x - 4, gameChar_y - 2.5, 2.5, 2.5);
		fill(112,89,45);
		rect(gameChar_x + 2, gameChar_y - 17, 2.5, 15);
		fill(245, 245, 245);
		rect(gameChar_x + 2, gameChar_y - 2.5, 2.5, 2.5);
		fill(48,48,50);
		rect(gameChar_x - 4, gameChar_y, 2.5, 2.5);
		rect(gameChar_x + 2, gameChar_y, 2.5, 2.5);
		fill(245, 245, 245);
		ellipse(gameChar_x - 6, gameChar_y -30, 2, 25);
		ellipse(gameChar_x + 6, gameChar_y -30, 2, 25);
		fill(230,224,206);
		ellipse(gameChar_x - 6, gameChar_y -18, 3, 3);
		ellipse(gameChar_x + 6, gameChar_y -18, 3, 3);
	}
	// Character Sprite Logic End

	drawFlagpole();

	playerMovement();
	
	if (flagpole.isReached == false)
	{
		checkFlagpole();
	}

	checkPlayerDie();

	if (lives < 1) 
		{
			state = "gameover"
		}
	if (flagpole.isReached) 
		{
			fill(0, 255, 0);
			textSize(50);
			textAlign(CENTER);
			text("Level Complete", width / 2, height / 2);
			return;
		}
}

function startGame()
{
	gameChar_x = width/2;
	gameChar_y = floorPos_y;

	isLeft = false;
	isRight = false;
	isPlummeting = false;
	isFalling = false;

	trees_x = [125];
	treePos_y = height/2;

	clouds_x = [100, 300, 500, 700, 900, 1100, 1300];
	clouds_y = [50, 150, 75, 125, 95, 135, 85];

	mountains_x = [-480, -20, 455, 800];

	collectables = 
	[
		{ x_pos: 470, y_pos: floorPos_y - 150, size: 50, isFound: false },	
	];

	canyons = 
	[
		{ x_pos: 600, width: 100, isPlummeting: false },
		{ x_pos: 900, width: 100, isPlummeting: false },
		{ x_pos: 1500, width: 200, isPlummeting: false },
		{ x_pos: 2250, width: 100, isPlummeting: false },
		{ x_pos: 3000, width: 100, isPlummeting: false },
	];

	platforms = [];
	platforms.push(createPlatforms(250, floorPos_y - 95, 25));
	platforms.push(createPlatforms(400, floorPos_y - 95, 25));
	platforms.push(createPlatforms(425, floorPos_y - 95, 25));
	platforms.push(createPlatforms(450, floorPos_y - 95, 25));
	platforms.push(createPlatforms(475, floorPos_y - 95, 25));
	platforms.push(createPlatforms(500, floorPos_y - 95, 25));

	// Large Canyon Jump Section
	platforms.push(createPlatforms(1325, floorPos_y - 95, 25));
	platforms.push(createPlatforms(1350, floorPos_y - 95, 25));
	platforms.push(createPlatforms(1375, floorPos_y - 95, 25));

	platforms.push(createPlatforms(1400, floorPos_y - 180, 25));
	platforms.push(createPlatforms(1425, floorPos_y - 180, 25));
	platforms.push(createPlatforms(1450, floorPos_y - 180, 25));
	platforms.push(createPlatforms(1475, floorPos_y - 180, 25));
	platforms.push(createPlatforms(1500, floorPos_y - 180, 25));
	platforms.push(createPlatforms(1525, floorPos_y - 180, 25));

	platforms.push(createPlatforms(1625, floorPos_y - 180, 25));
	platforms.push(createPlatforms(1650, floorPos_y - 180, 25));
	platforms.push(createPlatforms(1675, floorPos_y - 180, 25));
	platforms.push(createPlatforms(1700, floorPos_y - 180, 25));

	platforms.push(createPlatforms(1700, floorPos_y - 95, 25));

	platforms.push(createPlatforms(1900, floorPos_y - 95, 25));
	platforms.push(createPlatforms(1925, floorPos_y - 95, 25));

	platforms.push(createPlatforms(2050, floorPos_y - 95, 25));
	platforms.push(createPlatforms(2150, floorPos_y - 95, 25));
	platforms.push(createPlatforms(2250, floorPos_y - 95, 25));

	// Mario style end game wall. 
	platforms.push(createPlatforms(2830, floorPos_y - 20, 25));
	platforms.push(createPlatforms(2850, floorPos_y - 20, 25));
	platforms.push(createPlatforms(2850, floorPos_y - 40, 25));
	platforms.push(createPlatforms(2870, floorPos_y - 20, 25));
	platforms.push(createPlatforms(2870, floorPos_y - 40, 25));
	platforms.push(createPlatforms(2870, floorPos_y - 60, 25));
	platforms.push(createPlatforms(2890, floorPos_y - 20, 25));
	platforms.push(createPlatforms(2890, floorPos_y - 40, 25));
	platforms.push(createPlatforms(2890, floorPos_y - 60, 25));
	platforms.push(createPlatforms(2890, floorPos_y - 80, 25));
	platforms.push(createPlatforms(2910, floorPos_y - 20, 25));
	platforms.push(createPlatforms(2910, floorPos_y - 40, 25));
	platforms.push(createPlatforms(2910, floorPos_y - 60, 25));
	platforms.push(createPlatforms(2910, floorPos_y - 80, 25));
	platforms.push(createPlatforms(2910, floorPos_y - 100, 25));
	platforms.push(createPlatforms(2930, floorPos_y - 20, 25));
	platforms.push(createPlatforms(2930, floorPos_y - 40, 25));
	platforms.push(createPlatforms(2930, floorPos_y - 60, 25));
	platforms.push(createPlatforms(2930, floorPos_y - 80, 25));
	platforms.push(createPlatforms(2930, floorPos_y - 100, 25));
	platforms.push(createPlatforms(2930, floorPos_y - 120, 25));
	platforms.push(createPlatforms(2950, floorPos_y - 20, 25));
	platforms.push(createPlatforms(2950, floorPos_y - 40, 25));
	platforms.push(createPlatforms(2950, floorPos_y - 60, 25));
	platforms.push(createPlatforms(2950, floorPos_y - 80, 25));
	platforms.push(createPlatforms(2950, floorPos_y - 100, 25));
	platforms.push(createPlatforms(2950, floorPos_y - 120, 25));
	platforms.push(createPlatforms(2950, floorPos_y - 140, 25));
	platforms.push(createPlatforms(2970, floorPos_y - 20, 25));
	platforms.push(createPlatforms(2970, floorPos_y - 40, 25));
	platforms.push(createPlatforms(2970, floorPos_y - 60, 25));
	platforms.push(createPlatforms(2970, floorPos_y - 80, 25));
	platforms.push(createPlatforms(2970, floorPos_y - 100, 25));
	platforms.push(createPlatforms(2970, floorPos_y - 120, 25));
	platforms.push(createPlatforms(2970, floorPos_y - 140, 25));
	platforms.push(createPlatforms(2970, floorPos_y - 160, 25));
	platforms.push(createPlatforms(2990, floorPos_y - 20, 25));
	platforms.push(createPlatforms(2990, floorPos_y - 40, 25));
	platforms.push(createPlatforms(2990, floorPos_y - 60, 25));
	platforms.push(createPlatforms(2990, floorPos_y - 80, 25));
	platforms.push(createPlatforms(2990, floorPos_y - 100, 25));
	platforms.push(createPlatforms(2990, floorPos_y - 120, 25));
	platforms.push(createPlatforms(2990, floorPos_y - 140, 25));
	platforms.push(createPlatforms(2990, floorPos_y - 160, 25));
	
	gameScore = 0;
	flagpole = {isReached: false, x_pos: 3300};
}
// Player Input, Health & UI Start
function playerMovement()
{
	if(isLeft)
	{
		gameChar_x -= 5;
	}
	if(isRight)
	{
		gameChar_x += 5;
	}

	gameChar_x = Math.max(0, gameChar_x);

	if(gameChar_y < floorPos_y)
	{
		var isContact = false;
		for(var i = 0; i < platforms.length; i++)
		{
			if(platforms[i].checkContact(gameChar_x, gameChar_y) == true)
			{
				isContact = true;
				break;
			}
		}
		if(isContact == false)
		{
			isFalling = true;
			gameChar_y += jumpVelocity;
			jumpVelocity += 0.2;
		}
		else
			{
				isFalling = false;
				jumpVelocity = 0;
			}
	}
	else if(!isPlummeting)
	{
		isFalling = false;
		gameChar_y = floorPos_y;
		jumpVelocity = 0;
	}
}
function checkPlayerDie() 
{
  if (gameChar_y > height + 100) 
	{
    	lives -= 1;

    if (lives > 0) 
		{
      		startGame();
    	}
	else
		{
			return;
		}
  }
}

function drawHeart(x, y, size) 
{
  beginShape();
  vertex(x, y);
  bezierVertex(x - size / 2, y - size, x - size, y + size / 3, x, y + size);
  bezierVertex(x + size, y + size / 3, x + size / 2, y - size, x, y);
  endShape(CLOSE);
}

function drawLives() 
{
  for (let i = 0; i < lives; i++) 
	{
		fill(255, 0, 0);
		drawHeart(cameraPosX + 20 + i * 30, 50, 10);
  	}
}
// Player Health & UI Stop
// Player key function Start
function keyPressed()
{
	if(state === "start" && key === 'f')
	{
		menuSong.play();
		return;
	}
	if (state === "start" && keyCode === ENTER)
	{
		state = "game";
		menuSong.stop();
		gameSong.play();
		return;
	}
	
	if(lives < 1 || flagpole.isReached)
	{
		return;
	}
	if(isPlummeting)
	{
		return;
	}
	if(keyCode == 37 || key == 'a' || key =='A')
	{
		walkSound.loop();
		isLeft = true;
	}
	else if(keyCode == 39 || key == 'd' || key == 'D') 
	{	
		walkSound.loop();
		isRight = true;
	}
	else if((keyCode == 38 || key == ' ') && (gameChar_y == floorPos_y || isOnPlatform()))
	{
		jumpSound.play();
		gameChar_y -= 100;
		isFalling = true;
	}
}

function keyReleased()
{
	if(lives < 1 || flagpole.isReached)
	{
		return;
	}
	if(keyCode == 37 || key == 'a' || key =='A')
		{
			walkSound.stop()
			isLeft = false;
		}
		else if(keyCode == 39 || key == 'd' || key == 'D')
		{
			walkSound.stop()
			isRight = false;
		}
}

function isOnPlatform()
{
	for (var i = 0; i < platforms.length; i++)
	{
		if (platforms[i].checkContact(gameChar_x, gameChar_y))
		{
			return true;
		}
	}
	return false;
}
// Player key functions Stop
// Game Graphics below //
function drawClouds()
{
	for (var i = 0; i < clouds_x.length; i++)
	{
		let x = clouds_x[i];
		let y = clouds_y[i];
		noStroke();
		fill(255);
		ellipse(x, y, 60, 40);
		ellipse(x + 30, y, 50, 35);
		ellipse(x + 15, y - 15, 55, 30);
	}
}

function updateClouds() {
	for (let i = 0; i < clouds_x.length; i++) {
		clouds_x[i] += 0.5;
		if (clouds_x[i] > cameraPosX + width + 100) 
		{
			clouds_x[i] = cameraPosX - 100;
		}
	}
}

function drawSun()
{
	fill(255, 255, 204);
	ellipse(cameraPosX + 100, 100, 80, 80);
}

function drawMountains()
{
	for (var i = 0; i < mountains_x.length; i++)
	{
		let x3 = mountains_x[i];
		let y2 = 100;
		stroke(0, 0, 0);
		fill(150, 150, 150);
		triangle(x3 + 250, y2 + 332, x3 + 450, y2 + 100, x3 + 650, y2 + 332);
		stroke(0, 0, 0);
		fill(255, 255, 255);
		triangle(x3 + 375, y2 + 187, x3 + 450, y2 + 100, x3 + 525, y2 + 187);
		stroke(0, 0, 0);
		fill(150, 150, 150);
		triangle(x3 + 250, y2 + 332, x3 + 400, y2 + 100, x3 + 550, y2 + 332);
		stroke(0, 0, 0);
		fill(255, 255, 255);
		triangle(x3 + 351, y2 + 175, x3 + 400, y2 + 100, x3 + 449, y2 + 175);
	}
}

function drawTrees()
{
	for (var i = 0; i < trees_x.length; i++)
	{
	stroke(0, 0, 0);
	fill(102, 102, 0);

	rect(trees_x[i], treePos_y + 45, 20, 100, 20);

	rect(trees_x[i] - 40, treePos_y + 25, 25, 25, 10);
	rect(trees_x[i] + 35, treePos_y + 25, 25, 25, 10);

	rect(trees_x[i] - 40, treePos_y + 60, 25, 25, 10);
	rect(trees_x[i] + 35, treePos_y + 60, 25, 25, 10);
	}
}

function drawCollectable(t_collectable)
{
	{
		let x2 = t_collectable.x_pos;
		let y1 = t_collectable.y_pos;
		let s1 = t_collectable.size;

		stroke(0, 0, 0);
		fill(255, 255 , 0);
		arc(x2, y1-12, s1/2, s1/2, 0, PI + HALF_PI);
	}
}

function updateCollectables()
{
	for (var i = 0; i < collectables.length; i++)
	{
		if (!collectables[i].isFound)
		{
			drawCollectable(collectables[i]);
			checkCollectable(collectables[i]);
		}
	}
}

function checkCollectable(t_collectable)
{
	if(dist(gameChar_x, gameChar_y, t_collectable.x_pos, t_collectable.y_pos) < 20)
	{
		t_collectable.isFound = true;
		gameScore ++;
	}
}

function drawCanyon(t_canyon)
{
	let x1 = t_canyon.x_pos;
	let w = t_canyon.width;

	push();
	fill(239, 239, 239);
	stroke('black');
	strokeWeight(2);
	triangle(x1 + 20, floorPos_y - 1, x1 + w - 20, floorPos_y - 1, x1 + w / 2, 800);
	pop();

	fill(102, 51, 0);
	stroke('black');
	triangle(x1, 500, x1 + 40, 500, x1 + w / 2, 800);
	triangle(x1 + w - 40, 475, x1 + w, 475, x1 + w / 2 + 15, 800);
}

function updateCanyon()
{
	for (let i = 0; i < canyons.length; i++)
	{
		drawCanyon(canyons[i]);
		checkCanyon(canyons[i]);
	}
}

function checkCanyon(t_canyon)
{
	if(gameChar_x > t_canyon.x_pos + 10 && gameChar_x < t_canyon.x_pos + t_canyon.width - 10 && gameChar_y >= floorPos_y)
	{
		isPlummeting = true;
	}
	if(isPlummeting)
	{
		gameChar_y += 5;
	}
}

function drawFlagpole()
	{
		push();
		strokeWeight(5);
		stroke(100);
		line(flagpole.x_pos, floorPos_y, flagpole.x_pos, floorPos_y - 250);
		fill(0,0,255);
		noStroke();
		if (flagpole.isReached)
		{
			rect(flagpole.x_pos, floorPos_y - 50, 50, 50);
		}
		else
		{
			rect(flagpole.x_pos, floorPos_y - 250, 50, 50);
		}
		pop();
	}

function checkFlagpole()
{
	var d = abs(gameChar_x - flagpole.x_pos);
	if (d < 10)
	{
		flagpole.isReached = true;
		gameChar_x = flagpole;
	}
}

function createPlatforms(x, y, length)
{
	var p = 
	{
		x: x,
		y: y,
		length: length,
		draw: function()
		{
			stroke('black');
			fill(139, 69, 19);
			rect(this.x, this.y, this.length, 20);
		},
		checkContact: function(gc_x, gc_y)
		{
			if(gc_x > this.x && gc_x < this.x + this.length)
			{
				var d = this.y - gc_y;
				if(d >= 0 && d < 10)
				{
					return true;
				}
			}
			return false;
		}
	}
	return p;
}
