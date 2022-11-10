import { format, fromUnixTime, getDate, getMonth, getUnixTime, isSameDay } from "date-fns";
import {
  subMonths,
  addMonths,
  eachDayOfInterval,
  startOfMonth,
  startOfWeek,
  endOfMonth,
  endOfWeek,
  parseISO,
} from "date-fns/esm";
// click on a date, showing that date on the button
const datePickerBtn = document.querySelector(".date-picker-button");
const datePicker = document.querySelector(".date-picker");
const displayedHeader = document.querySelector(".current-month");
const prevMonthBtn = document.querySelector(".prev-month-button");
const nextMonthBtn = document.querySelector(".next-month-button");
const datePickerGridDates = document.querySelector(".date-picker-grid-dates");
let currentDate = new Date();
let selectedDate = new Date();
setSelectedDate(selectedDate);
setCurrentDate(currentDate);
renderDates(currentDate);
// opening and closing the date picker after clicking the button
datePickerBtn.addEventListener("click", () => {
  datePicker.classList.toggle("show");
});
// setting up the current date, for the display on header
function setSelectedDate(selectedDate) {
  datePickerBtn.innerText = format(selectedDate, "MMMM do, yyyy");
}

// setting up the selected date, which we change the current date to after selecting
function setCurrentDate(current) {
  // displaying the current month and year in the header
  displayedHeader.innerText = format(current, "MMMM yyyy");
  // the selected date could be put inside of the data attribute of the header, default value would be the current date
  displayedHeader.dataset.selectedTimestamp = getUnixTime(current);
  currentDate = current;
}

// changing months by clicking on prev and next btn
prevMonthBtn.addEventListener("click", () => {
  //getting the current date from time stamp
  const current = fromUnixTime(displayedHeader.dataset.selectedTimestamp);
  const prevDate = subMonths(current, 1);
  //changing the current date by +1 month or -1 month
  //setting the time stamp back
  setCurrentDate(prevDate);
  renderDates(prevDate);
});

// changing months by clicking on prev and next btn
nextMonthBtn.addEventListener("click", () => {
  //getting the current date from time stamp
  const current = fromUnixTime(displayedHeader.dataset.selectedTimestamp);
  const nextDate = addMonths(current, 1);
  //changing the current date by +1 month or -1 month
  //setting the time stamp back
  setCurrentDate(nextDate);
  renderDates(nextDate);
});

//g getting the dates for each months to fill up the square
// each day interval to get every day of the month
// start of week to check which day is the start of the month(including days in prev/next month)
function renderDates(date) {
  const dates = eachDayOfInterval({
    start: startOfWeek(startOfMonth(date)),
    end: endOfWeek(endOfMonth(date)),
  });
  datePickerGridDates.replaceChildren("");
  dates.forEach((date) => {
    const newDate = document.createElement("button");
    newDate.classList.add("date");
    newDate.innerText = getDate(date);
    if (getMonth(date) !== getMonth(currentDate)) {
      newDate.classList.add("date-picker-other-month-date");
    }
    if(isSameDay(date, currentDate)){
        newDate.classList.add('selected')
    }
    newDate.dataset.timeStamp = getUnixTime(date);
    datePickerGridDates.appendChild(newDate);
  });
}

//clicking on the date to set the selected date
document.addEventListener("click", (e) => {
  if (!e.target.matches(".date")) return;
  const defaultSelectedDate = document.querySelector('.date.selected')
  defaultSelectedDate.classList.remove('selected')
  e.target.classList.add('selected')
  setSelectedDate(fromUnixTime(e.target.dataset.timeStamp));
  datePicker.classList.toggle("show");
  setCurrentDate(fromUnixTime(e.target.dataset.timeStamp));
});
// adding the styles for dates in different month
