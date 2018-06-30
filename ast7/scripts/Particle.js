/* jshint browser: true */
"use strict";

function Particle(props) {
  var self = this;
  var velocityScale;
  var backgroundColor;
  var antImageSrc = props.imgSrc || './images/antwalk.gif';
  self.height = props.height || 40;
  self.width = props.width || 40;
  self.x = undefined;
  self.y = undefined;
  self.dx = undefined;
  self.dy = undefined;

  self.parent = (typeof props.parent !== 'undefined' ? props.parent : null);

  var __init = function () {

    backgroundColor = (typeof props.color === 'string' ? props.color : getRandomRgb());

    alloc();

    velocityScale = (typeof props.velocityScale !== 'undefined') ?
      props.velocityScale : {
        x: 1,
        y: 1
      };

    var initDx = 0;
    var initDy = 0;
    while (initDx === 0 && initDy === 0) { // don't let any ant have (dx, dy) = (0, 0);
      initDx = Particle.getRandomNumber(-1, 1);
      initDy = Particle.getRandomNumber(-1, 1);
    }
    // console.log(initDx, initDy);

    self.dx = (typeof props.dx === 'number') ? props.dx : velocityScale.x * initDx;
    self.dy = (typeof props.dy === 'number') ? props.dy : velocityScale.y * initDy;
    // console.log(self.dx, self.dy);

    var randomXY = getRandomXY();

    self.x = (typeof props.x === 'number' ? props.x : randomXY.x);
    self.y = (typeof props.y === 'number' ? props.y : randomXY.y);

    self.render();
  };

  var alloc = function () {
    // console.log('inside particle init');
    self.$el = document.createElement('div');
    self.$el.className = 'particle';
    self.$el.style.width = self.width + 'px';
    self.$el.style.height = self.height + 'px';
    // self.$el.style.backgroundColor = backgroundColor;
    self.parent.$el.appendChild(self.$el);

    var $img = document.createElement('img');
    var imgW = 1.3 * self.width;
    var imgH = 1.3 * self.height;
    var imgX = parseInt(-Math.floor((imgW - self.width) / 2));
    var imgY = parseInt(-Math.floor((imgH - self.height) / 2));
    $img.src = antImageSrc;
    $img.style.width = imgW + 'px';
    $img.style.height = imgH + 'px';
    $img.style.left = imgX + 'px';
    $img.style.top = imgY + 'px';
    self.$el.appendChild($img);
  };

  self.render = function () {
    self.$el.style.top = self.y + 'px';
    self.$el.style.left = self.x + 'px';

    var deg = findDegreeOfRotation();
    self.$el.style.transform = 'rotate(' + deg + 'deg)';
  };

  var findDegreeOfRotation = function () {
    var deg = Math.atan2(self.dy, self.dx) * 180 / Math.PI;
    return deg;
  };

  self.move = function () {
    self.x += self.dx;
    self.y += self.dy;
    // console.group('self.dx self.dy');
    // console.log(self.dx, self.dy);
    // console.groupEnd();
  };

  var getRandomXY = function () {
    var pos = {};
    var maxCountOverLaps = 100;
    var countOverlaps = 0;
    var overlapsWithOtherParticles;
    do {
      pos = {
        x: getRandomPositionX(),
        y: getRandomPositionY(),
        height: self.height,
        width: self.width,
      };
      overlapsWithOtherParticles = self.parent.checkIfOverlapsWithOtherParticles(pos);

      countOverlaps++;
      if (countOverlaps >= maxCountOverLaps) {
        console.log('Cannot find non-overlapping space in ' + maxCountOverLaps + ' attempts.');
      }
    } while (overlapsWithOtherParticles && countOverlaps < maxCountOverLaps);
    return pos;
  };

  var getRandomPositionX = function () {
    var x = parseInt(Math.random() * (self.parent.getWidth() - self.width));
    return x;
  };

  var getRandomPositionY = function () {
    var y = parseInt(Math.random() * (self.parent.getHeight() - self.height));
    return y;
  };

  var getRandomRgb = function () {
    var maxScale = 190;
    var r = parseInt(Math.random() * maxScale);
    var g = parseInt(Math.random() * maxScale);
    var b = parseInt(Math.random() * maxScale);
    // var color = `rgb(${r}, ${g}, ${b}`;
    var color = 'rgb(' + r + ', ' + g + ', ' + b + ')';
    return color;
  };

  var getRandomHsl = function () {
    var h = parseInt(Math.random() * 360);
    var s = parseInt(Math.random() * 100) + '%';
    var l = parseInt(Math.random() * 70) + '%';
    var hsl = 'hsl(' + h + ', ' + s + ', ' + l + ')';
    return hsl;
  };

  self.isOverlappedWith = function (particle) {
    var x1min = self.x;
    var x1max = self.x + self.width;
    var y1min = self.y;
    var y1max = self.y + self.height;

    var x2min = particle.x;
    var x2max = particle.x + particle.width;
    var y2min = particle.y;
    var y2max = particle.y + particle.height;

    if (x1max < x2min || x1min > x2max) {
      return false;
    }
    if (y1max < y2min || y1min > y2max) {
      return false;
    }
    return true;
  };

  self.checkCollisionWithBoundary = function () {
    // var collided = false;
    if (self.x < 0) {
      self.x = 0;
      self.dx = -self.dx;
      // collided = true;
    }
    if (self.x + self.width > self.parent.getWidth()) {
      self.x = self.parent.getWidth() - self.width;
      self.dx = -self.dx;
      // collided = true;
    }
    if (self.y < 0) {
      self.y = 0;
      self.dy = -self.dy;
      // collided = true;
    }
    if (self.y + self.height > self.parent.getHeight()) {
      self.y = self.parent.getHeight() - self.height;
      self.dy = -self.dy;
      // collided = true;
    }
  };

  self.checkCollisionWith = function (particle) {
    if (self.isOverlappedWith(particle)) {
      // console.log('collided');
      var tempDx = self.dx;
      self.dx = particle.dx;
      particle.dx = tempDx;

      var tempDy = self.dy;
      self.dy = particle.dy;
      particle.dy = tempDy;
    }
  };

  __init();
}

Particle.getRandomNumber = function (min, max) {
  var rnd = parseInt(Math.random() * (max - min + 1)) + min;
  return rnd;
};
