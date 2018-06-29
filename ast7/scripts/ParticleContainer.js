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
          velocityScale: {
            x: 1,
            y: 1
          },
        });
        // console.log(particle);
        self.particles.push(particle);

        particle.$el.addEventListener('mousedown', function (parent, particle) {
          return function (e) {
            // console.log(e);
            parent.$el.removeChild(particle.$el);
            var index = parent.particles.indexOf(particle);
            if (index > -1) {
              parent.particles.splice(index, 1);
              parent.particlesCount = parent.particles.length;
            }
          };
        }(self, particle));
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

    self.checkInterParticleCollision = function () {
      for (var i = 0; i < self.particlesCount; i++) {
        for (var j = i + 1; j < self.particlesCount; j++) {
          self.particles[i].checkCollisionWith(self.particles[j]);
        }
      }
    }

    self.__init();
  }
