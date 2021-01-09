var  dog, happyDog, database, foodS, foodStock,dogImg
var database;
function preload()
{
dogImg = loadImage("images/Dog.png")
dogHappy = loadImage("images/happydog.png")
}

function setup() {
  createCanvas(500, 500);
  database = firebase.database();
 
  dog=createSprite(250,300,150,150);
  dog.addImage(dogImg);
  dog.scale=0.15;

  foodStock = database.ref("food") 
 foodStock.on("value",readStock)

}


function draw() {  
background(46,139,87)

if(keyWentDown(UP_ARROW)){
  writeStock(foodS);
  dog.addImage(dogHappy)
}

fill(255,255,254);
stroke("black");
textSize(13);
text("Food remaining : "+foodS,170,200);
 text("PRESS UP ARROW KEY TO FEED THE DOG",130,10,300,20)
 
  drawSprites();
}

//Function to read values from DB
function readStock(data){
  foodS=data.val();
}

//Function to write values in DB
function writeStock(x){
  if(x<=0){
    x=0;
  }else{
    x=x-1;
  } 
  database.ref('/').update({
    food:x
  })
}


