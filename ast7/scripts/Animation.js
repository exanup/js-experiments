/* jshint browser: true */
"use strict";

function Animation(props) {
  var self = this;
  var isRunning = false;
  var delay = (typeof props.delay === 'number' ? props.delay : 100);
  var particleContainer = null;
  var mainLoopRef = null;

  var __init = function () {
    particleContainer = new ParticleContainer(props.particleContainer);
  };

  self.start = function () {
    if (!isRunning) {
      console.log('Starting animation...');
      isRunning = true;
      mainLoopRef = setInterval(function () {
        particleContainer.moveAllParticles();
        particleContainer.checkCollisionWithAllParticles();
        particleContainer.renderAllParticles();
        particleContainer.checkInterParticleCollision();
      }, delay);
    }

  };

  self.pause = function () {
    if (isRunning) {
      clearInterval(mainLoopRef);
      isRunning = false;
      console.log('Paused!');
    }
  };

  self.resume = function () {
    self.start();
  };

  __init();
}
