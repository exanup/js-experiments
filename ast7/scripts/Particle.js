/* jshint browser: true */
"use strict";

function Particle(props) {
  var self = this;
  var velocityScale;
  var backgroundColor;
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

    self.dx = (typeof props.dx === 'number') ?
      props.dx :
      velocityScale.x * (Math.random() > 0.5 ? -1 : 1);

    self.dy = (typeof props.dy === 'number') ?
      props.dy :
      velocityScale.y * (Math.random() > 0.5 ? -1 : 1);

    var randomXY = getRandomXY();

    self.x = (typeof props.x === 'number' ? props.x : randomXY.x);
    self.y = (typeof props.y === 'number' ? props.y : randomXY.y);

    self.render();
  };

  var alloc = function () {
    // console.log('inside particle init');
    self.$el = document.createElement('div');
    self.$el.className = 'particle';
    self.$el.style.backgroundColor = backgroundColor;
    self.$el.style.width = self.width + 'px';
    self.$el.style.height = self.height + 'px';
    self.parent.$el.appendChild(self.$el);
  };

  self.render = function () {
    self.$el.style.top = self.y + 'px';
    self.$el.style.left = self.x + 'px';
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

  var getRandomNumber = function (min, max) {
    var rnd = parseInt(Math.random() * (max - min) + min);
    return rnd;
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

    // console.group('inside self.isOverlappedWith');
    // console.log(self, particle);
    // console.log(self.x, self.y, self.width, self.height);
    // console.log(particle.x, particle.y, particle.width, particle.height);
    // console.groupEnd();

    if (x1max < x2min || x1min > x2max) {
      return false;
    }
    if (y1max < y2min || y1min > y2max) {
      return false;
    }
    return true;
  };

  self.checkCollisionWithBoundary = function () {
    if (self.x < 0) {
      self.x = 0;
      self.dx = -self.dx;
    }
    if (self.x + self.width > self.parent.getWidth()) {
      self.x = self.parent.getWidth() - self.width;
      self.dx = -self.dx;
    }
    if (self.y < 0) {
      self.y = 0;
      self.dy = -self.dy;
    }
    if (self.y + self.height > self.parent.getHeight()) {
      self.y = self.parent.getHeight() - self.height;
      self.dy = -self.dy;
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
