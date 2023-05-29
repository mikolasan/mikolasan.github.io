let world = [];
let snake = [];
const DIRECTION = {
  UP: 1,
  DOWN: 2,
  LEFT: 3,
  RIGHT: 4,
};
let direction;
const speed = 200;

const roads = {};
let grass;
let ground;
let tree;

let width;
let height;
let last_timestamp = 0;
let movementDelay = 0;

function draw(ctx, timestamp) {
  const dt = timestamp - last_timestamp;
  last_timestamp = timestamp;
  // console.log(dt);

  movementDelay += dt;
  if (movementDelay >= speed) {
    move();
    movementDelay = 0;
  }
  ctx.fillStyle = '#fff'; // background color
  ctx.fillRect(0, 0, width, height);
  // TODO: replace these numbers with real isometric math
  const tileXSize = 45;
  const tileYSize = 25;
  const tileHShift = 44;
  const tileLVShift = 40;
  const tileRVShift = 26;
  for (let i = 0; i < world.length; ++i) {
    for (let j = 0; j < world[i].length; ++j) {
      let snakePart = false;
      for (let k = 0; k < snake.length; ++k) {
        const c = snake[k];
        if (c[0] === i && c[1] === j) {
          snakePart = true;
          break;
        }
      }
      ctx.drawImage(snakePart ? ground : grass,
        world.length * tileLVShift - j * tileHShift + i * tileXSize,
        j * tileYSize + i * tileRVShift);
      
      if (world[i][j] === 1) {
        ctx.drawImage(tree,
          world.length * tileLVShift - j * tileHShift + i * tileXSize + 20,
          j * tileYSize + i * tileRVShift - 37);
      }
    }
  }

  const drawWrapper = t => draw(ctx, t);
  window.requestAnimationFrame(drawWrapper);
}

//Function to get the mouse position
function getMousePos(canvas, event) {
  return {
    x: event.offsetX,
    y: event.offsetY
  };
}

function move() {
  const head = [...snake[snake.length - 1]];

  if (direction == DIRECTION.UP) {
    head[1] = head[1] - 1;
  } else if (direction == DIRECTION.DOWN) {
    head[1] = head[1] + 1;
  } else if (direction == DIRECTION.LEFT) {
    head[0] = head[0] - 1;
  } else if (direction == DIRECTION.RIGHT) {
    head[0] = head[0] + 1;
  }
  
  if (head[0] < 0 || head[1] < 0 || head[0] >= world.length || head[1] >= world[head[0]].length) {
    resetGame();
    return;
  }

  for (let i = 0; i < snake.length; ++i) {
    if (snake[i][0] === head[0] && snake[i][1] === head[1]) {
      resetGame();
      return;
    }
  }

  if (world[head[0]][head[1]] === 1) {
    spawnApple();
    world[head[0]][head[1]] = 0;
  } else {
    snake = snake.slice(1);
  }
  snake.push(head);
}

function onKeyDown(event) {
  if (event.key === 'ArrowUp') {
    event.preventDefault();
    if (direction == DIRECTION.DOWN) {
      return;
    }
    direction = DIRECTION.UP;
  }
  else if (event.key === 'ArrowDown') {
    event.preventDefault();
    if (direction == DIRECTION.UP) {
      return;
    }
    direction = DIRECTION.DOWN;
  }
  else if (event.key == 'ArrowLeft') {
    event.preventDefault();
    if (direction == DIRECTION.RIGHT) {
      return;
    }
    direction = DIRECTION.LEFT;
  }
  else if (event.key == 'ArrowRight') {
    event.preventDefault();
    if (direction == DIRECTION.LEFT) {
      return;
    }
    direction = DIRECTION.RIGHT;
  }
}

function setUpCanvas(canvas) {
  // const { clientWidth, clientHeight } = canvas.getBoundingClientRect();
  const ratio = 10/7;
  canvas.width = canvas.clientWidth;
  // canvas.height = canvas.clientHeight;
  canvas.height = canvas.width / ratio
  width = canvas.width;
  height = canvas.height;
}

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min); //The maximum is exclusive and the minimum is inclusive
}

function spawnApple() {
  while (true) {
    const x = getRandomInt(0, 10);
    const y = getRandomInt(0, 10);
    if (world[x][y] === 1) {
      // do not collide with existing apple
      continue;
    }
    let inSnake = false;
    for (let i = 0; i < snake.length; ++i) {
      if (snake[i][0] === x && snake[i][1] === y) {
        inSnake = true;
        break;
      }
    }
    if (!inSnake) {
      world[x][y] = 1;
      console.log(`tree on ${x} ${y}`);
      break;
    }
  }
}

function resetGame() {
  world = [];
  const worldSize = 10;
  for (let i = 0; i < worldSize; ++i) {
    const line = [];
    for (let j = 0; j < worldSize; ++j) {
      line.push(0);
    }
    world.push(line);
  }
  
  snake = [[0,0], [0,1], [0,2]];
  direction = DIRECTION.DOWN;
  spawnApple();
}

function initGame() {

  resetGame();
  const canvas = document.getElementById('snake');
  if (!canvas) {
    console.error('no canvas')
    return;
  }

  for (let i = 0; i < 15; ++ i) {
    const img = new Image();
    img.src = `/images/snake/road(${i + 1}).png`;
    roads[`${i}`] = img;
  }
  grass = new Image();
  grass.src = '/images/snake/grass.png';

  ground = new Image();
  ground.src = '/images/snake/ground.png';

  tree = new Image();
  tree.src = '/images/snake/tree(1).png';

  canvas.addEventListener('mousemove', function(evt) {
    const mousePos = getMousePos(canvas, evt);
  }, false);
  canvas.addEventListener('mousedown', function(evt) {
    const mousePos = getMousePos(canvas, evt);
  }, false);
  canvas.addEventListener('mouseup', function(evt) {
    const mousePos = getMousePos(canvas, evt);
  }, false);
  canvas.addEventListener('click', function(evt) {
    const mousePos = getMousePos(canvas, evt);
  }, false);
  canvas.addEventListener('keydown', event => {
    onKeyDown(event);
  }, false);

  if (!canvas.getContext) {
    console.error('canvas without context')
    return;
  }

  const ctx = canvas.getContext('2d');
  
  setUpCanvas(canvas);
  
  window.addEventListener('resize', () => {
    console.log('resize');
    // Clear the canvas.
    ctx.clearRect(0, 0, ctx.width, ctx.height);
    // Draw it all again.
    setUpCanvas(canvas);
    last_timestamp = 0;
    draw(ctx, 0);
  });

  const drawWrapper = timestamp => draw(ctx, timestamp);
  window.requestAnimationFrame(drawWrapper);

  
}

export { initGame };