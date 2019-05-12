var initialPosition = 220;
var ship = {
  body: document.getElementById("ship"),
  position: initialPosition,
  shot: {
    body: document.getElementById("ship-shot")
  }
};
var aliens = {
  1: {
    body: document.getElementById("alien1"),
    position: initialPosition,
    shot: {
      body: document.getElementById("alien1-shot")
    }
  }
};

function start() {
  document.addEventListener("keydown", move, false);
  alienShot(aliens[1]);
  shipShot();
  // alien1Move();
  socket.on("ship-move", function(dir) {
    console.log("ship-move: ", dir);
    if (dir === "right") {
      moveRight(aliens[1]);
    } else if (dir === "left") {
      moveLeft(aliens[1]);
    }
  });
}

function reset() {
  position = initialPosition;
  ship.body.style.right = position + "px";
  ship.shot.body.className = ship.shot.body.className.split(
    "animate-ship-shot"
  )[0];
  aliens[1].body.style.right = position + "px";
  clearInterval(alien1MoveInterval);
  aliens[1].shot.body.className = aliens[1].shot.body.className.split(
    "animate-alien-shot"
  )[0];
}

function alienShot(alien) {
  alien.shot.body.className = alien.shot.body.className + " animate-alien-shot";
  //     if (alien.shot.position >= 8 && alien.shot.position < 400) {
  //     alien.shot.position += 30
  //     alien.shot.body.style.top = alien.shot.position + 'px'
  //     console.log('alien shot:: ', alien.shot.body.style.top)
  //   } else {
  //     alien.shot.position = 8
  //     alien.shot.body.style.bottom = alien.shot.position + 'px'
  //     console.log('alien shot2:: ', alien.shot.body.style.top)
  //   }
}

function shipShot() {
  ship.shot.body.style.top = "-500px";
  ship.shot.body.className = ship.shot.body.className + " animate-ship-shot";
}

function move(event) {
  if (event.keyCode === 37) {
    moveLeft(ship);
    console.log("socket: ", socket);
    socket.emit("ship-move", "left");
  } else if (event.keyCode === 39) {
    moveRight(ship);
    socket.emit("ship-move", "right");
  }
}

function moveLeft(target) {
  if (target.position <= 405) {
    target.position += 50;
    target.body.style.right = target.position + "px";
  } else {
    target.position = 60;
    target.body.style.right = target.position + "px";
  }
}

function moveRight(target) {
  if (target.position >= 50) {
    target.position -= 50;
    target.body.style.right = target.position + "px";
  } else {
    target.position = 440;
    target.body.style.right = target.position + "px";
  }
}
var alien1MoveInterval;
function alien1Move() {
  alien1MoveInterval = setInterval(function() {
    moveRight(aliens[1]);
  }, 1000);
}
