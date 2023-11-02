import Notiflix from 'notiflix';


const formEl = document.querySelector('.form');
formEl.addEventListener('submit', onFormSubmit);

function onFormSubmit(e) {
  e.preventDefault();
  const formData = new FormData(e.currentTarget);
  const dataParams = {};

  for (const [key, value] of formData.entries()) {
    dataParams[key] = Number(value);
  }

  let { amount, step, delay } = dataParams;

  for (let i = 1; i <= amount; i += 1) {
    createPromise(i, delay).then(onSuccess).catch(onError);
    formEl.reset();
    delay += step;
    
  }
}

function onError({ position, delay }) {
  Notiflix.Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
}

function onSuccess({ position, delay }) {
  Notiflix.Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
}


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
    })
}


