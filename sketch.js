//Create variables her 
VAR , dogImg, happyDog, database, foods,foodStock;
var feed, addFood;
var feedTime, lastFed;
var Foodobj;

function preload(){
 //load imags here  
  sadDog=loadImage("Images/Dog.png");
  happyDog=loadImage("Images/happy dog.png");
}

function setup() {
  database = firebase.database();
  createCanvas(1000,400);
  
Foodobj = new Food();

  dog=createSprite(800,200,150,150);
  dog.addImage(sadDog);
  dog.scale=0.15;

  feed = createButton("Feed the Dog");
  feed.position(700,95);
  feed.mousePressed(feedDog);

  addFood = createButton("Add Food");
  addFood.position(800,95);
  addFood.mousePressed(addFoods);


}

function draw() {
  background(46,139,87);
  //add styles here 

  fedTime = database.ref("FeedTime");
  fedTime.on("value",function(data){
  lastFed = data.val();
})

fill(225);
textSize(20);
if(lastFed >= 12){
  text("Last Feed : " + lastFed % 12 + "PM", 350,30);
  }else if(lastFed == 0){
    text("Last Feed : 12 AM", 350,30);
    }
    else{
      text ("lastFed : " + lastFed +"AM", 350,30);
      }

     foodobj.display();
    drawSprites();

}

function readStock(data){
  foods = data.val();
  foodobj.updateFoodStock(foods);
}

function feedDog(){
  dog.addImage(happyDog);
  foodobj.updateFoodStock(foodobj.getFoodstock()-1)
  database.ref('/').update({
   Food: foodobj.getFoodstock(),
   feedTime: hour() 
  })
}

function addFood(){
  foods ++;
  database.ref('/').update({
    Food: foods
  })
}