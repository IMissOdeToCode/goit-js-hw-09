const refs = {
  startBtn: document.querySelector('[data-start]'),
  stopBtn: document.querySelector('[data-stop]'),
  body: document.querySelector('body'),
};

console.log(refs);

refs.startBtn.disabled = false;
refs.stopBtn.disabled = true;

let timerId;

function onStartClick() {
  timerId = setInterval(changeBodyColor, 1000);
  toggleButtonsState();
}

function onStopClick() {
  clearInterval(timerId);
  toggleButtonsState();
}

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

function changeBodyColor() {
  refs.body.style.backgroundColor = getRandomHexColor();
}

function toggleButtonsState() {
  refs.startBtn.disabled = !refs.startBtn.disabled;
  refs.stopBtn.disabled = !refs.stopBtn.disabled;
}

//
refs.startBtn.addEventListener('click', onStartClick);
refs.stopBtn.addEventListener('click', onStopClick);
