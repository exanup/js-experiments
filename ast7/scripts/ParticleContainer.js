/* jshint browser: true */
"use strict";

function ParticleContainer(props) {
  var self = this;
  var width = props.width || 400;
  var height = props.height || 400;
  var particles = [];
  var particlesCount = (typeof props.particlesCount === 'number' ? props.particlesCount : 2);

  self.$el = null;

  var __init = function () {
    alloc();

    for (var i = 0; i < particlesCount; i++) {
      var particle = new Particle({
        parent: self,
        velocityScale: {
          x: 1,
          y: 1,
        },
      });
      // console.log(particle);
      particles.push(particle);

      particle.$el.addEventListener('mousedown', function (particle) {
        return function (e) {
          // console.log(e);
          self.$el.removeChild(particle.$el);
          var index = particles.indexOf(particle);
          if (index > -1) {
            particles.splice(index, 1);
            particlesCount--;
          }
        };
      }(particle));
    }
    // console.log(particles);
  };

  self.checkIfOverlapsWithOtherParticles = function (pos) {
    // console.log('we are checking if it overlaps with other particles');
    // console.group('inside checking collision')
    var currentLoadedParticlesCount = particles.length;
    for (var i = 0; i < currentLoadedParticlesCount; i++) {
      // console.log(particles[i]);
      // console.log(particles[i].isOverlappedWith(pos));
      if (particles[i].isOverlappedWith(pos)) {
        return true;
      }
    }
    // console.log('Total overlaps: ', countOverlaps);
    // console.groupEnd();

    return false;
  };

  self.checkCollisionWithAllParticles = function () {
    particles.forEach(function (particle) {
      particle.checkCollisionWithBoundary();
    });
  };

  self.moveAllParticles = function () {
    particles.forEach(function (particle) {
      particle.move();
    });
  };

  self.renderAllParticles = function () {
    particles.forEach(function (particle) {
      particle.render();
    });
  };

  self.checkInterParticleCollision = function () {
    for (var i = 0; i < particlesCount; i++) {
      for (var j = i + 1; j < particlesCount; j++) {
        particles[i].checkCollisionWith(particles[j]);
      }
    }
    // console.group('inside checkInterParticleCollision');
    // console.log(particles);
    // console.groupEnd();
  };

  var alloc = function () {
    var $container = props.$container;
    self.$el = document.createElement('div');
    self.$el.style.left = props.x;
    self.$el.style.top = props.y;
    self.$el.style.width = width + 'px';
    self.$el.style.height = height + 'px';
    self.$el.className = 'frame-border';
    $container.appendChild(self.$el);
  };

  self.getWidth = function () {
    return width;
  };

  self.getHeight = function () {
    return height;
  };

  __init();
}
