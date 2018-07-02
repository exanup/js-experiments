/* jshint browser: true */
"use strict";

function Animation(props) {
  var self = this;
  var isRunning = false;
  var delay = (typeof props.delay === 'number' ? props.delay : 100);
  var particleContainer = null;
  var mainLoopRef1 = null;
  var mainLoopRef2 = null;
  var mainLoopRef3 = null;

  var __init = function () {
    particleContainer = new ParticleContainer(props.particleContainer);
  };

  self.start = function () {
    if (!isRunning) {
      console.log('Starting animation...');
      isRunning = true;
      self.draw();
    }
  };

  self.draw = function () {
    self.makeRender();
    self.makeCalculation();
  }

  self.makeRender = function () {
    if (isRunning) {
      mainLoopRef2 = requestAnimationFrame(self.makeRender);
    }
    particleContainer.renderAllParticles();
  };

  self.makeCalculation = function () {
    if (isRunning) {
      mainLoopRef3 = requestAnimationFrame(self.makeCalculation)
      // mainLoopRef3 = setTimeout(self.makeCalculation, 16);
    }
    particleContainer.reSpawnIfNoneLeft();
    particleContainer.moveAllParticles();
    particleContainer.checkCollisionWithAllParticles();
    particleContainer.checkInterParticleCollision();
  };

  self.pause = function () {
    if (isRunning) {
      isRunning = false;
      console.log('Paused!');
    }
  };

  self.resume = function () {
    self.start();
  };

  __init();
}
