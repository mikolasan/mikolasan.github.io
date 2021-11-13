import { spin_stop } from "./reels"

var balance = 1000;
const max_bet_per_line = 20;
var bet_per_line = 10;
var n_lines = 10;
var total_bet = bet_per_line * n_lines;
var win = 0;

function init_interface() {
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

export { init_interface, on_spin_clicked, on_spin_started, on_winning_result };