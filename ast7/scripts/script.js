$container = document.getElementById('container');

var animation = new Animation({
  delay: 20,
  particleContainer: {
    $el: $container,
    particlesCount: 20,
  },
});
animation.start();

document.addEventListener('keydown', function(e) {
  if (e.key === 'Escape') {
    animation.pause();
  }
  if (e.key === 'R' || e.key === 'r') {
    animation.resume();
  }
});
