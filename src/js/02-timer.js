import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import Notiflix from 'notiflix';


const refs = {
  days: document.querySelector("[data-days]"),
  hours: document.querySelector("[data-hours]"),
  minutes: document.querySelector("[data-minutes]"),
  seconds: document.querySelector("[data-seconds]"),
  startTimerBtn: document.querySelector("button[data-start]"),
  timePicker: document.querySelector("#datetime-picker")
}


const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    console.log(selectedDates[0]);
    console.log(new Date())

    if (selectedDates[0] < new Date()) {
      refs.startTimerBtn.disabled = true;
      Notiflix.Notify.warning("Please choose a date in the future")
    } else {
      refs.startTimerBtn.disabled = false
      refs.startTimerBtn.addEventListener("click", () => { changeTimerValue(selectedDates[0]) })
    }
  },
};

flatpickr(refs.timePicker, options)

function changeTimerValue() {
    let timer = setInterval(() => {
    let countdown = new Date(refs.timePicker.value) - new Date();
    refs.startTimerBtn.disabled = true;
    refs.timePicker.disabled = true;
    console.log(countdown)
    if (countdown >= 0) {
      let timerData = convertMs(countdown);
        refs.days.textContent = timerData.days;
        refs.hours.textContent = timerData.hours;
        refs.minutes.textContent = timerData.minutes;
        refs.seconds.textContent = timerData.seconds;
    } else {
      clearInterval(timer);
    }
  }, 1000);
    
}


function addLeadingZero(value) {
  return String(value).padStart(2, "0");
}


function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = addLeadingZero(Math.floor(ms / day));
  const hours = addLeadingZero(Math.floor((ms % day) / hour));
  const minutes = addLeadingZero(Math.floor(((ms % day) % hour) / minute));
  const seconds = addLeadingZero(Math.floor((((ms % day) % hour) % minute) / second));
  return { days, hours, minutes, seconds };
}