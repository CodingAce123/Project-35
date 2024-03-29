var balloon
var balloonImage1,balloonImage2;
var database;
var height;

function preload(){
bg = loadImage("cityImage.png");
balloonImage1 = loadAnimation("hotairballoon1.png");
balloonImage2 = loadAnimation("hotairballoon1.png","hotairballoon2.png","hotairballoon3.png");
}

function setup(){
database = firebase.database();
createCanvas(1400,650);

balloon = createSprite(250,650,150,150);
balloon.addAnimation("HotAirBalloon",balloonImage1);
balloon.scale = 0.55;

var balloonHeight = database.ref('balloon/height');
balloonHeight.on("value",readHeight,showError);
textSize(20); 
}

function draw(){
background(bg);

if(keyDown(UP_ARROW)){
updateHeight(0,-10);
balloon.addAnimation("HotAirBalloon",balloonImage2);
balloon.scale = balloon.scale -0.005;
}
else if(keyDown(DOWN_ARROW)){
updateHeight(0,+10);
balloon.addAnimation("HotAirBalloon",balloonImage2);
balloon.scale = balloon.scale +0.005;
}
else if(keyDown(LEFT_ARROW)){
updateHeight(-10,0);
balloon.addAnimation("HotAirBalloon",balloonImage2);
}
else if(keyDown(RIGHT_ARROW)){
updateHeight(10,0);
balloon.addAnimation("HotAirBalloon",balloonImage2);
}

drawSprites();
fill(0);
stroke("black");
textSize(25);
textFont("Arial")
text("To Move The Hot Air Balloon, Use Arrow Keys",40,40);
}


function updateHeight(x,y){
database.ref('balloon/height').set({
'x': height.x + x ,
'y': height.y + y
})
}

function readHeight(data){
height = data.val();
console.log(height.x);
balloon.x = height.x;
balloon.y = height.y;
}

function showError(){
console.log("Error in database");
}
