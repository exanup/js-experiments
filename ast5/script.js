$container = document.getElementById('box');
var container = {
  $el: $container,
  width: $container.clientWidth,
  height: $container.clientHeight
};

var velocityScale = 1;

var $rBall = document.createElement('div');
$rBall.className = 'ball';
container.$el.appendChild($rBall);

var ballRed = {
  $el: $rBall,
  color: 'red',
  width: $rBall.clientWidth,
  height: $rBall.clientHeight,
  dx: velocityScale * signPosOrNeg(),
  dy: velocityScale * signPosOrNeg()
};
ballRed.x = getRandom(0, container.width - ballRed.width);
ballRed.y = getRandom(0, container.height - ballRed.height);
ballRed.$el.style.backgroundColor = ballRed.color;
renderBall(ballRed);

var $bBall = document.createElement('div');
$bBall.className = 'ball';
container.$el.appendChild($bBall);

var ballBlue = {
  $el: $bBall,
  color: 'blue',
  width: $bBall.clientWidth,
  height: $bBall.clientHeight,
  dx: velocityScale * signPosOrNeg(),
  dy: velocityScale * signPosOrNeg()
}
ballBlue.x = getRandom(0, container.width - ballBlue.width);
ballBlue.y = getRandom(0, container.height - ballBlue.height);
ballBlue.$el.style.backgroundColor = ballBlue.color;
renderBall(ballBlue);

var delay = 10;
// starting main loop
setInterval(function () {
  checkBoundaryCollision(ballRed);
  checkBoundaryCollision(ballBlue);
  checkCollisionWithEachOther(ballRed, ballBlue);
  moveBall(ballRed);
  moveBall(ballBlue);
  renderBall(ballRed);
  renderBall(ballBlue);
}, delay);
// end of main loop
setTimeout(startAcceptingKeyPresses, delay);

function getRandom(min, max) {
  return parseInt(Math.random() * (max - min) + min);
}

function signPosOrNeg() {
  return (Math.random() > 0.5 ? 1 : -1);
}

function moveBall(ball) {
  ball.x = ball.x + ball.dx;
  ball.y = ball.y + ball.dy;
}

function renderBall(ball) {
  ball.$el.style.left = ball.x + 'px';
  ball.$el.style.top = ball.y + 'px';
}

function checkBoundaryCollision(ball) {
  if (topCollided(ball) || bottomCollided(ball)) {
    ball.dy = -ball.dy;
  }

  if (leftCollided(ball) || rightCollided(ball)) {
    ball.dx = -ball.dx;
  }
}

function topCollided(ball) {
  return (ball.y <= 0);
}

function leftCollided(ball) {
  return (ball.x <= 0);
}

function bottomCollided(ball) {
  return (ball.y + ball.height >= container.height);
}

function rightCollided(ball) {
  return (ball.x + ball.width >= container.width);
}

function checkCollisionWithEachOther(ball1, ball2) {
  var x1min = ball1.x;
  var x1max = ball1.x + ball1.width;
  var y1min = ball1.y;
  var y1max = ball1.y + ball1.height;

  var x2min = ball2.x;
  var x2max = ball2.x + ball2.width;
  var y2min = ball2.y;
  var y2max = ball2.y + ball2.height;

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
    console.log(dxl2r, dxr2l, dyl2r, dyr2l);
    var ddx = ball1.dx - ball2.dx;
    var ddy = ball1.dy - ball2.dy;

    console.log(ddx, ddy);

    if (ddx === 0 || ddx === 2 || ddx === -2) { // collision at direction of dy
      var dyTemp = ball1.dy;
      ball1.dy = ball2.dy;
      ball2.dy = dyTemp;
    }
    if (ddy === 0 || ddy === 2 || ddy === -2) { // collision at direction of dx
      var dxTemp = ball1.dx;
      ball1.dx = ball2.dx;
      ball2.dx = dxTemp;
    }
  }
}

function startAcceptingKeyPresses() {
  document.addEventListener('keydown', function (e) {
    console.log(e);

    switch (e.key) {
      case "ArrowDown":
        ballBlue.dy = 1;
        break;
      case "ArrowUp":
        ballBlue.dy = -1;
        break;
      case "ArrowRight":
        ballBlue.dx = 1;
        break;
      case "ArrowLeft":
        ballBlue.dx = -1;
        break;
    }
  });
}
