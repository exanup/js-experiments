function Animation(props) {
  var self = this;

  var isRunning = false;

  self.delay = (typeof props.delay === 'number' ? props.delay : 100);
  self.particleContainer = null;
  self.mainLoopRef = null;

  self.__init = function () {
    self.particleContainer = new ParticleContainer({
      $el: props.particleContainer.$el,
      particlesCount: props.particleContainer.particlesCount,
    });
  };

  self.start = function () {
    if (!isRunning) {
      console.log('Starting animation...');
      isRunning = true;
      self.mainLoopRef = setInterval(function () {
        self.particleContainer.checkCollisionWithAllParticles();
        self.particleContainer.checkInterParticleCollision();
        self.particleContainer.moveAllParticles();
        self.particleContainer.renderAllParticles();
      }, self.delay);
    }
  };

  self.pause = function () {
    if (isRunning) {
      clearInterval(self.mainLoopRef);
      isRunning = false;
      console.log('Paused!');
    }
  }

  self.resume = function () {
    self.start();
  }

  self.__init();
}
