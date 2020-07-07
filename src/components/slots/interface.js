import { spin_stop } from "./reels"

var balance = 1000;
const max_bet_per_line = 20;
var bet_per_line = 10;
var n_lines = 10;
var total_bet = bet_per_line * n_lines;
var win = 0;

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

function add_button(canvas, rect, name, click_handler) {
  var ctx = canvas.getContext('2d');
  //The rectangle should have x,y,width,height properties

  canvas.addEventListener('click', function(evt) {
    var mousePos = getMousePos(canvas, evt);
    if (isInside(mousePos,rect)) {
      click_handler();
    }   
  }, false);
}

function init_interface() {
  var canvas = document.getElementById('reels');
  add_button(canvas, {x:342, y:727, a:53, b:52, width:100, height:50}, 'spin', on_spin_clicked);
  update_all_labels();
}

function on_spin_clicked() {
  spin_stop();
}

function on_bet_plus_clicked() {
  bet_per_line += 1;
  if (bet_per_line > max_bet_per_line) {
    bet_per_line = max_bet_per_line;
  }
  total_bet = bet_per_line * n_lines;
  update_bet_label();
  update_total_bet_label();
}

function on_bet_minus_clicked() {
  bet_per_line -= 1;
  if (bet_per_line < 1) {
    bet_per_line = 1;
  }
  total_bet = bet_per_line * n_lines;
  update_bet_label();
  update_total_bet_label();
}

function on_spin_started() {
  balance -= total_bet;
  win = 0;
  update_win_label()
  update_balance_label();
}

function on_winning_result(total_win, text_result) {
  win = total_win * bet_per_line;
  balance += win;
  update_win_label();
  update_balance_label();
  update_result_label(text_result);
}

function update_balance_label() {
  var element = document.getElementById('balance');
  if (!element) return;
  element.innerHTML = `Balance: ${balance}`;
}

function update_bet_label() {
  var element = document.getElementById('bet_per_line');
  if (!element) return;
  element.innerHTML = `Bet per line: ${bet_per_line}`;
}

function update_total_bet_label() {
  var element = document.getElementById('total_bet');
  if (!element) return;
  element.innerHTML = `Total bet: ${total_bet}`;
}

function update_win_label() {
  var element = document.getElementById('win');
  if (!element) return;
  element.innerHTML = text_result;
}

function update_result_label(text_result) {
  var element = document.getElementById('slot-machine-result');
  if (!element) return;
  element.innerHTML = text_result;
}

function update_all_labels() {
  update_balance_label();
  update_bet_label();
  update_total_bet_label();
  update_win_label();
}

export { init_interface, on_spin_started, on_winning_result };