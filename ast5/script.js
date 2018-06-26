var $container = document.getElementById('box');
var $mball = document.createElement('div');
$mball.className = 'ball';
$container.appendChild($mball);

var ball = {
  x: 50,
  y: 50,
  dx: 1,
  dy: 1,
  $elem: $mball
}

updateBall(ball);

setInterval(function () {
  ball.x = ball.x + ball.dx;
  ball.y = ball.y + ball.dy;

  checkBoundaryCollision(ball);
  updateBall(ball);
}, 1);

function updateBall(ball) {
  ball.$elem.style.left = ball.x + 'px';
  ball.$elem.style.top = ball.y + 'px';
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
  return (ball.y + 20 >= 500);
}

function rightCollided(ball) {
  return (ball.x + 20 >= 800);
}
