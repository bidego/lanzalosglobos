document.addEventListener('readystatechange', () => loader());


// setup canvas

var canvas = document.querySelector('canvas');
var ctx = canvas.getContext('2d');

var liOverall = document.querySelector('#overall');
var liRestantes = document.querySelector('#restantes');
var liCartel = document.querySelector('#cartel');
var liAudio = document.querySelector('#audio');

var time = document.querySelector('#time');
var nav = document.querySelector('nav');
var navOl = document.querySelector('#navlist1');
var navOl2 = document.querySelector('#navlist2');
var globosRestantes =document.querySelector('#globosRestantes');

var cursorImg =document.querySelector('#mau');

var botonScore = document.getElementById("score");
var botonNuevo = document.getElementById("nuevo");

var height = canvas.height = window.innerHeight*.88;
var width = canvas.width = height/3*5;

var display = { w: width, h: height }

window.onresize = function(event){
  display.h = canvas.height = window.innerHeight*0.88,
  display.w = canvas.width = display.h/3*5
}





function loader() {
  if(document.readyState == "complete"){
      document.getElementById("loader").style.visible = "hiiden";
      document.getElementById("loader").style.opacity = "0";
      document.getElementById("container").style.animationPlayState = "running";
  }
}






function nuevoJuego() {
  balls = [];
  balloons = [];
  gatos = [];

  if(juegos.nivel.length>0) tiempos[tiempos.length-1].parar();
  
  evilCircle.ResetVel();
  var deadline = new Date();
  deadline.setSeconds(deadline.getSeconds() + 5 + (2*(parseInt(Math.sqrt((juegos.nivel.length+1)*(juegos.nivel.length+1))))));
  

  tiempos.push( new initializeClock('time', deadline));
  for(i=0;i<navOl.childNodes.length;i++) {
    navOl.childNodes[i].style.visibility = "hidden";
    navOl.childNodes[i].style.opacity = "0";
  }
  for(i=0;i<navOl2.childNodes.length;i++) {
    navOl2.childNodes[i].style.visibility = "hidden";
    navOl2.childNodes[i].style.opacity = "0";
  }

  audio.style.visibility = "visible";
  audio.style.opacity = "1";
  botonScore.style.visibility = "visible";
  botonScore.style.opacity = "1";
  time.style.visibility = "visible";
  time.style.opacity = "1";
  liRestantes.style.visibility = "visible";
  liRestantes.style.opacity = "1";

  juegos.nivel.push(new Juego(deadline));
  evilCircle.setControls();

}


function Juego(deadLine) {
	this.ballCount = 0;
  this.score = 0;
  this.timeElapsed = 0;
  this.ballsKilled = 0;
  this.active = true
  this.deadLine = deadLine;

  evilCircle.imgSize.height = 96000;
  evilCircle.imgSize.width = 73000;

}
Juego.prototype.resetCount = function () {
	this.ballCount = 0;
  while(globosRestantes.firstChild) { globosRestantes.removeChild(globosRestantes.firstChild) };
}


Juego.prototype.newBall = function () {
	this.ballCount++;
  globosRestantes.innerHTML = this.ballCount;
}
Juego.prototype.newBalloon = function () {
  this.ballCount++;
  globosRestantes.innerHTML = this.ballCount;
}

Juego.prototype.newGato = function () {
  this.ballCount++;
  globosRestantes.innerHTML = this.ballCount;
}


Juego.prototype.killBall = function () {
  var t = (Date.parse(this.deadLine) - Date.parse(new Date()))/1000;;
  this.ballsKilled++;
	this.ballCount--;
  this.timeElapsed = time.childNodes[0].data;
  this.score = Math.floor(this.ballsKilled/100*35*(100-t));
  liOverall.innerHTML = this.score;
	var b = document.createElement('b');
	b.textContent = this.ballCount;
	while(globosRestantes.firstChild) { globosRestantes.removeChild(globosRestantes.firstChild) };
  globosRestantes.appendChild(b);
  if(this.ballCount==0) this.Win();
}

Juego.prototype.killBalloon = function () {
  var t = (Date.parse(this.deadLine) - Date.parse(new Date()))/1000;;
  this.ballsKilled++;
  this.ballCount--;
  this.timeElapsed = time.childNodes[0].data;
  this.score = Math.floor(this.ballsKilled/100*35*(100-t));
  liOverall.innerHTML = this.score;
  var b = document.createElement('b');
  b.textContent = this.ballCount;
  while(globosRestantes.firstChild) { globosRestantes.removeChild(globosRestantes.firstChild) };
  globosRestantes.appendChild(b);
  if(this.ballCount==0) this.Win();
}

Juego.prototype.killGato = function () {
  var t = (Date.parse(this.deadLine) - Date.parse(new Date()))/1000;;
  this.ballsKilled++;
  this.ballCount--;
  this.timeElapsed = time.childNodes[0].data;
  this.score = Math.floor(this.ballsKilled/100*35*(100-t));
  liOverall.innerHTML = this.score;
  var b = document.createElement('b');
  b.textContent = this.ballCount;
  while(globosRestantes.firstChild) { globosRestantes.removeChild(globosRestantes.firstChild) };
  globosRestantes.appendChild(b);
  if(this.ballCount==0) this.Win();
}


Juego.prototype.Resultados = function(r) {

  this.r = r;
/* Cartel fin nivel */
  var b = document.createElement("b");
  var tbody = document.createElement("tbody");
  var thead = document.createElement("thead");
  var tr = [];
  var td = [];
  var div = document.createElement("div");
  var table = document.createElement("table");
  table.setAttribute("cellspacing","10");
  thead.innerHTML = '<tr><th>Nivel</th><th>Deuda (U$S)</th><th>ⓖlobos y ⓖatos</th><th>Tiempo restante</th></tr>';
  (r=="Win")?b.textContent = "Lanzá los globos para el siguiente nivel.":b.textContent = "Perdiste, sos pobre.";
  var c01 ="";
  var total = 0;

  for(j=0;j<juegos.nivel.length;j++){
    if(juegos.nivel[j].active == false) {
      tr[j] = document.createElement("tr");
      td[j] = [4];
      for(i=0;i<4;i++) {
        td[j][i] = document.createElement("td");
      }
      
      td[j][0].textContent = j+1;
      tr[j].appendChild(td[j][0]);

      td[j][1].textContent = juegos.nivel[j].score + " M";
      tr[j].appendChild(td[j][1]);

      td[j][2].textContent = juegos.nivel[j].ballsKilled;
      tr[j].appendChild(td[j][2]);

      td[j][3].textContent = juegos.nivel[j].timeElapsed.split(" ")[0];
      tr[j].appendChild(td[j][3]);

      tbody.appendChild(tr[j]);

      total += parseInt(juegos.nivel[j].score);
    }
  }

  
  tr[tr.length] = document.createElement("tr");
  td[td.length] = document.createElement("td");
  td[td.length-1].setAttribute('colspan','4');
  td[td.length-1].textContent = "Emisión Total: U$D"+total+" M ▶";
  tr[tr.length-1].appendChild(td[td.length-1]);


  tbody.appendChild(tr[tr.length-1]);
  table.appendChild(thead);
  table.appendChild(tbody);
  liOverall.innerHTML = total;
  while(liCartel.firstChild) liCartel.removeChild(liCartel.firstChild);
  div.appendChild(table);
  liCartel.appendChild(div);
  liCartel.appendChild(b);
  
  /* Fin cartel nivel */


  navOl.style.visibility = "visible";
  navOl.style.opacity = "1";
  navOl2.style.visibility = "visible";
  navOl2.style.opacity = "1";
  for(i=0;i<navOl.childNodes.length;i++) {
   navOl.childNodes[i].style.opacity = "1";
   navOl.childNodes[i].style.visibility = "visible";
  }
  for(i=0;i<navOl2.childNodes.length;i++) {
   navOl2.childNodes[i].style.opacity = "1";
   navOl2.childNodes[i].style.visibility = "visible";
  }
}

Juego.prototype.Win = function(){
  this.active = false;
  this.timeElapsed = time.childNodes[0].data;
  this.score += parseInt(this.timeElapsed.split(" ")[0]);
  tiempos[tiempos.length-1].parar();
	balls = 0;
  this.Resultados("Win");

}
Juego.prototype.Lose = function(){
  this.active = false;
  this.timeElapsed = time.childNodes[0].data;
  this.score = parseInt(this.ballsKilled)*50+parseInt(this.timeElapsed.split(" ")[0]);
  tiempos[tiempos.length-1].parar();
  this.Resultados("Lose");

  balls = 0;
  balloons = 0;
  gatos = 0;

  tiempos = [];
  juegos.nivel = [];

}// function to generate random number

function random(min,max) {
  var num = Math.floor(Math.random()*(max-min)) + min;
  return num;
}


function Shape() {
	this.x = random(1, display.w);
	this.y = random(1, display.h);
	this.velX = random(-3, 3);
	this.velY = random(-3, 3);
	this.exists = true;
}

function Ball(){
	Shape.call(this);
  
  this.c = random(1,6);
  switch(this.c) {
    case 1: this.color = 'blue';
    break;
    case 2: this.color = 'green';
    break;
    case 3: this.color = 'yellow';
    break;
    case 4: this.color = 'red';
    break;
    case 5: this.color = 'orange';
    break;
    case 6: this.color = 'light red';
    break;
  }

	/*this.color = 'rgb(' + random(0, 255) + ',' + random(0, 255) + ',' + random(0, 255) +')';*/
	this.size = random(10, 30);
	juegos.latest.newBall();
}

Ball.prototype = Object.create(Shape.prototype);

Ball.prototype.constructor = Ball;


Ball.prototype.draw = function() {
  ctx.beginPath();
  ctx.fillStyle = this.color;
  ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
  ctx.fill();
}

Ball.prototype.update = function() {
  if ((this.x + this.size) >= display.w) {
    this.velX = -(this.velX);
  }

  if ((this.x - this.size) <= 0) {
    this.velX = -(this.velX);
  }

  if ((this.y + this.size) >= display.h) {
    this.velY = -(this.velY);
  }

  if ((this.y - this.size) <= 0) {
    this.velY = -(this.velY);
  }

  this.x += this.velX;
  this.y += this.velY;
}
Ball.prototype.collisionDetect = function() {
  for (var j = 0; j < balls.length; j++) {
    if (!(this === balls[j]) && balls[j].exists) {
      var dx = this.x - balls[j].x;
      var dy = this.y - balls[j].y; 
      var distance = Math.sqrt(dx * dx + dy * dy);

      if (distance < this.size + balls[j].size) {
        balls[j].color = this.color = 'rgb(' + random(0, 255) + ',' + random(0, 255) + ',' + random(0, 255) +')';
        if(balls[j].velX<0) balls[j].velX = balls[j].velX*(-1);
        else balls[j].velX = -balls[j].velX;
        if(balls[j].velY<0) balls[j].velY = balls[j].velY*(-1);
        else balls[j].velY = -balls[j].velY;
      }
    }
  }
}



function Gato(){
  Shape.call(this);
  
  this.pointer = document.getElementById("gato");

  while(this.velX==0){
    this.velX = random(-5,5);
  }
  while(this.velY==0){
    this.velY = random(-5,5);
  }
  this.size = 25;
  juegos.latest.newGato();
}

Gato.prototype = Object.create(Shape.prototype);

Gato.prototype.constructor = Gato;


Gato.prototype.draw = function() {
  ctx.beginPath();

  ctx.drawImage(this.pointer,this.x-parseInt(this.pointer.width)/2,this.y-parseInt(this.pointer.height)/2, this.pointer.width, this.pointer.height);
}

Gato.prototype.update = function() {
  if ((this.x + this.pointer.width/2) >= display.w) {
    this.velX = -Math.abs(this.velX);
  }

  if ((this.x - this.pointer.width/2) <= 0) {
    this.velX = Math.abs(this.velX);
  }

  if ((this.y + this.pointer.height/2) >= display.h) {
    this.velY = -Math.abs(this.velY);
  }

  if ((this.y - this.pointer.height/2) <= 0) {
    this.velY = Math.abs(this.velY);
  }

  this.x += this.velX;
  this.y += this.velY;
}
Gato.prototype.collisionDetect = function() {
  for (var j = 0; j < gatos[j].length; j++) {
    if (!(this === gatos[j]) && gatos[j].exists) {
      var dx = this.x - gatos[j].x;
      var dy = this.y - gatos[j].y; 
      var distance = Math.sqrt(dx * dx + dy * dy);

      if (distance < this.size + gatos[j].size) {
        if(gatos[j].velX<0) gatos[j].velX = gatos[j].velX*(-1);
        else gatos[j].velX = -gatos[j].velX;
        if(gatos[j].velY<0) gatos[j].velY = gatos[j].velY*(-1);
        else gatos[j].velY = -gatos[j].velY;
      }
    }
  }
}




function EvilCircle() {
	Shape.call(this);

  this.imgSize = { width : 73000, height : 96000};
	this.velX = 10;
	this.velY = 10;
  this.pointer = document.getElementById("mau");

  this.dir;
}

EvilCircle.prototype = Object.create(Shape.prototype);

EvilCircle.prototype.constructor = EvilCircle;


EvilCircle.prototype.ResetVel = function() {
  this.velX = 10;
  this.velY = 10;
}


EvilCircle.prototype.draw = function(dir) {
  ctx.beginPath();

  this.imgSize.width -=1*20;
  this.imgSize.height -=this.imgSize.height/this.imgSize.width*20;

  ctx.drawImage(this.pointer,this.x-parseInt(this.pointer.width)/2,this.y-parseInt(this.pointer.height)/2, this.pointer.width, this.pointer.height);


  /*ctx.stroke();*/
  this.pointer.setAttribute("width" , this.imgSize.width/1000);
  this.pointer.setAttribute("height" , this.imgSize.height/1000);

  this.dir = dir;
}


EvilCircle.prototype.checkBounds = function() {
  if ((this.x + this.pointer.width) >= display.w+this.pointer.width) {
    this.x += -(this.pointer.width);
  }

  if ((this.x - this.pointer.width) <= 0-this.pointer.width) {
    this.x -= -(this.pointer.width);
  }

  if ((this.y + this.pointer.height) >= display.h+this.pointer.height) {
    this.y += -(this.pointer.height);
  }

  if ((this.y - this.pointer.height) <= 0-this.pointer.height) {
    this.y -= -(this.pointer.height);
  }
}

EvilCircle.prototype.collisionDetect = function() {
  for (var j = 0; j < balls.length; j++) {
    if (!(this === balls[j])) {
      var dx = this.x - balls[j].x;
      var dy = this.y - balls[j].y;
      var distance = Math.sqrt(dx * dx + dy * dy);

      if (distance < this.pointer.width/2 + balls[j].size) {
        if(balls[j].exists == true) {
        	balls[j].exists = false;
        	juegos.nivel[juegos.nivel.length-1].killBall();
        }
      }
    }
  }

  for (var j = 0; j < balloons.length; j++) {
    if (!(this === balloons[j])) {
      var dx = this.x - (balloons[j].centerX);
      var dy = this.y - (balloons[j].centerY);
      var distance = Math.sqrt(dx * dx + dy * dy);

      if (distance < this.pointer.width/3 + balloons[j].size) {
        if(balloons[j].exists == true) {
          balloons[j].exists = false;
          juegos.nivel[juegos.nivel.length-1].killBalloon();

        }
      }

    }

  }
  for (var j = 0; j < gatos.length; j++) {
    if (!(this === gatos[j])) {
      var dx = this.x - gatos[j].x;
      var dy = this.y - gatos[j].y;
      var distance = Math.sqrt(dx * dx + dy * dy);

      if (distance < this.pointer.width/3 + gatos[j].pointer.width) {
        if(gatos[j].exists == true) {
          gatos[j].exists = false;
          juegos.nivel[juegos.nivel.length-1].killGato();

        }
      }

    }

  }
}
EvilCircle.prototype.move = function(dir,n){
  
  switch(dir){
    case "left": this.x -= this.velX +=n; this.draw(dir);

    break;
    case "right": this.x += this.velX +=n; this.draw(dir);
    break;
    case "top": this.y -= this.velY +=n; this.draw(dir);
    break;
    case "bottom": this.y += this.velY +=n; this.draw(dir);
    break;
  }

  
}
var srcCursor = cursorImg.src.split("/");

var lastDir = 'left';


EvilCircle.prototype.setControls = function() {
	var _this = this;
  var left = (n) => { 
      srcCursor[srcCursor.length-1] = "macri-cursor-2-flip.png";
      cursorImg.src = srcCursor.join("/");
      _this.move("left",n);
    
  }
  var right = (n) => {
    srcCursor[srcCursor.length-1] = "macri-cursor-2.png";
    cursorImg.src = srcCursor.join("/");
    _this.move("right",n);

  }
  var top = (n) => {
    _this.move("top",n);
  }
  var down = (n) => {
        _this.move("bottom",n);
  }
	window.onkeydown = function(e) {
    if (e.keyCode === 37) {
      if(lastDir != 'left') { evilCircle.ResetVel(); eval(lastDir+"(evilCircle.velX*2)"); left(4); }
      left(4);
      lastDir = "left";
    }
    else if (e.keyCode === 39) {
      if(lastDir != 'right') { evilCircle.ResetVel(); eval(lastDir+"(evilCircle.velX*2)"); right(4);}
      right(4);
      lastDir = "right";
    }
    else if (e.keyCode === 38) {
      if(lastDir != 'top') { evilCircle.ResetVel(); eval(lastDir+"(evilCircle.velY*2)"); top(4); }
      top(4);
      lastDir = "top";
    }
    else if (e.keyCode === 40) {
      if(lastDir != 'down') { evilCircle.ResetVel(); eval(lastDir+"(evilCircle.velY*2)"); down(4); }
      down(4);
      lastDir = "down";
    }
	}
  var container = document.getElementById('container');
  swipedetect(container, function(swipedir){
    switch(swipedir) {
      case 'left': left(40); break;
      case 'right': right(40); break;
      case 'top': top(40); break;
      case 'down': down(40); break;
    };      
  });
}





//USAGE:





function swipedetect(el, callback){
  
    var touchsurface = el,
    swipedir,
    startX,
    startY,
    distX,
    distY,
    threshold = 150, //required min distance traveled to be considered swipe
    restraint = 100, // maximum distance allowed at the same time in perpendicular direction
    allowedTime = 300, // maximum time allowed to travel that distance
    elapsedTime,
    startTime,
    handleswipe = callback || function(swipedir){}
  
    touchsurface.addEventListener('touchstart', function(e){
        var touchobj = e.changedTouches[0]
        swipedir = 'none'
        dist = 0
        startX = touchobj.pageX
        startY = touchobj.pageY
        startTime = new Date().getTime() // record time when finger first makes contact with surface
        e.preventDefault()
    }, false)
  
    touchsurface.addEventListener('touchmove', function(e){
        e.preventDefault() // prevent scrolling when inside DIV
    }, false)
  
    touchsurface.addEventListener('touchend', function(e){
        var touchobj = e.changedTouches[0]
        distX = touchobj.pageX - startX // get horizontal dist traveled by finger while in contact with surface
        distY = touchobj.pageY - startY // get vertical dist traveled by finger while in contact with surface
        elapsedTime = new Date().getTime() - startTime // get time elapsed
        if (elapsedTime <= allowedTime){ // first condition for awipe met
            if (Math.abs(distX) >= threshold && Math.abs(distY) <= restraint){ // 2nd condition for horizontal swipe met
                swipedir = (distX < 0)? 'left' : 'right' // if dist traveled is negative, it indicates left swipe
            }
            else if (Math.abs(distY) >= threshold && Math.abs(distX) <= restraint){ // 2nd condition for vertical swipe met
                swipedir = (distY < 0)? 'up' : 'down' // if dist traveled is negative, it indicates up swipe
            }
        }
        handleswipe(swipedir)
        e.preventDefault()
    }, false)
}
  


var evilCircle = new EvilCircle;


var balls = [];
var balloons = [];
var gatos = [];

function loop() {
  
  ctx.fillStyle = 'rgb(225, 245, 255)';
  ctx.fillRect(0, 0, display.w, display.h);

  var imgFondo = document.getElementById('imgFondo');
  ctx.drawImage(imgFondo,0,0, display.w, display.h);
/*
  while (balls.length < juegos.nivel.length*juegos.nivel.length/juegos.nivel.length) {
    var ball = new Ball();
    balls.push(ball);
  }
*/
  while (balloons.length < juegos.nivel.length*juegos.nivel.length/juegos.nivel.length) {
    var balloon = new CANVASBALLOON.Balloon();
    balloons.push(balloon);
  }

  while (gatos.length < juegos.nivel.length*juegos.nivel.length/juegos.nivel.length) {
    var gato = new Gato();
    gatos.push(gato);
  }

/*  for (var i = 0; i < balls.length; i++) {
    if(balls[i].exists==true) {
    	balls[i].draw();
	    balls[i].update();
    	balls[i].collisionDetect();
    }
  }*/
  for (var i = 0; i < balloons.length; i++) {
    if(balloons[i].exists==true) {
      balloons[i].draw();
      balloons[i].update();
      /*balloons[i].collisionDetect();*/
    }
  }
  for (var i = 0; i < gatos.length; i++) {
    if(gatos[i].exists==true) {
      gatos[i].draw();
      gatos[i].update();
      gatos[i].collisionDetect();
    }
  }
    evilCircle.draw();
    evilCircle.checkBounds();
    evilCircle.collisionDetect();


  requestAnimationFrame(loop);
}

function getTimeRemaining(endtime){  
  var t = Date.parse(endtime) - Date.parse(new Date());
  var seconds = Math.floor( (t/1000) % 60 );
  var minutes = Math.floor( (t/1000/60) % 60 );
  var hours = Math.floor( (t/(1000*60*60)) % 24 );
  var days = Math.floor( t/(1000*60*60*24) );
  return {
    'total': t,
    'minutes': minutes,
    'seconds': seconds
  };
}

function initializeClock(id, endtime){
  var clock = document.getElementById(id);
  var timeinterval = setInterval(function(){
    var t = getTimeRemaining(endtime);
    clock.innerHTML = t.seconds + ' s';

    //Si se acaba el tiempo
    if(t.total<=0){
      juegos.nivel[juegos.nivel.length-1].Lose();
      clearInterval(timeinterval);
    }
  },1000);
  this.parar = function() {
    clearInterval(timeinterval);
  }
}

var deadline = new Date();
deadline.setSeconds(deadline.getSeconds() + 10);



var tiempos = [];

var juegos = {
  nivel: [],
  get latest(){
    if(this.nivel.length == 0) return undefined;
    return this.nivel[this.nivel.length-1];
  }
};


// Falta abstracción de todo este sector

function overAll() {
	var c01="";
  var total = 0;
	for(j=0;j<juegos.nivel.length;j++){
    if(juegos.nivel[j].active == false) {
      c01 += "Juego "+(j+1)+": "+juegos.nivel[j].score+" puntos. ("+juegos.nivel[j].ballsKilled+" globos cazados, "+juegos.nivel[j].timeElapsed.split(" ")[0]+"s tiempo restante).\n";
      total += juegos.nivel[j].score;
    }
	}
  c01 += "\nTotal partida: "+total;
	/*alert(c01);*/
}




loop();


document.addEventListener('DOMContentLoaded', () => init());

function init(){
  botonScore.addEventListener('click', overAll);
	botonNuevo.addEventListener('click', nuevoJuego);
  var audioControl = document.getElementById('loopGaby');
  audioControl.volume = 0.1;

/*  
  myAudio = new Audio('audio/gabriela-no-se-arrepiente.mp3'); 
  myAudio.addEventListener('ended', function() {
      this.currentTime = 0;
      this.play();
  }, false);
  myAudio.play();
*/
};

/**
 * @namespace Core namespace
 */ 
var CANVASBALLOON = {};

// Constants
CANVASBALLOON.KAPPA = (4 * (Math.sqrt(2) - 1))/3;
CANVASBALLOON.WIDTH_FACTOR = 0.0333;
CANVASBALLOON.HEIGHT_FACTOR = 0.4;
CANVASBALLOON.TIE_WIDTH_FACTOR = 0.12;
CANVASBALLOON.TIE_HEIGHT_FACTOR = 0.10;
CANVASBALLOON.TIE_CURVE_FACTOR = 0.13;
CANVASBALLOON.GRADIENT_FACTOR = 0.3;
CANVASBALLOON.GRADIENT_CIRCLE_RADIUS = 3;

/**
 * Creates a new Balloon
 * @class Represents a balloon displayed on a HTML5 canvas
 * @param {String}  canvasElementID   Unique ID of the canvas element displaying the balloon
 * @param {Number}  centerX       X-coordinate of the balloon's center
 * @param {Number}  centerY       Y-coordinate of the balloon's center
 * @param {Number}  radius        Radius of the balloon
 * @param {String}  color       String representing the balloon's base color
 */
CANVASBALLOON.Balloon = function() {
  
  Shape.call(this);
  
  this.gfxContext = canvas.getContext('2d');
  while(this.velX==0){
    this.velX = random(-2,2);
  }
  while(this.velY==0){
    this.velY = random(-2,2);
  }
  this.radius = random(13,32);
  this.size = this.radius*2;
  this.x = random(this.radius,display.w-this.radius*3)
  this.y = random(this.radius,display.h-this.radius*3)
  this.centerX = this.x+this.size;
  this.centerY = this.y+this.size;
  
  this.color = 'rgb(' + random(0, 255) + ',' + random(0, 255) + ',' + random(0, 255) +')';
  this.baseColor = new Color(this.color);
  this.darkColor = (new Color(this.color)).darken(CANVASBALLOON.GRADIENT_FACTOR);
  this.lightColor = (new Color(this.color)).lighten(CANVASBALLOON.GRADIENT_FACTOR);

  juegos.latest.newBalloon();
}


/**
 * Draws the balloon on the canvas
 */

CANVASBALLOON.Balloon.prototype.draw = function() {

  // Prepare constants
  
  var gfxContext = this.gfxContext;
  var centerX = this.centerX;
  var centerY = this.centerY;
  var radius = this.radius;
  
  var handleLength = CANVASBALLOON.KAPPA * radius;
  
  var widthDiff = (radius * CANVASBALLOON.WIDTH_FACTOR);
  var heightDiff = (radius * CANVASBALLOON.HEIGHT_FACTOR);
  
  var balloonBottomY = centerY + radius + heightDiff;
  
  // Begin balloon path
  
  gfxContext.beginPath();

  // Top Left Curve
  
  var topLeftCurveStartX = centerX - radius;
  var topLeftCurveStartY = centerY;
  
  var topLeftCurveEndX = centerX;
  var topLeftCurveEndY = centerY - radius;
  
  gfxContext.moveTo(topLeftCurveStartX, topLeftCurveStartY);
  gfxContext.bezierCurveTo(topLeftCurveStartX, topLeftCurveStartY - handleLength - widthDiff,
              topLeftCurveEndX - handleLength, topLeftCurveEndY,
              topLeftCurveEndX, topLeftCurveEndY);
              
  // Top Right Curve
  
  var topRightCurveStartX = centerX;
  var topRightCurveStartY = centerY - radius;
  
  var topRightCurveEndX = centerX + radius;
  var topRightCurveEndY = centerY;
  
  gfxContext.bezierCurveTo(topRightCurveStartX + handleLength + widthDiff, topRightCurveStartY,
              topRightCurveEndX, topRightCurveEndY - handleLength,
              topRightCurveEndX, topRightCurveEndY);
                    
  // Bottom Right Curve
  
  var bottomRightCurveStartX = centerX + radius;
  var bottomRightCurveStartY = centerY;
  
  var bottomRightCurveEndX = centerX;
  var bottomRightCurveEndY = balloonBottomY;
  
  gfxContext.bezierCurveTo(bottomRightCurveStartX, bottomRightCurveStartY + handleLength,
              bottomRightCurveEndX + handleLength, bottomRightCurveEndY,
              bottomRightCurveEndX, bottomRightCurveEndY);              
  
  // Bottom Left Curve
  
  var bottomLeftCurveStartX = centerX;
  var bottomLeftCurveStartY = balloonBottomY;
  
  var bottomLeftCurveEndX = centerX - radius;
  var bottomLeftCurveEndY = centerY;
  
  gfxContext.bezierCurveTo(bottomLeftCurveStartX - handleLength, bottomLeftCurveStartY,
              bottomLeftCurveEndX, bottomLeftCurveEndY + handleLength,
              bottomLeftCurveEndX, bottomLeftCurveEndY);
  
  // Create balloon gradient
  
  var gradientOffset = (radius/3);
  
  var balloonGradient =
    gfxContext.createRadialGradient(centerX + gradientOffset, centerY - gradientOffset,
                    CANVASBALLOON.GRADIENT_CIRCLE_RADIUS,
                    centerX, centerY, radius + heightDiff);
  balloonGradient.addColorStop(0, this.lightColor.rgbString());
  balloonGradient.addColorStop(0.7, this.darkColor.rgbString());
  
  gfxContext.fillStyle = balloonGradient;
  gfxContext.fill();
  
  // End balloon path
  
  // Create balloon tie
  
  var halfTieWidth = (radius * CANVASBALLOON.TIE_WIDTH_FACTOR)/2;
  var tieHeight = (radius * CANVASBALLOON.TIE_HEIGHT_FACTOR);
  var tieCurveHeight = (radius * CANVASBALLOON.TIE_CURVE_FACTOR);
  
  gfxContext.beginPath();
  gfxContext.moveTo(centerX - 1, balloonBottomY);
  gfxContext.lineTo(centerX - halfTieWidth, balloonBottomY + tieHeight);
  gfxContext.quadraticCurveTo(centerX, balloonBottomY + tieCurveHeight,
                centerX + halfTieWidth, balloonBottomY + tieHeight);
  gfxContext.lineTo(centerX + 1, balloonBottomY);
  gfxContext.fill();
}

CANVASBALLOON.Balloon.prototype.update = function() {
    if ((this.centerX + this.radius) >= display.w) {
      this.velX = -Math.abs(this.velX);
    }

    if ((this.centerX - this.radius) <= 0) {
      this.velX = Math.abs(this.velX);
    }

    if ((this.centerY + this.radius) >= display.h) {
      this.velY = -Math.abs(this.velY);
    }

    if ((this.centerY - this.radius) <= 0) {
      this.velY = Math.abs(this.velY);
    }

    this.centerX += this.velX;
    this.centerY += this.velY;
  }

CANVASBALLOON.Balloon.prototype.collisionDetect = function() {
  for (var j = 0; j < balloons.length; j++) {
    if (!(this === balloons[j]) && balloons[j].exists && this.exists) {
      var dx = this.centerX - balloons[j].centerY;
      var dy = this.centerY - balloons[j].centerY;
      var distance = Math.sqrt(dx * dx + dy * dy);

      if (distance < this.size + balloons[j].size) {
        if(balloons[j].velX<0 && balloons[j].centerX+balloons[j].radius<=display.w) balloons[j].velX = balloons[j].velX*(-1);
        else balloons[j].velX = -balloons[j].velX;
        if(balloons[j].velY<0) balloons[j].velY = balloons[j].velY*(-1);
        else balloons[j].velY = -balloons[j].velY;
      }
    }
  }
}



// Launch the Balloon when the DOM is ready
