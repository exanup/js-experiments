function Particle(props) {
  var self = this;

  self.__init = function () {
    self.parent = (typeof props.parent !== 'undefined' ? props.parent : null);
    self.bgcolor = (typeof props.color === 'string' ? props.color : self.getRandomRgb());

    self.alloc();

    var velocityScale = (typeof props.velocityScale !== 'undefined') ?
      props.velocityScale : {
        x: 1,
        y: 1
      };

    self.dx = (typeof props.dx === 'number') ?
      props.dx :
      velocityScale.x * (Math.random() > 0.5 ? -1 : 1);

    self.dy = (typeof props.dy === 'number') ?
      props.dy :
      velocityScale.y * (Math.random() > 0.5 ? -1 : 1);


    self.height = self.$el.clientHeight || 10;
    self.width = self.$el.clientWidth || 10;

    // console.log(self.parent.width, self.width);
    var randomXY = self.getRandomXY();

    self.x = (typeof props.x === 'number' ? props.x : randomXY.x);
    self.y = (typeof props.y === 'number' ? props.y : randomXY.y);

    self.render();
  }

  self.alloc = function () {
    // console.log('inside particle init');
    self.$el = document.createElement('div');
    self.$el.className = 'particle';
    self.$el.style.backgroundColor = self.bgcolor;
    self.parent.$el.appendChild(self.$el);
  };

  self.render = function () {
    self.$el.style.top = self.y + 'px';
    self.$el.style.left = self.x + 'px';
  };

  self.move = function () {
    self.x += self.dx;
    self.y += self.dy;
  };

  self.getRandomXY = function () {
    var pos = {};
    var maxCountOverLaps = 100;;
    var countOverlaps = 0;
    do {
      pos = {
        x: self.getRandomPositionX(),
        y: self.getRandomPositionY(),
        height: self.height,
        width: self.width,
      };
      var overlapsWithOtherParticles = self.parent.checkIfOverlapsWithOtherParticles(pos);

      countOverlaps++;
      if (countOverlaps >= maxCountOverLaps) {
        console.log('Cannot find non-overlapping space in ' + maxCountOverLaps + ' attempts.');
      }
    } while (overlapsWithOtherParticles && countOverlaps < maxCountOverLaps);
    return pos;
  }

  self.getRandomPositionX = function () {
    var x = parseInt(Math.random() * (self.parent.width - self.width));
    return x;
  }

  self.getRandomPositionY = function () {
    var y = parseInt(Math.random() * (self.parent.height - self.height));
    return y;
  }

  self.getRandomNumber = function (min, max) {
    var rnd = parseInt(Math.random() * (max - min) + min);
    return rnd;
  }

  self.getRandomRgb = function () {
    var maxScale = 190;
    var r = parseInt(Math.random() * maxScale);
    var g = parseInt(Math.random() * maxScale);
    var b = parseInt(Math.random() * maxScale);
    // var color = `rgb(${r}, ${g}, ${b}`;
    var color = 'rgb(' + r + ', ' + g + ', ' + b + ')';
    return color;
  }

  self.getRandomHsl = function () {
    var h = parseInt(Math.random() * 360);
    var s = parseInt(Math.random() * 100) + '%';
    var l = parseInt(Math.random() * 70) + '%';
    var hsl = 'hsl(' + h + ', ' + s + ', ' + l + ')';
    return hsl;
  }

  self.isOverlappedWith = function (particle) {
    var x1min = self.x;
    var x1max = self.x + self.width;
    var y1min = self.y;
    var y1max = self.y + self.height;

    var x2min = particle.x;
    var x2max = particle.x + particle.width;
    var y2min = particle.y;
    var y2max = particle.y + particle.height;

    // console.group('inside isOverLappedWith');
    // console.log(self, particle);
    // console.groupEnd();

    if (x1max < x2min || x1min > x2max) {
      return false;
    }
    if (y1max < y2min || y1min > y2max) {
      return false;
    }
    return true;
  }

  self.checkCollisionWithBoundary = function () {
    if (self.x < 0) {
      self.x = 0;
      self.dx = 1;
    }
    if (self.x + self.width > self.parent.width) {
      self.x = self.parent.width - self.width;
      self.dx = -1;
    }
    if (self.y < 0) {
      self.y = 0;
      self.dy = 1;
    }
    if (self.y + self.height > self.parent.height) {
      self.y = self.parent.height - self.height;
      self.dy = -1;
    }
  }

  self.checkCollisionWith = function (particle) {
    if (self.isOverlappedWith(particle)) {
      var tempDx = self.dx;
      self.dx = particle.dx;
      particle.dx = tempDx;

      var tempDy = self.dy;
      self.dy = particle.dy;
      particle.dy = tempDy;

      // var temp1 = self.dx;
      // self.dx = self.dy;
      // self.dy = -temp1;

      // var temp2 = particle.dx;
      // particle.dx = particle.dy;
      // particle.dy = -temp2;
    }
  }

  self.__init();
}
