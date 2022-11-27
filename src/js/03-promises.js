import Notiflix from 'notiflix';

const refs = {
  form: document.querySelector('.form'),
  delay: document.querySelector('input[name="delay"]'),
  step: document.querySelector('input[name="step"]'),
  amount: document.querySelector('input[name="amount"]'),

  getRefs() {
    console.log(({ form, delay, step, amount } = this));
  },
};

const userData = {
  delay: null,
  step: null,
  amount: null,
};
// refs.getRefs();

refs.delay.focus(); // focus on first input after reload and some data
refs.delay.value = 1000;
refs.step.value = 500;
refs.amount.value = 5;

function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3;

    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });
}

function onFormSubmit(event) {
  event.preventDefault();

  userData.delay = Number(refs.delay.value);
  userData.step = Number(refs.step.value);
  userData.amount = Number(refs.amount.value);

  if (!validateUserData(userData)) {
    Notiflix.Notify.failure(`type correct data`);
    return;
  }

  for (let n = 0; n < userData.amount; n += 1) {
    createPromise(n, userData.delay)
      .then(({ position, delay }) => {
        console.log(`✅ Fulfilled promise ${position} in ${delay}ms`);
        Notiflix.Notify.success(`Fulfilled promise ${position} in ${delay}ms`);
      })
      .catch(({ position, delay }) => {
        console.log(`❌ Rejected promise ${position} in ${delay}ms`);
        Notiflix.Notify.failure(`Rejected promise ${position} in ${delay}ms`);
      });
    userData.delay += userData.step;
  }
}

function validateUserData({ delay, step, amount }) {
  if (delay < 0) {
    return 0;
  }
  if (step < 0) {
    return 0;
  }
  if (amount <= 0) {
    return 0;
  }
  Notiflix.Notify.info(`validation successful`);
  return 1;
}

//
refs.form.addEventListener('submit', onFormSubmit);
