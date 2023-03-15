import '../css/task02.css';

import flatpickr from 'flatpickr';
// Дополнительный импорт стилей
import 'flatpickr/dist/flatpickr.min.css';

import Notiflix from 'notiflix';

Notiflix.Notify.init({
  width: '600px',
  position: 'center-center',
  cssAnimationStyle: 'from-right',
  fontSize: '30px',
});

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    console.log(selectedDates[0]);
    const setDate = selectedDates[0];
    isStartButtonActive(setDate);
  },
};
let setTime = null;
let timerId = null;
const refs = {
  start: document.querySelector('[data-start]'),
  days: document.querySelector('[data-days]'),
  hours: document.querySelector('[data-hours]'),
  minutes: document.querySelector('[data-minutes]'),
  seconds: document.querySelector('[data-seconds]'),
  body: document.querySelector('body'),
};

refs.start.classList.add('startBtnTask02');
const startBtn = document.querySelector('.startBtnTask02');

setStartButtonInactive();

startBtn.addEventListener('click', onStartTimer);

flatpickr('#datetime-picker', options);

function setStartButtonInactive() {
  startBtn.setAttribute('disabled', 'disabled');
}

function setStartButtonActive() {
  startBtn.removeAttribute('disabled');
}

function isStartButtonActive(date) {
  const currentTime = Date.now();
  setTime = new Date(date.getTime());

  if (setTime - currentTime > 0) {
    setStartButtonActive();
  } else {
    Notiflix.Notify.failure('Please choose a date in the future');
  }
}

function onStartTimer() {
  timerId = setInterval(calcValueTimer, 1000);
  setStartButtonInactive();
}

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

function calcValueTimer() {
  const startTime = Date.now();
  const calcValueTimer = setTime - startTime;
  if (calcValueTimer > 0) {
    updateTimerFace(convertMs(calcValueTimer));
  } else {
    clearInterval(timerId);
    beBack();
    Notiflix.Notify.success("Timer STOP !   I'll be back!");
  }
}

function updateTimerFace({ days, hours, minutes, seconds }) {
  refs.days.textContent = addLeadingZero(days);
  refs.hours.textContent = addLeadingZero(hours);
  refs.minutes.textContent = addLeadingZero(minutes);
  refs.seconds.textContent = addLeadingZero(seconds);
}

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}

function beBack() {
  onBeBack();
  setTimeout(offBeBack, 4000);
}

function onBeBack() {
  refs.body.classList.add('be_back');
}
function offBeBack() {
  refs.body.classList.remove('be_back');
}
