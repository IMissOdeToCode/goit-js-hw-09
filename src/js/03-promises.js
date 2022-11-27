import Notiflix from 'notiflix';
Notiflix.Notify.success('Sol lucet omnibus');

const refs = {
  form: document.querySelector('.form'),
  delay: document.querySelector('input[name="delay"]'),
  step: document.querySelector('input[name="step"]'),
  amount: document.querySelector('input[name="amount"]'),

  getRefs() {
    console.log(({ form, delay, step, amount } = this));
  },
};
// refs.getRefs();

refs.delay.focus(); // focus on first input after reload
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

  let delay = Number(refs.delay.value);
  let step = Number(refs.step.value);
  let a = Number(refs.amount.value);

  for (let n = 0; n < a; n += 1) {
    createPromise(n, delay)
      .then(({ position, delay }) => {
        console.log(`✅ Fulfilled promise ${position} in ${delay}ms`);
      })
      .catch(({ position, delay }) => {
        console.log(`❌ Rejected promise ${position} in ${delay}ms`);
      });
    delay += step;
  }
}

//
refs.form.addEventListener('submit', onFormSubmit);
