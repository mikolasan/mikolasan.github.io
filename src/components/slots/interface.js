
let balance = 1000;
const max_bet_per_line = 20;
let bet_per_line = 10;
const n_lines = 10;
let total_bet = bet_per_line * n_lines;
let win = 0;

function init_interface() {
  update_all_labels();
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
  const element = document.getElementById('balance');
  if (!element) return;
  element.innerHTML = `Balance: ${balance}`;
}

function update_bet_label() {
  const element = document.getElementById('bet_per_line');
  if (!element) return;
  element.innerHTML = `Bet per line: ${bet_per_line}`;
}

function update_total_bet_label() {
  const element = document.getElementById('total_bet');
  if (!element) return;
  element.innerHTML = `Total bet: ${total_bet}`;
}

function update_win_label() {
  const element = document.getElementById('win');
  if (!element) return;
  element.innerHTML = text_result;
}

function update_result_label(text_result) {
  const element = document.getElementById('slot-machine-result');
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