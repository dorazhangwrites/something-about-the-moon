let world;
let marker;
let w = 700;
let h = 420;
let waves = [];
let puzzles = [];
let snow = [];
let introTimer = 5;
let playingTimer = 2;

// images
let intro1;
let intro2;
let paperboat;
let man_lying;
let man_standing;
let puzzle;
let complete_puzzle;
let right_top;
let right_middle;
let right_corner;
let centre_top;
let centre;
let centre_bottom;
let left_top;
let left_middle;
let left_corner;
let toComplete = ['left_top','left_middle','centre_top','centre_bottom','right_top','right_middle','right_corner'];
// moon phase
let fullPhase = ['newmoon','crescent_right', 'firstquarter','gibbous_right','fullmoon','gibbous_left','lastquarter','crescent_left','newmoon'];
let phaseNum = 0;
let currentPhase;
let newmoon;
let crescent_right;
let firstquarter;
let gibbous_left;
let fullmoon;
let gibbous_right;
let lastquarter;
let crescent_left;
let distance = 0;
// check puzzle
let fill = "";
let left_top_check = false;
let left_middle_check = false;
let centre_top_check = false;
let centre_bottom_check = false;
let right_top_check = false;
let right_middle_check = false;
let right_corner_check = false;
// 0 : playing; 1 : end
let displayCount = 0;
let gameState = 0;
let music;

function preload(){
  paperboat = loadImage('images/paper_boat.png');
  intro1 = loadImage('images/intro1.png');
  intro2 = loadImage('images/intro2.png');
  man_lying = loadImage('images/lying.png');
  man_standing = loadImage('images/man_standing2.png');
  puzzle = loadImage('images/puzzle2.png');
  complete_puzzle = loadImage('images/puzzle_complete.png');
  right_top = loadImage('images/right_top.png');
  right_middle = loadImage('images/right_middle.png');
  right_corner = loadImage('images/right_corner.png');
  centre_top = loadImage('images/centre_top.png');
  centre = loadImage('images/centre.png');
  centre_bottom = loadImage('images/centre_bottom.png');
  left_top = loadImage('images/left_top.png');
  left_middle = loadImage('images/left_middle.png');
  left_corner = loadImage('images/left_corner.png');
  newmoon = loadImage('images/moon/newmoon.png');
  crescent_right = loadImage('images/moon/crescent_right.png');
  firstquarter = loadImage('images/moon/first_quarter.png');
  gibbous_left = loadImage('images/moon/gibbous_left.png');
  fullmoon = loadImage('images/moon/fullmoon.png');
  gibbous_right = loadImage('images/moon/gibbous_right.png');
  lastquarter = loadImage('images/moon/last_quarter.png');
  crescent_left = loadImage('images/moon/crescent_left.png');
}

function setup() {
  world = new World('ARScene');
  markerTree = world.getMarker('tree');
  markerHiro = world.getMarker('hiro');
  scene = createGraphics(w,h);
  //scene.background(0);

  playerX = w/2+100;
  playerY = height/2-30;

  lyingX = 200;
  lyingY = h+20;

  centreX = 120;
  centreY = 150;

  moonX = 680;
  moonY = 140;

  for(let i = 0; i < 250 ; i++){
    waves.push(new Waves());
  }

  for(let i = 0; i < 250 ; i++){
    snow.push(new Snow());
  }

  puzzles.push(new Puzzles());
}

function draw() {

  world.clearDrawingCanvas();
  scene.clear();
  scene.background(0);
  // console.log(markerTree.isVisible());
  // if (markerTree.isVisible() == true) {
  //   var treePosition = markerTree.getScreenPosition();
  //   playerX = w-treePosition.x;
  //   playerY = treePosition.y;
  // }

  if(gameState == 0){
    intro();
  }else if(gameState == 1){
    playing();
  }else if(gameState == 2){
    theEnd();
  }

}

function intro(){
  imageMode(CENTER);
  image(intro1,width/2, height/2,w,h);

  if (frameCount % 60 == 0 && introTimer > 0) { 
    introTimer --;
  }
  if (introTimer == 0) {
    image(intro2,width/2,height/2,w,h);  
    stroke(255);
    noFill();
    rect(width/3-3,h-40,270,130);  

    console.log(markerTree.isVisible());
    if (markerTree.isVisible() == true) {
      var treePosition = markerTree.getScreenPosition();
      playerX = w-treePosition.x;
      playerY = treePosition.y;
    }
    image(paperboat, playerX+120, playerY-10,180,140);

  }

  if(playerX > width/3-3 && playerX < width/3-3+270){
    if(playerY > h-40 && playerY < h-40+130){
      if (frameCount % 60 == 0 && playingTimer > 0) { 
        playingTimer --;
      }
    }
  }

  if(playingTimer == 0){
    gameState = 1;
  }
}

function playing(){

  gameState = 1;

  for(let i = 0; i < waves.length; i++){
    waves[i].update();
    waves[i].show();
    waves[i].checkEdges();
  }
  // marker as the controller
  if (markerTree.isVisible() == true) {
    var treePosition = markerTree.getScreenPosition();
    playerX = w-treePosition.x;
    playerY = treePosition.y;
  }

  scene.noStroke();
  scene.fill(255, 234, 166,40);
  scene.triangle(moonX-50,30,moonX,380,moonX-distance,380);

  // ['newmoon','crescent_right', 'firstquarter','gibbous_right','fullmoon',
  // 'gibbous_left','lastquarter','crescent_left','newmoon'];
  if(fullPhase[phaseNum] == "newmoon"){
    currentPhase = newmoon;
  }
  if(fullPhase[phaseNum] == "crescent_right"){
    currentPhase = crescent_right;
  }
  if(fullPhase[phaseNum] == "firstquarter"){
    currentPhase = firstquarter;
  }
  if(fullPhase[phaseNum] == "gibbous_right"){
    currentPhase = gibbous_right;
  }
  if(fullPhase[phaseNum] == "fullmoon"){
    currentPhase = fullmoon;
  }
  if(fullPhase[phaseNum] == "gibbous_left"){
    currentPhase = gibbous_left;
  }
  if(fullPhase[phaseNum] == "lastquarter"){
    currentPhase = lastquarter;
  }
  if(fullPhase[phaseNum] == "crescent_left"){
    currentPhase = crescent_left;
  }

  imageMode(CENTER);
  image(scene, width/2, height/2);
  image(paperboat, playerX, playerY,180,140);
  image(man_lying, lyingX, lyingY,200,50);
  image(currentPhase, moonX,moonY,250,250);
  image(puzzle,centreX,centreY,220,130);
  if(left_top_check){
    image(left_top,centreX,centreY,220,130);
  }
  if(left_middle_check){
    image(left_middle,centreX,centreY,220,130);
  }
  if(centre_top_check){
    image(centre_top,centreX,centreY,220,130);
  }
  if(centre_bottom_check){
    image(centre_bottom,centreX,centreY,220,130);
  }
  if(right_top_check){
    image(right_top,centreX,centreY,220,130);
  }
  if(right_middle_check){
    image(right_middle,centreX,centreY,220,130);
  }
  if(right_corner_check){
    image(right_corner,centreX,centreY,220,130);
  }
  
  if(phaseNum == 9){
    phaseNum = 0;
  }
  for(let i = 0;i < puzzles.length; i++){
    puzzles[i].update();
    puzzles[i].show();
    if(puzzles[i].collision()){
      if(fill == "left_top"){
        left_top_check = true;
        phaseNum ++;
        distance += 75;
      }
      if(fill == "left_middle"){
        left_middle_check = true;
        phaseNum ++;
        distance += 75;
      }
      if(fill == "centre_top"){
        centre_top_check = true;
        phaseNum ++;
        distance += 75;
      }
      if(fill == "centre_bottom"){
        centre_bottom_check = true;
        phaseNum ++;
        distance += 75;
      }
      if(fill == "right_top"){
        right_top_check = true;
        phaseNum ++;
        distance += 75;
      }
      if(fill == "right_middle"){
        right_middle_check = true;
        phaseNum ++;
        distance += 75;
      }
      if(fill == "right_corner"){
        right_corner_check = true;
        phaseNum ++;
        distance += 75;
      }
    }
  
    if(puzzles[i].show() || puzzles[i].checkEdges()){
      puzzles.splice(i,1);
    }
  }
  if(frameCount % 60 == 0){
    puzzles.push(new Puzzles());
  }
  
  if(left_top_check && left_middle_check && centre_top_check && centre_bottom_check
  && right_top_check && right_middle_check && right_corner_check ){
    displayCount ++;
  }
  if(displayCount > 80){
    gameState = 2;
  }

}

function theEnd(){
  gameState = 2;

  scene.background(181, 181, 181);
  for(let i = 0; i < snow.length; i++){
    snow[i].update();
    snow[i].show();
    snow[i].checkEdges();
  }
  imageMode(CENTER);
  image(scene, width/2, height/2);
  image(man_standing,530,380,300,300);
  image(fullmoon,moonX,moonY,250,250);
}

class Waves{
  constructor(){
    this.pos = createVector(random(w), random(h/3-20,h-100));
    this.oldPos = createVector(this.pos.x, this.pos.y);
    this.angle = 0;
    this.randomSpeed = random(0.2,0.5);
    this.scale = 100;
    this.strokeSize = random(1,8);
    this.color = 255;
    this.inc = 0.01;
  }

  update(){
    let angle = noise(this.pos.x/this.scale,this.pos.y/this.scale) * PI;
    this.angle = angle;
    this.pos.add(
        sin(this.angle) * this.randomSpeed,
        cos(this.angle) * this.randomSpeed
    );
    this.pos.x += this.inc;
    this.pos.y += this.inc;
  }

  show(){
    scene.stroke(this.color,200);
    scene.strokeWeight(this.strokeSize);
    scene.line(this.oldPos.x, this.oldPos.y, this.pos.x, this.pos.y);
    this.oldPos.set(this.pos);
  }

  checkEdges(){
    if (this.pos.x > w) {
      this.pos.x = random(w);
      this.oldPos.set(this.pos.x, this.pos.y);
    }
    if (this.pos.x < 0) {
      this.pos.x = random(w);
      this.oldPos.set(this.pos.x, this.pos.y);
    }
    if (this.pos.y > h-100) {
      this.pos.y = random(h/3-20,h-100);
      this.oldPos.set(this.pos.x, this.pos.y);
    }
    if (this.pos.y < h/3-20){
      this.pos.y = random(h/3-20,h-100);
      this.oldPos.set(this.pos.x, this.pos.y);
    }
  }
}

class Puzzles{
  constructor(){
    this.currentImage = "";
    this.image = "";
    this.randomI = floor(random(toComplete.length));
    this.pos = createVector(random(50,w-30), h/2+50,h-40);
    this.angle = 0;
    this.randomSpeed = random(0.2,0.5);
    this.scale = 40;
    this.inc = 0.01;
    this.counter = 0;
    this.maxTime = 480;
    this.hitMode = false;
  }

  update(){
    let angle = noise(this.pos.x/this.scale,this.pos.y/this.scale) * PI;
    this.angle = angle;
    this.pos.add(
        sin(this.angle) * this.randomSpeed,
        cos(this.angle) * this.randomSpeed
    );
    this.pos.x += this.inc;
    this.pos.y += this.inc;
  }

  checkEdges(){
    if (this.pos.x > w) {
      return true;
    };
    if (this.pos.x < 0) {
      return true;
    };
  }

  show(){
    // ['left_top','left_middle','centre_top','centre_bottom','right_top','right_middle','right_corner'];
    if(toComplete[this.randomI] == "left_top"){
      this.currentImage = left_top;
      fill = "left_top";
    }
    if(toComplete[this.randomI] == "left_middle"){
      this.currentImage = left_middle;
      fill = "left_middle";
    }
    if(toComplete[this.randomI] == "centre_top"){
      this.currentImage = centre_top;
      fill = "centre_top";
    }
    if(toComplete[this.randomI] == "centre_bottom"){
      this.currentImage = centre_bottom;
      fill = "centre_bottom";
    }
    if(toComplete[this.randomI] == "right_top"){
      this.currentImage = right_top;
      fill = "right_top";
    }
    if(toComplete[this.randomI] == "right_middle"){
      this.currentImage = right_middle;
      fill = "right_middle";
    }
    if(toComplete[this.randomI] == "right_corner"){
      this.currentImage = right_corner;
      fill = "right_corner";
    }
    this.counter ++;
    image(this.currentImage,this.pos.x,this.pos.y,150,90);
    return(this.counter > this.maxTime);
  }

  collision(){
    if(!this.hitMode && dist(this.pos.x,this.pos.y,playerX,playerY) < 20){
      console.log('hit puzzle');
      this.hitMode = true;
      return true;
    }
  }

}

class Snow{
    constructor(){
      this.pos = createVector(random(w), random(h/3-20,h-100));
      this.oldPos = createVector(this.pos.x, this.pos.y);
      this.angle = 0;
      this.randomSpeed = random(0.2,0.5);
      this.scale = 100;
      this.strokeSize = random(2,10);
      this.inc = 0.01;
    }

    update(){
      let angle = noise(this.pos.x/this.scale,this.pos.y/this.scale) * PI;
      this.angle = angle;
      this.pos.add(
          cos(this.angle) * this.randomSpeed,
          sin(this.angle) * this.randomSpeed
      );
      this.pos.x += this.inc;
      this.pos.y += this.inc;
    }

    show(){
      scene.stroke(228, 231, 237);
      scene.strokeWeight(this.strokeSize);
      scene.line(this.oldPos.x, this.oldPos.y, this.pos.x, this.pos.y);
      this.oldPos.set(this.pos);
    }

    checkEdges(){
      if (this.pos.x > w) {
        this.pos.x = random(w);
        this.oldPos.set(this.pos.x, this.pos.y);
      }
      if (this.pos.x < 0) {
        this.pos.x = random(w);
        this.oldPos.set(this.pos.x, this.pos.y);
      }
      if (this.pos.y > h-100) {
        this.pos.y = random(h/3-20,h-100);
        this.oldPos.set(this.pos.x, this.pos.y);
      }
      if (this.pos.y < h/3-20){
        this.pos.y = random(h/3-20,h-100);
        this.oldPos.set(this.pos.x, this.pos.y);
      }
    }
  }
