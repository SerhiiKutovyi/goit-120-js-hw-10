import iziToast from 'izitoast';

import 'izitoast/dist/css/iziToast.min.css';

const refs = {
  form: document.querySelector('.form'),
};

refs.form.addEventListener('submit', e => {
  e.preventDefault();
  const delay = e.target.elements.delay.value;
  const state = e.target.elements.state.value;

  createPromise(delay, state)
    .then(delay =>
      iziToast.show({
        iconUrl: '../img/Group.svg',

        message: `Fulfilled promise in ${delay}ms`,
        messageColor: 'rgba(255, 255, 255, 1)',
        position: 'topRight',
        color: 'rgba(89, 161, 13, 1)',
      })
    )
    .catch(delay =>
      iziToast.show({
        iconUrl: '../img/Group (1).svg',
        message: `Rejected promise in ${delay}ms`,
        messageColor: 'rgba(255, 255, 255, 1)',
        position: 'topRight',
        color: 'rgba(239, 64, 64, 1)',
      })
    )
    .finally(() => refs.form.reset());
});

const createPromise = (delay, state) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (state === 'fulfilled') {
        resolve(delay);
      } else {
        reject(delay);
      }
    }, `${delay}`);
  });
};
