/* jshint browser: true */
"use strict";

var $container = document.getElementById('container');

var animationCount = 3;
var animations = [];
for (var i = 0; i < animationCount; i++) {
  var animation = new Animation({
    delay: 20,
    particleContainer: {
      $container: $container,
      particlesCount: 15,
      width: 800,
      height: 500,
    },
  });

  animation.start();
  animations.push(animation);
}

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape') {
    for (var j = 0; j < animationCount; j++) {
      animations[j].pause();
    }
  }
  if (e.key === 'R' || e.key === 'r') {
    for (var k = 0; k < animationCount; k++) {
      animations[k].resume();
    }
  }
});
