import flatpickr from 'flatpickr';
// Дополнительный импорт стилей
import 'flatpickr/dist/flatpickr.min.css';

import Notiflix from 'notiflix';

Notiflix.Notify.init({
  width: '600px',
  position: 'center-center',
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
  startBtn: document.querySelector('[data-start]'),
  days: document.querySelector('[data-days]'),
  hours: document.querySelector('[data-hours]'),
  minutes: document.querySelector('[data-minutes]'),
  seconds: document.querySelector('[data-seconds]'),
};

refs.startBtn.addEventListener('click', onStartTimer);

setStartButtonInactive();

flatpickr('#datetime-picker', options);

function setStartButtonInactive() {
  refs.startBtn.setAttribute('disabled', 'disabled');
}

function setStartButtonActive() {
  refs.startBtn.removeAttribute('disabled');
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
    Notiflix.Notify.info('Timer STOP');
  }
}

function updateTimerFace({ days, hours, minutes, seconds }) {
  refs.days.innerHTML = addLeadingZero(days);
  refs.hours.innerHTML = addLeadingZero(hours);
  refs.minutes.innerHTML = addLeadingZero(minutes);
  refs.seconds.innerHTML = addLeadingZero(seconds);
}

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}
