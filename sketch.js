var bg,bgImg;
var player, shooterImg, shooter_shooting;
var zombie, zombieImg;
var zombieGroup;
var heart1, heart2, heart3;
var heart1Img, heart2Img, heart3Img;
var bullet;
var bullets = 30;
var bulletGroup;
var bulletImg;
var gameState = "fight";
var life = 3;


function preload(){
  
  shooterImg = loadImage("assets/shooter_2.png")
  shooter_shooting = loadImage("assets/shooter_3.png")

  zombieImg = loadImage("assets/zombie.webp")

  bgImg = loadImage("assets/bg.jpg")

  heart1Img = loadImage("assets/heart_1.png")
  heart2Img = loadImage("assets/heart_2.png")
  heart3Img = loadImage("assets/heart_3.png")

  bulletImg = loadImage("assets/bullet.webp")

}

function setup() {

  
  createCanvas(windowWidth,windowHeight);

  //adicionando a imagem de fundo
  bg = createSprite(displayWidth/2-20,displayHeight/2-40,20,20)
  bg.addImage(bgImg)
  bg.scale = 1.1
      

//criando o sprite do jogador
   player = createSprite(displayWidth-1150, displayHeight-300, 50, 50);
   player.addImage(shooterImg)
   player.scale = 0.6
   player.debug = false;
   player.setCollider("rectangle",0,0,300,300)

   heart1 = createSprite(displayWidth-150, 40, 20, 20);
   heart1.addImage("heart1", heart1Img);
   heart1.scale = 0.4;
   heart1.visible = false;

    heart2 = createSprite(displayWidth-100,40,20,20)
    heart2.visible = false
    heart2.addImage("heart2",heart2Img)
    heart2.scale = 0.4

    heart3 = createSprite(displayWidth-150,40,20,20)
    heart3.addImage("heart3",heart3Img)
    heart3.scale = 0.4

  zombieGroup = new Group();
  bulletGroup = new Group();
}

function draw() {
  background(0); 
  if (gameState == "fight"){

  if(life == 3){
    heart3.visible = true;
    heart2.visible = true;
    heart1.visible = true;
  }
  if(life == 2){
    heart3.visible = false;
    heart2.visible = true;
    heart1.visible = true;
  }
  if(life == 1){
    heart3.visible = false;
    heart2.visible = false;
    heart1.visible = true;
  }
  if (life == 0){
    gameState = "lost"
  }

  //movendo o jogador para cima e para baixo e tornando o jogo compatível com dispositivos móveis usando toques
if(keyDown("UP_ARROW")||touches.length>0){
  player.y = player.y-30
}
if(keyDown("DOWN_ARROW")||touches.length>0){
 player.y = player.y+30
}


//solte balas e mude a imagem do atirador para a posição de tiro quando a tecla de espaço for pressionada
if(keyWentDown("space")){
 
  bullet = createSprite(displayWidth - 1000, player.y - 30, 20, 10);
  bullet.addImage(bulletImg)
  bullet.velocityX = 20;
  bulletGroup.add(bullet);
  bullets = bullets - 1;
  bullet.scale = 0.6
 
}

if(zombieGroup.isTouching(bulletGroup)){
  
  for(var i=0;i<zombieGroup.length;i++){

    if(zombieGroup[i].isTouching(bulletGroup)){
      zombieGroup[i].destroy();
      bulletGroup.destroyEach();
      
    }
  }
}

enemy();
  }

drawSprites();

  if(bullets == 0){
    gameState = "bullet";
  }

   if(gameState == "bullet"){
    textSize(50)
    fill("crimson")
    text.depth = bg + 100000000; 
    text("SUAS BALAS ACABARAM, ECONOMIZE", 200, 500);
    player.destroy();
    zombieGroup.destroyEach();
    bulletGroup.destroyEach();
  
    
   }

   else if(gameState == "won"){
    textSize(20)
    fill("lightYellow")
    text("PARABÉNS, VOCÊ DERROTOU TODOS", 400, 400)
    player.destroy();
    zombieGroup.destroyEach();
    bulletGroup.destroyEach();
   }

   else if(gameState == "lost"){
    textSize(20)
    fill("grey")
    text("VOCÊ PERDEU, MELHORE", 400, 400)
    player.destroy();
    zombieGroup.destroyEach();
    bulletGroup.destroyEach();
   }

//destrua o zumbi qunado o jogador tocar
if(zombieGroup.isTouching(player)){
 

 for(var i=0;i<zombieGroup.length;i++){     
      
  if(zombieGroup[i].isTouching(player)){
       zombieGroup[i].destroy()
       life = life - 1;
       } 
 }
}


  function enemy (){
    if(frameCount%55 === 0){
      zombie = createSprite(random(800,1100), random(390,500),40,40);
      zombie.addImage(zombieImg);
      zombie.scale = 0.9;
      zombie.velocityX = -3;
      zombie.setCollider("rectangle",0,0,400,400)
      zombie.lifetime = 400
      zombieGroup.add(zombie);

    }
  }
