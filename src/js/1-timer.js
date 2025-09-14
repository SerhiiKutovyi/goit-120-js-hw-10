import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

let userSelectedDate = null;

const refs = {
  input: document.querySelector('#datetime-picker'),
  start: document.querySelector('[data-start]'),
};

refs.start.disabled = true;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (selectedDates[0] <= new Date()) {
      window.alert('Please choose a date in the future');
      refs.start.disabled = true;
      return;
    }
    userSelectedDate = selectedDates[0];
    refs.start.disabled = false;
  },
};

flatpickr(refs.input, options);

refs.start.addEventListener('click', () => {
  console.log(userSelectedDate);
});
