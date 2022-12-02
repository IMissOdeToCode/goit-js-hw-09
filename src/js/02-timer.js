// Описаний в документації
import flatpickr from 'flatpickr';
// Додатковий імпорт стилів
import 'flatpickr/dist/flatpickr.min.css';

import Notiflix from 'notiflix';

const refs = {
  datetime_picker: document.querySelector('#datetime-picker'),
  start: document.querySelector('button[data-start]'),

  days: document.querySelector('span[data-days]'),
  hours: document.querySelector('span[data-hours]'),
  minutes: document.querySelector('span[data-minutes]'),
  second: document.querySelector('span[data-seconds]'),

  getRefs() {
    console.log(({ datetime_picker } = this));
  },
};
// refs.getRefs();
refs.start.disabled = true;

let milliseconds = 0;
let timerId;

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

const options = {
  // mode: 'range',
  enableTime: true,
  time_24hr: true,
  dateFormat: 'Y-m-d H:i',
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    milliseconds = selectedDates[0].getTime() - new Date().getTime();

    if (milliseconds < 0) {
      Notiflix.Notify.failure(`Please choose a date in the future`);
      return;
    }

    refs.start.disabled = false;
    Notiflix.Notify.success(`Date is correct. You can start timer!`);
  },
};

flatpickr(refs.datetime_picker, options);

function renderTime() {
  const { days, hours, minutes, seconds } = convertMs(milliseconds);
  refs.days.textContent = `${days}`.padStart(2, '0');
  refs.hours.textContent = `${hours}`.padStart(2, '0');
  refs.minutes.textContent = `${minutes}`.padStart(2, '0');
  refs.second.textContent = `${seconds}`.padStart(2, '0');
  milliseconds -= 1000;
  if (milliseconds <= 0) {
    clearInterval(timerId);
    Notiflix.Notify.success(`The timer has expired`);
    milliseconds = 0;
    refs.start.disabled = true;
  }
}

refs.start.addEventListener('click', () => {
  timerId = setInterval(() => {
    renderTime();
  }, 1000);
});
