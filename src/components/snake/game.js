let world = [];
let snake = [[0,0], [0,1]];
let roads = {};
let grass;
let ground;
let last_timestamp = 0;

function draw(ctx, timestamp) {
  const dt = timestamp - last_timestamp;
  last_timestamp = timestamp;
  // console.log(dt);

  const tileXSize = 45;
  const tileYSize = 25;
  const tileHShift = 44;
  const tileLVShift = 40;
  const tileRVShift = 26;
  for (let i = 0; i < world.length; ++i) {
    for (let j = 0; j < world[i].length; ++j) {
      ctx.drawImage(grass,
        world.length * tileLVShift - j * tileHShift + i * tileXSize,
        j * tileYSize + i * tileRVShift);
    }
  }
      
  const drawWrapper = (t) => draw(ctx, t);
  window.requestAnimationFrame(drawWrapper);
}

//Function to get the mouse position
function getMousePos(canvas, event) {
  return {
    x: event.offsetX,
    y: event.offsetY
  };
}

function setUpCanvas(canvas) {
  // const { clientWidth, clientHeight } = canvas.getBoundingClientRect();
  const ratio = 10/7;
  canvas.width = canvas.clientWidth;
  // canvas.height = canvas.clientHeight;
  canvas.height = canvas.width / ratio
  console.log(canvas.clientWidth, canvas.clientHeight);
}

function initSnake() {

  const worldSize = 10;
  for (let i = 0; i < worldSize; ++i) {
    const line = [];
    for (let j = 0; j < worldSize; ++j) {
      line.push(0);
    }
    world.push(line);
  }

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

  canvas.addEventListener('mousemove', function(evt) {
    var mousePos = getMousePos(canvas, evt);
  }, false);
  canvas.addEventListener('mousedown', function(evt) {
    var mousePos = getMousePos(canvas, evt);
  }, false);
  canvas.addEventListener('mouseup', function(evt) {
    var mousePos = getMousePos(canvas, evt);
  }, false);
  canvas.addEventListener('click', function(evt) {
    var mousePos = getMousePos(canvas, evt);
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
    draw(ctx);
  });

  const drawWrapper = (timestamp) => draw(ctx, timestamp);
  window.requestAnimationFrame(drawWrapper);

  
}

export { initSnake };