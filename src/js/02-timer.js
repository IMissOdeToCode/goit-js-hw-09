// Описаний в документації
import flatpickr from 'flatpickr';
// Додатковий імпорт стилів
import 'flatpickr/dist/flatpickr.min.css';

const refs = {
  datetime_picker: document.querySelector('#datetime-picker'),
  start: document.querySelector('button[data-start]'),

  getRefs() {
    console.log(({ datetime_picker } = this));
  },
};

refs.getRefs();

const options = {
  // mode: 'multiple',
  enableTime: true,
  time_24hr: true,
  dateFormat: 'Y-m-d H:i',
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    // if (selectedDates[0] < new Date()) {
    //   console.log('past');
    //   return;
    // }

    console.log(selectedDates[0].getUTCDate());
  },
};

flatpickr(refs.datetime_picker, options);
refs.start.addEventListener('click', () => {});
