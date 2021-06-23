const gameBox = document.querySelector(".Gamebox");
const box = document.querySelector(".box");
const h1maker = document.querySelector("h1");
const dim = gameBox.getBoundingClientRect();
let enemies = [];
const keyz = {
  ArrowLeft: false,
  ArrowRight: false,
  ArrowUp: false,
  ArrowDown: false,
};

const game = {
  size: 40,
  posX: dim.left,
  posY: dim.top,
  speed: 10,
  counter: 0,
  max: 10,
};

box.style.position = "absolute";
box.style.border = "1px solid black";
box.style.width = `${game.size}px`;
box.style.height = `${game.size}px`;
box.style.top = `${game.posY}px`;
box.style.left = `${game.posX}px`;
box.style.backgroundColor = "red";

box.game = {
  moveY: (val = 10) => {
    game.posY += val;
  },
  moveX: (val = 10) => {
    game.posX += val;
  },
};

let move = window.requestAnimationFrame(updatePos);

h1maker.addEventListener("click", (event) => {
  const newElement = maker();
});

document.addEventListener("keydown", (event) => {
  if (event.code in keyz) keyz[event.code] = true;
});
document.addEventListener("keyup", (event) => {
  if (event.code in keyz) keyz[event.code] = false;
});

function randNumb(min = 0, max = 256) {
  return Math.floor(Math.random() * (max - min) + min);
}
function getColor(op = 0.8) {
  return `rgba(${randNumb()},${randNumb()},${randNumb()},${op})`;
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
  ele.dirX = randNumb(1, 8);
  ele.style.backgroundColor = getColor((op = 0.8));
  return gameBox.appendChild(ele);
}

function updatePos() {
  if (keyz.ArrowLeft) {
    box.game.moveX(-game.speed);
  }
  if (keyz.ArrowRight) {
    box.game.moveX(game.speed);
  }
  if (keyz.ArrowUp) {
    box.game.moveY(-game.speed);
  }
  if (keyz.ArrowDown) {
    box.game.moveY(game.speed);
  }

  box.style.top = `${game.posY}px`;
  box.style.left = `${game.posX}px`;

  if (randNumb(0, 40) == 10 && game.max > enemies.length) {
    const newEle = maker();
  }
  enemies.forEach((enemy) => {
    let x = enemy.offsetLeft;
    let y = enemy.offsetTop;

    if (x > dim.right - game.size || x < dim.left) {
      enemy.dirX *= -1;
    }
    x += enemy.dirX;
    enemy.style.left = x + "px";
  });

  move = window.requestAnimationFrame(updatePos);
}
