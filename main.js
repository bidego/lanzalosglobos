// setup canvas

var canvas = document.querySelector('canvas');
var ctx = canvas.getContext('2d');

var liOverall = document.querySelector('#overall');
var liRestantes = document.querySelector('#restantes');
var time = document.querySelector('#time');
var nav = document.querySelector('nav');
var navOl = document.querySelector('ol');

var width = canvas.width = window.innerWidth;
var height = canvas.height = window.innerHeight;

var display = { w: width, h: height }
window.onresize = function(event){
  display.w = canvas.width = window.innerWidth;
  display.h = canvas.height = window.innerHeight;
}
function Juego(deadLine) {
	this.ballCount = 0;
  this.score = 0;
  this.timeElapsed = 0;
  this.ballsKilled = 0;
  this.active = true
  this.deadLine = deadLine;
}

Juego.prototype.resetCount = function () {
	this.ballCount = 0;
	if(liRestantes.childNodes.length >0) liRestantes.removeChild(liRestantes.firstChild);
}
Juego.prototype.newBall = function () {
	this.ballCount++;
	var em = document.createElement('em');
	em.textContent = this.ballCount;
	liRestantes.appendChild(em);
	if(liRestantes.childNodes.length >1) liRestantes.removeChild(liRestantes.firstChild);
}
Juego.prototype.killBall = function () {
  var t = (Date.parse(this.deadLine) - Date.parse(new Date()))/1000;;
  this.ballsKilled++;
	this.ballCount--;
  this.timeElapsed = time.childNodes[0].data;
  this.score = Math.floor(this.ballsKilled/100*35*(100-t));
  liOverall.innerHTML = this.score;
	var em = document.createElement('em');
	em.textContent = this.ballCount;
	liRestantes.appendChild(em);
	if(liRestantes.childNodes.length >1) liRestantes.removeChild(liRestantes.firstChild);
	if(this.ballCount==0) this.Win();
}
Juego.prototype.Win = function(){
  this.active = false;
  this.timeElapsed = time.childNodes[0].data;
  this.score += parseInt(this.timeElapsed.split(" ")[0]);
  tiempos[tiempos.length-1].parar();
	balls = 0;


/* Cartel fin nivel */
  var b = document.createElement("b");
  var tr = [];
  var td = [];
  var table = document.createElement("table");
  b.textContent = "Lanzá los globos para el siguiente nivel.";
  var c01 ="";
  var total = 0;

  for(j=0;j<juegos.length;j++){
    if(juegos[j].active == false) {
      tr[j] = document.createElement("tr");
      td[j] = document.createElement("td");

      td[j].textContent = "Nivel "+(j+1)+": "+juegos[j].score+" puntos. ("+juegos[j].ballsKilled+" globos cazados, "+juegos[j].timeElapsed.split(" ")[0]+"s tiempo restante).";
      total += parseInt(juegos[j].score);
      tr[j].appendChild(td[j]);
      table.appendChild(tr[j]);
    }
  }

  tr[tr.length] = document.createElement("tr");
  td[td.length] = document.createElement("td");
 
  td[td.length-1].textContent = "Total partida: "+total;
  tr[tr.length-1].appendChild(td[td.length-1]);
  table.appendChild(tr[tr.length-1]);
  liOverall.innerHTML = total;
  liRestantes.removeChild(liRestantes.firstChild);
  liRestantes.appendChild(b);
  liRestantes.appendChild(table);
  
  /* Fin cartel nivel */

  

  navOl.style.visibility = "visible";
  for(i=0;i<nav.childNodes.length;i++) {
    navOl.childNodes[i].style.opacity = "1";
  }

}
Juego.prototype.Lose = function(){
  this.active = false;
  this.timeElapsed = time.childNodes[0].data;
  this.score = parseInt(this.ballsKilled)*50+parseInt(this.timeElapsed.split(" ")[0]);
  tiempos[tiempos.length-1].parar();

  balls = 0;

/* Cartel fin nivel */
  var b = document.createElement("b");
  var tr = [];
  var td = [];
  var table = document.createElement("table");
  b.textContent = "Perdiste, sos pobre.";
  var c01 ="";
  var total = 0;

  for(j=0;j<juegos.length;j++){
    if(juegos[j].active == false) {
      tr[j] = document.createElement("tr");
      td[j] = document.createElement("td");

      td[j].textContent = "Nivel "+(j+1)+": "+juegos[j].score+" puntos. ("+juegos[j].ballsKilled+" globos cazados, "+juegos[j].timeElapsed.split(" ")[0]+"s tiempo restante).";
      total += parseInt(juegos[j].score);
      tr[j].appendChild(td[j]);
      table.appendChild(tr[j]);
    }
  }

  tr[tr.length] = document.createElement("tr");
  td[td.length] = document.createElement("td");
 
  td[td.length-1].textContent = "Total partida: "+total;
  tr[tr.length-1].appendChild(td[td.length-1]);
  table.appendChild(tr[tr.length-1]);
  liOverall.innerHTML = total;
  liRestantes.removeChild(liRestantes.firstChild);
  liRestantes.appendChild(b);
  liRestantes.appendChild(table);
  
  /* Fin cartel nivel */


  tiempos = [];
  juegos = [];

  navOl.style.visibility = "visible";
  for(i=0;i<navOl.childNodes.length;i++) {
    navOl.childNodes[i].style.opacity = "1";
  }

}// function to generate random number

function random(min,max) {
  var num = Math.floor(Math.random()*(max-min)) + min;
  return num;
}


function Shape() {
	this.x = random(1, display.w);
	this.y = random(1, display.h);
	this.velX = random(-7, 7);
	this.velY = random(-7, 7);
	this.exists = true;
}

function Ball(){
	Shape.call(this);
	this.color = 'rgb(' + random(0, 255) + ',' + random(0, 255) + ',' + random(0, 255) +')';
	this.size = random(10, 30);
	juegos[juegos.length-1].newBall();
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
    if (!(this === balls[j])) {
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


function EvilCircle() {
	Shape.call(this);
	this.color = 'white';
	this.size = 72;
	this.velX = 20;
	this.velY = 20;
  this.pointer = document.getElementById("mau");
}

EvilCircle.prototype = Object.create(Shape.prototype);
EvilCircle.prototype.constructor = EvilCircle;
/*
EvilCircle.prototype.draw = function() {
  ctx.beginPath();
  ctx.strokeStyle = this.color;
  ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
  ctx.stroke();
}
*/
EvilCircle.prototype.draw = function() {
  ctx.beginPath();
  ctx.strokeStyle = this.color;
  ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
  ctx.drawImage(this.pointer,this.x-82,this.y-82);
/*  ctx.stroke();*/
}


EvilCircle.prototype.checkBounds = function() {
  if ((this.x + this.size) >= display.w+this.size) {
    this.x += -(this.size);
  }

  if ((this.x - this.size) <= 0-this.size) {
    this.x -= -(this.size);
  }

  if ((this.y + this.size) >= display.h+this.size) {
    this.y += -(this.size);
  }

  if ((this.y - this.size) <= 0-this.size) {
    this.y -= -(this.size);
  }
}

EvilCircle.prototype.collisionDetect = function() {
  for (var j = 0; j < balls.length; j++) {
    if (!(this === balls[j])) {
      var dx = this.x - balls[j].x;
      var dy = this.y - balls[j].y;
      var distance = Math.sqrt(dx * dx + dy * dy);

      if (distance < this.size + balls[j].size) {
        if(balls[j].exists == true) {
        	balls[j].exists = false;
        	juegos[juegos.length-1].killBall();

        }
      }
    }

  }
}

EvilCircle.prototype.setControls = function() {
	var _this = this;
	window.onkeydown = function(e) {
	    if (e.keyCode === 37) {
	      _this.x -= _this.velX;
	    } else if (e.keyCode === 39) {
	      _this.x += _this.velX;
	    } else if (e.keyCode === 38) {
	      _this.y -= _this.velY;
	    } else if (e.keyCode === 40) {
	      _this.y += _this.velY;
	    }
  	}
}
var evilCircle = new EvilCircle;

evilCircle.setControls();

var balls = [];

function loop() {
  ctx.fillStyle = 'rgba(225, 245, 255, 0.1)';
  ctx.fillRect(0, 0, display.w, display.h);

  while (balls.length < juegos.length*juegos.length) {
    var ball = new Ball();
    balls.push(ball);
  }

  for (var i = 0; i < balls.length; i++) {
    if(balls[i].exists==true) {
    	balls[i].draw();
	    balls[i].update();
    	balls[i].collisionDetect();
    }
    evilCircle.draw();
    evilCircle.checkBounds();
    evilCircle.collisionDetect();
  }


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
    if(t.total<=0){
      juegos[juegos.length-1].Lose();
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


var juegos = [];



// Falta abstracción de todo este sector

function overAll() {
	var c01="";
  var total = 0;
	for(j=0;j<juegos.length;j++){
    if(juegos[j].active == false) {
      c01 += "Juego "+(j+1)+": "+juegos[j].score+" puntos. ("+juegos[j].ballsKilled+" globos cazados, "+juegos[j].timeElapsed.split(" ")[0]+"s tiempo restante).\n";
      total += juegos[j].score;
    }
	}
  c01 += "\nTotal partida: "+total;
	alert(c01);
}
function asa() {
  alert("asa");
}

function nuevoJuego() {
	if(liRestantes.childNodes.length>0) liRestantes.removeChild(liRestantes.firstChild);
	balls = [];

  if(juegos.length>0) tiempos[tiempos.length-1].parar();
	
  var deadline = new Date();
  deadline.setSeconds(deadline.getSeconds() + 5*(juegos.length+1));
  
  if(juegos.length == 0 ) loop()

  tiempos.push( new initializeClock('time', deadline));
  navOl.style.visibility = "hidden";
  for(i=0;i<nav.childNodes.length;i++) {
    navOl.childNodes[i].style.opacity = "0";
  }
  time.style.visibility = "visible";
  time.style.opacity = "1";

  juegos.push(new Juego(deadline));
}
document.addEventListener('DOMContentLoaded', () => init());

function init(){
  var botonScore = document.getElementById("score");
  botonScore.addEventListener('click', overAll);
	var botonNuevo = document.getElementById("nuevo");
	botonNuevo.addEventListener('click', nuevoJuego);
};
