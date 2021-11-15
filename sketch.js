var bg,bgImg;
var player, shooterImg, shooter_shooting;
var zombie
var gamestate = "play"
var bullet
var zombieG
var score = 0
var game_over
var bulletG
function preload(){
  zombieImg = loadImage("zombie.jpg")
  zombie2Img = loadImage("zombie1.jpg")
  shooterImg = loadImage("assets/shooter_2.png")
  shooter_shooting = loadImage("assets/shooter_3.png")
  bulletImg = loadImage("bullet.jpg")
  bgImg = loadImage("assets/bg.jpeg")
 gameoverImg = loadImage("gameover.jpg")
}

function setup() {

  
  createCanvas(windowWidth,windowHeight);

  //adding the background image
  bg = createSprite(displayWidth/2-20,displayHeight/2-40,20,20)
bg.addImage(bgImg)
bg.scale = 1.1
game_over = createSprite(displayWidth/2,displayHeight/2)
  game_over.addImage(gameoverImg)
game_over.scale = 0.3

//creating the player sprite
player = createSprite(displayWidth-1150, displayHeight-300, 50, 50);
 player.addImage(shooterImg)
   player.scale = 0.3
   player.debug = true
   player.setCollider("rectangle",0,0,100,300)
zombieG = new Group()
bulletG = new Group()
}

function draw() {
  background(255); 

  
  //moving the player up and down and making the game mobile compatible using touches
  if (gamestate == "play"){
    console .log("the beginning")
    game_over.visible = false
    if(keyDown("UP_ARROW")||touches.length>0){
      player.y = player.y-30
    }
    if(keyDown("DOWN_ARROW")||touches.length>0){
     player.y = player.y+30
    }
    if(keyWentDown("space")){
      player.addImage(shooter_shooting)
    }
    else if(keyWentUp("space")){
      player.addImage(shooterImg)
      bullet = createSprite(player.x,player.y,20,20)
      bullet.velocityX = 10
      bullet.shapeColor = "red"
      bullet.lifetime = 100
      //bullet.addImage(bulletImg)
      bullet.scale = 0.4
      bulletG.add(bullet)
      bullet.debug = true
      if(zombieG.isTouching(bulletG)){
console.log("zombie is touching bullet")


score = score + 1
text("score = "+score,200,50)
      } 
    }

    spawnzombie()
    //if(zombieG.isTouching(player)){ 
     // gamestate = "end"
     // }
  }
  if(gamestate == "end"){
console.log("the end")
game_over.visible = true
zombieG.setVelocityXEach(0)
zombieG.setLifetimeEach(-1)
//bullet.lifetime = 0
//zombieG.destroyEach()
bg.visible = false



  }
drawSprites()
textSize(40)
fill("white")
text("score = "+score,200,50)
}

function spawnzombie(){
if(frameCount%60==0){
  console.log("IN FUNCTION")
  posy=Math.round(random(80,800))
  r = Math.round(random(2,1))
  console.log(r)
zombie = createSprite(1200,posy,40,40)
zombieG.add(zombie)
if(r == 1){
  zombie.addImage(zombieImg)
  zombie.scale = 0.1
}
if(r == 2){
  zombie.addImage(zombie2Img)
  zombie.mirrorX(-1)
  console.log("why wont you work")
  zombie.scale = 0.3
  
}
console.log("sprite created")
zombie.velocityX = -10

zombie.lifetime = 130
zombie.debug = true
}
}