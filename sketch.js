var PLAY = 1;
var END=0;
var gameState=PLAY;
var monkey , monkey_running;
var gameOver;
var banana ,bananaImage, obstacle, obstacleImage;
var FoodGroup, obstacleGroup;
var score;
var survivalTime =1;
var score=0;
var ground, invisible_ground;

function preload(){
 monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png");
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
  
 
}



function setup() {
  createCanvas(600,600)
  //creating monkey
    monkey=createSprite(80,315,20,20);
    monkey.addAnimation("moving", monkey_running);
    monkey.scale=0.1;
  
  ground=createSprite(400,350,1000,10)
  ground.velocityX=-4;
  ground.x=ground.width/2;
  
  invisible_ground=createSprite(300,440,400,10);
  invisible_ground.visible=false;
  
  obstaclesGroup=new Group();
  bananaGroup= new Group();
  
  
}


function draw() {
  background("lightYellow");
  
    stroke("brown");
    textSize(20);
    fill("brown");
    text("Score "+ score, 400,50);


  
  if (gameState===PLAY){
        stroke("black");
    textSize(20);
    fill("black");
    survivalTime=Math.ceil(frameCount/frameRate());
    text("Survival Time: "+survivalTime, 100, 50);
    
    spawnBananas();
    spawnObstacles();
    
    
    if(keyDown("space")&&monkey.y>=200){
      monkey.velocityY=-12;
    }
    monkey.velocityY=monkey.velocityY+0.8;
    spawnBananas();
    if (ground.x<0){
    ground.x=ground.width/2;
   }
    monkey.collide(ground);
      if(bananaGroup.isTouching(monkey)){
      bananaGroup.destroyEach();
        score=score+2;
    }
    
    if(obstaclesGroup.isTouching(monkey)){
      obstaclesGroup.destroyEach();
      gameState=END;
      stroke("red");
      textSize(50);
      fill("red");
      text("Game Over", 200,200);
    }
    if(gameState===END){
      ground.velocityX=0;
      monkey.velocityY=0;
      monkey.visible=false;
      
      bananaGroup.setVelocityEach(0);
      obstaclesGroup.setVelocityEach(0);
     
      
      
     

    }
  }  
drawSprites();
}

function spawnBananas(){
  if (frameCount % 80===0){
  var banana =createSprite(600,120,40,10);
  banana.y = Math.round(random(120,200));
  banana.addImage(bananaImage);
  banana.scale=0.1;
  banana.velocityX=-3;
  banana.lifetime=400;
  banana.depth=monkey.depth;
  monkey.depth=monkey.depth+1;
  bananaGroup.add(banana);
  }
}

function spawnObstacles(){
  if(frameCount % 300===0){
    var obstacle=createSprite(600,325,10,40);
    obstacle.addImage(obstacleImage);
    obstacle.velocityX=-6;
    obstacle.scale=0.1;
    obstacle.lifeTime=400;
    obstaclesGroup.add(obstacle);
}
  
}






