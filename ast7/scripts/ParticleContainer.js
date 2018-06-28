function ParticleContainer(props) {
  var self = this;
  self.particlesCount = (typeof props.particlesCount === 'number' ? props.particlesCount : 2);
  self.$el = (typeof props.$el !== 'undefined' ? props.$el : null);
  self.height = self.$el.clientHeight;
  self.width = self.$el.clientWidth;
  self.particles = [];

  self.__init = function () {
    for (var i = 0; i < self.particlesCount; i++) {
      var particle = new Particle({
        parent: self,
      });
    }
  };

  self.checkIfOverlapsWithOtherParticles = function(pos) {
    // console.log('we are checking if it overlaps with other particles');
    // console.log(pos, self.particlesCount);

    for (var i = 0; i < self.particlesCount; i++) {

    }

    return false;
  }

  self.__init();
}
