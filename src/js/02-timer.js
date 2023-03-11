import flatpickr from 'flatpickr';
// Дополнительный импорт стилей
import 'flatpickr/dist/flatpickr.min.css';

import Notiflix from 'notiflix';

Notiflix.Notify.init({
  width: '280px',
  position: 'center-center',
  distance: '10px',
  opacity: 1,
});

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    console.log(selectedDates[0]);
    isStartButtonActive(selectedDates);
  },
};

const refs = {
  startBtn: document.querySelector('[data-start]'),
};

setStartButtonInactive();

flatpickr('#datetime-picker', options);

function setStartButtonInactive() {
  refs.startBtn.setAttribute('disabled', 'disabled');
}

function setStartButtonActive() {
  refs.startBtn.removeAttribute('disabled');
}

// function isStartButtonActive() {
//   onClose(selectedDates) {
//   console.log(selectedDates[0]);
//    }
// }
// const setDate = flatpickr.onClose();
// console.log(setDate);
//const setDate = flatpickr.onClose(selectedDates[0]);

function isStartButtonActive(selectedDates) {
  const currentDate = new Date().getTime();
  //   console.log(currentDate);
  const setDate = new Date(selectedDates[0]).getTime();

  //   console.log(setDate);
  if (setDate - currentDate >= 0) {
    setStartButtonActive();
  } else {
    Notiflix.Notify.failure('Please choose a date in the future');
  }
}
