function Animation(props) {
  var self = this;

  self.delay = (typeof props.delay === 'number' ? props.delay : 100);
  self.particleContainer = null;
  self.mainLoopRef = undefined;

  self.__init = function() {
    self.particleContainer = new ParticleContainer({
      $el: props.particleContainer.$el,
      particlesCount: props.particleContainer.particlesCount,
    });
  };

  self.start = function() {
    self.mainLoopRef = setInterval(function() {
      // main animation loop
    }, self.delay);
  };

  self.__init();
}
