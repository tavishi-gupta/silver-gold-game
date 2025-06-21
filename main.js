//VARIABLES
let player1, player2, redcoins, bluecoins, platforms, ground, obstacle, obstacle1, obstacle2, textbox;
let backgroundimg,goldstarimg,silverstarimg,obstacleimg,goldgirlimg,silverboyimg,doorimg;
let score = 0;

//IMAGE PRELOAD
function preload() {
  backgroundimg = loadImage('assets/dungeonbg.png');
  goldstarimg = loadImage('assets/goldstar.png');
  silverstarimg = loadImage('assets/silverstar.png');
  obstacleimg = loadImage('assets/obstacle.png');
  goldgirlimg = loadImage('assets/goldgirl.png');
  silverboyimg = loadImage('assets/silverboy.png');
  doorimg = loadImage('assets/door.png');
}

//SETUP
function setup() {
  createCanvas(600,500);
  world.gravity.y = 20;

  //resize images
  backgroundimg.resize(500,0);
  goldstarimg.resize(30,0);
  silverstarimg.resize(25,0);
  obstacleimg.resize(100,0);
  goldgirlimg.resize(45,0);
  silverboyimg.resize(45,0);
  doorimg.resize(80,0);

  //creating player1
  player1 = new Sprite(goldgirlimg,50,250);
  player1.rotationLock = true;
  player1.vel.x = 0;
  player1.vel.y = 0;

  //creating player2
  player2 = new Sprite(silverboyimg,100,250);
  player2.rotationLock = true;
  player2.vel.x = 0;
  player2.vel.y = 0;

  //creating ground
  ground = new Sprite(250,490,700,20,'s');
  ground.color = '#6a5475';
  ground.friction = 0;

  //creating platforms
  platforms = new Group();
  platforms.color = '#6a5475';
  platforms.collider = 's';
  platforms.friction = 0;

  //creating coins
  redcoins = new Group();
  redcoins.color = 'red';
  redcoins.collider = 'k';

  bluecoins = new Group();
  bluecoins.color = 'blue';
  bluecoins.collider = 'k';

  //creating obstacles
  obstacle = new Sprite(obstacleimg,450,300,20);
  obstacle.color = 'green';
  obstacle.collider = 'k';
  obstacle.friction = 0;

  obstacle1 = new Sprite(obstacleimg,450,330,20);
  obstacle1.color = 'green';
  obstacle1.collider = 'k';
  obstacle1.friction = 0;

  obstacle2 = new Sprite(obstacleimg,325,170,20);
  obstacle2.color = 'green';
  obstacle2.collider = 'k';
  obstacle2.friction = 0;

  //creating textbox
  textbox = new Sprite(100,50,140,40);
  textbox.color = '#fcdf6d';
  textbox.collider = 'k';
  textbox.text = 'Hold down the mouse \n to load instructions';
  

  player1.overlaps(redcoins, collect);
  player1.overlaps(bluecoins);
  player2.overlaps(bluecoins, collect2);
  player2.overlaps(redcoins);
  player1.overlaps(player2);
  loadStartScreen();

}

//DRAW LOOP
function draw() {
  background(backgroundimg);
  fill('white');
  textAlign(LEFT);
  textSize(18);
  text('Stars = '+ score, 460, 130);
  
  //setting up door
  image(doorimg,460,10);

  //instructions appear when pressed
  if (textbox.mouse.pressing()) {
  textSize(13);
  text('Help! Golden Girl and Silver Boy have been trapped in the dungeon \n by their enemy, DESTRUCTO! \n You have to help both of them escape the dungeon by collecting all the stars, \n dodging Destructos monsters, and making it to the end of the door. \n Gold Girl only picks up the gold stars, \n and Silver Boy only picks up the silver stars. \n Remember, even if you have a minor setback, \n Gold Girl and Silver Boy never give up hope! \n Use the arrow keys to control Gold Girl, \n and W,A,S to control Silver Boy. \n Good Luck!,', 10,30);
    textbox.x = -500;
 }

  //moving player 2
  if (kb.presses('w')){
    player2.vel.y = -6;
  }
  else if (kb.pressing('a')){
    player2.vel.x = -3;
  }
  else if (kb.pressing('d')){
    player2.vel.x = 3;
    textbox.x = 100;
  }
  else {
    player2.vel.x = 0;
  }

  //moving player 1
  if (kb.presses(UP_ARROW)) {
    player1.vel.y = -6;
  }
  else if (kb.pressing(RIGHT_ARROW)) {
    player1.vel.x = 3;
    textbox.x = 100;
  }
  else if (kb.pressing(LEFT_ARROW)) {
    player1.vel.x = -3;
  }
  else {
    player1.vel.x = 0;
  }

  //stop players from going off screen
  if (player1.x < 20) {
    player1.x = 20;
  }
  if (player1.x > 600) {
    player1.x = 600;
  }

  if (player2.x < 20) {
    player2.x = 20;
  }
  if (player2.x > 600) {
    player2.x = 600;
  }

  //move obstacles
  if (obstacle.y < 320) {
    obstacle.vel.y = 4;
  }
  else if (obstacle.y > 450) {
    obstacle.vel.y = -4;
  } 

  if (obstacle1.x < 460) {
    obstacle1.vel.x = 3;
  }
  else if (obstacle1.x > 590) {
    obstacle1.vel.x = -3;
  }

  if (obstacle2.x < 330) {
    obstacle2.vel.x = 3;
  }
  else if (obstacle2.x > 420) {
    obstacle2.vel.x = -3;
  }

  //reset if collides with obstacle
  
  if (player1.collides(obstacle)||
      player2.collides(obstacle)) {
    reset();
  }
  else if(player1.collides(obstacle1)|| player2.collides(obstacle1)) {
    reset();
  }
  else if(player1.collides(obstacle2)||
          player2.collides(obstacle2)) {
    reset();
  }

  //setting win parameters
  if (score == 12) {
    youWin();
  }
}

//FUNCTIONS
function loadStartScreen() {
  platforms.removeAll();
  redcoins.removeAll();
  bluecoins.removeAll();
  //setup player
  player1.x = 50;
  player1.y = 480;
  player2.x = 90;
  player2.y = 480;

  //create platforms
  new platforms.Sprite(310, 350, 100, 20);
  new platforms.Sprite(150, 400, 70, 20);
  new platforms.Sprite(70,250,100,20);
  new platforms.Sprite(350,200,100,20);
  new platforms.Sprite(500,100,80,20);

  //create coins
  new redcoins.Sprite(goldstarimg,150,460);
  new redcoins.Sprite(goldstarimg,210,460);
  new redcoins.Sprite(goldstarimg,70,230);
  new redcoins.Sprite(goldstarimg,330,330);
  new redcoins.Sprite(goldstarimg,550,390);
  new redcoins.Sprite(goldstarimg,480,80)

  new bluecoins.Sprite(silverstarimg,40,230);
  new bluecoins.Sprite(silverstarimg,180,460);
  new bluecoins.Sprite(silverstarimg,100,230);
  new bluecoins.Sprite(silverstarimg,550,360);
  new bluecoins.Sprite(silverstarimg,550,420);
  new bluecoins.Sprite(silverstarimg,520,80);

}

function collect(player1, redcoin) {
  redcoin.remove();
  score = score +1
}

function collect2(player2, bluecoin) {
  bluecoin.remove();
  score = score +1
}

function reset() {
  score = 0;
  loadStartScreen();
}

function youWin() {
  obstacle.x = 6000;
  obstacle1.x = 3000;
  obstacle2.x = 5000;

  //text
  textSize(30);
  fill('white');
  text('You Win!', 270,250);
  
}
