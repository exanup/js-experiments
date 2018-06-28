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
      self.particles.push(particle);
    }
    // console.log(self.particles);
  };

  self.checkIfOverlapsWithOtherParticles = function (pos) {
    // console.log('we are checking if it overlaps with other particles');
    // console.group('inside checking collision')
    var currentLoadedParticlesCount = self.particles.length;
    for (var i = 0; i < currentLoadedParticlesCount; i++) {
      // console.log(self.particles[i]);
      // console.log(self.particles[i].isOverlappedWith(pos));
      if (self.particles[i].isOverlappedWith(pos)) {
        return true;
      }
    }
    // console.log('Total overlaps: ', countOverlaps);
    // console.groupEnd();

    return false;
  }

  self.checkCollisionWithAllParticles = function () {
    self.particles.forEach(function (particle) {
      particle.checkCollisionWithBoundary();
    });
  }

  self.moveAllParticles = function () {
    self.particles.forEach(function (particle) {
      particle.move();
    });
  }

  self.renderAllParticles = function () {
    self.particles.forEach(function (particle) {
      particle.render();
    });
  }

  self.checkInterParticleCollision = function() {
    for (var i = 0; i < self.particlesCount; i++) {
      for (var j = i; j < self.particlesCount; j++) {
        self.particles[i].checkCollisionWith(self.particles[j]);
      }
    }
  }

  self.__init();
}
