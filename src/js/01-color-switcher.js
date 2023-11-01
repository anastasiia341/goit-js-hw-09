const startBtnEl = document.querySelector('button[data-start]');
const stopBtnEl = document.querySelector('button[data-stop]');
const bodyEl = document.querySelector('body');

startBtnEl.addEventListener('click', onStartBtnClick);
stopBtnEl.addEventListener('click', onStopBtnClick);
let timerId = null;


function onStartBtnClick() {
    timerId = setInterval(() => {
        const randomColor = getRandomHexColor();
        bodyEl.style.backgroundColor = randomColor;
    }, 1000);

    startBtnEl.setAttribute('disabled', '');
    stopBtnEl.removeAttribute('disabled', '');
}

function onStopBtnClick() {
    clearInterval(timerId);
    stopBtnEl.setAttribute('disabled', '');
    startBtnEl.removeAttribute('disabled', '');
}


function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, 0)}`;
}
