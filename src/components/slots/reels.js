import { on_spin_started, on_winning_result } from "./interface"

const slot_width = 128;
const slot_height = 128;

const n_reels = 5;
const n_rows = 3;
const invisible_rows = 1; // add these rows to the top and bottom of the reels
const shift_x = 67;
const shift_y = 271;
const reel_gap = 7;
const width = slot_width * n_reels + reel_gap * (n_reels - 1) + shift_x * 2;
const height = slot_height * n_rows + shift_y * 2;

// backends
const PY = 'PY';
const RB = 'RB';
const SC = 'SC';
const RU = 'RU';
const GO = 'GO';
const JS = 'JS';
const CC = 'CC';
const JA = 'JA';
// frontends
const RE = 'RE';
const NG = 'NG';
const VU = 'VU';
const NE = 'NE';
const QT = 'QT';
const AN = 'AN';
const IO = 'IO';
// protocols
const HT = 'HT';
const US = 'US';
const MI = 'MI';
const PR = 'PR';
const IR = 'IR';
const XM = 'XM';
// databases
const MO = 'MO';
const PO = 'PO';
const QL = 'QL';
const KA = 'KA';
const CA = 'CA';
const HA = 'HA';
// features
const OA = 'OA';
const BL = 'BL';
const CV = 'CV';
const ML = 'ML';
const DA = 'DA';
const LP = 'LP';
const IT = 'IT';
const MS = 'MS';

const symbol_names = new Map([
  [GO, 'Go'],
  [JS, 'NodeJS'],
  [CC, 'C++'],
  [JA, 'Java'],
  [RU, 'Rust'],
  [SC, 'Scala'],
  [PY, 'Python'],
  [RB, 'Ruby'],
  [RE, 'ReactJS'],
  [NG, 'Angular'],
  [VU, 'Vue.js'],
  [NE, '.NET'],
  [QT, 'Qt'],
  [AN, 'Android'],
  [IO, 'iOS'],
  [MO, 'MongoDB'],
  [PO, 'PostgreSQL'],
  [QL, 'GraphQL'],
  [KA, 'Kafka'],
  [CA, 'Cassandra'],
  [HA, 'Hadoop'],
  [HT, 'http'],
  [US, 'USB'],
  [MI, 'MIDI'],
  [PR, 'protobuf'],
  [IR, 'irc'],
  [XM, 'XMPP'],
  [OA, 'OAuth'],
  [BL, 'Blockchain'],
  [CV, 'OpenCV (computer vision)'],
  [ML, 'Machine Learning'],
  [DA, 'Dashboard'],
  [LP, 'OpenNLP, NLTK (natural language processing)'],
  [IT, 'Internet of Things'],
  [MS, 'Seneca (Microservices)'],
]);

const strips = [
  [CC, JS, GO, JA, CC, CC, RB, JS, RU, CC, JA, SC, PY, RU, RB],
  [RE, RE, RE, NG, VU, NE, QT, NG, AN, IO, VU, QT],
  [MO, PO, PO, PO, QL, HA, KA, MO, QL, CA],
  [HT, US, IR, XM, PR, MI, HT, PR],
  [DA, BL, MS, ML, BL, BL, CV, OA, BL, DA, OA, IT, LP],
];

// 0 3 6 9  12
// 1 4 7 10 13
// 2 5 8 11 14
const lines = [
  [1,4,7,10,13],
  [0,4,8,10,12],
  [2,4,6,10,14]
];

const spin_button = {
  x: 342,
  y: 727,
  a: 53,
  b: 52,
  enabled: true,
  clicked: false,
  mouse: 'out',
}

var slot_images = new Map();

var y = 0;

var reels = [];
reels.length = n_reels;
var reel_speed = 1;
var reel_positions = [];
reel_positions.length = n_reels;
var reel_position_offsets = [];
reel_position_offsets.length = n_reels;
const start_position = 0;
const start_offset = invisible_rows * slot_height;
const slots_per_spin = 5; // must be >= n_rows
const total_distance = (slots_per_spin + invisible_rows) * slot_height;
var t_spinning = 0;
var t_stopping = 0;
const fps = 60.0;
// dt = 1/60 = 0.016 sec = 16 ms
const spin_duration = 1500; // msec
var k = 0;
var n_draw_calls = (spin_duration / 1000) * fps;
var accumulated_t = (n_draw_calls / 2) * (n_draw_calls - 1) * (1 / fps); // =  n_draw_calls - 1
//const k = 0.005;
var showtime = 0
// accumulated_t = max_t
// dt = k
// k = max_t * dt / accumulated_t

var n_slots_spinned = [];
n_slots_spinned.length = n_reels;
var n_reels_stopped = 0;
var t = 0;
var max_t = 0;
var result = null;

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

var current_state = state_idle;

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
  var symbols = [];
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

function random_slot_image(reel_id) {
  return slot_images.get(random_symbol(reel_id));
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
      reels[reel_id][slot_id + 1] = slot_images.get(result[id]);
    }
  }
  on_reels_stopped();
}


function on_reel_stopped() {
  n_reels_stopped += 1;
  if (n_reels_stopped == n_reels) {
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
  var x_times = 1;
  var slots = [l[0]];
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
  var win = 0;
  var text_result = ''
  const reel_name = ['Backend', 'Frontend', 'DB', 'Protocol', 'Killer Feature']
  for (let i = 0; i < lines.length; ++ i) {
    text_result += `<h3>Idea ${i+1}</h3><p><ul>`
    for (let reel_id = 0; reel_id < n_reels; ++reel_id) {
      text_result += `<li>${reel_name[reel_id]}: ${symbol_names.get(result[lines[i][reel_id]])}</li>`
    }
    text_result += '</ul></p>'
  }
  return {win: win, animating_slots: lines, text_result: text_result};
}

function generate_next_symbol(reel_id) {
  reels[reel_id].pop();
  //console.log(n_slots_spinned[reel_id]  > 2 * slots_per_spin + 1 - n_rows, n_slots_spinned[reel_id], slots_per_spin, n_rows);
  if (n_slots_spinned[reel_id] > 2 * slots_per_spin + 1 - n_rows && 2 * slots_per_spin - n_slots_spinned[reel_id]  + 1 >= 0) {
    const i = 2 * slots_per_spin - n_slots_spinned[reel_id]  + 1; // n_rows - (n_slots_spinned[reel_id] - (2 * slots_per_spin + 1 - n_rows));
    const slot_image = slot_images.get(result[reel_id * n_rows + i]);
    //console.log("take result image", reel_id, i, result[reel_id * n_rows + i]);
    reels[reel_id].unshift(slot_image);
  } else {
    //console.log("pick random image", reel_id);
    const slot_image = random_slot_image(reel_id);
    reels[reel_id].unshift(slot_image);
  }
}

var t1 = 0;

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
var highlight_time = 0;

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
  if (line == state_winning.animating_slots.length) {
    // pause between cycles
    return;
  }

  const slots = state_winning.animating_slots[line];
  ctx.save();

  ctx.strokeStyle = 'rgb(0, 0, 0)';
  ctx.lineWidth = 6;
  for (let slot of slots) {
    const x = Math.floor(slot / n_rows);
    const y = slot % n_rows;
    ctx.strokeRect(shift_x + x * slot_width + reel_gap * x, shift_y + y * slot_height, slot_width, slot_height);
    //ctx.drawImage(frame, x * slot_width, y * slot_height);
  }
  ctx.restore();
}

var previous_frame = 0;
var background = null;

function draw(timestamp) {
  var dt = timestamp - previous_frame;
  previous_frame = timestamp;
  
  var canvas = document.getElementById('reels');
  if (!canvas) return;
  if (canvas.getContext) {
    var ctx = canvas.getContext('2d');
    ctx.fillStyle = '#fff'; // background color
    ctx.fillRect(0, 0, width, height);

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
        let {x, y} = get_reel_draw_coords(reel_id, i);
        ctx.drawImage(reels[reel_id][i], shift_x + x + reel_gap * reel_id, shift_y + y);
        //ctx.fillText(`y: ${y.toFixed(2)}`, x, y+50);
      }
      move_reel(reel_id, dt, generate_next_symbol);
      
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
    
  }
  window.requestAnimationFrame(draw);
}



function spin_stop() {
  switch (current_state) {
    case state_idle: console.log("was idle, pressed SPIN"); switch_state(current_state, state_spinning); break;
    case state_spinning: console.log("SPIN while spinning = STOP"); force_stop(); break;
    case state_stopping: console.log("SPIN while stopping = STOP"); force_stop(); break;
    case state_winning: console.log("SPIN while winning = BREAK"); switch_state(current_state, state_spinning); break;
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
  return Math.pow(pos.x - (btn.x + btn.a), 2) / Math.pow(btn.a, 2) 
    + Math.pow(pos.y - (btn.y + btn.b), 2) / Math.pow(btn.b, 2) <= 1.0
  // return pos.x > rect.x && pos.x < rect.x+rect.width && pos.y < rect.y+rect.height && pos.y > rect.y
}

function init_reels() {
  var go = new Image();
  var nodejs = new Image();
  var cpp = new Image();
  var java = new Image();
  var rust = new Image();
  var python = new Image();
  var ruby = new Image();
  var scala = new Image();
  var reactjs = new Image();
  var angular = new Image();
  var vuejs = new Image();
  var dotnet = new Image();
  var qt = new Image();
  var android = new Image();
  var ios = new Image();
  var mongodb = new Image();
  var postgresql = new Image();
  var graphql = new Image();
  var kafka = new Image();
  var cassandra = new Image();
  var hadoop = new Image();
  var http = new Image();
  var usb = new Image();
  var midi = new Image();
  var protobuf = new Image();
  var irc = new Image();
  var xmpp = new Image();
  var oauth = new Image();
  var blockchain = new Image();
  var computerVision = new Image();
  var machineLearning = new Image();
  var dashboard = new Image();
  var languageProcessing = new Image();
  var internetOfThings = new Image();
  var microServices = new Image();

  slot_images = new Map([
    [GO, go],
    [JS, nodejs],
    [CC, cpp],
    [JA, java],
    [RU, rust],
    [SC, scala],
    [PY, python],
    [RB, ruby],
    [RE, reactjs],
    [NG, angular],
    [VU, vuejs],
    [NE, dotnet],
    [QT, qt],
    [AN, android],
    [IO, ios],
    [MO, mongodb],
    [PO, postgresql],
    [QL, graphql],
    [KA, kafka],
    [CA, cassandra],
    [HA, hadoop],
    [HT, http],
    [US, usb],
    [MI, midi],
    [PR, protobuf],
    [IR, irc],
    [XM, xmpp],
    [OA, oauth],
    [BL, blockchain],
    [CV, computerVision],
    [ML, machineLearning],
    [DA, dashboard],
    [LP, languageProcessing],
    [IT, internetOfThings],
    [MS, microServices]
  ]);
  go.src = '/images/idea-generator/go.png';
  java.src = '/images/idea-generator/java.png';
  cpp.src = '/images/idea-generator/cpp.png';
  nodejs.src = '/images/idea-generator/nodejs.png';
  scala.src = '/images/idea-generator/scala.png';
  rust.src = '/images/idea-generator/rust.png';
  python.src = '/images/idea-generator/python.png';
  ruby.src = '/images/idea-generator/ruby.png';
  reactjs.src = '/images/idea-generator/reactjs.png';
  angular.src = '/images/idea-generator/angular.png';
  vuejs.src = '/images/idea-generator/vuejs.png';
  dotnet.src = '/images/idea-generator/dotnet.png';
  qt.src = '/images/idea-generator/qt.png';
  android.src = '/images/idea-generator/android.png';
  ios.src = '/images/idea-generator/ios.png';
  mongodb.src = '/images/idea-generator/mongodb.png';
  postgresql.src = '/images/idea-generator/postgresql.png';
  graphql.src = '/images/idea-generator/graphql.png';
  kafka.src = '/images/idea-generator/kafka.png';
  cassandra.src = '/images/idea-generator/cassandra.png';
  hadoop.src = '/images/idea-generator/hadoop.png';
  http.src = '/images/idea-generator/http.png';
  usb.src = '/images/idea-generator/usb.png';
  midi.src = '/images/idea-generator/midi.png';
  protobuf.src = '/images/idea-generator/protobuf.png';
  irc.src = '/images/idea-generator/irc.png';
  xmpp.src = '/images/idea-generator/xmpp.png';
  oauth.src = '/images/idea-generator/oauth.png';
  blockchain.src = '/images/idea-generator/blockchain.png';
  computerVision.src = '/images/idea-generator/opencv.png';
  machineLearning.src = '/images/idea-generator/ml.png';
  dashboard.src = '/images/idea-generator/dashboard.png';
  languageProcessing.src = '/images/idea-generator/opennlp.png';
  internetOfThings.src = '/images/idea-generator/iot.png';
  microServices.src = '/images/idea-generator/seneca.png';
  
  reel_positions.fill(start_position);
  reel_position_offsets.fill(start_offset);
  for (let r = 0; r < n_reels; ++r) {
    init_reel(r);
  }
  var canvas = document.getElementById('reels');
  canvas.addEventListener('mousemove', function(evt) {
    var mousePos = getMousePos(canvas, evt);
    if (isInside(mousePos,spin_button)) {
      spin_button.mouse = 'in'
    } else {
      spin_button.mouse = 'out'
    }
  }, false);
  canvas.addEventListener('mousedown', function(evt) {
    var mousePos = getMousePos(canvas, evt);
    if (isInside(mousePos,spin_button)) {
      spin_button.clicked = true
    }
  }, false);
  canvas.addEventListener('mouseup', function(evt) {
    var mousePos = getMousePos(canvas, evt);
    if (isInside(mousePos,spin_button)) {
      spin_button.clicked = false
    }
  }, false);
  canvas.addEventListener('click', function(evt) {
    var mousePos = getMousePos(canvas, evt);
    if (isInside(mousePos,spin_button)) {
      spin_button.clicked = false
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
  background.src = '/images/idea-generator/slot-frame.png';

  window.requestAnimationFrame(draw);
}

export { init_reels, spin_stop };