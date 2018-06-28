function Particle(props) {
  var self = this;

  self.__init = function () {
    self.parent = (typeof props.parent !== 'undefined' ? props.parent : null);
    self.bgcolor = (typeof props.color === 'string' ? props.color : self.getRandomColor());

    self.alloc();

    self.dx = (typeof props.dx === 'number' ? props.dx : 1);
    self.dy = (typeof props.dy === 'number' ? props.dy : 1);

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
  }

  self.render = function () {
    self.$el.style.top = self.y + 'px';
    self.$el.style.left = self.x + 'px';
  }

  self.move = function () {
    self.x += self.dx;
    self.y += self.dy;
  }

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
      overlapsWithOtherParticles = self.parent.checkIfOverlapsWithOtherParticles(pos);

      countOverlaps++;
      if (countOverlaps > maxCountOverLaps) {
        console.log('Too much overlaps; no more space for more elements!');
        break;
      }
    } while (overlapsWithOtherParticles);
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

  self.getRandomColor = function() {
    var maxScale = 128;
    var r = parseInt(Math.random() * maxScale);
    var g = parseInt(Math.random() * maxScale);
    var b = parseInt(Math.random() * maxScale);
    // var color = `rgb(${r}, ${g}, ${b}`;;
    var color = 'rgb(' + r + ', ' + g + ', ' + b + ')';
    return color;
  }

  self.isOverlappedWith = function(particle) {
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

  self.__init();
}

