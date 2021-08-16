var bg,bgImg;
var player, shooterImg, shooter_shooting;
var zombie,zombieGroup;
var gravestone;
var ammo
var heart1,heart2,heart3
var heart1Img,heart2Img,heart3Img
var gameState="fight"
var life=3
var bullets=80
var score=0
var gunshotsound,winsound
var zombie_hand
var tryAgain,tryAgainImg

function preload(){
  
  shooterImg = loadImage("assets/shooter_2.png")
  shooter_shooting = loadImage("assets/shooter_3.png")

  bgImg = loadImage("assets/bg.jpeg")
  zombieImg = loadImage("assets/zombie.png")
  player_fallen = loadImage("assets/shooter-fallen.png")
  graveyard = loadImage("assets/rip.png")
  ammoImg = loadImage("assets/bullet.png")
  zombie_hand = loadImage("assets/zombie-hand.png")

  heart1Img = loadImage("assets/heart_1.png")
  heart2Img = loadImage("assets/heart_2.png")
  heart3Img = loadImage("assets/heart_3.png")

  gunshotsound = loadSound("assets/gun-shot.wav")
  winsound = loadSound("assets/win.mp3")

  tryAgainImg=loadImage("assets/tryAgain.png")
}

function setup() {

  
  createCanvas(windowWidth,windowHeight);

  //adding the background image
  bg = createSprite(displayWidth/2-20,displayHeight/2-40,20,20)
bg.addImage(bgImg)
bg.scale = 1.1
  

//creating the player sprite
player = createSprite(displayWidth-1150, displayHeight-300, 50, 50);
 player.addImage(shooterImg)
   player.scale = 0.3
   player.debug = false
   player.setCollider("rectangle",0,0,300,300)

   gravestone = createSprite(displayWidth/2,displayHeight/2)
   gravestone.x = player.x
   gravestone.y = player.y
   gravestone.addImage(graveyard)
   gravestone.scale=1.6
   gravestone.visible=false

  

  ammogroup = createGroup();
 

  heart1=createSprite(windowWidth-150,40,20,20)
  heart1.addImage(heart1Img)
  heart1.scale=0.3
  heart1.visible=false

  heart2=createSprite(windowWidth-150,40,20,20)
  heart2.addImage(heart2Img)
  heart2.scale=0.3
  heart2.visible=false

  heart3=createSprite(windowWidth-150,40,20,20)
  heart3.addImage(heart3Img)
  heart3.scale=0.3
  
  zombieGroup = new Group()

  tryAgain = createSprite(windowWidth-400,300)
  tryAgain.addImage(tryAgainImg)
  tryAgain.scale=0.5
  tryAgain.visible=false;

}

function draw() {
  background(0); 
 
  

if(gameState==="fight"){
  if(life===3){
    heart3.visible=true
    heart1.visible=false
    heart2.visible=false
  }

  if(life===2){
    heart3.visible=false
    heart1.visible=false
    heart2.visible=true
  }

  if(life===1){
    heart3.visible=false
    heart1.visible=true
    heart2.visible=false
  }

  if(life===0){
    heart3.visible=false
    heart1.visible=false
    heart2.visible=false
    gameState="lost"
  }

  if(score===30){
    gameState="win"
  }

  if(bullets===0){
    gameState==="lost"
  }

if(zombieGroup.isTouching(player)){

for(var i=0;i<zombieGroup.length;i++){

if(zombieGroup[i].isTouching(player)){
  zombieGroup[i].destroy()
  life=life-1
}

}

}

if(zombieGroup.isTouching(ammogroup)){

  for(var i=0;i<zombieGroup.length;i++){
  
  if(zombieGroup[i].isTouching(ammogroup)){
    // zombieGroup[i].velocityX=0
    // ammogroup.destroyEach()
    score=score+1
    gunshotsound.play()
    // zombieGroup[i].addImage(zombie_hand)
    zombieGroup[i].destroy()
    // zombieGroup[i].scale=2
    // zombieGroup[i].lifetime=20
    ammogroup.destroyEach()
    
  }
  
  }
  
  }

  //moving the player up and down and making the game mobile compatible using touches
if(keyDown("UP_ARROW")||touches.length>0){
  player.y = player.y-30
}
if(keyDown("DOWN_ARROW")||touches.length>0){
 player.y = player.y+30
}


//release bullets and change the image of shooter to shooting position when space is pressed
if(keyWentDown("space")){
  spawnAmmo()
  player.addImage(shooter_shooting)
 bullets=bullets-1
}

//player goes back to original standing image once we stop pressing the space bar
else if(keyWentUp("space")){
  player.addImage(shooterImg)
}
spawnZombie()
}



drawSprites();

textSize(20)
fill("yellow")
text("Bullets:"+bullets,windowWidth-150,90)
text("Lives:"+life,windowWidth-150,120)
text("Score:"+score,windowWidth-150,150)

if(gameState==="lost"){
  player.addImage(graveyard)
  player.scale=1.5
  text("You have lost the match",windowWidth-900,500)
  text("Please try again",windowWidth-900,550)
  text("Better luck next time",windowWidth-900,590);
  tryAgain.visible=true
  if(mousePressedOver(tryAgain)){
    gameState="fight"
    // console.log("gamestate working")  
  restart()
  }
}

else if(gameState==="win"){
  text("Hurray You Have Won The Game",windowWidth-700,400)
  winsound.play()
}

}

function spawnZombie() {
if(frameCount % 50 === 0){
  

  zombie=createSprite(random(500,1100),random(100,500),40,40)
zombie.addImage(zombieImg)
zombie.velocityX=-10
zombie.scale=0.15
zombie.debuh=true
zombie.lifetime=400
zombieGroup.add(zombie)
}

}

function spawnAmmo() {
  ammo = createSprite(displayWidth,displayHeight)
  ammo.x = player.x
  ammo.y = player.y
  ammo.addImage(ammoImg)
  ammo.scale=0.13
  ammo.velocityX = 10
  ammogroup.add(ammo)
}

function restart() {
  life=3
  bullets=80
  score=0
  player.addImage(shooterImg)
  player.scale=0.3
  tryAgain.visible=false
}