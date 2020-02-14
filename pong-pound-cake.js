//ball
let xBall = 300;
let yBall = 200;
let diameter = 10;
let radius = diameter/2;
//ball speed
let speedXBall = 10;
let speedYBall = 6;

//left rect
let xLeftRect = 10;
let yLeftRect = 150;
let leftRectWidth = 10;
let leftRectHeight = 100;
let leftRectBorderRadius = 20;

//right rect
let xRightRect = 580;
let yRightRect = 150;
let rightRectWidth = 10;
let rightRectHeight = 100;
let rightRectBorderRadius = 20;
let speedYRightRect;

//colision
let hit = false;

//scoreboard
leftPoints = 0;
rightPoints = 0;

//sons
let toc;
let ihu;
let bleh;
let back;

//level
let easyLevel = 0;

function preload(){
  toc = loadSound("toc.wav");
  ihu = loadSound("ihu.wav");
  back = loadSound("back.mp3");

}


function setup() {
  createCanvas(600, 400);
  back.loop();
}

function draw() {
  background(180);
  drawBall(xBall, yBall);
  drawRect(xLeftRect, yLeftRect, leftRectWidth, leftRectHeight, leftRectBorderRadius);
  drawRect(xRightRect, yRightRect, rightRectWidth, rightRectHeight, rightRectBorderRadius);
  moveBall();
  verifyEdgeColision();
  moveRect();
  //verifyRectColision();
  verifyColisionRectCircle(xLeftRect, yLeftRect, leftRectWidth, leftRectHeight);
  verifyColisionRectCircle(xRightRect, yRightRect, rightRectWidth, rightRectHeight);
  moveRightRect();
  scoreboard();
  points()
}

function drawBall(){
  circle(xBall, yBall, diameter);
}

function moveBall(){
  xBall += speedXBall;
  yBall += speedYBall;
}

function verifyEdgeColision(){
  if (xBall + radius > width || xBall - radius < 0){
    speedXBall *= -1;
  }
  if(yBall + radius > height || yBall - radius < 0){
    speedYBall *= -1;
  }
}

function drawRect(x, y, w, h, b){
  rect(x, y, w, h, b);
}

function moveRect(){
  if(keyIsDown(UP_ARROW)){
    yLeftRect -= 10;
  }

  if(keyIsDown(DOWN_ARROW)){
    yLeftRect += 10;
  }
}

//minha função
function verifyRectColision(){
    if (xBall - radius < xLeftRect + rightRectWidth && yBall - radius < yLeftRect + leftRectHeight && yBall + radius > yLeftRect) {
    speedXBall *= -1;
    toc.play();
  }
}

//função importada
function verifyColisionRectCircle(xRect, yRect, wRect, hRect) {
	hit = collideRectCircle(xRect,yRect,wRect,hRect,xBall,yBall,radius);
  if(hit){
    speedXBall *= -1;
    toc.play();
  }

}

function moveRightRect(){
  //-30 = difficult (more close to 0 = more difficult)
  speedYRightRect = yBall - yRightRect - rightRectHeight/2 - 40;
  yRightRect += speedYRightRect
}

function scoreboard(){
  textAlign(CENTER);
  textSize(16)
  fill(color(30,144,255))
  rect(130,10,40,20);
  fill(255);
  text(leftPoints, 150, 26);
  fill(color(30,144,255))
  rect(430,10,40,20);
  fill(255);
  text(rightPoints, 450, 26);
}
function points(){
  if(xBall > 590){
    leftPoints += 1;
    ihu.play();
  }
  if(xBall < 10){
    rightPoints += 1;
    ihu.play();
  }
}
