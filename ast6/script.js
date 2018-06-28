function main() {
  $container = document.getElementById('box');
  var container = {
    $el: $container,
    width: $container.clientWidth,
    height: $container.clientHeight
  };

  var velocityScale = {
    x: 1,
    y: 1
  };
  var delay = 100;

  var balls = [];
  var countBalls = 100;
  for (var i = 0; i < countBalls; i++) {
    var ball = createNewBall(container, velocityScale);
    balls.push(ball);
  }

  // starting main loop
  var mainLoopRef = setInterval(function () {
    checkBoundaryCollisionForAllBalls(container, balls);
    checkInterBallCollision(balls);
    moveAllBalls(balls);
    renderAllBalls(balls);
  }, delay);
  // end of main loop
  return mainLoopRef;
}

function createNewBall(container, velocityScale) {
  var $ball = document.createElement('div');
  $ball.className = 'ball';
  container.$el.appendChild($ball);

  var ball = {
    $el: $ball,
    color: generateRandomColor(),
    width: $ball.clientWidth,
    height: $ball.clientHeight,
    dx: velocityScale.x * signPosOrNeg(),
    dy: velocityScale.y * signPosOrNeg()
  };
  ball.x = getRandom(0, container.width - ball.width);
  ball.y = getRandom(0, container.height - ball.height);
  ball.$el.style.backgroundColor = ball.color;
  renderBall(ball);

  ball.$el.addEventListener("mousedown", function(e) {
    console.log('remvoed', ball.$el);
    container.$el.removeChild(ball.$el);
  });

  return ball;
}

function generateRandomColor() {
  var r = parseInt(Math.random() * 200);
  var g = parseInt(Math.random() * 200);
  var b = parseInt(Math.random() * 200);
  var color = 'rgb(' + r + ', ' + g + ', ' + b + ')';
  return color;
}

function getRandom(min, max) {
  return parseInt(Math.random() * (max - min) + min);
}

function signPosOrNeg() {
  return (Math.random() > 0.5 ? 1 : -1);
}

function moveAllBalls(balls) {
  balls.forEach(function (ball) {
    moveBall(ball);
  });
}

function moveBall(ball) {
  ball.x = ball.x + ball.dx;
  ball.y = ball.y + ball.dy;
}

function renderAllBalls(balls) {
  balls.forEach(function (ball) {
    renderBall(ball);
  });
}

function renderBall(ball) {
  ball.$el.style.left = ball.x + 'px';
  ball.$el.style.top = ball.y + 'px';
}

function checkBoundaryCollisionForAllBalls(container, balls) {
  balls.forEach(function (ball) {
    checkBoundaryCollision(container, ball);
  });
}

function checkBoundaryCollision(container, ball) {
  if (topCollided(container, ball) || bottomCollided(container, ball)) {
    // console.log('collided with top or bottom')
    ball.dy = -ball.dy;
  }

  if (leftCollided(container, ball) || rightCollided(container, ball)) {
    // console.log('collided with left or right')
    ball.dx = -ball.dx;
  }
}

function topCollided(container, ball) {
  // console.log('collided with top');
  return (ball.y <= 0);
}

function leftCollided(container, ball) {
  // console.log('collided with left');
  return (ball.x <= 0);
}

function bottomCollided(container, ball) {
  // console.log('collided with bottom');
  var check = (ball.y + ball.height >= container.height);
  // console.log(ball, 'bottom collided', check)
  return check;
}

function rightCollided(container, ball) {
  // console.log('collided with right');
  return (ball.x + ball.width >= container.width);
}

function checkInterBallCollision(balls) {
  var ballCount = balls.length;
  for (var i = 0; i < ballCount; i++) {
    var ballOne = balls[i];
    for (var j = i + 1; j < ballCount; j++) {
      var ballTwo = balls[j];
      checkCollisionWithEachOther(ballOne, ballTwo);
    }
  }
}

function checkCollisionWithEachOther(ballOne, ballTwo) {
  var x1min = ballOne.x;
  var x1max = ballOne.x + ballOne.width;
  var y1min = ballOne.y;
  var y1max = ballOne.y + ballOne.height;

  var x2min = ballTwo.x;
  var x2max = ballTwo.x + ballTwo.width;
  var y2min = ballTwo.y;
  var y2max = ballTwo.y + ballTwo.height;

  var collided = true;

  var dxl2r = x1max - x2min;
  var dxr2l = x1min - x2max;
  var dyl2r = y1max - y2min;
  var dyr2l = y1min - y2max;

  if (dxl2r < 0 || dxr2l > 0) {
    collided = false;
  }
  if (dyl2r < 0 || dyr2l > 0) {
    collided = false;
  }
  // console.log(collided);
  if (collided === true) {
    // console.log(dxl2r, dxr2l, dyl2r, dyr2l);
    var ddx = ballOne.dx - ballTwo.dx;
    var ddy = ballOne.dy - ballTwo.dy;

    // console.log(ddx, ddy);

    if (ddx === 0 || ddx === 2 || ddx === -2) { // collision at direction of dy
      var dyTemp = ballOne.dy;
      ballOne.dy = ballTwo.dy;
      ballTwo.dy = dyTemp;
    }
    if (ddy === 0 || ddy === 2 || ddy === -2) { // collision at direction of dx
      var dxTemp = ballOne.dx;
      ballOne.dx = ballTwo.dx;
      ballTwo.dx = dxTemp;
    }
  }
}

var mainLoopRef = main();
var playing = true;

document.addEventListener('keydown', function (e) {
  // console.log(e.key);
  if (playing && e.key === 'Escape') {
    console.group();
    // console.log('Escape pressed. Stopping animation.');
    clearInterval(mainLoopRef);
    console.groupEnd();
    playing = false;
  }
});
