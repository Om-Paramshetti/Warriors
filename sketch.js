//Hello!
//pls tell me if you want a part 2!

var start = 1,
  mission1 = 2,
  mission1_play = 3,
  end = 0,
  bonus1 = 4,
  mission2 = 5,
  mission2_play = 6,
  finish1 = 7,
  next2 = 8;
var logo, logoAni;
var play, play_img;
var gameState = start;
var mission1Text, mission1_img;
var mission2Text, mission2_img;
var player, player_img, player_dead;
var ground;
var text1, text1_img;
var platform1, platform2, platform3;
var coincount = 0;
var moon, moon_img;
var bullet, bullet_img, bulletGroup;
var facing = "right";
var coin1, coin2, coin_img;
var enemy1, enemy1_img;
var lazer, lazer_group;
var next1, next_img;
var reset1, reset_img;
var vent1, vent_img;
var tencoin1, tencoin_img;
var arrow1, red_arrow;
var platform5, platform4;
var boss, boss_img, tower;
var nxt2, end;
var winsound;
var Bfacing = "right";

function preload() {
  //loading the images for the things in the game
  logoAni = loadAnimation("logo1.png", "logo2.png", "logo3.png");
  play_img = loadImage("play.png");
  mission1_img = loadImage("mission1.png");
  player_img = loadImage("player.png");
  player_dead = loadImage("player_dead.png");
  text1_img = loadImage("text1.png");
  moon_img = loadImage("moon.png");
  bullet_img = loadImage("bullet1.png");
  coin_img = loadImage("coin.png");
  enemy1_img = loadImage("enemy1.png");
  next_img = loadImage("next.png");
  reset_img = loadImage("restart.png");
  vent_img = loadImage("vent.png");
  tencoin_img = loadImage("10coin.png");
  red_arrow = loadImage("arrow1.png");
  mission2_img = loadImage("mission2.png");
  boss_img = loadImage("boss.png");

  //loading sounds
  winsound = loadSound("win.mp3");
}

function setup() {
  //creating the canvas
  createCanvas(1280, 578);


  //creating the logo & play button
  logo = createSprite(640, 70, 20, 20);
  logo.addAnimation("logo", logoAni);

  play = createSprite(640, 300, 20, 20);
  play.addImage(play_img);


  //creating other stuff in level 1 and the bonus level
  mission1Text = createSprite(640, 289, 20, 20);
  mission1Text.visible = false;

  mission2Text = createSprite(640, 289, 20, 20);
  mission2Text.addImage(mission2_img);
  mission2Text.visible = false;

  ground = createSprite(640, 578, 1280, 100);
  ground.shapeColor = "darkblue";
  ground.visible = false;

  player = createSprite(63, 412, 20, 20);
  player.addImage(player_img);

  text1 = createSprite(player.x + 90, player.y - 50, 20, 20);
  text1.addImage(text1_img);
  text1.scale = 0.3;

  platform1 = createSprite(372, 370, 100, 20);
  platform1.shapeColor = "purple";
  platform1.visible = false;

  platform2 = createSprite(588, 250, 200, 20);
  platform2.shapeColor = "purple";
  platform2.visible = false;

  platform3 = createSprite(900, 200, 300, 20);
  platform3.shapeColor = "purple";
  platform3.visible = false;

  moon = createSprite(200, 90, 20, 20);
  moon.addImage(moon_img);
  moon.scale = 0.5;
  moon.visible = false;

  coin1 = createSprite(platform2.x, 200, 20, 20);
  coin1.addImage(coin_img);
  coin1.scale = 0.05;
  coin1.visible = false;

  enemy1 = createSprite(platform3.x, 150, 20, 20);
  enemy1.addImage(enemy1_img);
  enemy1.visible = false;

  next1 = createSprite(-1000, -1000, 20, 20);
  next1.addImage(next_img);
  next1.scale = 0.6;

  reset1 = createSprite(640, 300, 20, 20);
  reset1.addImage(reset_img);
  reset1.scale = 0.4;
  reset1.visible = false;

  vent1 = createSprite(1030, 515, 20, 20);
  vent1.addImage(vent_img);
  vent1.scale = 0.2;
  vent1.visible = false;

  tencoin1 = createSprite(-640, -300, 30, 30);
  tencoin1.addImage(tencoin_img);
  tencoin1.scale = 0.5;

  arrow1 = createSprite(1200, 400, 20, 20);
  arrow1.addImage(red_arrow);
  arrow1.scale = 0.3;
  arrow1.visible = false;

  //creates the stuff in mission 2 
  platform5 = createSprite(485, -10000, 200, 20);
  platform5.shapeColor = "purple";
  platform5.visible = false;

  platform4 = createSprite(-1000, -1000, 175, 20);
  platform4.shapeColor = "purple";
  platform4.visible = false;

  tower = createSprite(-10000, -10000, 200, 300);
  tower.shapeColor = "lightgrey";
  tower.visible = false;


  boss = createSprite(-10000, -10000, 20, 20);
  boss.addImage(boss_img);

  coin2 = createSprite(platform4.x, platform4.y - 50, 20, 20);
  coin2.addImage(coin_img);
  coin2.scale = 0.05;

  end = createSprite(640, 289, 2000, 1000);
  end.shapeColor = "green";
  end.visible = false;

  nxt2 = createSprite(-1000, -1000, 20, 20);
  nxt2.addImage(next_img);
  nxt2.scale = 0.6;



  //creating the groups
  lazer_group = new Group();
  bulletGroup = new Group();
}

function draw() {
  // creates the background and makes it blue
  background(8, 24, 117);

  //creating the edge sprites
  edges = createEdgeSprites();

  //making the player collide with most things
  player.collide(platform1);
  player.collide(platform2);
  player.collide(platform3);
  player.collide(edges);
  player.collide(platform5);
  player.collide(enemy1);
  player.collide(ground);
  player.collide(platform4);
  player.collide(tower);
  platform5.bounceOff(edges);
  boss.collide(tower);


  //starting the game when you press the play button
  if (mousePressedOver(play)) {
    gameState = mission1;
  }
  //creating the 1st misssion
  if (gameState === mission1) {

    //turning the title screen off and visibilites of objects off
    mission1Text.visible = true;
    text1.visible = false;
    logo.visible = false;
    play.visible = false;
    play.x = -1000;
    player.visible = false;
    platform1.visible = false;
    platform2.visible = false;
    platform3.visible = false;
    moon.visible = false;
    coin1.visible = false;
    enemy1.visible = false;
    reset1.visible = false;
    ground.visible = false;
    vent1.visible = false;
    player.visible = false;
    ground.visible = false;
    platform5.y = -10000;
    platform4.x = -10000;
    boss.x = -10000;
    tower.x = -10000;

    //changing player'x and y
    player.x = 63;
    player.y = 412;

    //creating the image
    mission1Text.addImage(mission1_img);


    //allowing the player to play the game with the space key
    if (keyDown("space")) {
      gameState = mission1_play;
    }
  }

  //playing the 1st mission
  if (gameState === mission1_play) {

    //making the bg black and ground blue
    background("black");
    ground.shapeColor = "darkblue";

    //giving the enemy gravity
    enemy1.velocityY = enemy1.velocityY + 0.8;

    //truning the visibliities of the objects on/off
    player.visible = true;
    mission1Text.visible = false;
    text1.visible = false;
    platform1.visible = true;
    platform2.visible = true;
    platform3.visible = true;
    moon.visible = true;
    coin1.visible = true;
    enemy1.visible = true;
    vent1.visible = true;
    arrow1.visible = false;

    //positioning the stuff in lv 1
    platform1.y = 370;
    platform2.y = 250;
    platform3.y = 200;
    moon.y = 90;
    coin1.y = 200;
    enemy1.y = 150;
    vent1.y = 515;
    tencoin1.y = -1000;

    //console.log(enemy1.x-15);
    //console.log(enemy1.y-50);

    //allowing the player to jump
    if (keyDown("space")) {
      player.velocityY = -12;
    }

    //adding gravity to the player 
    player.velocityY = player.velocityY + 0.8;

    //allowing the player to move
    if (keyDown("LEFT_ARROW")) {
      player.x = player.x - 6;
      facing = "left";
    }

    if (keyDown("RIGHT_ARROW")) {
      player.x = player.x + 6;
      facing = "right";
    }

    //allowing the player to shoot bullets
    if (keyWentDown("s")) {
      bullet = createSprite(player.x, player.y, 20, 20);
      bulletGroup.add(bullet);
      bullet.addImage(bullet_img);
      bullet.scale = 0.3;
      bullet.lifetime = 128;
      if (facing === "left") {
        bullet.velocityX = -10;
        Bfacing = "left";
      } else {
        bullet.velocityX = 10;
        Bfacing = "right";
      }

    }

    //allowing the player to enter the vent
    if (player.isTouching(vent1) && keyDown("a")) {
      gameState = bonus1;
    }

    //spawning lazers
    spawnLazers();

    //collecting coins
    if (player.isTouching(coin1)) {
      coin1.destroy();
      coincount = coincount + 1;
    }
    //making ground

    enemy1.collide(platform3);
    ground.visible = true;


    //make the player die
    if (lazer_group.isTouching(player)) {

      gameState = end;
      player.velocityY = 0;

      enemy1.collide(platform3);
    }
    //kills the enemy
    if (bulletGroup.isTouching(enemy1)) {

      gameState = next1;
    }


  }
  //making the 1st next arrow
  if (gameState === next1) {
    background("black");
    enemy1.visible = false;
    next1.x = 640;
    next1.y = 289;
    player.velocityY = 0;
    if (mousePressedOver(next1)) {
      gameState = mission2;
    }

  }

  //what will happen after the player dies
  if (gameState === end) {

    //making the bg black
    background("black");

    //making stuff happen
    player.addImage(player_dead);
    lazer_group.destroyEach();
    enemy1.collide(platform3);
    reset1.visible = true;

    //resets the game when you press the button
    if (mousePressedOver(reset1)) {
      reset();
    }

    //creates the game over text and reset button
    fill("white");
    textSize(50);
    text("Game Over!", 450, 75);
  }

  if (gameState === bonus1) {
    //makes the background & ground brown
    background(114, 82, 41);
    ground.shapeColor = rgb(81, 54, 17);

    //making the arrow visible
    arrow1.visible = true;

    //making the player go back
    if (player.isTouching(arrow1)) {
      gameState = mission1_play;
    }

    //creating the bonus text
    fill("darkblue");
    textSize(50);
    textFont("Helvetica");
    text("BONUS!", 550, 50);

    //positioning the 10 coin coin
    tencoin1.x = 640;
    tencoin1.y = 300;

    //increasing the coin counter
    if (player.isTouching(tencoin1)) {
      coincount = coincount + 10;
      tencoin1.destroy();
    }

    //allowing the player to jump
    if (keyDown("space")) {
      player.velocityY = -12;
    }

    //destroying other stuff
    platform1.y = 10000;
    platform2.y = 10000;
    platform3.y = 10000;
    moon.y = 10000;
    coin1.y = 10000;
    enemy1.y = 10000;
    vent1.y = 10000;

    //adding gravity to the player 
    player.velocityY = player.velocityY + 0.8;

    //allowing the player to move
    if (keyDown("LEFT_ARROW")) {
      player.x = player.x - 6;
      facing = "left"
    }

    if (keyDown("RIGHT_ARROW")) {
      player.x = player.x + 6;
      facing = "right"
    }
    //shooting ability
    if (keyWentDown("s")) {
      bullet = createSprite(player.x, player.y, 20, 20);
      bulletGroup.add(bullet);
      bullet.addImage(bullet_img);
      bullet.scale = 0.3;
      bullet.lifetime = 128;
      if (facing === "left") {
        bullet.velocityX = -10;
        Bfacing = "left";
      } else {
        bullet.velocityX = 10;
        Bfacing = "right";
      }
    }
  }

  if (gameState === mission2) {
    //turning the title screen off and visibilites of objects off
    text1.visible = false;
    logo.visible = false;
    play.x = -1000;
    mission1Text.visible = false;
    mission2Text.visible = true;
    player.visible = false;
    platform1.visible = false;
    platform2.visible = false;
    platform3.visible = false;
    moon.visible = false;
    coin1.visible = false;
    enemy1.visible = false;
    reset1.visible = false;
    ground.visible = false;
    vent1.visible = false;
    next1.x = -10000;

    //changing player'x and y
    player.x = 63;
    player.y = 412;


    //allowing the player to play the game with the space key
    if (keyDown("space")) {
      gameState = mission2_play;
    }
  }
  if (gameState === mission2_play) {
    //paints the bg black
    background("black");

    //positioning the boss and coin
    boss.x = platform3.x;
    boss.y = 150;

    coin2.y = platform4.y - 50;
    coin2.x = platform4.x - 50;

    //making things visible and invisible
    platform5.visible = true;
    platform4.visible = true;
    mission2Text.visible = false;
    player.visible = true;
    ground.visible = true;
    tower.visible = true;

    //allows the player to collect the 2nd coin
    if (player.isTouching(coin2)) {
      coin2.destroy();
      coincount = coincount + 1;
    }

    //positining objects
    platform4.x = 600;
    platform4.y = 200;

    platform5.y = 350;

    boss.x = 1050;
    boss.y = 190;

    tower.x = 1050;
    tower.y = 380;


    //allowing the player to move
    if (keyDown("LEFT_ARROW")) {
      player.x = player.x - 6;
      facing = "left"
    }

    if (keyDown("RIGHT_ARROW")) {
      player.x = player.x + 6;
      facing = "right"
    }

    //shooting ability
    if (keyWentDown("s")) {
      bullet = createSprite(player.x, player.y, 20, 20);
      bulletGroup.add(bullet);
      bullet.addImage(bullet_img);
      bullet.scale = 0.3;
      bullet.lifetime = 128;
      if (facing === "left") {
        bullet.velocityX = -10;
        Bfacing = "left";
      } else {
        bullet.velocityX = 10;
        Bfacing = "right";
      }
    }

    //allowing the player to jump
    if (keyDown("space")) {
      player.velocityY = -12;
    }

    //adding gravity to the player & making stuff move
    player.velocityY = player.velocityY + 0.8;


    //destroying other stuff
    platform1.y = 10000;
    platform2.y = 10000;
    platform3.y = 10000;
    coin1.y = 10000;
    enemy1.y = 10000;
    vent1.y = 10000;
    next1.x = -10000;

  }
  //creating the 2nd next arrow
  if (gameState === next2) {
    background("black");
    boss.visible = false;
    nxt2.x = 640;
    nxt2.y = 289;
    player.velocityY = 0;

    //ends the game when the arrow is pressed
    if (mousePressedOver(nxt2)) {
      gameState = finish1;
    }
  }

  //making the finish of the game
  if (gameState === finish1) {
    //painting th bg green
    background("green");

    //creating the text
    fill("white");
    text("Stay tuned for pt.2", 600, 200);
    textSize(50);
    text("You Win!", 550, 100);

    //turning visibilites of objects off
    mission1Text.visible = false;
    text1.visible = false;
    logo.visible = false;
    play.visible = false;
    play.x = -1000;
    player.visible = false;
    platform1.visible = false;
    platform2.visible = false;
    platform3.visible = false;
    moon.visible = false;
    coin1.visible = false;
    enemy1.visible = false;
    reset1.visible = false;
    ground.visible = false;
    vent1.visible = false;
    player.visible = false;
    ground.visible = false;
    platform5.y = -10000;
    platform4.x = -10000;
    boss.x = -10000;
    tower.x = -10000;
    nxt2.destroy();
  }

  //extra(not used anymore) ;
  /*fill("white");
  txt = text(mouseX + "," + mouseY, mouseX, mouseY);
  textSize(20);*/

  //makes the boss die
  if (bulletGroup.isTouching(boss) && Bfacing === "left") {
    boss.destroy();
    gameState = next2;
  } else if (bulletGroup.isTouching(boss) && Bfacing === "right") {
    bulletGroup.destroyEach();
  }
  
  //makes the player die when he touches the boss
  if (player.isTouching(boss)) {
    gameState = end;
    player.velocityY = 0;
  }

  //giving the boss gravity
  boss.velocityY = boss.velocityY + 0.8;

  //creating the coin counter
  fill("white");
  textSize(20);
  text("Coins:" + coincount, 40, 40);

  //displaying all the sprites
  drawSprites();
}

//resets the game
function reset() {
  player.addImage(player_img);
  gameState = mission1;

  //positions the player
  player.x = 63;
  player.y = 412;
}

//function to spawn lazers
function spawnLazers() {
  if (frameCount % 90 === 0) {
    lazer = createSprite(enemy1.x, enemy1.y, 50, 10);
    lazer.shapeColor = "red";
    lazer.velocityX = -10;
    lazer_group.add(lazer);
    lazer.lifetime = 90;
  }
} //YAY I REACHED 675 LINES OF CODE!!!!!!