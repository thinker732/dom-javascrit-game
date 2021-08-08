const gameBox = document.querySelector(".Gamebox");
const box = document.querySelector(".box");
const h1maker = document.querySelector("h1");
const score = document.querySelector(".score");
const time = document.querySelector(".time");
const button = document.querySelector(".go");
const mode = document.querySelector("#mode");
const isAsian = document.querySelector(".isAsian");
const dim = gameBox.getBoundingClientRect();

let move;
let runtimer;
let enemies = [];

const keyz = {
  ArrowLeft: false,
  ArrowRight: false,
  ArrowUp: false,
  ArrowDown: false,
};

const game = {
  default: 60,
  timer: 60, //seconds
  size: 60, //box size
  posX: dim.left,
  posY: dim.top,
  speed: 20, //how fast the cube/box move
  counter: 0,
  max: 25, //max element(circle in gameboard)
  speedRange: [2, 8], //speed of the box
  display: [0, 40], //display speed of box 10 has to be in the range
  score: 0,
  status: false,
};

box.game = {
  moveY: (val = 10) => {
    game.posY += val;
  },
  moveX: (val = 10) => {
    game.posX += val;
  },
};

(function initGame() {
  selectMode();
})();

mode.addEventListener("change", (event) => {
  if (mode.value == "asian") isAsian.style.display = "block";
  else isAsian.style.display = "none";

  selectMode();
});

function endGame() {
  clearInterval(runtimer);
  game.status = false;
  updatetimer(0);
  button.textContent = "Start";

  while (enemies.length != 0) {
    enemies.forEach((enemy, index) => {
      enemy.remove();
      enemies.splice(index, 1);
    });
  }
  clearInterval(runtimer);
}

function startGame() {
  button.textContent = "Stop";
  move = window.requestAnimationFrame(updatePos);
  game.timer = game.default;
  updatetimer(game.timer);
  game.score = 0;
  updatescore(game.score);
}

button.addEventListener("click", (e) => {
  game.status = !game.status;

  if (game.status) {
    startGame();
    runtimer = setInterval(() => {
      game.timer--;
      updatetimer(game.timer);

      setTimeout(() => {
        clearInterval(runtimer);
      }, 1000 * game.timer);
    }, 1000);
  } else {
    endGame();
    clearInterval(runtimer);
  }
});

h1maker.addEventListener("click", (event) => {
  const newElement = maker();
});

document.addEventListener("keydown", (event) => {
  if (event.code in keyz) keyz[event.code] = true;
});
document.addEventListener("keyup", (event) => {
  if (event.code in keyz) keyz[event.code] = false;
});
function selectMode() {
  switch (mode.value) {
    case "easy":
      game.default = 60;
      game.timer = game.default;
      updatetimer(game.timer);
      game.size = 60;
      game.speed = 20;
      game.max = 25;
      game.speedRange = [2, 5];
      game.display = [9, 11];
      break;
    case "normal":
      game.default = 30;
      game.timer = game.default;
      updatetimer(game.timer);
      game.size = 50;
      game.speed = 15;
      game.max = 20;
      game.speedRange = [2, 7];
      game.display = [0, 30];
      break;
    case "difficult":
      game.default = 20;
      game.timer = game.default;
      updatetimer(game.timer);
      game.size = 40;
      game.speed = 10;
      game.max = 10;
      game.speedRange = [8, 10];
      game.display = [0, 40];
      break;
    case "hardcore":
      game.default = 10;
      game.timer = game.default;
      updatetimer(game.timer);
      game.size = 20;
      game.speed = 2;
      game.max = 5;
      game.speedRange = [15, 20];
      game.display = [0, 100];
      break;
    case "asian":
      game.default = 10;
      game.timer = game.default;
      updatetimer(game.timer);
      game.size = 10;
      game.speed = 1;
      game.max = 2;
      game.speedRange = [20, 25];
      game.display = [0, 100];
      break;
  }

  fixbox();
}
function fixbox() {
  //box config
  box.style.position = "absolute";
  box.style.border = "1px solid black";
  box.style.width = `${game.size}px`;
  box.style.height = `${game.size}px`;
  box.style.top = `${game.posY}px`;
  box.style.left = `${game.posX}px`;
  box.style.backgroundColor = "red";
}

function randNumb(min = 0, max = 256) {
  return Math.floor(Math.random() * (max - min) + min);
}
function getColor(op = 0.8) {
  return `rgba(${randNumb()},${randNumb()},${randNumb()},${op})`;
}
function updatescore(value) {
  score.textContent = `${value}`;
}
function updatetimer(value) {
  time.textContent = `${value}`;
}
function isCol(Rect, circ) {
  let a = Rect.getBoundingClientRect();
  let b = circ.getBoundingClientRect();

  let xAxis = a.right < b.left || a.left > b.right;
  let yAxis = a.bottom < b.top || a.top > b.bottom;

  let overTop = !(xAxis || yAxis);

  return overTop;
}

function maker(eletype = "div") {
  game.counter++;
  const ele = document.createElement(eletype);
  ele.textContent = game.counter;
  ele.classList.add("enemy");
  ele.style.left = randNumb(dim.left, dim.width - game.size) + "px";
  ele.style.top = randNumb(dim.top, dim.height - game.size) + "px";

  /*
  append don't return any element
  appendChild does

  const ele1 = gameBox.append(ele);
  console.log(ele1);*/
  enemies.push(ele);
  ele.dirX = randNumb(...game.speedRange);
  ele.style.backgroundColor = getColor((op = 0.8));

  ele.addEventListener("click", (e) => {
    isCol(ele, box);
  });
  return gameBox.appendChild(ele);
}

function updatePos() {
  if (keyz.ArrowLeft && game.posX > dim.left) {
    box.game.moveX(-game.speed);
  }

  if (keyz.ArrowRight && game.posX < dim.right - game.size - game.speed) {
    box.game.moveX(game.speed);
  }
  if (keyz.ArrowUp && game.posY > dim.top) {
    box.game.moveY(-game.speed);
  }
  if (keyz.ArrowDown && game.posY < dim.bottom - game.size - game.speed) {
    box.game.moveY(game.speed);
  }

  box.style.top = `${game.posY}px`;
  box.style.left = `${game.posX}px`;

  if (randNumb(...game.display) == 10 && game.max > enemies.length) {
    const newEle = maker();
  }

  enemies.forEach((enemy, index) => {
    let x = enemy.offsetLeft;
    let y = enemy.offsetTop;

    if (x > dim.right - game.size || x < dim.left) {
      enemy.dirX *= -1;
    }
    x += enemy.dirX;
    enemy.style.left = x + "px";

    if (isCol(enemy, box)) {
      enemy.remove();
      enemies.splice(index, 1);
      game.score++;
      updatescore(game.score);
    }
  });

  if (game.status && game.timer != 0) {
    move = window.requestAnimationFrame(updatePos);
  } else {
    endGame();
  }
}
