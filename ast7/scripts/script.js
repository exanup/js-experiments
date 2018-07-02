/* jshint browser: true */
"use strict";

var $container = document.getElementById('container');

var animationCount = 1;
var animations = [];
for (var i = 0; i < animationCount; i++) {
  var animation = new Animation({
    delay: 15,
    particleContainer: {
      $container: $container,
      initialParticlesCount: 50,
      width: 1300,
      height: 540,
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
