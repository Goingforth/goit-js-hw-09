const refs = {
  startBtn: document.querySelector('[data-start]'),
  stopBtn: document.querySelector('[data-stop]'),
  body: document.querySelector('body'),
};

let timerID = null;

refs.startBtn.addEventListener('click', onChangeBackGround);
refs.stopBtn.addEventListener('click', offChangeBackGround);

function onChangeBackGround() {
  timerID = setInterval(changeBackGround, 1000);
  refs.startBtn.setAttribute('disabled', 'disabled');
}

function offChangeBackGround() {
  clearInterval(timerID);
  refs.startBtn.removeAttribute('disabled');
}

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

function changeBackGround() {
  refs.body.style.background = getRandomHexColor();
}
