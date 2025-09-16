import flatpickr from 'flatpickr';
import iziToast from 'izitoast';

import 'flatpickr/dist/flatpickr.min.css';
import 'izitoast/dist/css/iziToast.min.css';

const refs = {
  input: document.querySelector('#datetime-picker'),
  start: document.querySelector('[data-start]'),
  days: document.querySelector('[data-days]'),
  hours: document.querySelector('[data-hours]'),
  minutes: document.querySelector('[data-minutes]'),
  seconds: document.querySelector('[data-seconds]'),
};

let userSelectedDate = null;
let isActive = false;
refs.input.disabled = false;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (selectedDates[0] <= new Date()) {
      iziToast.show({
        message: 'Please choose a date in the future',
      });

      return;
    }
    userSelectedDate = selectedDates[0];
  },
};

flatpickr(refs.input, options);

refs.start.addEventListener('click', () => {
  if (isActive) {
    return;
  }

  isActive = true;
  refs.input.disabled = true;

  const timerId = setInterval(() => {
    const userTime = userSelectedDate - Date.now();
    const value = convertMs(userTime);

    if (userTime <= 0) {
      clearInterval(timerId);
      refs.input.disabled = false;
      isActive = false;
      return;
    }

    refs.days.textContent = value.days;
    refs.hours.textContent = value.hours;
    refs.minutes.textContent = value.minutes;
    refs.seconds.textContent = value.seconds;
  }, 1000);
});

const addLeadingZero = value => String(value).padStart(2, '0');

const convertMs = ms => {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = addLeadingZero(Math.floor(ms / day));
  const hours = addLeadingZero(Math.floor((ms % day) / hour));
  const minutes = addLeadingZero(Math.floor(((ms % day) % hour) / minute));
  const seconds = addLeadingZero(
    Math.floor((((ms % day) % hour) % minute) / second)
  );

  return { days, hours, minutes, seconds };
};
