var obstaclegroup,cloudgroup;
var PLAY = 1;
var END  = 0;
var gameState = PLAY;
var  trex,trex_running,ground,ground_image,ground2,cloud,cloud_image,obstacle1,  obstacle_image1,obstacle_image2,obstacle_image3,obstacle_image4,obstacle_image5,obstacle_image6,trex2,trex2_image,game_over,game_over_image,restart,restart_image,Score=0,die_sound,jump_sound,check_sound


function preload(){
  trex_running    = loadAnimation("trex1.png","trex3.png","trex4.png");
  ground_image    = loadImage("ground2.png");
  cloud_image     = loadImage("cloud.png")
  obstacle_image1 = loadImage("obstacle1.png")
  obstacle_image2 = loadImage("obstacle2.png")
  obstacle_image3 = loadImage("obstacle3.png")
  obstacle_image4 = loadImage("obstacle4.png")
  obstacle_image5 = loadImage("obstacle5.png")
  obstacle_image6 = loadImage("obstacle6.png")
  restart_image   = loadImage("restart.png")
  game_over_image = loadImage("gameOver.png")
  trex2_image     = loadAnimation("trex_collided.png")
  
  die_sound = loadSound("die.mp3")
  jump_sound= loadSound("jump.mp3")
  check_sound = loadSound("checkPoint.mp3")
  
  

}


function setup(){
  createCanvas(600,200)    
  
//create a trex sprite
   trex=createSprite(60,140,30,40);
   trex.addAnimation("run",trex_running); 
   trex.scale=0.5;
   trex.addAnimation("colliderun", trex2_image); 

  

   ground=createSprite(50,170,600,10)
   ground.addImage("ground",ground_image);
  
  
   ground2=createSprite(50,185,600,10)
   ground2.visible=false  
 
   obstaclegroup = createGroup();
   cloudgroup = createGroup();

   game_over=createSprite(300,60,100,20)
   game_over.addImage( "gameover",game_over_image);
   game_over.scale=0.5;
   game_over.visible=false  
  
   restart=createSprite(300,90,100,20)
   restart.addImage("restart",restart_image)
   restart.scale=0.5;
   restart.visible=false  

   
 
}
  



 function movingcloud(){
 if (frameCount % 90===0) {

   cloud=createSprite(500,70,20,20);
   cloud.addImage ("cloud",cloud_image) ;
   cloud.scale=0.5;
   cloud.velocityX=-9;
   cloud.y = Math.round(random(10,70));
   console.log(cloud.y); 
   cloud.lifetime=55
   cloudgroup.add(cloud); 

 }
 }


function runobstacle(){
if (frameCount % 90===0) {
  
  obstacle1=createSprite(413,160 ,20,20);  
  //obstacle1.addImage(" obstacle1",obstacle_image1);
  obstacle1.scale=0.5   ;
  obstacle1.velocityX=-(9+2*Score/100);
  obstacle1.lifetime=55
 
 var r = Math.round(random(1,6));
  switch(r){
    case 1 : obstacle1.addImage(obstacle_image1);
      break;
      
    case 2 : obstacle1.addImage(obstacle_image2);
      break;
      
    case 3 : obstacle1.addImage(obstacle_image3);
      break;
        
    case 4 : obstacle1.addImage(obstacle_image4);
      break;
        
    case 5 : obstacle1.addImage(obstacle_image5);
      break;
        
    case 6 : obstacle1.addImage(obstacle_image6);
      break;
     
      default:break; 
      
  }
   obstaclegroup.add(obstacle1); 
}
  
}




function draw(){
  background("WHITE")
  

  
  if(gameState===PLAY){
    
   if(ground.x<0){
  ground.x=ground.width/2;
 }
     ground.velocityX=-(9+2*Score/100);
    
    
   if(keyDown("space")&&trex.y>=120){
  trex.velocityY=-10 ;
  jump_sound.play(); 
   }   
   if(Score>0&&Score%200===0){
    check_sound.play();
   }
  trex.velocityY=trex.velocityY+1 ; 
  Score=Score+Math.round(getFrameRate()/60);
    

  movingcloud();
  runobstacle();
   
    
   
     
 
    if(obstaclegroup.isTouching(trex)) {
     gameState=END ;
      //trex.velocityY=-15
    die_sound.play();
    }
    
    }
  
  
  else if (gameState===END){
       
    ground.velocityX=0;
    obstaclegroup.setVelocityXEach(0);
    cloudgroup.setVelocityXEach(0);
    trex.changeAnimation("colliderun", trex2_image);
    obstaclegroup.setLifetimeEach(-1);
    cloudgroup.setLifetimeEach(-1);    
    restart.visible=true
    game_over.visible=true 
    trex.velocityY=0 ;
    if(mousePressedOver(restart)){
     reset(); 
    }
       
    
 }
    trex.setCollider("circle", 0, 0, 45);
   // trex.debug=true;
  
     
drawSprites();

   text("Score       "+Score, 440, 20);

  
   trex.collide(ground2   );  
  
   text(mouseX + ","+ mouseY,mouseX,mouseY) 
 
  


}

function reset (){
  Score=0;
gameState = PLAY;
obstaclegroup.destroyEach();
cloudgroup.destroyEach();
restart.visible=false
game_over.visible=false 
trex.changeAnimation("run",trex_running); 
 

}





