// TODO:
// - add shader effect to the background https://www.shadertoy.com/view/wstSRM

import { on_spin_started, on_winning_result } from "./interface"

const slot_width = 128;
const slot_height = 128;

const n_reels = 5;
const n_rows = 3;
const invisible_rows = 1; // add these rows to the top and bottom of the reels
const shift_x = 110;
const shift_y = 50;
const reel_gap = 7;
// const width = slot_width * n_reels + reel_gap * (n_reels - 1) + shift_x * 2;
// const height = slot_height * n_rows + shift_y * 2;
const maxWidth = 900;
const maxHeight = 550;
let width;
let height;


const BS = 'BS';
const CH = 'CH';
const CR = 'CR';
const JD = 'JD';
const LA = 'LA';
const NJ = 'NJ';
const PA = 'PA';
const RI = 'RI';
const SM = 'SM';
const SU = 'SU';
const TR = 'TR';

// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random#getting_a_random_integer_between_two_values_inclusive
function getRandomIntInclusive(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1) + min); //The maximum is inclusive and the minimum is inclusive
}

function shuffle(array) {
  let {length} = array;
  while (length--) {
    const i = getRandomIntInclusive(0, length);
    [array[i], array[length]] = [array[length], array[i]];
  }
  return array;
}

const choose_5 = [BS, CH, CR, JD, LA, NJ, PA, RI, SM, SU, TR];
const strips = [
  [RI, RI, BS, CH, CR, JD, LA, NJ, PA, RI, RI, SM, SU, RI, RI, TR, TR, TR, TR],
  [SM, TR, RI, RI, JD, JD, CR, RI, PA, NJ, JD, JD, JD, JD, SU, LA, JD, JD, CH, BS ],
  [SM, PA, PA, BS, RI, RI, LA, JD, JD, JD, JD, PA, PA, CH, NJ, PA, PA, RI, TR, JD, JD, SU, CR, PA, PA ],
  [CR, JD, JD, SU, PA, RI, RI, RI, BS, JD, JD, JD, JD, CH, LA, SM, JD, JD, NJ ],
  [CR, RI, TR, JD, JD, JD, RI, RI, SM, BS, RI, RI, SU, LA, JD, JD, NJ, CH ],
]

// 0 3 6 9  12
// 1 4 7 10 13
// 2 5 8 11 14
const lines = [
  [1,4,7,10,13],
  // [0,4,8,10,12],
  // [2,4,6,10,14]
];

const spin_button = {
  x: 396,
  y: 427,
  a: 53,
  b: 52,
  enabled: true,
  clicked: false,
  mouse: 'out',
}

let slot_images = new Map();

const y = 0;

const reels = [];
reels.length = n_reels;
const reel_speed = 1;
const reel_positions = [];
reel_positions.length = n_reels;
const reel_position_offsets = [];
reel_position_offsets.length = n_reels;
const start_position = 0;
const start_offset = invisible_rows * slot_height;
const slots_per_spin = 5; // must be >= n_rows
const total_distance = (slots_per_spin + invisible_rows) * slot_height;
let t_spinning = 0;
let t_stopping = 0;
const fps = 60.0;
// dt = 1/60 = 0.016 sec = 16 ms
const spin_duration = 1500; // msec
let k = 0;
const n_draw_calls = (spin_duration / 1000) * fps;
const accumulated_t = (n_draw_calls / 2) * (n_draw_calls - 1) * (1 / fps); // =  n_draw_calls - 1
//const k = 0.005;
let showtime = 0
// accumulated_t = max_t
// dt = k
// k = max_t * dt / accumulated_t

const n_slots_spinned = [];
n_slots_spinned.length = n_reels;
let n_reels_stopped = 0;
let t = 0;
let max_t = 0;
let result = null;

// my beautiful state machine
const state_idle = {
  on_enter: function() {
    
  },
  on_leave: function() {

  }
};

function move_func_inv(x) {
  return Math.sqrt(2 * x);
}

const state_spinning = {
  on_enter: function() {
    reel_positions.fill(start_position);
    reel_position_offsets.fill(start_offset);
    t = 0;
    max_t = move_func_inv(total_distance);
    t_spinning = max_t;
    t_stopping = t_spinning * 2;
    k = (max_t / accumulated_t) * (1 / fps) ;
    //console.log("max_t", max_t, k, t_spinning, t_stopping);
    n_slots_spinned.fill(0);
    n_reels_stopped = 0;
    const symbols = random_result_symbols();
    console.log("result symbols", symbols);
    set_result_symbols(symbols);
    on_spin_started();
  },
  on_leave: function(next_state) {

  }
};

const state_stopping = {
  on_enter: function() {

  },
  on_leave: function(next_state) {

  }
};

const state_winning = {
  on_enter: function() {
    showtime = 0;
    this.current_animating_line = 0;
  },
  on_leave: function() {

  },
  win: 0,
  animating_slots: [],
  //current_animating_line: 0
};

let current_state = state_idle;

function switch_state(s1, s2) {
  s1.on_leave(s2);
  current_state = s2;
  s2.on_enter();
}

function random_virtual_stop(reel_id) {
  const strip = strips[reel_id];
  return Math.floor(Math.random() * strip.length);
}

function get_strip_symbol(reel_id, offset) {
  const strip = strips[reel_id];
  return strip[offset % strip.length];
}

function random_result_symbols() {
  const symbols = [];
  for (let reel_id = 0; reel_id < n_reels; ++reel_id) {
    const virtual_stop = random_virtual_stop(reel_id);
    for (let slot_id = 0; slot_id < n_rows; ++slot_id) {
      symbols[reel_id * n_rows + slot_id] = get_strip_symbol(reel_id, virtual_stop + slot_id);
    }
  }
  return symbols;
}

function set_result_symbols(symbols) {
  result = symbols;
}

function random_symbol(reel_id) {
  return get_strip_symbol(reel_id, random_virtual_stop(reel_id));
}

function get_slot_image(symbol_id) {
  return slot_images.get(symbol_id)[1];
}

function random_slot_image(reel_id) {
  return get_slot_image(random_symbol(reel_id));
}

function init_reel(reel_id) {
  reels[reel_id] = [];
  // add invisible rows to the top and bottom of each reel
  for (let i = 0; i < n_rows + 2 * invisible_rows; ++i) {
    reels[reel_id].push(random_slot_image(reel_id));
  }
}

function force_stop() {
  for (let reel_id = 0; reel_id < n_reels; ++reel_id) {
    reel_positions[reel_id] = start_position;
    reel_position_offsets[reel_id] = start_offset;
    for (let slot_id = 0; slot_id < n_rows; ++slot_id) {
      const id = reel_id * n_rows + slot_id;
      reels[reel_id][slot_id + 1] = get_slot_image(result[id]);
    }
  }
  on_reels_stopped();
}


function on_reel_stopped() {
  n_reels_stopped += 1;
  if (n_reels_stopped === n_reels) {
    on_reels_stopped();
  }
}

function on_reels_stopped() {
  const {win, animating_slots, text_result} = parse_result();
  if (animating_slots.length > 0) {
    switch_state(current_state, state_winning);
    state_winning.win = win;
    state_winning.animating_slots = animating_slots;
    on_winning_result(win, text_result);
  } else {
    switch_state(current_state, state_idle);
    on_winning_result(0, "Nothing");
  }
}

function parse_line(line_id) {
  const l = lines[line_id];
  const first = result[l[0]];
  let x_times = 1;
  let slots = [l[0]];
  for (let reel_id = 1; reel_id < n_reels; ++reel_id) {
    const symbol = result[l[reel_id]];
    if (first == symbol) {
      x_times += 1;
      slots.push(l[reel_id]);
    } else {
      break;
    }
  }
  const win = 0;
  if (win == 0) slots = undefined;
  return {line_win: win, slots: slots};
}

function parse_result() {
  const win = 0;
  const text_result = ''
  return {win: win, animating_slots: lines, text_result: text_result};
}

function generate_next_symbol(reel_id) {
  reels[reel_id].pop();
  //console.log(n_slots_spinned[reel_id]  > 2 * slots_per_spin + 1 - n_rows, n_slots_spinned[reel_id], slots_per_spin, n_rows);
  if (n_slots_spinned[reel_id] > 2 * slots_per_spin + 1 - n_rows && 2 * slots_per_spin - n_slots_spinned[reel_id]  + 1 >= 0) {
    const i = 2 * slots_per_spin - n_slots_spinned[reel_id]  + 1; // n_rows - (n_slots_spinned[reel_id] - (2 * slots_per_spin + 1 - n_rows));
    const slot_image = get_slot_image(result[reel_id * n_rows + i]);
    //console.log("take result image", reel_id, i, result[reel_id * n_rows + i]);
    reels[reel_id].unshift(slot_image);
  } else {
    //console.log("pick random image", reel_id);
    const slot_image = random_slot_image(reel_id);
    reels[reel_id].unshift(slot_image);
  }
}

let t1 = 0;

function move_func(x) {
  return Math.pow(x, 2) / 2;
}

function move_reel(reel_id, dt, next_symbol_callback) {
  if (current_state === state_idle) return;
  if (current_state === state_winning) return;
  t += dt * k;
  if (t > t_stopping && n_slots_spinned[reel_id] == 12) {
    //console.log("move_reel stop->idle", reel_id, t, t_stopping, n_slots_spinned[reel_id], reel_positions[reel_id]);
    on_reel_stopped();
    return;
  } else if (current_state === state_spinning && t > t_spinning) {
    switch_state(current_state, state_stopping);
  }

  if (current_state === state_spinning) {
    t1 = t;
    reel_positions[reel_id] = move_func(t);
    if (reel_positions[reel_id] - reel_position_offsets[reel_id] >= slot_height - start_offset) {
      n_slots_spinned[reel_id] += 1;
      next_symbol_callback(reel_id);
      reel_position_offsets[reel_id] += slot_height;
    }
  } else if (current_state === state_stopping) {
    if (t > t_stopping) {
      reel_positions[reel_id] += 1;
      if (reel_positions[reel_id] > reel_position_offsets[reel_id]) {
        reel_positions[reel_id] = reel_position_offsets[reel_id];
      }
    } else {
      reel_positions[reel_id] = -move_func(t - 2 * t1) + 2 * move_func(t1);
    }
    if (reel_positions[reel_id] - reel_position_offsets[reel_id] >= slot_height - start_offset) {
      n_slots_spinned[reel_id] += 1;
      next_symbol_callback(reel_id);
      reel_position_offsets[reel_id] += slot_height;
    }
  }
}

function get_reel_draw_coords(reel_id, slot_id) {
  const x = reel_id * slot_width;
  const y = (slot_id) * slot_height + reel_positions[reel_id] - reel_position_offsets[reel_id];
  return {x: x, y: y};
}

const one_line_delay = 1000;
const spin_highlight_delay = 2500;
const spin_highlight = 500;
let highlight_time = 0;

function show_result(ctx, dt) {
  showtime += dt;
  if (Math.floor(showtime / one_line_delay) > state_winning.current_animating_line) {
    state_winning.current_animating_line += 1;
    if (state_winning.current_animating_line > state_winning.animating_slots.length) {
      state_winning.current_animating_line = 0;
      showtime = 0;
    }
  }

  const line = state_winning.current_animating_line;
  if (line === state_winning.animating_slots.length) {
    // pause between cycles
    return;
  }

  const slots = state_winning.animating_slots[line];
  ctx.save();

  ctx.strokeStyle = 'rgb(0, 0, 0)';
  ctx.lineWidth = 6;
  for (const slot of slots) {
    const x = Math.floor(slot / n_rows);
    const y = slot % n_rows;
    ctx.strokeRect(shift_x + x * slot_width + reel_gap * x, shift_y + y * slot_height, slot_width, slot_height);
    //ctx.drawImage(frame, x * slot_width, y * slot_height);
  }
  ctx.restore();
}

let background = null;
let last_timestamp = 0;

function draw(ctx, timestamp) {
  const dt = timestamp - last_timestamp;
  last_timestamp = timestamp;
  
  ctx.fillStyle = '#BDC2BF'; // background color
  ctx.fillRect(0, 0, width, height);

  
  ctx.save();
  const scale = width / maxWidth;
  ctx.scale(scale, scale);
  ctx.drawImage(background, 0, 0);

  ctx.save();
  // clipping rect
  ctx.beginPath();
  ctx.rect(shift_x, shift_y, slot_width * n_reels + reel_gap * (n_reels - 1), slot_height * n_rows);
  ctx.clip();

  // ctx.font = '30px sans-serif';
  // ctx.fillStyle = '#000';
  for (let reel_id = 0; reel_id < n_reels; ++reel_id) {
    // draw a reel
    for (let i = 0; i < reels[reel_id].length; ++i) {
      const {x, y} = get_reel_draw_coords(reel_id, i);
      ctx.drawImage(reels[reel_id][i], shift_x + x + reel_gap * reel_id, shift_y + y);
      //ctx.fillText(`y: ${y.toFixed(2)}`, x, y+50);
    }
    move_reel(reel_id, dt, generate_next_symbol);
    
  }
  ctx.restore();

  ctx.save();

  ctx.strokeStyle = 'rgb(37, 41, 28)';
  ctx.lineWidth = 6;
  for (let reel_id = 0; reel_id < n_reels; ++reel_id) {
    const x = reel_id * slot_width;
    const y = 0;
    ctx.strokeRect(
      shift_x + x + reel_gap * reel_id, 
      shift_y + y, 
      slot_width, 
      slot_height * n_rows);
  }
  ctx.restore();

  if (current_state == state_winning) {
    show_result(ctx, dt);
  }
  
  if (!spin_button.enabled) {
    ctx.drawImage(spin_button.disabled, spin_button.x, spin_button.y)
  } else if (spin_button.clicked) {
    ctx.drawImage(spin_button.pressed, spin_button.x, spin_button.y)
  } else if (spin_button.mouse == 'in') {
    ctx.drawImage(spin_button.hover, spin_button.x, spin_button.y)
  } else {
    highlight_time += dt;
    if (highlight_time > spin_highlight_delay) {
      ctx.drawImage(spin_button.highlight, spin_button.x, spin_button.y)
    } else {
      ctx.drawImage(spin_button.normal, spin_button.x, spin_button.y)
    }
    if (highlight_time > spin_highlight + spin_highlight_delay) {
      highlight_time -= spin_highlight + spin_highlight_delay;
    }      
  }
  ctx.restore();
  
  const drawWrapper = t => draw(ctx, t);
  window.requestAnimationFrame(drawWrapper);
}



function spin_stop() {
  switch (current_state) {
  case state_idle:
    console.log("was idle, pressed SPIN"); switch_state(current_state, state_spinning); break;
  case state_spinning:
    console.log("SPIN while spinning = STOP"); force_stop(); break;
  case state_stopping:
    console.log("SPIN while stopping = STOP"); force_stop(); break;
  case state_winning:
    console.log("SPIN while winning = BREAK"); switch_state(current_state, state_spinning); break;
  default:
    console.log(`some other state: ${current_state}. How?`)
  }
}

// function on_key_down(e) {
//   var code = e.keyCode;
//   switch (code) {
//     case 32: spin_stop(); break; // spacebar
//   }
// }

//Function to get the mouse position
function getMousePos(canvas, event) {
  return {
    x: event.offsetX,
    y: event.offsetY
  };
}

// window.addEventListener('keydown', on_key_down);
function isInside(pos, btn){
  const scale = width / maxWidth;
  const x = (btn.x + btn.a) * scale;
  const y = (btn.y + btn.b) * scale;
  const rx = btn.a * scale;
  const ry = btn.b * scale;
  return Math.pow(pos.x - x, 2) / Math.pow(rx, 2) 
    + Math.pow(pos.y - y, 2) / Math.pow(ry, 2) <= 1.0;
}

function init_reels() {
  slot_images = new Map([
    [BS, ['/images/slots/samurai/bonsai.jpeg']],
    [CH, ['/images/slots/samurai/chest.jpeg']],
    [CR, ['/images/slots/samurai/crab.jpeg']],
    [JD, ['/images/slots/samurai/jade.jpeg']],
    [LA, ['/images/slots/samurai/lantern.jpeg']],
    [NJ, ['/images/slots/samurai/ninja.jpeg']],
    [PA, ['/images/slots/samurai/panda.jpeg']],
    [RI, ['/images/slots/samurai/rice.jpeg']],
    [SM, ['/images/slots/samurai/samurai.jpeg']],
    [SU, ['/images/slots/samurai/sushi.jpeg']],
    [TR, ['/images/slots/samurai/turtle.jpeg']],
  ]);

  for (const value of slot_images.values()) {
    value.push(new Image());
    value[1].src = value[0];
  }
  
  reel_positions.fill(start_position);
  reel_position_offsets.fill(start_offset);
  for (let r = 0; r < n_reels; ++r) {
    init_reel(r);
  }
  
  
  const canvas = document.getElementById('reels');
  if (!canvas) {
    console.error('no canvas')
    return;
  }

  canvas.addEventListener('mousemove', function(evt) {
    const mousePos = getMousePos(canvas, evt);
    if (isInside(mousePos,spin_button)) {
      spin_button.mouse = 'in'
    } else {
      spin_button.mouse = 'out'
    }
  }, false);
  canvas.addEventListener('mousedown', function(evt) {
    const mousePos = getMousePos(canvas, evt);
    if (isInside(mousePos,spin_button)) {
      spin_button.clicked = true
    }
  }, false);
  canvas.addEventListener('mouseup', function(evt) {
    const mousePos = getMousePos(canvas, evt);
    if (isInside(mousePos,spin_button)) {
      spin_button.clicked = false
    }
  }, false);
  canvas.addEventListener('click', function(evt) {
    const mousePos = getMousePos(canvas, evt);
    if (isInside(mousePos,spin_button)) {
      spin_button.clicked = false
      spin_stop()
    }
  }, false);

  spin_button.normal = new Image();
  spin_button.disabled = new Image();
  spin_button.hover = new Image();
  spin_button.pressed = new Image();
  spin_button.highlight = new Image();
  spin_button.normal.src = '/images/idea-generator/spin_button.png';
  spin_button.disabled.src = '/images/idea-generator/spin_button_disabled.png';
  spin_button.hover.src = '/images/idea-generator/spin_button_hover.png';
  spin_button.pressed.src = '/images/idea-generator/spin_button_pressed.png';
  spin_button.highlight.src = '/images/idea-generator/spin_button_highlight.png';
  
  background = new Image();
  background.src = '/images/slots/samurai/background.jpeg';

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

function setUpCanvas(canvas) {
  // const { clientWidth, clientHeight } = canvas.getBoundingClientRect();
  const ratio = maxWidth/maxHeight;
  canvas.width = canvas.clientWidth;
  // canvas.height = canvas.clientHeight;
  canvas.height = canvas.width / ratio
  width = canvas.width;
  height = canvas.height;
}

export { init_reels };